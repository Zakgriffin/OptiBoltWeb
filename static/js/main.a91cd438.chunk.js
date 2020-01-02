(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],[,,,,,function(e,t,r){"use strict";(function(e){r.d(t,"a",(function(){return f}));var n=r(1),a=r(0),o=r.n(a),i=r(6),l=r.n(i),c=r(7),u=r(9),h=r(8),d={width:1e3,height:720,facingMode:{exact:"environment"}},v={width:1e3,height:720};function f(){var t=Object(c.a)("opencv.js"),r=Object(n.a)(t,1)[0],i=Object(a.useState)(),f=Object(n.a)(i,2),s=f[0],y=f[1],m=Object(a.useRef)();return Object(a.useEffect)((function(){if(r){var t=e.cv,n=document.getElementById("video"),a=new t.VideoCapture(n);setInterval((function(){if(t.Mat){var e=new t.Mat(n.height,n.width,t.CV_8UC4);a.read(e);var r=Object(u.a)(t,e);y(r)}}),10)}}),[r]),o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{style:{border:"solid red 0px",width:"500px",height:"360px"}},o.a.createElement(l.a,{id:"video",audio:!1,ref:m,screenshotFormat:"image/jpeg",width:d.width,height:d.height,videoConstraints:d,style:{position:"absolute",width:v.width,height:v.height}}),o.a.createElement("svg",{viewBox:"0 0 ".concat(d.width," ").concat(d.height),style:{position:"absolute",width:v.width,height:v.height}},s?s.map((function(e,t){return o.a.createElement(h.a,{key:t,screw:e})})):null)))}}).call(this,r(16))},,function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(1),a=r(0),o=[];function i(e){var t=Object(a.useState)({loaded:!1,error:!1}),r=Object(n.a)(t,2),i=r[0],l=r[1];return Object(a.useEffect)((function(){if(!o.includes(e)){o.push(e);var t=document.createElement("script");t.src=e,t.async=!0;var r=function(){l({loaded:!0,error:!1})},n=function(){var r=o.indexOf(e);r>=0&&o.splice(r,1),t.remove(),l({loaded:!0,error:!0})};return t.addEventListener("load",r),t.addEventListener("error",n),document.body.appendChild(t),function(){t.removeEventListener("load",r),t.removeEventListener("error",n)}}l({loaded:!0,error:!1})}),[e]),[i.loaded,i.error]}},function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(0),a=r.n(n);function o(e){var t=e.screw.box,r=t.x,n=t.y,o=t.width,l=t.height;return a.a.createElement(a.a.Fragment,null,a.a.createElement("rect",Object.assign({strokeWidth:"3",stroke:"#444",fill:"none",strokeDasharray:"10",rx:"15"},e.screw.box)),a.a.createElement("svg",{x:r+o,y:n+l/2-50},a.a.createElement("rect",{x:"-10",fill:"#444",rx:"15",width:210,height:100}),a.a.createElement(i,{label:"Length",value:e.screw.length||{},color:"red",y:20}),a.a.createElement("line",{x1:"10",y1:"35",x2:"140",y2:"35",stroke:"#666"}),a.a.createElement(i,{label:"Diameter",value:e.screw.diameter||{},color:"lime",y:50}),a.a.createElement("line",{x1:"10",y1:"65",x2:"140",y2:"65",stroke:"#666"}),a.a.createElement(i,{label:"Thread",value:e.screw.thread||{},color:"blue",y:80,frac:!0}),a.a.createElement("line",{x1:"110",y1:"10",x2:"110",y2:"90",stroke:"#666"})))}function i(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("circle",{cx:"20",cy:e.y,r:"9",fill:e.color}),a.a.createElement(l,{text:e.label,x:40,y:e.y}),"number"===typeof e.value?a.a.createElement(l,{text:e.value,x:120,y:e.y}):a.a.createElement(l,{text:"".concat(e.value.whole," + ").concat(e.value.num,"/").concat(e.value.den," in"),x:120,y:e.y}))}function l(e){return a.a.createElement("text",{x:e.x,y:e.y+1,fill:"white",alignmentBaseline:"middle",fontSize:"16"},e.text)}},function(e,t,r){"use strict";var n,a,o=r(1),i=r(2),l=300,c=.3*l,u=.06*l,h=.7;n={},Object(i.a)(n,3/8,[0,0,255]),Object(i.a)(n,5/8,[0,255,0]),Object(i.a)(n,.75,[255,0,0]),Object(i.a)(n,1,[255,0,255]),Object(i.a)(n,2.25,[255,255,0]),a={},Object(i.a)(a,3/16,[0,0,255]),Object(i.a)(a,1/8,[255,0,0]);function d(e,t){function r(e){return e[e.length-1].x-e[0].x}return(r(e)+r(t))/2/l}function v(e,t){function r(e){var t=0;return e.map((function(e){return t+=e.y})),t/e.length}return(r(e)+r(t))/l}function f(e,t){function r(e){var t=[],r=0,n=!1,a=0,o=!0,i=!1,l=void 0;try{for(var c,u=e[Symbol.iterator]();!(o=(c=u.next()).done);o=!0){var d=c.value,v=d.y;n&&v-h>r||!n&&v+h<r?(n&&(a++,t.push(d)),n=!n):r=v}}catch(f){i=!0,l=f}finally{try{o||null==u.return||u.return()}finally{if(i)throw l}}return a}var n=r(e),a=r(t);return Math.round((n+a)/2)}function s(e){var t=Object(o.a)(e.line.data32F,4),r=t[0],n=t[1],a=t[2],i=t[3],l=Math.atan2(n,r),c=[],h=!0,d=!1,v=void 0;try{for(var f,s=e.points[Symbol.iterator]();!(h=(f=s.next()).done);h=!0){var y=f.value,m=a-y.x,x=i-y.y,w=Math.sqrt(m*m+x*x),b=Math.atan2(x,m),g=w*Math.cos(b-l),E=w*Math.sin(b-l);c.push({x:g,y:E})}}catch(re){d=!0,v=re}finally{try{h||null==s.return||s.return()}finally{if(d)throw v}}for(var p=[],O=[],j=[],M=c[0].y<0,S=0,k=0,R=c;k<R.length;k++){var L=R[k];L.y<0!==M&&(S++,M=!M),S>=2?j.push(L):L.y<0?p.push(L):O.push(L)}M?p=j.concat(p):O=j.concat(O);var C={x:0,y:0},I=!0,_=!1,B=void 0;try{for(var A,F=O[Symbol.iterator]();!(I=(A=F.next()).done);I=!0){var T=A.value;T.y>C.y&&(C=T)}}catch(re){_=!0,B=re}finally{try{I||null==F.return||F.return()}finally{if(_)throw B}}var N=!0,V=!1,D=void 0;try{for(var H,P=p[Symbol.iterator]();!(N=(H=P.next()).done);N=!0){var W=H.value;W.y=-W.y}}catch(re){V=!0,D=re}finally{try{N||null==P.return||P.return()}finally{if(V)throw D}}if(C.x<0){var z=!0,G=!1,J=void 0;try{for(var X,Y=p[Symbol.iterator]();!(z=(X=Y.next()).done);z=!0){var q=X.value;q.x=-q.x}}catch(re){G=!0,J=re}finally{try{z||null==Y.return||Y.return()}finally{if(G)throw J}}var U=!0,$=!1,K=void 0;try{for(var Q,Z=O[Symbol.iterator]();!(U=(Q=Z.next()).done);U=!0){var ee=Q.value;ee.x=-ee.x}}catch(re){$=!0,K=re}finally{try{U||null==Z.return||Z.return()}finally{if($)throw K}}O.reverse()}else p.reverse();function te(e){var t=0;if(0===e.length)return[];var r=!0,n=!1,a=void 0;try{for(var o,i=e[Symbol.iterator]();!(r=(o=i.next()).done);r=!0){t+=o.value.y}}catch(re){n=!0,a=re}finally{try{r||null==i.return||i.return()}finally{if(n)throw a}}t/=e.length;for(var l=0;l<e.length;l++)if(e[l].y>t+u){e=e.slice(0,l);break}return e}return p=te(p),O=te(O),p.length&&O.length?[p,O]:[null,null]}function y(e,t){var r=new e.Mat;e.cvtColor(t,r,e.COLOR_RGBA2GRAY,0),e.threshold(r,r,80,255,e.THRESH_BINARY_INV);var n=new e.MatVector,a=new e.Mat;e.findContours(r,n,a,e.RETR_EXTERNAL,e.CHAIN_APPROX_SIMPLE);for(var i=[],l=0;l<n.size();l++){var u=n.get(l),h=e.boundingRect(u);if(!(h.width*h.height<c)){for(var y=[],x=0;x<u.rows;x++)y.push({x:u.data32S[2*x],y:u.data32S[2*x+1]});var w=new e.Mat;e.fitLine(u,w,e.DIST_L2,0,0,0),i.push({points:y,box:h,line:w})}}for(var b=0,g=i;b<g.length;b++){var E=g[b],p=s(E),O=Object(o.a)(p,2),j=O[0],M=O[1];if(j&&M){var S=m(d(j,M)),k=m(v(j,M)),R=f(j,M);Object.assign(E,{length:S,diameter:k,thread:R})}}return t.delete(),r.delete(),n.delete(),a.delete(),i}function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:32;if(e<0)return{whole:0,num:0,den:1};for(var r=Math.floor(e),n=e-r,a=2;Math.abs(Math.round(n*a)-n*a)>.1&&a!==t;)a*=2;return{whole:r,num:Math.round(n*a),den:a}}r.d(t,"a",(function(){return y}))},function(e,t,r){e.exports=r(17)},,,,,function(e,t,r){},,function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(4),i=r.n(o),l=(r(15),r(5));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(l.a,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.a91cd438.chunk.js.map