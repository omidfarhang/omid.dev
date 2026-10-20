---
title: "WebAuthn and TOTP Without a Framework"
date: 2026-10-18T20:00:00+03:30
description: "Passkeys and authenticator apps in plain PHP: relying-party identity, session ceremonies, trusted-device cookies, recovery codes, and an explicit CLI exception."
layout: single
author_profile: true
url: 2026/10/18/webauthn-and-totp-in-frameworkless-php/
shortlink: https://g.omid.dev/qH2014V
tags:
  - Security
  - PHP
categories:
  - TechBlog
series:
  id: frameworkless-php-host
  title: "Frameworkless PHP on One Host"
  order: 2
  label: "Passkeys and TOTP"
  role: part
seeAlso:
  - /2026/10/14/background-jobs-without-a-queue-php-apache/
  - /2026/07/31/modern-auth-patterns-for-angular-frontends/
---

A private multi-user host still needs MFA. It does not necessarily need Laravel Fortify or an external identity platform. Composer libraries plus careful session state can be enough—if relying-party identity, trusted devices, recovery, and automation exceptions are explicit parts of the design.

This post walks through how [Tools Center](https://tools.omid.dev) implements TOTP, WebAuthn, and “remember this device” in frameworkless PHP. The [source is available as a worked example](https://github.com/omidfarhang/tools.omid.dev). For the frontend-facing side of authentication—OIDC, BFFs, HttpOnly cookies, interceptors, and guards—see [Modern Auth Patterns for Angular Frontends](/2026/07/31/modern-auth-patterns-for-angular-frontends/).

## Start with the threat model

This is a small private host:

- An administrator approves users.
- Production is HTTPS on one canonical `APP_BASE_URL`.
- A stolen or reused password should not create a session without another factor or a previously trusted-device token.
- CLI automation has a separate secret and identity; it is not a hidden bypass on the browser login form.

Enterprise federation, managed-device attestation, and per-action step-up authentication are outside that boundary. Saying so is more useful than making a small application look like an identity platform.

## Password first, then choose the branch

The password path verifies a dummy bcrypt hash when the username is unknown, reducing the timing difference between valid and invalid accounts. After a valid password, the application asks whether the user has either TOTP or a WebAuthn credential:

```php
public static function mfaRequired(array $user): bool
{
    if (UserRepository::totpEnabled($user)) {
        return true;
    }

    return (new WebAuthnCredentialRepository())
        ->hasForUser((int) $user['id']);
}
```

The rest of the branch is small:

1. No configured factor: establish the user session.
2. MFA configured and trusted-device token valid: establish the session.
3. Otherwise: store `pending_2fa_user_id` and show the challenge page.

The pending user id is not an authenticated session. It only tells the TOTP and WebAuthn endpoints which account is completing the second step.

See [`Auth.php`](https://github.com/omidfarhang/tools.omid.dev/blob/master/src/Auth.php).

## TOTP and recovery

TOTP uses `robthree/twofactorauth` for secret generation, QR setup, and verification. Recovery codes are hashed at rest and consumed once. The challenge endpoint also uses the login rate limiter; moving from password to a six-digit code must not create an unlimited guessing endpoint.

The important details are lifecycle rather than algorithm:

- Keep the setup secret only while enrollment is in progress.
- Require a valid code before marking TOTP enabled.
- Regenerate the session id when authentication completes.
- Give the user recovery codes once, then store only hashes.
- Let an administrator reset all factors when account recovery demands it.

## WebAuthn needs a stable identity

`web-auth/webauthn-lib` handles serialization and ceremony validation. The application derives relying-party id and allowed origin from its canonical base URL:

```php
$base = Config::baseUrl();
$parts = parse_url($base);
$this->rpId = is_array($parts) && isset($parts['host'])
    ? (string) $parts['host']
    : 'localhost';
$scheme = is_array($parts) && isset($parts['scheme'])
    ? (string) $parts['scheme']
    : 'https';
$this->origin = self::buildOrigin($scheme, $this->rpId, $port);
```

Registration and assertion options are saved in `$_SESSION` between the options endpoint and completion endpoint. Registration excludes credentials already associated with the user. Assertions validate against stored credential records. The service accepts `None` attestation only, which is a reasonable choice for a personal host but not a claim about managed hardware.

The implementation lives in [`WebAuthnService.php`](https://github.com/omidfarhang/tools.omid.dev/blob/master/src/WebAuthnService.php).

`APP_BASE_URL` is not cosmetic configuration. A passkey created for one RP id and origin will not work after moving the application under an unrelated hostname. Development HTTP also needs an explicit, narrow treatment; weakening production origin validation is not the fix.

## Trusted device is a token, not attestation

After a successful second factor, the user may remember the browser for 30 days. The cookie is a selector and validator. SQLite stores the selector and only a SHA-256 hash of the validator:

```php
/**
 * Cookie format: {selector}.{validator} (hex).
 * Only SHA-256(validator) is stored.
 */
final class TrustedDeviceRepository
{
    public const COOKIE_NAME = 'tools_2fa_device';
    public const TTL_DAYS = 30;
}
```

The selector makes lookup efficient; `hash_equals()` verifies the validator hash. Expired rows are pruned. A mismatched validator fails closed.

This mechanism recognizes a browser token. It does not attest to the physical device, operating system, or owner. Clearing cookies—or an administrator resetting MFA—removes the convenience path.

See [`TrustedDeviceRepository.php`](https://github.com/omidfarhang/tools.omid.dev/blob/master/src/TrustedDeviceRepository.php).

## The CLI is an explicit exception

Automation cannot complete an interactive passkey ceremony. A small API therefore accepts `X-CLI-Token`, compares it with `hash_equals()`, and maps successful authentication to `APP_CLI_USERNAME`:

```php
public static function requireLoginOrCli(): array
{
    $cliUser = self::attemptCliToken();
    if ($cliUser !== null) {
        return $cliUser;
    }

    return self::requireLogin();
}
```

This bypasses MFA by design. It is a second door with a separate long secret, not a special parameter accepted by the login form. The boundary should remain narrow:

- Use it only on endpoints that intentionally support automation.
- Never turn the token into a browser session.
- Rotate it independently of passwords.
- Map it to one active user so authorization and cloud ownership remain understandable.

The next post shows how that mapped user’s own OAuth connection supplies cloud access without a shared refresh token.

## Reset behavior is part of security

An administrator can clear TOTP, passkeys, and trusted-device rows for an account. Resetting only one factor can leave an attacker’s alternative factor active. Clearing all three makes the blast radius obvious: the user signs in with their password and enrolls again.

That is inconvenient by design. Recovery is a privileged operation, not a way to preserve every old device.

## A compact checklist

- Derive RP id and allowed origin from one canonical HTTPS base URL.
- Keep pre-MFA identity separate from the authenticated session.
- Rate-limit password and second-factor verification.
- Store recovery codes and trusted-device validators as hashes.
- Name and constrain the CLI bypass instead of hiding it.
- Make administrative reset clear every second-factor path.

The series began with [background jobs without a queue](/2026/10/14/background-jobs-without-a-queue-php-apache/). Next, [per-user cloud OAuth](/2026/10/20/per-user-cloud-oauth-on-one-host/) uses the same account boundary for Dropbox and Google Drive.
