---
title: "Operating yt-dlp on a Self-Hosted Box in 2026"
date: 2026-10-16T20:00:00+03:30
description: "The hard part of hosting yt-dlp is not the CLI call—it is Deno in the image, cookie handling, path confinement, and owning the operational risk."
layout: single
author_profile: true
url: 2026/10/16/operating-yt-dlp-on-a-self-hosted-box/
shortlink: https://g.omid.dev/pmgGzI6
tags:
  - Docker
  - Linux
  - DevOps
categories:
  - TechBlog
series:
  id: frameworkless-php-host
  title: "Frameworkless PHP on One Host"
  order: 1
  label: "yt-dlp ops"
  role: part
seeAlso:
  - /2026/10/14/background-jobs-without-a-queue-php-apache/
  - /2026/10/20/per-user-cloud-oauth-on-one-host/
---

Calling `yt-dlp` from PHP is a few lines of `proc_open()`. Keeping it useful on a private host is an operations problem: JavaScript challenges need a runtime in the image, authenticated sites need carefully handled cookies, output needs a filesystem boundary, and someone must own the terms-of-service risk of each source.

This post describes that operational shape in [Tools Center](https://tools.omid.dev), with [public source for reference](https://github.com/omidfarhang/tools.omid.dev). It is not a guide to bypassing DRM or site restrictions. The operator decides which sites and content they are entitled to fetch.

It also explains why the [post-response job pattern](/2026/10/14/background-jobs-without-a-queue-php-apache/) exists: a media download and ffmpeg merge are exactly the kind of work that should outlive a browser request.

## The container needs more than yt-dlp

Modern extractor behavior can require a JavaScript runtime. For YouTube EJS challenges, yt-dlp documents Deno as its default runtime. The image installs Deno alongside ffmpeg and `yt-dlp[default]`:

```dockerfile
# Deno is yt-dlp's default JS runtime for YouTube EJS challenges.
# See https://github.com/yt-dlp/yt-dlp/wiki/EJS
ARG DENO_VERSION=2.9.7

# Install ffmpeg and Deno, then:
RUN pip3 install --no-cache-dir --break-system-packages "yt-dlp[default]"
```

Without a supported JavaScript runtime, an extractor failure can look like a generic yt-dlp regression. Keeping the runtime explicit and versioned in the [`Dockerfile`](https://github.com/omidfarhang/tools.omid.dev/blob/master/Dockerfile) makes the dependency visible.

ffmpeg belongs in the same image because format selection can produce separate video and audio streams, and audio-only output may need extraction or conversion. A health check that only runs `yt-dlp --version` therefore proves less than it appears to.

## Build an argument array, not a shell command

The runner constructs an argument list and passes it to `proc_open()`:

```php
$template = Config::tempDir() . '/%(title).60B [%(id)s].%(ext)s';
$cmd = [
    'yt-dlp',
    ...$formatArgs,
    ...$siteExtra,
    ...$extraArgs,
    '-o', $template,
    '--restrict-filenames',
    '--no-playlist',
    '-q',
    '--print', 'after_move:filepath',
];

if ($cookiePath !== null && is_file($cookiePath)) {
    $cmd[] = '--cookies';
    $cmd[] = $cookiePath;
}
$cmd[] = $url;
```

An array avoids shell interpolation for the URL and filenames. `--no-playlist` prevents one pasted item from unexpectedly becoming hundreds. The bounded title and `--restrict-filenames` keep stored names predictable.

Site-wide extra arguments are parsed through a controlled configuration path. Invalid settings fall back to no extras rather than breaking every download.

## Treat stdout as untrusted

The runner asks yt-dlp to print the final path after moves and merges. It does not assume that path is safe:

```php
$real = realpath($path);
$base = realpath(Config::tempDir());

if (
    $real === false
    || $base === false
    || !str_starts_with($real, $base . DIRECTORY_SEPARATOR)
) {
    return ['ok' => false, 'error' => 'yt-dlp wrote outside temp directory.'];
}
```

The process starts in the temp directory, but working directory is not confinement. The `realpath()` check ensures the final file actually sits below the expected root before the application imports it. The stored basename is sanitized once more before it becomes application data.

The complete implementation is in [`YtDlpRunner.php`](https://github.com/omidfarhang/tools.omid.dev/blob/master/src/Download/YtDlpRunner.php).

## Keep cookies in SQLite, materialize for the process

yt-dlp expects a Netscape-format cookie file. Keeping that file only in a mutable container complicates rebuilds and backups. Tools Center stores the text in SQLite and materializes it at the configured path when yt-dlp or the CLI needs it.

The admin path normalizes line endings, rejects empty or oversized input, and checks that the content resembles Netscape cookies before saving:

```php
$content = str_replace("\r\n", "\n", $content);
$content = trim($content);

if (!$this->looksLikeNetscapeCookies($content)) {
    throw new \InvalidArgumentException(
        'Expected Netscape cookie format.'
    );
}

$this->settings->set(self::SETTING_KEY, $content . "\n");
$this->materialize();
```

These cookies are site-wide, not per-user. That is a deliberate fit for a private operator-managed host. It also concentrates risk: the admin owns rotation, storage permissions, backups, and removal when a session should no longer exist.

See [`YtDlpCookieStore.php`](https://github.com/omidfarhang/tools.omid.dev/blob/master/src/YtDlpCookieStore.php).

## Curated sources and a generic escape hatch

The application has first-class source classes for common services. Those classes choose sensible format controls and identify audio-only sources. A separate “force generic yt-dlp” option handles a URL that the curated registry does not claim.

A generated `ytdlp-known-hosts.json` list supplies a UI hint when the hostname looks like one yt-dlp supports. It does **not** silently route every matching URL through the generic runner. That distinction matters:

- Curated sources are an application promise with tailored options.
- The known-host list is guidance.
- Forced generic mode is an explicit user decision.

This keeps the common paths understandable without pretending every extractor has the same behavior.

## Why this belongs behind a job row

A run may download multiple streams, invoke ffmpeg, and then upload the result elsewhere. The browser should receive its redirect before any of that begins. The [series anchor](/2026/10/14/background-jobs-without-a-queue-php-apache/) covers how the app finishes its PHP response and continues processing the durable job.

When the destination is Dropbox or Google Drive, the processor can then pass the result into [per-user cloud OAuth](/2026/10/20/per-user-cloud-oauth-on-one-host/) rather than sharing one host-wide refresh token.

## The operator checklist

- Install and pin a supported JavaScript runtime, ffmpeg, and `yt-dlp[default]`.
- Build process arguments as an array; do not concatenate an untrusted URL into a shell command.
- Constrain the output template, resolve the final path, and verify it remains below the temp root.
- Store cookies as sensitive admin state and materialize the file only where the process expects it.
- Distinguish curated integrations from a generic, explicitly selected fallback.
- Keep long work behind durable job state and outside the client-facing response.

The CLI invocation was the easy part. The useful system is everything around it.
