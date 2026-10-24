---
title: Passwords are ridiculous
date: 2013-11-05
---

The recent Adobe hack is not really anything new, but it is particularly worrisome because of its sheer scope. Lots and lots of people are affected. And the password encryption was pretty bad, so those passwords are going to be easy to crack. I think they basically already have been.

9 out of 10 IT professionals you ask about this will roll their eyes and mutter something about how pitiful it is, all of these weak passwords people were using. Somebody published a list of the most common passwords and they're all like, "123456", "password", "adobe", etc. Har har, what idiots.

Well, I think *we* are the idiots. Software professionals. For using such a flawed system for so long. We're all implicit in this, regardless of whether we properly hash and salt our passwords (unlike Adobe), because we've just been perpetuating this stupidly fragile system for years, putting a huge burden on each and every single user: "Use a strong password! Don't share passwords between sites!" Yada yada.

Yes, I am including myself in this indictment. Obviously. I've written sites with login forms and passwords. I sit on the shoulders of giants, naturally---using [bcrypt](http://en.wikipedia.org/wiki/Bcrypt) or whatever is the de facto standard on whatever technology I'm using, assuming I actually take the time to even look into it---but I haven't done anything to move the industry here.

Not that I think it's reasonable to expect most software developers, including myself, to do something earth-shattering and paradigm-shifting. For what it's worth, I *am* a big fan of federated login solutions like [OAuth](http://en.wikipedia.org/wiki/OAuth)---where we trust a much smaller subset of the tech companies of the world, the ones who should have their act together like Google and Yahoo, with security (though you would probably have *thought* that Adobe belonged in that circle...)---however, I think those often just sort of shift the problem from security to privacy. (I have more than one friend who won't log in to sites using Facebook, for example, out of fear of what sort of data they might be gathering.)

Jeff Atwood has written about this. He proposes something called the [Internet Driver's License](http://www.codinghorror.com/blog/2010/11/your-internet-drivers-license.html), which would be a *single* form of identity verification, as opposed to the vast array of logins and associated passwords most web citizens have. OAuth sort of makes the idea possible; but basically every OAuth provider also happens to be a business with ulterior motives, which brings us back to the privacy issue. There was a thing called [myOpenID](https://www.myopenid.com/) that was pretty close to what Atwood wanted: *just* a form of identification. But that site is shutting down, and anyway it was never particularly widely adopted.

A possible next best solution might be Mozilla's [Persona](http://www.mozilla.org/en-US/persona/) project, which is (to me) far preferable to your typical OAuth provider because Mozilla is a non-profit organization.

Anyway, I didn't really mean to talk so much about federated logins or the Internet Driver's License concept. I just wanted to make the point that this whole attitude that people are foolish for not having stronger passwords totally misses the forest for the trees. In the world we live in now, yes, the smart thing to do is to use a service like [1Password](https://agilebits.com/onepassword) to ensure you have a strong, unique password for every site that requires one. But that is a hack to deal with a broken system. **Passwords are ridiculous.** We need something better.

In closing, let me leave you (those of you who are software developers) with an analogy. (Actually, this analogy just sitting around in my head was the whole reason I decided to write this little rant!)

Let's say you're using this library, and it has some super handy method, `abracadabra`. And in the documentation for `abracadabra`, it lists all these requirements: be sure not to pass `null`; don't pass a number greater than 10,000; you must call `init` before you call `abracadabra`, and a bunch of other crap. Sounds like a horrible interface, right? Right. And say you have 100 places in your code where you need to use this `abracadabra` method.

Do you visit all 100 locations, and sprinkle in `null` checks and number validations and trace the logic of your code to make sure `init` was called before `abracadabra` at every single call site? If that's what you would do, you have a lot to learn about software development. And I say that as someone who acknowledges *I* have tons to learn about software development.

No, that would be insanity. You write *one* helper method, where you wrap all of the stupidity of this library's horrible interface, and you do all of the necessary checks in there. Then you refactor your code to use this helper method everywhere, so that if there's ever an issue you need to fix, or the library authors introduce yet another insane requirement, you only have to put the fix in one place. Solved once, fixed everywhere.

This is just basic software engineering. Requiring a problem to be solved over and over again in a hundred different places is poor design. That's why I don't think it makes sense to say that every user must create a strong password, for every site, ever. There needs to be a more efficient solution to that problem.