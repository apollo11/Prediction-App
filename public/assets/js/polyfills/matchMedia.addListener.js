/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
!function(){if(!window.matchMedia("all").addListener){var e=window.matchMedia;window.matchMedia=function(a){var n,t=e(a),i=[],r=t.matches,c=function(){var n=e(a),c=n.matches&&!r,h=!n.matches&&r;if(c||h)for(var l=0,o=i.length;l<o;l++)i[l].call(t,n);r=n.matches};return t.addListener=function(e){i.push(e),n||(n=setInterval(c,1e3))},t.removeListener=function(e){for(var a=0,t=i.length;a<t;a++)i[a]===e&&i.splice(a,1);!i.length&&n&&clearInterval(n)},t}}}();