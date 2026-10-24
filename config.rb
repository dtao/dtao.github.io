with_layout :javascript_tip do
  page "/tips/javascript/*"
end

with_layout :css_tip do
  page "/tips/css/*"
end

with_layout :idea do
  page "/ideas/*"
end

# Need this because otherwise Middleman tries to apply the 'idea' layout even to
# ideas/index.html (understandably, I guess).
page "/ideas", :layout => false

set :markdown_engine, :redcarpet
set :markdown, { :fenced_code_blocks => true, :smartypants => true }

activate :directory_indexes if environment == :development
activate :syntax

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

configure :build do
  activate :minify_css unless environment == :development
  activate :minify_javascript unless environment == :development
end
