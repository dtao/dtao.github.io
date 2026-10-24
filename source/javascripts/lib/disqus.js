var disqus_shortname  = 'danieltao';
var disqus_identifier = window.location.pathname.match(/ideas\/(?:[^\/]*)$/)[0];

window.addEventListener('load', function() {
  /* * * DON'T EDIT BELOW THIS LINE (Disqus said no.) * * */
  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
});
