---
title: WOT has a bookmarklet for Opera and Safari
date: 2010-03-11T12:23:00+00:00
layout: single
author_profile: true
url: 2010/03/11/wot-has-a-bookmarklet-for-opera-and-safari/
tags:
  - Firefox
  - Google Chrome
  - news
  - Offer
lang: en
category: techblog
---
<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5jZIlRnazI/AAAAAAAABPk/9rTLE8bhpA0/s1600-h/opera-and-safari.gif" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5jZIlRnazI/AAAAAAAABPk/9rTLE8bhpA0/s320/opera-and-safari.gif" /></a>
</div>

Opera and Safari [don’t currently allow browser extensions](http://www.opera.com/press/faq/#tech14) in the same way as Firefox, Internet Explorer and Google Chrome does, and therefore, providing WOT for these environments is not feasible. However, as a response to requests from our users, we have created a WOT bookmarklet that brings at least some of the functionality to the users of these two popular browsers.

If you are using Safari or Opera, you can add the WOT bookmarklet to your browser simply by dragging this link to your bookmarks: [WOT Rating](javascript:(function%28%29%7Bvar%20f%3Ddocument.getElementById%28%27wot-bookmarklet%27%29%3Bif%28f%29%7Bf.parentNode.removeChild%28f%29%3Breturn%3B%7Dvar%20l%3Dlocation.hostname%3Bif%28l%26%26l.length%29%7Bf%3Ddocument.createElement%28%27iframe%27%29%3Bif%28f%29%7Bf.setAttribute%28%27id%27%2C%27wot-bookmarklet%27%29%3Bf.setAttribute%28%27src%27%2C%27http%3A//www.mywot.com/bookmarklet/%27+encodeURIComponent%28location.hostname%29%29%3Bf.setAttribute%28%27frameborder%27%2C0%29%3Bf.setAttribute%28%27scrolling%27%2C%27no%27%29%3Bf.setAttribute%28%27style%27%2C%27position%3Afixed%3Btop%3A10px%3Bleft%3A10px%3B%27+%27width%3A135px%3Bheight%3A235px%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bz-index%3A10487575%3B%27%29%3Bif%28document.body%29%7Bdocument.body.appendChild%28f%29%3B%7D%7D%7D%7D)()).

Using the bookmarklet is simple: click the bookmark and it will display a WOT popup on the page, showing ratings for the current site. Another click will hide the popup. This gives you an easy access to WOT reputation data, although you won't be able to give your own ratings.

Opera users, you can also try a user JavaScript written by a WOT-Opera fan (this is a nice update to his original). Visit his blog to get [WOT for Opera](http://my.opera.com/PH%60/blog/2010/01/19/new-major-version-of-wot-for-opera-you-can-vote).