---
title: Tooltips without JavaScript
---

Here is <span class="has-tooltip">some text with a tooltip</span><span class="tooltip">I am a <strong>tooltip</strong>! Pretty <em>sweet</em>, huh?</span>. Hover over the text to see a tooltip appear. This effect is accomplished without any JavaScript.

How did we do this?

It's actually pretty simple. This technique uses the [adjacent sibling selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_selectors):

```css
span.tooltip {
  /* Position the tooltip just below the bottom of the screen */
  position: fixed;
  bottom: -50px;
  left: 0;
  right: 0;
  height: 50px;
  line-height: 50px;

  /* Naturally, we want a nice little transition effect */
  transition: bottom 0.5s;
}

span.has-tooltip:hover + span.tooltip {
  /* When the cursor hovers over the element *immediately before*
   * the tooltip, slide it up just into view */
  bottom: 0;
}
```

Of course, this only really works with `fixed` (or `absolute`) positioning; but the tooltip doesn't need to go on the bottom of the screen. It could easily go <span class="has-tooltip-right">on the right</span><span class="tooltip-right"><strong>See</strong>? I <em>told</em> you I could go on the right!</span>, for example.
