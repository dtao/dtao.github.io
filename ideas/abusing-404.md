Abusing the 404 error page
==========================

So GitHub lets you put up a custom 404 page. I'm thinking you could use the 404 page as your main layout and then use the path the browser *tried* to render to control what content gets displayed.

That's what I'm doing here. See how the address bar says 'abusing-404'? There's JavaScript on this page that takes that (from `window.location.pathname`), fetches `abusing-404.md` with an `XMLHttpRequest`, and then uses [markdown-js](https://github.com/evilstreak/markdown-js) to render the response as HTML.
