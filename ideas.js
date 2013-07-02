function isMarkdownFile(file) {
  return file && file.name && file.name.match(/\.md$|\.markdown$/);
}

function listIdeas(response) {
  var ideas = document.getElementById('ideas');
  var files = response.data;
  Lazy(files).filter(isMarkdownFile).each(function(file) {
    var idea = document.createElement('li');
    idea.textContent = file.name;
    ideas.appendChild(idea);
  });
}

function makeJSONPRequest(url, callbackName) {
  var script  = document.createElement('script');
  script.type = 'text/javascript';
  script.src  = url + '?callback=' + encodeURIComponent(callbackName);
  document.head.appendChild(script);
}

window.addEventListener('load', function() {
  makeJSONPRequest('https://api.github.com/repos/dtao/dtao.github.io/contents/ideas', 'listIdeas');
});
