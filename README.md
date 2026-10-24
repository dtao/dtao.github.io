# danieltao.com

Source for [danieltao.com](https://danieltao.com), built with
[Jekyll](https://jekyllrb.com/) and published by GitHub Pages directly from
the `master` branch.

## Layout

- `_posts/` - ideas and opinions, published at `/ideas/<name>.html`
- `ideas/index.html` - the list of ideas and opinions (edit by hand when adding a post)
- `tips/` - tips, plus `tips/index.html` listing them
- `intros/` - the landing pages; `index.html` picks one at random
- `_layouts/` - page templates for posts and tips
- `stylesheets/`, `_sass/` - SCSS, compiled by Jekyll
- `javascripts/` - scripts for the intros and Disqus comments

## Running locally

Requires Ruby 3.3 (GitHub Pages' `github-pages` gem doesn't support Ruby 4 yet).

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.
