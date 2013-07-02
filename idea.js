function isMarkdownFile(file) {
  return file && file.name && file.name.match(/\.md$|\.markdown$/);
}

function displayIdea(response) {
  var html = markdown.toHTML(response);
  document.getElementById('idea').innerHTML = html;

  var headings = document.getElementsByTagName('h1');
  if (headings.length > 0) {
    document.title = 'Dan Tao - ' + headings[0].textContent;
  }
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

function loadIdeaForLocation() {
  var ideaName = window.location.pathname.match(/ideas\/(.*)$/);

  if (!ideaName) {
    ideaName = window.location.search.match(/\bidea=([^&]*)/);
  }

  if (ideaName) {
    makeAjaxRequest('/ideas/' + ideaName[1] + '.md', displayIdea);
  }
}

function displayPathInFooter() {
  document.getElementById('path').textContent = window.location.pathname;
}

window.addEventListener('load', function() {
  loadIdeaForLocation();
  displayPathInFooter();
});
