---
title: Antivirus
date: 2009-01-13T23:50:43+03:30
description: A 2009-era primer on antivirus — signature scanning, heuristics, sandboxes, removal tools, and pitfalls including fake “AV” scareware.
layout: single
author_profile: true
url: 2009/01/13/antivirus/
shortlink: https://g.omid.dev/kHuyOXz
tags:
  - Safety Tips
  - Guide
  - Security
  - Malware

categories:
  - TechBlog

seeAlso:
  - /2009/01/13/site-advisor/
  - /2009/01/13/hosts-file/
  - /2009/01/13/phishing/
  - /2009/01/12/winiguard/
  - /2009/10/05/securitytool/
---
**Antivirus** software (sometimes spelled *anti-virus*) tries to identify, neutralize, or eliminate malicious software. Early tools targeted computer viruses; by the late 2000s products already aimed at worms, phishing-related payloads, rootkits, Trojans, and other malware.

This page is a primer from that era — useful background when reading the scareware dossiers on this blog ([WiniGuard](/2009/01/12/winiguard/), [SecurityTool](/2009/10/05/securitytool/), and related clones). Pair AV with careful browsing ([site advisor](/2009/01/13/site-advisor/), [hosts file](/2009/01/13/hosts-file/)) rather than treating any one product as enough.

## Virus scanners

Antivirus scanning software, or a virus scanner, is a program which examines all files in specified locations, the contents of memory, the operating system, the registry, unexpected program behavior, and anywhere else relevant with the intention of identifying and removing any malware.

Typically two different approaches are used to identify malware, often in combination, although with an emphasis on the virus dictionary approach.

- examining (scanning) files, etc., for known viruses matching signatures in a virus dictionary, and
- identifying suspicious behavior from any computer program which might indicate infection. This approach is called heuristic analysis, and may include data captures, port monitoring and other methods.

Network firewalls prevent unknown programs and Internet processes from having access to the system protected; they are not antivirus systems as such, and make no attempt to identify or remove anything, but protect against infection, and limit the activity of any malicious software which is present by blocking incoming or outgoing requests on certain TCP/IP ports.

## Dictionary

In the virus dictionary approach, when the antivirus software looks at a file, it refers to a dictionary of known viruses that the authors of the antivirus software have identified. If a piece of code in the file matches any virus identified in the dictionary, then the antivirus software can take one of the following actions:

- attempt to repair the file by removing the virus itself from the file,
- quarantine the file (such that the file remains inaccessible to other programs and its virus can no longer spread), or
- delete the infected file.

To achieve consistent success in the medium and long term, the virus dictionary approach requires frequent (generally online) downloads of updated virus dictionary entries. Civically-minded and technically-inclined users, and those who want help find viruses not detected by the software, can send their infected files to the authors of antivirus software, who analyze them and include identifying features and removal information in their dictionaries.

Dictionary-based antivirus software typically examines files when the computer's operating system creates, opens, closes, or e-mails them. In this way it can detect a known virus immediately upon receipt. System administrators can schedule antivirus software to examine (scan) all files on the computer's hard disk on a regular basis.

Although the dictionary approach can effectively contain virus outbreaks in the right circumstances, virus authors have tried to stay a step ahead of such software by writing "oligomorphic", "polymorphic" and more recently "metamorphic" viruses, which encrypt parts of themselves or otherwise modify themselves as a method of disguise, so as to not match virus signatures in the dictionary.

An emerging technique to deal with malware in general is whitelisting. Rather than looking for only known bad software, this technique prevents execution of all computer code except that which has been previously identified as trustworthy by the system administrator. By following this "default deny" approach, the limitations inherent in keeping virus signatures up to date are avoided. Additionally, computer applications that are unwanted by the system administrator are prevented from executing since they are not on the whitelist. Since modern enterprise organizations have large quantities of trusted applications, the limitations of adopting this technique rest with the system administrators' ability to properly inventory and maintain the whitelist of trusted applications. Viable implementations of this technique include tools for automating the inventory and whitelist maintenance processes.

## Suspicious behavior - heuristics

The suspicious behavior approach, by contrast, does not attempt to identify known viruses, but instead monitors the behavior of all programs. If one program tries to write data to an executable program, for example, the antivirus software can flag this suspicious behavior, alert a user, and ask what to do.

Unlike the dictionary approach, the suspicious behavior approach therefore provides protection against brand-new viruses that do not yet exist in any virus dictionaries. However, it can also sound a large number of false positives, and users probably become desensitized to all the warnings. If the user clicks "Accept" on every such warning, then the antivirus software obviously gives no benefit to that user. This problem has worsened since 1997, since many more non-malicious program designs came to modify other .exe files without regard to this false positive issue. Therefore, most modern antivirus software uses this technique less and less.

## File Emulation - heuristics

Some antivirus software use other types of heuristic analysis. For example, it could try to emulate the beginning of the code of each new executable that the system invokes before transferring control to that executable. If the program seems to use self-modifying code or otherwise appears as a virus (if it immediately tries to find other executables, for example), one could assume that a virus has infected the executable. However, this method could result in a lot of false positives.

## Sandbox

Yet another detection method involves using a sandbox. A sandbox emulates the operating system and runs the executable in this simulation. After the program has terminated, software analyzes the sandbox for any changes which might indicate a virus. Because of performance issues, this type of detection normally only takes place during on-demand scans. Also this method may fail as a virus can be nondeterministic and do different things, including doing nothing at all, each time it is executed — so it will be impossible to detect it from one run.

Some virus scanners can warn a user if a file is likely to contain a virus based on the file type.

## Virus removal tools

A virus removal tool is software for removing specific viruses from infected computers. Unlike general-purpose virus scanners, it is not intended to detect and remove, ideally, all known viruses; rather it is designed to remove specific viruses more effectively and completely than a general-purpose program. Many single-virus tools will be found searching the Worldwide-Web for "virus removal tool"; others, such as McAfee Stinger and the Microsoft Malicious Software Removal Tool run automatically by Windows update, are designed to remove a limited numbers of viruses. Many of these tools are available for free download.

If a virus is identified by a general-purpose scanner it may not be entirely removed; once the virus has been identified, running a tool designed specifically for it can do a better job of cleaning.

## Issues of concern

- The regular appearance of new malware is certainly in the financial interest of vendors of commercial antivirus software, though there is no evidence of collusion.
- Some antivirus software can considerably reduce performance. Users may disable the antivirus protection to overcome the performance loss, thus increasing the risk of infection. For maximum protection, the antivirus software needs to be enabled all the time — often at the cost of slower performance (see also software bloat).
- It is important to note that one should not have more than one memory-resident antivirus software solution installed on a single computer at any given time. Otherwise, the computer may be crippled.
- It is sometimes necessary to temporarily disable virus protection when installing major updates such as Windows Service Packs or updating graphics card drivers. Active antivirus protection may partially or completely prevent the installation of a major update.
- When purchasing antivirus software, the agreement may include a clause that the subscription will be automatically renewed, and the purchaser's credit card automatically billed, at the renewal time without explicit approval. For example, McAfee requires one to unsubscribe at least 60 days before the expiration of the present subscription. Norton Antivirus also renews subscriptions automatically by default.
- Some antivirus programs are actually spyware masquerading as antivirus software. It is best to double-check that the antivirus software which is being downloaded is actually a real antivirus program. See dossiers such as [SecurityTool](/2009/10/05/securitytool/) and [WiniGuard](/2009/01/12/winiguard/).
- Some commercial antivirus software programs contain adware.
- Most widely-accepted antivirus programs often do not detect newly-created viruses.
- Anti-virus manufacturers have been criticised for fear mongering by exaggerating the risk that virus pose to consumers.
- If an antivirus program is configured to immediately delete or quarantine infected files (or does this by default), false positives in essential files can render the operating system or some applications unusable.

## Mobile devices

Viruses from the desktop and laptop world have either migrated to, or are assisted in their dispersal by mobile devices. Antivirus vendors are beginning to offer solutions for mobile handsets. These devices present significant challenges for antivirus software, such as:

- processor constraints,
- memory constraints, and
- definitions and new signature updates to these mobile handsets.

Mobile handsets are now offered with a variety of interfaces and data connection capabilities. Consumers should carefully evaluate security products before deploying them on devices with a small form factor.

Solutions that are hardware-based, perhaps USB devices or SIM-based antivirus solutions, might work better in meeting the needs of mobile handset consumers. Technical evaluation and review on how deploying an antivirus solution on cellular mobile handsets should be considered as scanning process might impact other legitimate applications on the handheld.

SIM-based solutions with antivirus integrated on the small memory footprint might provide a basic solution to combat malware/viruses in protecting PIM and mobile user data. Solutions based on USB and Flash memory allow the user to swap and use these products with a range of hardware devices.

## History

There are competing claims for the innovator of the first antivirus product. Perhaps the first publicly-known neutralization of a wild PC virus was performed by Bernt Fix (also Bernd) in early 1987. Fix neutralized an infection of the Vienna virus. The first edition of Polish antivirus software mks_vir was released in 1987; the program was only available with a Polish interface. Autumn 1988 saw antivirus software Dr. Solomon's Anti-Virus Toolkit released by Briton Alan Solomon. By December 1990, the market had matured to the point of nineteen separate antivirus products being on sale including Norton AntiVirus and VirusScan from McAfee.

Peter Tippett made a number of contributions to the budding field of virus detection. He was an emergency-room doctor who also ran a computer software company. He had read an article about the Lehigh virus and questioned whether they would have similar characteristics to biological viruses that attack organisms. From an epidemiological viewpoint, he was able to determine how these viruses were affecting systems within the computer (the boot-sector was affected by the Brain virus, the .com files were affected by the Lehigh virus, and both .com and .exe files were affected by the Jerusalem virus). Tippett’s company Certus International Corp. then began to create anti-virus software programs. The company was sold in 1992 to Symantec Corp, and Tippett went to work for them, incorporating the software he had developed into Symantec’s product, Norton AntiVirus.

Before Internet connectivity was widespread, viruses were typically spread by infected floppy disks; antivirus software started to be used, but was updated relatively infrequently. At that time it was said, correctly, that viruses could not be spread by the readable content of emails, although executable attachments were as risky as programs on floppy disks. Virus checkers essentially had to check executable files, and the boot sectors of floppy and hard disks. As Internet usage became common, initially by making a modem connection when desired, viruses spread through the Internet, facilitated by powerful macros in word processors such as Microsoft Word; hitherto "documents" could not spread infection, although programs could. Later email programs, in particular Microsoft Outlook Express and Outlook, became able to execute program code from within a message's text by simply reading the message, or even previewing its content. Virus checkers now had to check many more types of file. As broadband always-on connections became the norm and more and more viruses were released, it became essential to update virus checkers more and more frequently; even then, a new virus could spread widely before it was detected, identified, a checker update released, and virus checkers round the world updated.

A very uncommon use of the term "antivirus" is to apply it to benign viruses that spread and combated malicious viruses. This was common on the Amiga computer platform.

## Effectiveness

Studies in December 2007 have shown that the effectiveness of Antivirus software is much reduced from what it was a few years ago, particularly against unknown or zero day threats. The German computer magazine c't found that detection rates for these threats had dropped to a frightening 20% to 30%, as compared to 40% to 50% only one year earlier. At that time only one product managed a detection rate above 50%.

The problem is magnified by the changing intent of virus authors. Some years ago it was obvious when a virus infection was present. The viruses of the day, written by amateurs, exhibited destructive behavior or popped-up screen messages. Modern viruses are often written by professionals, financed by criminal organizations. It is not in their interests to make their viruses or crimeware evident, because their purpose is to create botnets or steal information for as long as possible without the user realizing this; consequently, they are often well-hidden. If an infected user has a less-than-effective antivirus product that says the computer is clean, then the virus may go undetected.

Traditional antivirus software solutions run virus scanners on schedule, on demand and some run scans in real time. If a virus or malware is located the suspect file is usually placed into a quarantine to terminate its chances of disrupting the system. Traditional antivirus solutions scan and compare against a publicised and regularly updated dictionary of malware otherwise known as a blacklist. Some antivirus solutions have additional options that employ an heuristic engine which further examines the file to see if it is behaving in a similar manor to previous examples of malware. A new technology utilised by a few antivirus solutions is whitelisting, this technology first checks if the file is trusted and only questioning those that are not. With the addition of wisdom of crowds, antivirus solutions backup other antivirus techniques by harnessing the intelligence and advice of a community of trusted users to protect each other. By providing these multiple layers of malware protection and combining them with other security software it is possible to have more effective protection from the latest zero day attack and the latest crimeware than previously was the case with just one layer of protection.
