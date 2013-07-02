function isMarkdownFile(file) {
  return file && file.name && file.name.match(/\.md$|\.markdown$/);
}

function displayIdea(response) {
  var html = markdown.toHTML(response);
  document.getElementById('idea').innerHTML = html;
}

function makeAjaxRequest(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'text';

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      callback(request.response);
    }
  };

  request.send();
}

window.addEventListener('load', function() {
  var ideaName = window.location.pathname.match(/ideas\/(.*)$/);
  if (ideaName) {
    makeAjaxRequest('/ideas/' + ideaName[1] + '.md', displayIdea);
  }

  document.getElementById('path').textContent = window.location.pathname;
});
