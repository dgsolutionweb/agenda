if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const a=e=>n(e,o),d={module:{uri:o},exports:r,require:a};i[o]=Promise.all(s.map((e=>d[e]||a(e)))).then((e=>(c(...e),r)))}}define(["./workbox-4e52a84b"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-cOORfcwj.css",revision:null},{url:"assets/index-DvhZ-zO9.js",revision:null},{url:"custom-sw.js",revision:"358aa4ca4eb96daa216464cab50cbfd1"},{url:"icons/icon-128x128.png",revision:"36cb593ca2a590ed7e3c93a4f4a6ad2a"},{url:"icons/icon-144x144.png",revision:"a40cd817dd77c7f0e6ac1cba41003771"},{url:"icons/icon-152x152.png",revision:"39865efa411c87fa1070ebc2b57f9737"},{url:"icons/icon-192x192.png",revision:"75308c4f7d49b623c7ff2b24de4c6aa5"},{url:"icons/icon-384x384.png",revision:"3ed4868e342f8c239200a539dfc17530"},{url:"icons/icon-512x512.png",revision:"fdcb2452d89d0d1e797ec22b32c6cb33"},{url:"icons/icon-512x512.svg",revision:"9478a6e57908bc865c1ad176dc28a6d7"},{url:"icons/icon-72x72.png",revision:"74e83efa211564fdb390e521ffaa17bd"},{url:"icons/icon-96x96.png",revision:"d6146fe83b4aa66e314fc947a5866954"},{url:"index.html",revision:"3d6b87a6b4917070bae943935649ed65"},{url:"manifest.json",revision:"1df6e3aaf174f3bbfebf1ceb8b27e5f1"},{url:"registerSW.js",revision:"af8e2d96c8802615d2edca91185724bb"},{url:"manifest.webmanifest",revision:"6801c030113e9ff0ed6c293bed663ab5"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
