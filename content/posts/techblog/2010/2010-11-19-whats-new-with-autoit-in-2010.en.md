---
title: "What's New with AutoIt in 2010"
date: 2010-11-19T18:20:00+00:00
description: A practical look at AutoIt updates in 2010, including better file handling, Unicode sending, control automation, and 64-bit fixes.
layout: single
author_profile: true
url: 2010/11/19/whats-new-with-autoit-in-2010/
tags:
  - AutoIt
  - Windows
  - Automation
  - Scripting
  - Productivity

categories:
  - TechBlog
---
AutoIt has had a steady year. It is still the same small, practical Windows automation language, but the recent `v3.3.6.x` updates make it a little nicer for real work: better file handling, better Unicode support, more control over Windows controls, and useful fixes for 64-bit systems.

If you already use AutoIt for installers, log collection, desktop shortcuts, or help desk tools, this is not a dramatic rewrite. It is more like a maintenance release that removes a few daily annoyances.

## FileOpen Is Easier to Use

One small but welcome change is that `FileOpen()` no longer requires the mode parameter. If you only want to read a file, AutoIt can use read mode by default.

Old style:

```autoit
$handle = FileOpen("C:\Temp\report.txt", 0)

If $handle = -1 Then
    MsgBox(16, "Error", "Could not open report.txt")
    Exit
EndIf

$text = FileRead($handle)
FileClose($handle)
```

Newer style:

```autoit
$handle = FileOpen("C:\Temp\report.txt")

If $handle = -1 Then
    MsgBox(16, "Error", "Could not open report.txt")
    Exit
EndIf

$text = FileRead($handle)
FileClose($handle)
```

It is a small thing, but it makes read-only scripts cleaner. Most quick administration scripts spend a lot of time reading logs, configuration files, and exported reports, so small improvements here are easy to appreciate.

## FileGetEncoding Helps with Text Files

Another useful addition is `FileGetEncoding()`. Text encoding has become a more common problem, especially when scripts move between machines, localized Windows installations, and tools that save files as ANSI, UTF-8, or Unicode.

Here is a simple diagnostic script:

```autoit
$file = "C:\Temp\import.txt"
$encoding = FileGetEncoding($file)

Switch $encoding
    Case 0
        MsgBox(64, "Encoding", "ANSI")
    Case 32
        MsgBox(64, "Encoding", "UTF-16 little endian")
    Case 64
        MsgBox(64, "Encoding", "UTF-16 big endian")
    Case 128
        MsgBox(64, "Encoding", "UTF-8")
    Case 256
        MsgBox(64, "Encoding", "UTF-8 without BOM")
    Case Else
        MsgBox(48, "Encoding", "Unknown or mixed encoding: " & $encoding)
EndSwitch
```

This is useful before importing data into another application. If your script expects UTF-8 but receives an ANSI file, you can stop early and show a meaningful message instead of producing strange characters later.

## Better Unicode with Send and ControlSend

`Send()` and `ControlSend()` have also been reworked to handle more Unicode characters. That matters if you automate applications with non-English input, file names, customer names, or pasted content from different languages.

For simple typing, the script still looks familiar:

```autoit
Run("notepad.exe")
WinWaitActive("Untitled - Notepad")

Send("English text{ENTER}")
Send("Unicode test: Привет, مرحبا, こんにちは{ENTER}")
```

For more reliable automation, target the control instead of depending on the active window:

```autoit
Run("notepad.exe")
WinWait("Untitled - Notepad")

ControlSend("Untitled - Notepad", "", "Edit1", "Unicode test: Привет, مرحبا, こんにちは")
```

GUI automation is still GUI automation, so you should test on the same Windows version and application version you plan to support. But better Unicode handling is a real improvement for scripts used outside purely English environments.

## ControlCommand Can Send Command IDs

One of the more interesting additions is the `"SendCommandID"` option for `ControlCommand()`. This lets a script send `WM_COMMAND` control ID messages. In practice, that can help automate toolbar controls, including `ToolBarWindow32` controls that are awkward to drive with normal button text.

The exact command ID depends on the application. Use the AutoIt Window Info tool to inspect the toolbar and find the correct command ID.

Example shape:

```autoit
; Example only: replace the title, control, and command ID
; with values from the AutoIt Window Info tool.

$title = "Some Application"
$toolbar = "[CLASS:ToolbarWindow32; INSTANCE:1]"
$commandId = 40023

WinWait($title)
ControlCommand($title, "", $toolbar, "SendCommandID", $commandId)
```

This is the kind of feature that matters most to people writing deployment or support scripts. If you have ever tried to automate a toolbar button that has no friendly text, you know why this is useful.

## 64-bit Windows Fixes Matter More Now

More people are running 64-bit Windows, especially on newer desktops and laptops. AutoIt has been improving in that area, and this year's fixes include work around registry access and 64-bit keys.

For example, scripts that need to read from the 64-bit registry view should be explicit:

```autoit
$key = "HKLM64\SOFTWARE\ExampleVendor\ExampleApp"
$installPath = RegRead($key, "InstallPath")

If @error Then
    MsgBox(48, "Not found", "Could not read the 64-bit registry key.")
Else
    MsgBox(64, "Install path", $installPath)
EndIf
```

If your script is used on both 32-bit and 64-bit machines, test both. Registry redirection is one of those problems that can make a script appear correct on one computer and completely wrong on another.

## FileWriteLine Is Faster

`FileWriteLine()` has received performance improvements. You may not notice this in a script that writes ten lines, but it helps when producing larger logs or reports.

For large output, still keep the file open instead of opening and closing it repeatedly:

```autoit
$handle = FileOpen("C:\Temp\inventory.csv", 2)

If $handle = -1 Then
    MsgBox(16, "Error", "Could not create inventory.csv")
    Exit
EndIf

FileWriteLine($handle, "Computer,User,Date")

For $i = 1 To 1000
    FileWriteLine($handle, @ComputerName & "," & @UserName & "," & @YEAR & "-" & @MON & "-" & @MDAY)
Next

FileClose($handle)
```

This is a common pattern for inventory scripts, software audit scripts, and quick reporting tools.

## A Practical Example: Safer Log Collection

Here is a small script that combines a few of the improvements: cleaner file opening, encoding checks, and a dated backup folder.

```autoit
$sourceLog = "C:\Program Files\ExampleApp\Logs\application.log"
$backupRoot = "C:\Support\CollectedLogs"
$backupDir = $backupRoot & "\" & @YEAR & "-" & @MON & "-" & @MDAY

If Not FileExists($sourceLog) Then
    MsgBox(16, "Missing log", "Could not find:" & @CRLF & $sourceLog)
    Exit
EndIf

If Not FileExists($backupDir) Then
    DirCreate($backupDir)
EndIf

$encoding = FileGetEncoding($sourceLog)
$handle = FileOpen($sourceLog)

If $handle = -1 Then
    MsgBox(16, "Error", "Could not open the log file.")
    Exit
EndIf

$content = FileRead($handle)
FileClose($handle)

$target = $backupDir & "\application-" & @HOUR & @MIN & @SEC & ".log"
FileWrite($target, $content)

MsgBox(64, "Log collected", "Copied log to:" & @CRLF & $target & @CRLF & @CRLF & "Encoding value: " & $encoding)
```

This is not complicated, but it is the kind of script AutoIt is very good at: collect something, check it, copy it, and tell the user what happened.

## SciTE4AutoIt Is Still Important

The script editor is also worth mentioning. SciTE4AutoIt remains the best way to write AutoIt scripts comfortably. Syntax highlighting, run and compile shortcuts, help integration, and tools like AutoIt Window Info make the difference between a quick hack and a maintainable support script.

If you are still writing `.au3` files only in Notepad, try the editor package. You will save time almost immediately.

## Should You Upgrade?

For most users, yes. The `v3.3.6.x` line is not about flashy new syntax; it is about smoother daily scripting. Better file encoding support, better Unicode sending, improved file writing, toolbar command automation, and 64-bit fixes are all practical improvements.

As always, test your important scripts before replacing AutoIt on production machines. GUI automation can depend on timing, window titles, control IDs, and application versions. But if you use AutoIt regularly, this year's updates are worth having.
