---
title: A simple voting system
date: 2013-07-10
---

Sometimes I propose an idea and I'd just like to know whether people generally like or dislike it. This site is a perfect example. I added [Disqus](http://disqus.com/) comments over there on the right (or down below if you're reading this on a phone); but I don't really expect people to use them that much. *Comments* are pretty heavyweight: they require you to think about what you want to say, type it all out, proofread it (if you're the proofreading type), etc. At worst, they may even require you to *sign in* to something. That's a pretty big barrier between you and me, when all I really want to know is *Do you think this is a good idea?*

For a while now I've wanted to see something a lot simpler: just an up/down voting system. Yes or no. And I wanted to see this as a *service*, so that I don't have to implement it and incorporate it into every site I ever develop. (Also: so I can include up/down functionality on a *static* site, like this one!)

And one more thing: I didn't want to use Facebook, or LinkedIn, or any of those buttons, because:

1. They're linked to individuals' accounts
2. They couple the ideas of *liking* with *sharing*, and I don't necessarily want to put "Share this with your Facebook friends!" here
3. Some people have a negative reaction to those brands

So I made one, called [Up/Down](http://up-down.herokuapp.com). It's **really** simple. There are two parts: the server (a Ruby app hosted on Heroku) and a tiny little JavaScript library. The JavaScript library lets you call to the server (using [JSONP](http://en.wikipedia.org/wiki/JSONP)) to see how many up/down votes your site has, and it lets you vote the current site up or down.

Obviously if you want a fool-proof system for this, you'd need to authenticate somehow. I figured: screw that. It would be nice, but it contributes to that big barrier I already mentioned. The current implementation just uses cookies. This prevents accidental duplicates but it doesn't prevent "malicious" duplicates (i.e., the user can always clear his or her cookies and vote again). I put the word "malicious" in quotes because... come on, this is a simple voting system. Who really cares?

Anyway, I'm going to play around with this over the next few days and probably get it to a point where it's useful to me. Then I'll worry about making it useful for others (if anyone's even interested)!

**What do you think of this idea? Let me know by voting it up or down!**
