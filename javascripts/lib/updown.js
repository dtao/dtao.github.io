!function(e,n){function t(e){return e.charAt(Math.floor(Math.random()*e.length))}function a(e){for(var n="";n.length<e;)n+=t(c);return n}function o(){for(var n=a(10);n in e;)n=a(10);return n}function r(n){var t=o();return e[t]=function(){try{n.apply(this,arguments)}finally{delete e[t]}},t}function d(){return e.location.hostname+e.location.pathname}function i(e,t){var a=n.createElement("script");a.src=s+e+"?uri="+encodeURIComponent(d())+"&callback="+r(t),n.head.appendChild(a)}var c="abcdefghijklmnopqrstuvwxyz",s="http://up-down.herokuapp.com/";e.UpDown={getCounts:function(e){i("counts",e)},voteUp:function(e){i("up",e)},voteDown:function(e){i("down",e)}}}(window,document);