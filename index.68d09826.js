var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t=/^\s+|\s+$/g,n=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,i=/^0o[0-7]+$/i,r=parseInt,c="object"==typeof e&&e&&e.Object===Object&&e,f="object"==typeof self&&self&&self.Object===Object&&self,s=c||f||Function("return this")(),a=Object.prototype.toString,l=Math.max,u=Math.min,p=function(){return s.Date.now()};function b(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function d(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==a.call(e)}(e))return NaN;if(b(e)){var c="function"==typeof e.valueOf?e.valueOf():e;e=b(c)?c+"":c}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(t,"");var f=o.test(e);return f||i.test(e)?r(e.slice(2),f?2:8):n.test(e)?NaN:+e}const y=document.querySelector(".search-form").value,m=document.querySelector('button[type="submit"]');const v=e=>document.querySelector(e);m.addEventListener("click",(function(e){e.preventDefault(),t=y.value,fetch(`https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&q=${t}&image_type=photo`).then((e=>{if(!e.ok)throw new Error("404");return e.json()})).then((e=>{const t=e.hits.map((e=>`<div class="photo-card">\n          <img src="${e.previewURL}" alt="" loading="lazy" />\n          <div class="info">\n            <p class="info-item">\n              <b>${e.likes}</b>\n            </p>\n            <p class="info-item">\n              <b>${e.views}</b>\n            </p>\n            <p class="info-item">\n              <b>${e.comments}</b>\n            </p>\n            <p class="info-item">\n              <b>${e.downloads}</b>\n            </p>\n          </div>\n        </div>`)).join("");v(".gallery").innerHTML+=t}));var t}));
//# sourceMappingURL=index.68d09826.js.map
