---
title: Chat with malcode
date: 2010-03-04T23:17:00+00:00
layout: single
author_profile: true
url: 2010/03/04/chat-with-malcode/
tags:
  - Malware
  - review
  - rogue software
  - scam
  - YouTube
  - Security

categories:
  - TechBlog
---
It’s time for your daily dose of “spot the fake program / avoid the fake program”.

What is it this time? Well, if you have family members who are into webcams and chatting you might want to point them to this writeup because a new challenger has entered the ring:

[![](/images/2010/03/fkcam1.jpg)](/images/2010/03/fkcam1-e6fd211f.jpg)

Yes, “Chat Cam” is a rather smart looking (and entirely fake) program designed to make end users think they’re taking part in a large community of webcam owners. Clearly, the creator had the recently launched Chatroulette in mind when they made this one (if you’re not familiar with it, Chatroulette is a site where you jump from webcam chat to webcam chat over and over again, all within one large community of strangers. In practice, you tend to mash the “Next” button endlessly as one “chat” after another fails to materialise). This is what Chatroulette looks like – you’ll notice the similarity as we move further into the writeup:

[![](/images/2010/03/fkcam0.jpg)](/images/2010/03/fkcam0-663bda0d.jpg)

Meanwhile, this is what  our “Chat Cam” looks like when you fire it up – notice how slick it is, along with the well crafted options it gives the user to play with:

[![](/images/2010/03/fkcam2.jpg)](/images/2010/03/fkcam2-53a15262.jpg)

[![](/images/2010/03/fkcam3.jpg)](/images/2010/03/fkcam3-08a7f690.jpg)

Did you notice the “online users” count at the bottom of those two screenshots?  Here it is again. Notice anything?

[![](/images/2010/03/fkcam5.jpg)](/images/2010/03/fkcam5-6da25432.jpg)

That’s right – it changes randomly, which is a particularly convincing touch. Note that Chatroulette also displays the number of users online in the top right hand corner. Hit the “Start a chat” button, and the application dumps you into a pretend conversation with any one of a large selection of usernames stored in the program database. It has a very similar feel to the Chatroulette chatbox:

[![](/images/2010/03/fkcam6.jpg)](/images/2010/03/fkcam6-7cfc3baa.jpg)

Unsurprisingly, the webcam never loads – and the chat never gets beyond the first line or two of text. The fake bot “disconnects”, and the user is left to go right back and hit the “Start chat” button all over again. What’s particularly interesting here is that it apes the actual Chatroulette experience brilliantly – for me, anyway. When I tried it out a couple of days ago, every single chat I jumped into was a carbon copy of the above screenshot.

Of course, everything above is purely academic by this point – end users are doomed the moment they fire up the executable, as it’ll have been wrapped up tightly with a random infection file. There seems to be a bit of a trend for fake webcam apps mashed up with infection files at the moment – in particular, programs that do something similar to the above but loop fake “webcam footage” (usually ripped from Youtube videos) are very popular on underground forums.

Whatever you do, be wary of programs trying to cash in on the popularity of webcam chats with strangers – as you can see, fake a/s/l information is the least of your worries…