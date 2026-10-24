function getRule(selector) {
  var rules = document.styleSheets[0].cssRules;
  for (var i = 0; i < rules.length; ++i) {
    if (rules[i].selectorText === selector) {
      return rules[i];
    }
  }
  return null;
}

function setBoxShadow() {
  var screenHeight = window.innerHeight,
      screenWidth  = window.innerWidth,
      size         = Math.min(screenHeight, screenWidth);

  var shadowRule = getRule('#shadow');
  shadowRule.style.boxShadow = 'inset 0 0 ' + (size * 2) + 'px ' + (size / 2) + 'px #000';

  var hoverShadowRule = getRule('main a:hover ~ #shadow');
  hoverShadowRule.style.boxShadow = 'inset 0 0 ' + size + 'px ' + (size / 3) + 'px #000';
}

setBoxShadow();

window.addEventListener('resize', setBoxShadow);
