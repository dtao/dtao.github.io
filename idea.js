marked.setOptions({
  gfm: true,
  highlight: function(code, lang) {
    var highlighted;
    Rainbow.color(code, lang, function(result) {
      highlighted = result;
    });
    return highlighted;
  }
});

function displayIdea(response) {
  // If this isn't a valid path, we'll just get the full 404 page back.
  // In which case, let's not try and inject an entire HTML document into
  // the DOM.
  if (response.substring(0, 15) === '<!DOCTYPE html>') {
    displayIdea('**Nothing to see here.**');
    return;
  }

  var html = marked(response);
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

function getCacheBuster() {
  // Only use a cache buster for local testing.
  if (window.location.hostname === 'localhost') {
    return '?' + Math.floor(Math.random() * 1000000);
  }
  return '';
}

function loadIdeaForLocation() {
  var ideaName = window.location.pathname.match(/ideas\/(.*)$/);

  if (!ideaName) {
    ideaName = window.location.search.match(/\bidea=([^&]*)/);
  }

  if (ideaName) {
    makeAjaxRequest('/ideas/' + ideaName[1] + '.md' + getCacheBuster(), displayIdea);
  }
}

function displayPathInFooter() {
  document.getElementById('path').textContent = window.location.pathname;
}

window.addEventListener('load', function() {
  loadIdeaForLocation();
  displayPathInFooter();
});
