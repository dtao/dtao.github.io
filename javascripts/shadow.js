function getRule(e){for(var t=document.styleSheets[0].cssRules,n=0;n<t.length;++n)if(t[n].selectorText===e)return t[n];return null}function setBoxShadow(){var e=window.innerHeight,t=window.innerWidth,n=Math.min(e,t),a=getRule("#shadow");a.style.boxShadow="inset 0 0 "+2*n+"px "+n/2+"px #000";var s=getRule("main a:hover ~ #shadow");s.style.boxShadow="inset 0 0 "+n+"px "+n/3+"px #000"}setBoxShadow(),window.addEventListener("resize",setBoxShadow);