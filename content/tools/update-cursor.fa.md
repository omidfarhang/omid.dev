---
title: update-cursor
date: 2026-10-09T19:30:00+03:30
description: نصب یا به‌روزرسانی Cursor IDE از API رسمی AppImage پایدار روی لینوکس — رد شدن از دانلود اگر جاری باشد، نصب اجباری، یا حذف تمیز.
layout: tool
hidemeta: true
ShowToc: true
url: /fa/tools/update-cursor/
tool:
  id: update-cursor
  version: "1.0.0"
  scriptPath: /scripts/update-cursor.sh
  installName: update-cursor
  sourceUrl: https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-cursor.sh
  platform: Linux
  tags:
    - Cursor IDE
    - AppImage
---

Cursor برای لینوکس به‌صورت AppImage منتشر می‌شود. این اسکریپت آن را از API دانلود پایدار رسمی نصب یا به‌روز می‌کند، فایل‌ها را زیر `~/.local` نگه می‌دارد و entry دسکتاپ به‌همراه لانچر `cursor` روی `PATH` می‌سازد.

نسخهٔ نصب‌شده در `~/.local/opt/cursor/version.txt` را با آخرین stable مقایسه می‌کند و اگر جاری (یا جدیدتر) باشید دانلود را رد می‌کند. برای نصب مجدد اجباری از `--force` استفاده کنید.

## نصب

```bash
mkdir -p ~/.local/bin
curl -fsSL https://omid.dev/scripts/update-cursor.sh -o ~/.local/bin/update-cursor
chmod +x ~/.local/bin/update-cursor
```

به `curl` نیاز دارید. روی Manjaro/Arch برای AppImage معمولاً `fuse2` هم لازم است (`sudo pacman -S curl fuse2`). `~/.local/bin` را در `PATH` قرار دهید.

سورس: [`static/scripts/update-cursor.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-cursor.sh).

## شروع سریع

```bash
update-cursor              # نصب یا به‌روزرسانی به آخرین stable
update-cursor --force      # نصب مجدد حتی اگر به‌روز باشد
update-cursor --uninstall  # حذف Cursor، entry دسکتاپ و خود اسکریپت
update-cursor --self-update
update-cursor --help
```

پس از نصب:

```bash
cursor
```

اگر Cursor باز است، اول ببندید، `update-cursor` را بزنید، بعد دوباره باز کنید.

## چه کار می‌کند

1. به API پایدار Cursor برای Linux x64 درخواست می‌زند (`downloadUrl` و `version`).
2. با `version.txt` مقایسه می‌کند (مگر `--force`).
3. AppImage را دانلود می‌کند، آیکون را استخراج می‌کند و زیر `~/.local/opt/cursor/` نصب می‌کند.
4. `~/.local/bin/cursor` را به AppImage لینک می‌کند.
5. `cursor.desktop` را می‌نویسد و در صورت وجود، دیتابیس دسکتاپ را تازه می‌کند.

## مسیرها روی دیسک

| مسیر | نقش |
| --- | --- |
| `~/.local/opt/cursor/cursor.AppImage` | باینری AppImage |
| `~/.local/opt/cursor/cursor.png` | آیکون |
| `~/.local/opt/cursor/version.txt` | نسخهٔ نصب‌شده |
| `~/.local/bin/cursor` | لانچر |
| `~/.local/bin/update-cursor` | این اسکریپت |
| `~/.local/share/applications/cursor.desktop` | entry دسکتاپ |

## دستورها و گزینه‌ها

| گزینه | توضیح |
| --- | --- |
| *(پیش‌فرض)* | نصب یا به‌روزرسانی به آخرین AppImage پایدار |
| `--force`, `-f` | نصب مجدد حتی بدون نیاز به آپدیت |
| `--uninstall`, `-u` | حذف Cursor، entry، لانچر و خود اسکریپت |
| `--self-update` | به‌روزرسانی خود اسکریپت از omid.dev |
| `-h`, `--help` | راهنما |

## متغیرهای محیطی

| متغیر | توضیح |
| --- | --- |
| `UPDATE_CURSOR_SCRIPT_URL` | URL جایگزین برای `--self-update` |
| `UPDATE_CURSOR_SKIP_SELF_CHECK` | با `1` بررسی نسخهٔ جدیدتر اسکریپت را رد کنید |

## خودبه‌روزرسانی

```bash
update-cursor --self-update
```

## حذف

```bash
update-cursor --uninstall
```

## مرتبط

- راهنمای Manjaro: [نصب Cursor IDE روی Manjaro](/2026/05/29/how-to-install-cursor-ide-in-manjaro/)
- سورس: [`static/scripts/update-cursor.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-cursor.sh)
