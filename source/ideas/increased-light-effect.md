---
title: An "increased light" effect in CSS
date: 2013-10-02
---

I had this idea for an effect where it looks like an increased amount of light is cast at the user's screen (like, from where the user is sitting). Mainly this would entail perceived shadows receding and possibly the background color getting brighter.

As it turns out, this was possible to do *almost* without JavaScript. You can see the effect in [this intro to danieltao.com](/intros/increased-light): when you hover over one of the links, the whole screen sort of glows brighter.

Here's how I got it to work. The difference in light is accomplished via the CSS properties `background-color` (duh) and `box-shadow`. I position a wrapper element with fixed positioning so that its borders are actually larger than the screen's:

```css
#shadow {
  position: fixed;
  top: -50%;
  bottom: -50%;
  left: -50%;
  right: -50%;
}
```

Then I add the property `box-shadow: inset 0 0 [blur radius] [spread radius] #000`, where *blur radius* and *spread radius* are 50% the size of the screen (where by "size" I mean the lesser of height and width--so that the shadow isn't overpowering). Unfortunately since the `box-shadow` property doesn't support pixel values for the radii this is where I needed to utilize JavaScript: by dynamically calculating these values on initial page load and subsequently whenever the window is resized.

Now, what about the hovering? Surprisingly enough, JavaScript was *not* needed for this part. I put the `#shadow` element after the navigation links and used the [general sibling selector](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_selectors) to modify the style of the element occurring *after* the `a:hover` selector:

```css
a:hover ~ #shadow {
  background-color: #fff;
  box-shadow: none;
}
```

(Actually, I also use JavaScript to change that style from `box-shadow: none;` to one with smaller blur and spread radii as with the no-hover case. But using `none` works too; it just looks a little less cool in my opinion.)
