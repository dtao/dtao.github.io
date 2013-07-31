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

  var html = marked(response).replace(/--/g, '&mdash;');
  var article = document.createElement('article');
  article.id = 'idea';
  article.innerHTML = html;

  document.getElementById('content').appendChild(article);

  var headings = article.querySelector('h1');
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

function pluralizeCount(count, word) {
  if (count === 1) {
    return count + ' ' + word;
  } else {
    return count + ' ' + word + 's';
  }
}

function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    var classes = element.className.split(/\s+/);
    classes.push(className);
    element.className = classes.join(' ');
  }
}

function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    var classes = element.className.split(/\s+/);
    removeFromArray(classes, className);
    element.className = classes.join(' ');
  }
}

function removeFromArray(array, element) {
  for (var i = array.length - 1; i >= 0; --i) {
    if (array[i] === element) {
      array.splice(i, 1);
    }
  }
}

function displayVoteCounts(counts) {
  document.getElementById('upvote-count').textContent = pluralizeCount(counts.upvotes, 'upvote');
  document.getElementById('downvote-count').textContent = pluralizeCount(counts.downvotes, 'downvote');
}

function handleUpDownResponse(response) {
  if (response.status === 'duplicate') {
    alert('You voted for this idea already.');
    return false;
  }
  displayVoteCounts(response);
  return true;
}

function getCurrentUrl() {
  return window.location.hostname + window.location.pathname;
}

function initVotingButtons() {
  UpDown.getCounts(displayVoteCounts);

  var voteUpButton = document.getElementById('vote-up');
  var voteDownButton = document.getElementById('vote-down');

  voteUpButton.addEventListener('click', function() {
    UpDown.voteUp(function(response) {
      if (handleUpDownResponse(response)) {
        addClass(voteUpButton, 'voted');
        removeClass(voteDownButton, 'voted');
        localStorage[getCurrentUrl()] = 'up';
      }
    });
  });

  voteDownButton.addEventListener('click', function() {
    UpDown.voteDown(function(response) {
      if (handleUpDownResponse(response)) {
        addClass(voteDownButton, 'voted');
        removeClass(voteUpButton, 'voted');
        localStorage[getCurrentUrl()] = 'down';
      }
    });
  });

  switch (localStorage[getCurrentUrl()]) {
    case 'up':
      addClass(voteUpButton, 'voted');
      break;

    case 'down':
      addClass(voteDownButton, 'voted');
      break;
  }
}

window.addEventListener('load', function() {
  loadIdeaForLocation();
  displayPathInFooter();
  initVotingButtons();
});
