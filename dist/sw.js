if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,o)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let r={};const d=e=>n(e,c),f={module:{uri:c},exports:r,require:d};i[c]=Promise.all(s.map((e=>f[e]||d(e)))).then((e=>(o(...e),r)))}}define(["./workbox-28fe7b12"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CWbCHCnw.js",revision:null},{url:"assets/index-DkeK9IYd.css",revision:null},{url:"index.html",revision:"b255213679ed3f4bf04c8d5f4ba14ba7"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"img/icons/icon-72x72.png",revision:"f9fef66e9c9f9b32e3309e3d25c6c89a"},{url:"img/icons/icon-96x96.png",revision:"b8a71f2321742680296a80bbeb944b77"},{url:"img/icons/icon-128x128.png",revision:"785a9adf96b783c6974687aa5d97599d"},{url:"img/icons/icon-144x144.png",revision:"963602e22099ea527348afe2ad03fcbe"},{url:"img/icons/icon-152x152.png",revision:"3e9455b075b35b05fe7cd85616ae4630"},{url:"img/icons/icon-192x192.png",revision:"b32c73421bd3b228159366a9de35e03b"},{url:"img/icons/icon-384x384.png",revision:"b29c956904ae45338dc130ebcac45cef"},{url:"img/icons/icon-512x512.png",revision:"0183690b8c98784e7314fe86a50ffb0e"},{url:"manifest.webmanifest",revision:"3cff4e93c630b2488d54dfd0d432abf7"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
