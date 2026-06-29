---
date: 2026-06-29T13:37:14+03:30
url: notes/178272765881515454/
---
If you install **Mattermost** on Manjaro via pacman/AUR — not Snap; the Snap build does not hit this — do **not** enable “Start app on login” in Mattermost’s own settings.

Turn that off. Keep “Launch minimized” and “Show icon in tray”. Then add Mattermost to autostart manually from Manjaro/KDE system settings (Session and Startup → Autostart).

Why: a years-old bug, still open. Mattermost’s built-in autostart writes `~/.config/autostart/electron.desktop` and launches plain Electron on login — not Mattermost. You get a Electron window instead of the client.

See [mattermost/desktop#3158](https://github.com/mattermost/desktop/issues/3158).
