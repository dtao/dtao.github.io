Getting rid of null
===================

I think there's an anti-pattern in most software that's written in mainstream languages today: the handling of null references. Like, their very existence.

Well, maybe not their *existence*. Certainly their prevalence. Here's the thing: **null**, as a concept, is really only suitable for a specific niche case at best: when you write code that you want to handle *either* a specific type of data, `T`, *or*... nothing. We do this all the time, and it seems perfectly natural because it's so common. But it shouldn't be.

Think of statically typed languages for a moment. What would you say is the greatest benefit of using a statically typed language? Your code can be analyzed and verified for correctness because the type of every variable is explicitly declared. Right? (At least that's what *I'd* say is one of the greatest benefits.)

So when I declare a variable `x` of type `T`, I expect that I can initialize it by calling some function `f` that returns a `T`. And then I should be able to call any methods on `x` that are defined in the `T` class. And if one of those methods, `g`, returns a `U`, then I can use its return value with any code that requires the `U` class. And so on.

Introducing `null` undermines the stability of all of this. The `f` function might return `null` instead of an instance of `T`. The `g` function might return `null` instead of a `U`. At every such "maybe" point, I have to either:

- Perform an explicit check (defensive programming, which is the preferred strategy with statically typed languages)
- Just ignore the problem (which I think happens quite a bit with dynamically typed languages)

The first approach is very costly, as it wastes development time with lots of boilerplate and clutters up the code with logic that has no business value. The second approach is obviously also risky, though I actually think it's sometimes the right way to go with the tools we currently have. Either way, the presence of `null` (or `nil`) increases the complexity of the code (i.e, [reduces comprehensibility](http://philosopherdeveloper.com/posts/optimize-for-comprehensibility.html)) in a self-propagating manner that can spiral completely out of control.

If you don't agree with me, listen to what [Tony Hoare has to say on the matter](http://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare):

> My goal was to ensure that all use of references should be absolutely safe, with checking
> performed automatically by the compiler. But I couldn't resist the temptation to put in a null
> reference, simply because it was so easy to implement. This has led to innumerable errors,
> vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and
> damage in the last forty years.

How absurd would it be if primitives were like this?
----------------------------------------------------

You might already have an intuitive sense of what I'm talking about. But let's look at a quick example anyway, just to drive the point home. Does this look familiar to you?

```csharp
char GetMiddleChar(string str)
{
    if (str == null)
    {
        throw new ArgumentNullException("str");
    }

    return str[str.Length / 2];
}
```

Yeah, I thought so. This is the [defensive programming](http://en.wikipedia.org/wiki/Defensive_programming) I mentioned a moment ago. Most of us read code like this and nod our heads; it seems reasonable. Scratch that; it actually seems *right*.

But what if we had to do this with primitives? For example, what if every `int` value in some programming language were either a 32-bit integer or... I don't know, let's say `false`. Then we might see methods like this:

```csharp
int Add(int x, int y)
{
  if (x == false)
  {
    if (y == false)
    {
      return false;
    }
    return y;
  }
  return x + y;
}
```

**What?!** Height of absurdity. And that's the reaction you *should* have, because the above code is really incredibly weird: an implementation of an operation that *only makes sense for numbers*, forced to account for this bizarre scenario that has basically been injected out of nowhere by a language quirk, that a variable explicitly typed as an `int` could also maybe have a boolean value.

This is insane, and yet it's basically how we deal with `null` all the time.

The known solution, and a better solution
-----------------------------------------

I am aware of languages where this problem is addressed by the introduction of non-null references. The [Spec# language](http://en.wikipedia.org/wiki/Spec_Sharp), for example, allows you to do this:

```csharp
// text cannot be assigned a null reference
string! text = GetNonNullText();
```

That's OK; but it still isn't ideal, in my opinion. As I said, null is really a niche concept. It should not be the default behavior, which you can change by appending a `!`. **The default behavior should be no null references.**

Like this:

```csharp
// no null reference
string text = GetNonNullText();

// maybe null reference
string? text = GetMaybeNullText();
```

Isn't that simpler? It's also perfect for developers who are familiar with C#, because C# already uses the `?` syntax for the `Nullable<T>` value type (which ordinarily don't allow null values). This would allow you to operate in a null-free world for the most part, while still retaining the possibility of null references in those *very few scenarios where they actually make any sense* (e.g., to denote the head and tail of a linked list, maybe).

Now, our `GetMiddleChar` method from earlier becomes:

```csharp
char GetMiddleChar(string str)
{
  // str can't be null, so we can dive straight into the actual logic!
  return str[str.Length / 2];
}
```

This is all totally theoretical, of course. I am basically just shouting this opinion out into the aether. But if I ever were to write my own programming language, I am almost certain this would be one of its characteristics.
