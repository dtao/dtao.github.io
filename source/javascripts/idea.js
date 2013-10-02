//= require_directory ./lib
//= require highlighting

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
  highlightAll();
  initVotingButtons();
});
