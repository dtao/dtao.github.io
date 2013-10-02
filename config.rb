with_layout :idea do
  page "/ideas/*"
end

# Need this because otherwise Middleman tries to apply the 'idea' layout even to
# ideas/index.html (understandably, I guess).
page "/ideas", :layout => false

set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true

activate :directory_indexes if environment == :development

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

configure :build do
  activate :minify_css
  activate :minify_javascript
end