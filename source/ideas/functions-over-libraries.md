Functions over (JavaScript) libraries
=====================================

I should preface this by saying I barely know what I'm talking about. I haven't bothered to learn
the ins and outs, or even the rationale (in full), of any JavaScript module pattern/library/toolkit
such as CommonJS, AMD, etc.

That said, here's an opinion I just wanted to sort of float out there. It's something I idly
suggested to some of my old ThoughtWorks colleagues back in the day, with generally lukewarm
responses. I attribute that to my failure to explain the idea very well (a failure I may very well
repeat right now).

The library-based paradigm
--------------------------

Recently a couple of libraries have undertaken the major task of modularization. I'm not sure if
that's a "word"; but it should be clear enough what I mean: breaking down their various
functionalities into individually consumable parts. [Lo-Dash](http://lodash.com/) is the one I'm
most acutely aware of because I follow [@jdalton](https://twitter.com/jdalton) on Twitter and he's
been pretty vocal lately about their efforts on this front.

I think this is a great thing. But I don't think it's the *best* thing.

What I think would be even better is this: fewer big libraries, more standalone functions.

The whole reason we see this modularization is that there are devs who want very specific
functionality; and maybe it's trivial to write it yourself, but wouldn't it be better to have
standard,  battle-tested implementations that we all share? And so maybe I want an `extend()` method
to add a bunch of properties to an object. And I want a nice robust one, with validation and bells
and whistles. So I pull in Lo-Dash, or Underscore, or whatever, just for that one method.

Boo hoo, now I've got a big library dependency for something so small. So again: I get it. Being
able to depend on *just* Lo-Dash:extend is a good thing.

But **why does Lo-Dash need to be so big in the first place?** Why *was* it huge, and now the team
has broken it down into smaller consumable pieces? Why wasn't there just an `extend()` library (more
like "library")--with none of the other stuff in Lo-Dash--to begin with?

This isn't a rhetorical question. I think I know the answer: because our whole ecosystem is designed
around the concept of a library.

How developers share code
-------------------------

There are two ways that developers share their code today. One is by publishing "projects", which
are repositories (increasingly Git repositories hosted on GitHub) containing potentially lots of
functionality. Sure, some of these are small; but the norm is that they are pretty large. And around
this paradigm there arise package management solutions like RubyGems, NPM, NuGet, Maven. I'm
guessing most devs would view this as the "right" way to share code.

Here's the other way, which I think most devs would consider a "hacky" or just flat-out "wrong" way
to share code: by posting snippets online, for others to copy/paste. This is the stuff of
[StackOverflow](http://stackoverflow.com/) answers, blog posts, and
[Gists](https://gist.github.com/).

The second way is perceived as hacky because it isn't very standardized. There are no package
managers (that I'm aware of) that scour StackOverflow. But here's what I like about the second way:
**the units of code are very small**. Nobody posts a "library" in a StackOverflow answer. Typically
the OP has a problem, and helpful users propose solutions to that specific problem in the form of a
single function (or a handful of tightly-coupled functions).

Imagine if we had an ecosystem where instead of a "package" being a library, a "package" was just a
function.

A proposal for a function-based paradigm
----------------------------------------

Actually, here's what I'd really like to see: somebody defines an abstract piece of functionality.
They give it a name, a description, and (ideally) some unit tests. Now any developer can take a
crack at implementing it. Implementations get submitted to a registry, where they are classified
under this abstract functionality. Subsequently, other developers can require the functionality on
their projects.

Here's a concrete example. Let's say I need a function to split an array into chunks of size N.
Maybe our hypothetical registry includes an entry called "chunk"; I look it up, read the
description, and decide that's exactly what I need. (Or, I don't find it; so I write up a
description myself and submit that.)

Now, there are a few implementations of this already registered: one by dtao, one by jschmoe, and
one by jqpublic. I could `require('chunk/dtao')` to get dtao's implementation; or I could just
`require('chunk/*')` to get whatever the "best" one is (determined, say, via some voting mechanism,
or just by download count).

Note that there's nothing stopping these functions from requiring one another. So we could still
have something similar to libraries. Maybe we could even group together a whole bunch of functions
under some umbrella term and brand it, so you could still have `require('lodash')` or whatever, as a
convenient shortcut for requiring lots of functionality. But by default, everything would be much
more fine-grained than it is today.

Now you might say, "Well, that's exactly what these libraries have done by modularizing, so what are
you protesting?" My issue is that these libraries--Lo-Dash, and I believe jQuery as well--shouldn't
have to put all this effort into what they're doing. They're swimming upstream, fighting against the
norm that we currently have. I'm proposing that if we lived in a world where the standard unit of
code were a *function*, not a library, they wouldn't find themselves in this mess.

Anyway, I am clearly the pot calling the kettle black here as I have [my own share of JavaScript
libraries](https://github.com/dtao?tab=repositories) which are in no way modularized. But I would
still like to see this happen. It's in the back of my mind as something I may attempt to get off the
ground at some point in the future.
