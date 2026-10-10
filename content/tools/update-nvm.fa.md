---
title: update-nvm
date: 2026-10-09T19:30:00+03:30
description: به‌روزرسانی هر major نصب‌شدهٔ Node با nvm، تازه‌سازی بسته‌های سراسری npm، ارتقای npm و فعال‌سازی corepack.
layout: tool
hidemeta: true
ShowToc: true
url: /fa/tools/update-nvm/
tool:
  id: update-nvm
  version: "1.3.0"
  scriptPath: /scripts/update-nvm.sh
  installName: update-nvm
  sourceUrl: https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh
  platform: Linux
  tags:
    - nvm
    - Node.js
---

شاید هر روز `pacman -Syu` بزنید، ولی آخرین‌بار کی هر major مربوط به Node را در nvm تازه کردید؟

`update-nvm` majorهایی را که از قبل نصب دارید (یا صریحاً پاس می‌دهید) پیمایش می‌کند، آخرین patch هر خط را نصب می‌کند، بسته‌های سراسری npm را تازه می‌کند، با `--latest-npm` (پیش‌فرض روشن) npm را ارتقا می‌دهد و `corepack enable` را اجرا می‌کند. اگر major از قبل روی آخرین patch باشد، Node دست نخورده می‌ماند ولی globals مگر با `--skip-npm` باز هم تازه می‌شوند.

## نصب

```bash
mkdir -p ~/.local/bin
curl -fsSL https://omid.dev/scripts/update-nvm.sh -o ~/.local/bin/update-nvm
chmod +x ~/.local/bin/update-nvm
```

به [nvm](https://github.com/nvm-sh/nvm) و `curl` نیاز دارید. اگر `~/.local/bin` در `PATH` نیست، اضافه کنید.

برای بررسی سورس: [`static/scripts/update-nvm.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh).

## شروع سریع

```bash
update-nvm              # همهٔ majorهای نصب‌شده
update-nvm --lts        # فقط lts/*
update-nvm 24           # یک major
update-nvm 28           # نصب major جدید (برای کپی globals سؤال می‌پرسد)
update-nvm --npm-only   # فقط npm و globals؛ بدون دست زدن به Node
update-nvm --prune      # حذف patchهای قدیمی‌تر در همان major
update-nvm --self-update  # فقط خود اسکریپت را عوض می‌کند
update-nvm --version
update-nvm -q --lts
update-nvm --dry-run
```

## چه کار می‌کند

1. majorهای هدف را مشخص می‌کند (نصب‌شده‌ها، `--lts`، یا نسخه‌های صریح).
2. برای هر major، آخرین release را با nvm نصب می‌کند مگر از قبل جاری باشد (یا `--force` / `--npm-only`).
3. مگر با `--skip-npm`، بسته‌های سراسری npm را تازه می‌کند.
4. مگر با `--no-latest-npm`، npm را به جدیدترین نسخهٔ پشتیبانی‌شده ارتقا می‌دهد.
5. مگر با `--no-corepack`، `corepack enable` را اجرا می‌کند.
6. با `--prune`، patchهای قدیمی‌تر همان major را حذف می‌کند.

اگر major هنوز نصب نباشد، می‌پرسد آیا globals را از major دیگری کپی کند. Enter = نصب تازه؛ یا شمارهٔ منبع را بزنید. برای نصب غیرتعاملی، `NVM_REINSTALL_FROM` را ببینید.

## دستورها و گزینه‌ها

| گزینه | توضیح |
| --- | --- |
| *(بدون آرگومان)* | همهٔ majorهای نصب‌شده |
| `VERSION …` | به‌روزرسانی یا نصب majorهای داده‌شده |
| `--lts` | فقط `lts/*` |
| `--force`, `-f` | نصب مجدد حتی اگر patch جاری باشد |
| `--prune` | حذف patchهای قدیمی‌تر در هر major |
| `--latest-npm` | ارتقای npm (پیش‌فرض: روشن) |
| `--no-latest-npm` | نگه داشتن npm همراه Node |
| `--no-corepack` | رد شدن از `corepack enable` |
| `--skip-npm` | فقط Node؛ بدون globals |
| `--npm-only` | فقط npm و globals |
| `--quiet`, `-q` | خروجی کم؛ بدون پرسش نصب |
| `--dry-run`, `-n` | فقط نمایش؛ بدون تغییر |
| `--plain`, `-p` | خروجی فقط-اسکرول (بدون alternate screen / بازنویسی فریم) |
| `--self-update` | به‌روزرسانی خود اسکریپت از omid.dev |
| `--version` | چاپ نسخهٔ اسکریپت |
| `-h`, `--help` | راهنما |

## متغیرهای محیطی

| متغیر | توضیح |
| --- | --- |
| `NVM_DIR` | مسیر nvm (پیش‌فرض: `~/.nvm`) |
| `NVM_UPDATE_VERSIONS` | نسخه‌های جداشده با فاصله (با `--lts` نادیده گرفته می‌شود) |
| `NVM_REINSTALL_FROM` | برای نصب غیرتعاملی major جدید، کپی globals از این major |
| `UPDATE_NVM_SCRIPT_URL` | URL جایگزین برای `--self-update` |
| `UPDATE_NVM_SKIP_SELF_CHECK` | با `1` بررسی نسخهٔ جدیدتر اسکریپت را رد کنید |

## نمونهٔ cron

```cron
0 3 * * 0 ~/.local/bin/update-nvm -q --lts --prune
```

## خودبه‌روزرسانی

```bash
update-nvm --self-update
```

در اجرای تعاملی، اگر نسخهٔ جدیدتر روی omid.dev باشد، با پرسش `[Y/n]` (پیش‌فرض Yes) پیشنهاد خودبه‌روزرسانی می‌دهد. حالت quiet/cron و غیر-TTY پرسش را رد می‌کنند (غیر-TTY فقط یک خط راهنما چاپ می‌کند). با `UPDATE_NVM_SKIP_SELF_CHECK=1` کل بررسی را خاموش کنید.

## مرتبط

- یادداشت کوتاه: [/notes/178818221780902383/](/notes/178818221780902383/)
- سورس: [`static/scripts/update-nvm.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh)
