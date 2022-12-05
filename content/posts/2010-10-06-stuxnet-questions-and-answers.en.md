---
title: Stuxnet Questions and Answers
date: 2010-10-06T22:32:00+00:00
layout: single
author_profile: true
url: 2010/10/06/stuxnet-questions-and-answers/
tags:
  - 0-Day
  - malware
  - Question and Answer
  - report
  - review
  - Stuxnet
lang: en
category: techblog
---
**Stuxnet** continues to be a hot topic. Here are answers to some of the questions we've received.

**Q:** What is Stuxnet?  
**A:** It's a Windows worm, spreading via USB sticks. Once inside an organization, it can also spread by copying itself to network shares if they have weak passwords. 

**Q:** Can it spread via other USB devices?  
**A:** Sure, it can spread anything that you can mount as a drive. Like a USB hard drive, mobile phone, picture frame and so on. 

**Q:** What does it do then?  
**A:** It infects the system, hides itself with a rootkit and sees if the infected computer is connected to a Siemens Simatic (Step7) factory system. 

**Q:** What does it do with Simatic?  
**A:** It modifies commands sent from the Windows computer to the PLC. Once running on the PLC, it looks for a specific factory environment. If this is **not** found, it does nothing. 

[<img title="simatic" border="0" alt="simatic" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TKzxW9QBDEI/AAAAAAAACl0/CXuiKvsnc1A/simatic_thumb%5B1%5D.png?imgmax=800" width="304" height="128" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TKzxLi6zuhI/AAAAAAAAClw/5r30llZlu4o/s1600-h/simatic%5B3%5D.png)

**Q:** Which factory is it looking for?  
**A:** We don't know. 

**Q:** Has it found the factory it's looking for?  
**A:** We don't know. 

**Q:** What would it do if it finds it?  
**A:** It makes complex modifications to the system. Results of those modifications can not be detected without seeing the actual environment. So we don't know. 

**Q:** Ok, in theory: what could it do?  
**A:** It could adjust motors, conveyor belts, pumps. It could stop a factory. With right modifications, it could cause things to explode. 

**Q:** Why is Stuxnet considered to be so complex?  
**A:** It uses multiple vulnerabilities and drops its own driver to the system. 

**Q:** How can it install its own driver? Shouldn't drivers be signed for them to work in Windows?  
**A:** Stuxnet driver was signed with a certificate stolen from **Realtek Semiconductor Corp**. 

**Q:** Has the stolen certificate been revoked?  
**A:** Yes. Verisign revoked it on **16th of July**. A modified variant signed with a certificate stolen from **JMicron Technology Corporation** was found on **17th of July**. 

**Q:** What's the relation between Realtek and Jmicron?  
**A:** Nothing. But these companies have their HQs in the same office park in Taiwan. Which is weird. 

**Q:** What vulnerabilities does Stuxnet exploit?  
**A:** Overall, Stuxnet exploits five different vulnerabilities, four of which were 0-days:  
LNK ([MS10-046](http://www.microsoft.com/technet/security/bulletin/ms10-046.mspx))  
Print Spooler ([MS10-061](http://www.microsoft.com/technet/security/bulletin/ms10-061.mspx))  
Server Service ([MS08-067](http://www.microsoft.com/technet/security/bulletin/ms08-067.mspx))  
Privilege escalation via Keyboard layout file  
Privilege escalation via Task Scheduler 

**Q:** And these have been patched by Microsoft?  
**A:** The two Privilege escalations have not yet been patched. 

**Q:** Why was it so slow to analyze Stuxnet in detail?  
**A:** It's unusually complex and unusually big. Stuxnet is over 1.5MB in size. 

**Q:** When did Stuxnet start spreading?  
**A:** In June 2009, or maybe even earlier. One of the components has a compile date in January 2009. 

**Q:** When was it discovered?  
**A:** A year later, in June 2010. 

**Q:** How is that possible?  
**A:** Good question. 

**Q:** Was Stuxnet written by a government?  
**A:** That's what it would look like, yes. 

**Q:** How could governments get something so complex right?  
**A:** Trick question. Nice. Next question. 

**Q:** Was it Israel?  
**A:** We don't know. 

**Q:** Was it Egypt? Saudi Arabia? USA?  
**A:** We don't know. 

**Q:** Was the target Iran?  
**A:** We don't know. 

**Q:** Is it true that there's are biblical references inside Stuxnet?  
**A:** There is a reference to “Myrtus” (which is a myrtle plant). However, this is not “hidden” in the code. It's an artifact left inside the program when it was compiled. Basically this tells us where the author stored the source code in his system. The specific path in Stuxnet is: **\myrtus\src\objfre\_w2k\_x86\i386\guava.pdb**. The authors probably did not want us to know they called their project “Myrtus”, but thanks to this artifact we do. We have seen such artifacts in other malware as well. The Operation Aurora attack against Google was named Aurora after this path was found inside one of the binaries:**\Aurora_Src\AuroraVNC\Avc\Release\AVC.pdb**. 

**Q:** So how exactly is “Myrtus” a biblical reference?  
**A:** Uhh… we don't know, really. 

**Q:** Could it mean something else?  
**A:** Yeah: it could mean “My RTUs”, not “Myrtus”. RTU is an abbreviation for [Remote Terminal Units](http://en.wikipedia.org/wiki/SCADA#Remote_Terminal_Unit_.28RTU.29), used in factory systems. 

**Q:** How does Stuxnet know it has already infected a machine?  
**A:** It sets a Registry key with a value “19790509” as an infection marker. 

**Q:** What's the significance of “19790509”?  
**A:** It's a date. 9th of May, 1979. 

**Q:** What happened on 9th of May, 1979?  
**A:** Maybe it's the birthday of the author? Then again, on that date a Jewish-Iranian businessman called **Habib Elghanian** was executed in Iran. He was accused to be spying for Israel. 

**Q:** Oh.  
**A:** Yeah. 

**Q:** Is there a link between Stuxnet and Conficker?  
**A:** It's possible. Conficker variants were found between November 2008 and April 2009. First variants of Stuxnet were found shortly after that. Both exploit the MS08-067 vulnerability. Both use USB sticks to spread. Both use weak network passwords to spread. And, of course, both are unusually complex. 

**Q:** Is there a link to any other malware?  
**A:** Some Zlob variants were the first to use the LNK vulnerability. 

**Q:** Disabling AutoRun in Windows will stop USB worms, right?  
**A:** Wrong. There are several other spreading mechanisms USB worms use. The LNK vulnerability used by Stuxnet would infect you even if AutoRun and AutoPlay were disabled. 

**Q:** Will Stuxnet spread forever?  
**A:** The current versions have a “kill date” of June 24, 2012. It will stop spreading on this date. 

**Q:** How many computers did it infect?  
**A:** Hundreds of thousands. 

**Q:** But Siemens has announced that only 15 factories have been infected.  
**A:** They are talking about factories. Most of the infected machines are collateral infections, i.e. normal home and office computers that are not connected to SCADA systems. 

**Q:** How could the attackers get a trojan like this into a secure facility?  
**A:** For example, by breaking into a home of an employee, finding his USB sticks and infecting it. Then wait for the employee to take the sticks to work and infect his work computer. The infection will spread further inside the secure facility via USB sticks, eventually hitting the target. As a side effect, it will continue spread elsewhere also. This is why Stuxnet has spread worldwide. 

**Q:** Anything else it could do, in theory?  
**A:** Siemens announced last year that Simatic can now also control alarm systems, access controls and doors. In theory, this could be used to gain access to top secret locations. Think Tom Cruise and Mission Impossible. 

**** 

**[<img title="mission-impossible" border="0" alt="mission-impossible" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TKzx4B_LaVI/AAAAAAAACl8/zCFzoZtHACE/mission-impossible_thumb%5B1%5D.jpg?imgmax=800" width="304" height="205" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TKzxlSKbHaI/AAAAAAAACl4/dASgmrViRyI/s1600-h/mission-impossible%5B3%5D.jpg)**

**Q:** Did Stuxnet sink **Deepwater Horizon** and cause the Mexican oil spill?  
**A:** No, we do not think so. Although it does seem Deepwater Horizon indeed did have some Siemens PLC systems on it. 

**Q:** Does Avira detect Stuxnet?  
**A:** Yes. Avira detects Stuxnet Trojans since July of this year. Also, Avira Virus Lab is adding detections for new variants regularly, thus Avira customers are protected!

_Taken from F-Secure and Avira blog_