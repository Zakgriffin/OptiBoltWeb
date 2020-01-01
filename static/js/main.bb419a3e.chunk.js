(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],[,,,,,function(t,e,r){"use strict";(function(t){r.d(e,"a",(function(){return v}));var n=r(1),a=r(0),o=r.n(a),i=r(6),u=r.n(i),l=r(7),c=r(8),y={width:500,height:200,facingMode:"user"};function v(){var e=Object(l.a)("opencv.js"),r=Object(n.a)(e,1)[0],i=Object(a.useRef)(),v=Object(a.useRef)();return Object(a.useEffect)((function(){if(r){var e=t.cv,n=document.getElementById("video"),a=new e.VideoCapture(n);setInterval((function(){if(e.Mat){var t=new e.Mat(n.height,n.width,e.CV_8UC4);a.read(t),Object(c.a)(e,t)}}),100)}}),[r]),o.a.createElement(o.a.Fragment,null,o.a.createElement("canvas",{ref:v,id:"canvasOutput"}),o.a.createElement("canvas",{id:"canvasOutput2"}),o.a.createElement(u.a,{id:"video",audio:!1,height:720,ref:i,screenshotFormat:"image/jpeg",width:1280,videoConstraints:y}))}}).call(this,r(15))},,function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(1),a=r(0),o=[];function i(t){var e=Object(a.useState)({loaded:!1,error:!1}),r=Object(n.a)(e,2),i=r[0],u=r[1];return Object(a.useEffect)((function(){if(!o.includes(t)){o.push(t);var e=document.createElement("script");e.src=t,e.async=!0;var r=function(){u({loaded:!0,error:!1})},n=function(){var r=o.indexOf(t);r>=0&&o.splice(r,1),e.remove(),u({loaded:!0,error:!0})};return e.addEventListener("load",r),e.addEventListener("error",n),document.body.appendChild(e),function(){e.removeEventListener("load",r),e.removeEventListener("error",n)}}u({loaded:!0,error:!1})}),[t]),[i.loaded,i.error]}},function(t,e,r){"use strict";var n,a,o,i,u,l,c,y,v=r(1),f=r(2),d=144,h=.3*d,s=.1*d,x=.7,p=(n={},Object(f.a)(n,3/8,[0,0,255]),Object(f.a)(n,5/8,[0,255,0]),Object(f.a)(n,.75,[255,0,0]),Object(f.a)(n,1,[255,0,255]),Object(f.a)(n,2.25,[255,255,0]),n),m=(a={},Object(f.a)(a,3/16,[0,0,255]),Object(f.a)(a,1/8,[255,0,0]),a),b={13:[0,0,255],17:[0,255,0],15:[255,0,255],19:[255,255,0]},w=(Object.keys(p).map((function(t){return parseFloat(t)})),Object.keys(m).map((function(t){return parseFloat(t)})),Object.keys(b).map((function(t){return parseFloat(t)})),10);function E(){!function(t,e,r,n,a,o,i){var u=e.x,l=e.y,c=r.x,v=r.y,f={x:u,y:l},d={x:c,y:l},h={x:c,y:v},s={x:u,y:v};y.line(t,{x:f.x+i,y:f.y},{x:d.x-i,y:d.y},n,a,o),y.line(t,{x:d.x,y:d.y+i},{x:h.x,y:h.y-i},n,a,o),y.line(t,{x:s.x+i,y:s.y},{x:h.x-i,y:h.y},n,a,o),y.line(t,{x:f.x,y:f.y+i},{x:s.x,y:s.y-i},n,a,o)}(o,{x:i-w,y:u-w},{x:i+l+w,y:u+c+w},new y.Scalar(255,255,255),2,8,10)}function g(t,e,r){!function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:0,y:0},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new y.Scalar(255,255,255),a=t.whole,i=t.num,u=t.den,l=r.x,c=r.y;y.putText(o,a+" in",{x:l,y:c},y.FONT_HERSHEY_SIMPLEX,1,n,1),y.putText(o,i.toString(),{x:l+20,y:c-15},y.FONT_HERSHEY_SIMPLEX,.4,n,1),y.putText(o,u.toString(),{x:l+20,y:c},y.FONT_HERSHEY_SIMPLEX,.4,n,1),y.putText(o,e,{x:l+65,y:c},y.FONT_HERSHEY_SIMPLEX,.3,n,1),y.line(o,{x:l+20,y:c-12},{x:l+35,y:c-12},n,1)}(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:32;if(t<0)return{whole:0,num:0,den:1};var r=Math.floor(t),n=t-r,a=2;for(;Math.abs(Math.round(n*a)-n*a)>.1&&a!==e;)a*=2;var o=Math.round(n*a);return{whole:r,num:o,den:a}}(e),"Diam",{x:i+l+15,y:u+35}),function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:0,y:0},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new y.Scalar(255,255,255),a=r.x,i=r.y;y.putText(o,t,{x:a,y:i},y.FONT_HERSHEY_SIMPLEX,1,n,1),y.putText(o,e,{x:a+65,y:i},y.FONT_HERSHEY_SIMPLEX,.3,n,1)}(r.toString(),"Threads",{x:i+l+15,y:u+70},new y.Scalar(255,255,255))}function O(t,e){function r(t){return t[t.length-1].x-t[0].x}return(r(t)+r(e))/2/d}function S(t,e){function r(t){var e=0;return t.map((function(t){return e+=t.y})),e/t.length}return(r(t)+r(e))/d}function M(t,e){function r(t){var e=[],r=0,n=!1,a=0,o=!0,i=!1,u=void 0;try{for(var l,c=t[Symbol.iterator]();!(o=(l=c.next()).done);o=!0){var y=l.value,v=y.y;n&&v-x>r||!n&&v+x<r?(n&&(a++,e.push(y)),n=!n):r=v}}catch(f){i=!0,u=f}finally{try{o||null==c.return||c.return()}finally{if(i)throw u}}return a}var n=r(t),a=r(e);return Math.round((n+a)/2)}function j(t,e){var r=Object(v.a)(t.line.data32F,4),n=r[0],a=r[1],o=r[2],i=r[3],u=Math.atan2(a,n),l=[],c=!0,y=!1,f=void 0;try{for(var d,h=t.points[Symbol.iterator]();!(c=(d=h.next()).done);c=!0){var x=d.value,p=o-x.x,m=i-x.y,b=Math.sqrt(p*p+m*m),w=Math.atan2(m,p),E=b*Math.cos(w-u),g=b*Math.sin(w-u);l.push({x:E,y:g})}}catch(nt){y=!0,f=nt}finally{try{c||null==h.return||h.return()}finally{if(y)throw f}}for(var O=[],S=[],M=[],j=l[0].y<0,_=0,R=0,T=l;R<T.length;R++){var H=T[R];H.y<0!==j&&(_++,j=!j),_>=2?M.push(H):H.y<0?O.push(H):S.push(H)}j?O=M.concat(O):S=M.concat(S);var L={x:0,y:0},I=!0,F=!1,N=void 0;try{for(var C,P=S[Symbol.iterator]();!(I=(C=P.next()).done);I=!0){var k=C.value;k.y>L.y&&(L=k)}}catch(nt){F=!0,N=nt}finally{try{I||null==P.return||P.return()}finally{if(F)throw N}}var X=!0,Y=!1,A=void 0;try{for(var B,V=O[Symbol.iterator]();!(X=(B=V.next()).done);X=!0){var D=B.value;D.y=-D.y}}catch(nt){Y=!0,A=nt}finally{try{X||null==V.return||V.return()}finally{if(Y)throw A}}if(L.x<0){var G=!0,J=!1,W=void 0;try{for(var q,z=O[Symbol.iterator]();!(G=(q=z.next()).done);G=!0){var U=q.value;U.x=-U.x}}catch(nt){J=!0,W=nt}finally{try{G||null==z.return||z.return()}finally{if(J)throw W}}var $=!0,K=!1,Q=void 0;try{for(var Z,tt=S[Symbol.iterator]();!($=(Z=tt.next()).done);$=!0){var et=Z.value;et.x=-et.x}}catch(nt){K=!0,Q=nt}finally{try{$||null==tt.return||tt.return()}finally{if(K)throw Q}}S.reverse()}else O.reverse();var rt=function(t){var e=0;if(0===t.length)return[];var r=!0,n=!1,a=void 0;try{for(var o,i=t[Symbol.iterator]();!(r=(o=i.next()).done);r=!0){e+=o.value.y}}catch(nt){n=!0,a=nt}finally{try{r||null==i.return||i.return()}finally{if(n)throw a}}e/=t.length;for(var u=0;u<t.length;u++)if(t[u].y>e+s){t=t.slice(0,u);break}return t};return O=rt(O),S=rt(S),O.length&&S.length?[O,S]:[null,null]}function _(t,e){y=t;var r=new t.Mat;t.cvtColor(e,r,t.COLOR_RGBA2GRAY,0),t.threshold(r,r,80,255,t.THRESH_BINARY_INV);var n=new t.MatVector,a=new t.Mat;t.findContours(r,n,a,t.RETR_EXTERNAL,t.CHAIN_APPROX_SIMPLE);for(var f,d=[],s=0;s<n.size();s++){var x=n.get(s),p=t.boundingRect(x);if(!(p.width*p.height<h)){for(var m=[],b=0;b<x.rows;b++)m.push({x:x.data32S[2*b],y:x.data32S[2*b+1]});var w=new t.Mat;t.fitLine(x,w,t.DIST_L2,0,0,0),d.push({points:m,box:p,line:w})}}o=e;for(var _=0,R=d;_<R.length;_++){var T=R[_],H=j(T),L=Object(v.a)(H,2),I=L[0],F=L[1];if(I&&F){var N=!0,C=!1,P=void 0;try{for(var k,X=I[Symbol.iterator]();!(N=(k=X.next()).done);N=!0){var Y=k.value,A=new t.Scalar(255,0,0);t.circle(e,{x:Y.x+T.box.x,y:Y.y+T.box.y},0,A,0)}}catch(D){C=!0,P=D}finally{try{N||null==X.return||X.return()}finally{if(C)throw P}}O(I,F);var B=S(I,F),V=M(I,F);f=T.box,i=f.x,u=f.y,l=f.width,c=f.height,E();g(0,B,V)}}t.imshow("canvasOutput",e),t.imshow("canvasOutput2",r),e.delete(),r.delete(),n.delete(),a.delete()}r.d(e,"a",(function(){return _}))},function(t,e,r){t.exports=r(16)},,,,,function(t,e,r){},,function(t,e,r){"use strict";r.r(e);var n=r(0),a=r.n(n),o=r(4),i=r.n(o),u=(r(14),r(5));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(u.a,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.bb419a3e.chunk.js.map