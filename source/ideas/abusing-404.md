---
title: Abusing the 404 error page
date: 2013-07-08
---

**Update: This actually isn't accurate anymore as I switched to [Middleman](http://middlemanapp.com/) for developing this site, abandoning the hackiness described below.**

GitHub lets you put up a custom 404 page for custom domains. I had this idea that you could use the 404 page as your main layout and then use the path displayed in the browser's address bar to dynamically fetch content.

That's what I'm doing here. See how the address bar says 'abusing-404'? There's JavaScript on this page that takes that (from `window.location.pathname`), fetches `abusing-404.md` with an `XMLHttpRequest`, and then uses <strike>[markdown-js](https://github.com/evilstreak/markdown-js)</strike> [marked](https://github.com/chjj/marked) to render the response as HTML.
