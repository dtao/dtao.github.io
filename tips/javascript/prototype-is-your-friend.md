---
title: The Prototype is your friend
---

I wrote a little "protip" on Coderwall last week about the performance benefits of using prototypes in JavaScript.

You can [read the post on Coderwall](https://coderwall.com/p/jj6fwa) if you're interested.

But for the **TL;DR** crowd: constructing objects is very fast with prototypes. If you put a bunch of function definitions in a factory method, then constructing objects will be slower.
