function getLanguageFromClass(className) {
  switch (className) {
    case 'csharp': return 'cs';
    case 'javascript': return 'javascript';
    case 'ruby': return 'ruby';
    default: return 'javascript';
  }
}

function highlight(codeBlock) {
  var lang = getLanguageFromClass(codeBlock.className),
      code = codeBlock.textContent,
      html = hljs.highlight(lang, code).value;

  codeBlock.innerHTML = html;
}

function highlightAll() {
  var codeBlocks = document.querySelectorAll('pre > code');
  for (var i = 0; i < codeBlocks.length; ++i) {
    highlight(codeBlocks[i]);
  }
}
