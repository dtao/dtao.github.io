function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomHashChar() {
  var hashChars = "0123456789abcdef";
  return hashChars.charAt(getRandomNumber(hashChars.length));
}

function getRandomHash() {
  var hash = '';
  while (hash.length < 32) {
    hash += getRandomHashChar();
  }
  return hash;
}

function loadRandomBackdrop() {
  var backdrop = document.getElementById('backdrop');

  backdrop.addEventListener('load', function() {
    document.body.className = 'loaded';
  });

  backdrop.src = 'http://www.gravatar.com/avatar/' + getRandomHash() + '?d=identicon&s=500';
}

window.addEventListener('load', function() {
  loadRandomBackdrop();
});
