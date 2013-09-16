Default parameters in Ruby
==========================

The idiomatic way of providing default parameter values in Ruby is to use the language's built-in facility:

```ruby
def foo(options=DEFAULT_OPTIONS)
  do_something(options[:bar])
end
```

I actually prefer doing things slightly differently, though it might make some Ruby programmers unhappy:

```ruby
def foo(options=nil)
  options ||= DEFAULT_OPTIONS.dup
  do_something(options[:bar])
end
```

There are two reasons for this. Well, three: one good and two sort of silly. I'll start with the silly ones.

Reason 1: I want to be different
--------------------------------

Let me just put my cards out there. Any time I decide to write about a point of view that differs from the norm, at least a tiny fraction of the reason is just to be different. Admittedly a stupid reason, but there it is.

Reason 2: The idiomatic way is open to side effects
---------------------------------------------------

The idiomatic way, where you have `options=DEFAULT_OPTIONS`, causes a default object to be passed in to the method, which can cause unexpected behavior if you get mutate-happy with your Ruby:

```ruby
def foo(options=DEFAULT_OPTIONS)
  # In the default case, you're changing DEFAULT_OPTIONS here!
  options.merge!(some_other_options())
  do_something(options)
end
```

Now, before you jump on me for this one, yes, I *do* realize that this is arguably a ridiculous objection, for one simple reason: there's really no difference between the "idiomatic" way and the "Dan" way here. In Ruby, you can easily set `options=DEFAULT_OPTIONS.dup` as your default parameter and avoid this problem. Likewise, using my preferred approach, you could easily forget to include the `.dup` and have the exact same problem.

My reason for preferring the use of `||=` here still stands, despite this very valid objection. I rarely see `.dup` called on a default parameter in Ruby in practice, and so I suspect most devs wouldn't even think about that part.

It's also counterintuitive to me that this isn't just a one-time setting of a default value; the default value is treated as an *expression* which will be evaluated whenever the method is called. To understand what I mean, consider this simple program:

```ruby
@counter = 0

def get_id
  @counter += 1
end

# My intuition would tell me this sets the default value of id to 1,
# for all subsequence calls; but in fact it calls get_id whenever
# print_id is called without a parameter.
def print_id(id=get_id)
  puts id
end

print_id() # => 1
print_id() # => 2
```

Whether that meshes with your intuition or not, I suspect at least *some* devs share my feeling here. Obviously, once you know how it works, you get it. So as I've already conceded, maybe this isn't a good reason. That's why I saved the best for last!

Reason 3: The idiomatic way often leads to nil errors
-----------------------------------------------------

Here's the main one. I like my approach using `||=` because it lets you pass in `nil` to the method and treats this the same as if you hadn't passed in the parameter at all. (I just realized: maybe I like this because it reminds me of JavaScript with `undefined`!)

Surely some of you are shaking your heads, thinking that's awful because you'd like your methods to be able accept `nil` and do something meaningful with that. At the risk of sounding like I'm making an absurd blanket statement, let me just say: I'm *skeptical*. When do you write a method with intentionally different behavior for passing in `nil` as opposed to not passing anything? Maybe I'm just not thinking hard enough, but no reasonable cases for this come to my mind.

Now, I don't mean to suggest that given my definition of `foo` above, it would make sense to pass in `nil` explicitly:

```ruby
# Why would I do this?
foo(nil)
```

Rather, I find that these `nil` errors creep up in scenarios where you're passing the output of one method directly into another:

```ruby
foo(get_some_data())
```

In the above case, it might (arguably) sometimes make sense for `get_some_data` to return `nil`&mdash;or anyway, whether or not it makes *sense* it might *happen*&mdash;and in that case `options` will be `nil` rather than a default value.

One way to solve this is to use `||` at the call site:

```ruby
foo(get_some_data() || DEFAULT_OPTIONS)
```

But now you've duplicated your logic for falling back to a sensible default. And what are you going to do, add this special handling at every point where `foo` is called with a parameter that might be `nil`? Unsustainable!

So this is the final and best reason why I prefer *my* way over Ruby's built-in way. Thoughtful questions, comments, and vitriol all welcome.
