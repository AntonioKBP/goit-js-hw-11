!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function n(e){return e&&e.__esModule?e.default:e}var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e&&e.constructor===Symbol?"symbol":typeof e};var o=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,r=/^0o[0-7]+$/i,f=parseInt,a="object"==typeof e&&e&&e.Object===Object&&e,u="object"==typeof self&&self&&self.Object===Object&&self,l=a||u||Function("return this")(),s=Object.prototype.toString,d=Math.max,p=Math.min,b=function(){return l.Date.now()};function y(e){var o=void 0===e?"undefined":n(t)(e);return!!e&&("object"==o||"function"==o)}function v(e){if("number"==typeof e)return e;if(function(e){return"symbol"==(void 0===e?"undefined":n(t)(e))||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==s.call(e)}(e))return NaN;if(y(e)){var a="function"==typeof e.valueOf?e.valueOf():e;e=y(a)?a+"":a}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var u=c.test(e);return u||r.test(e)?f(e.slice(2),u?2:8):i.test(e)?NaN:+e}var m=document.querySelector(".search-form").value,h=document.querySelector('button[type="submit"]');var j=function(e){return document.querySelector(e)};h.addEventListener("click",(function(e){e.preventDefault(),n=m.value,fetch("https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&q=".concat(n,"&image_type=photo")).then((function(e){if(!e.ok)throw new Error("404");return e.json()})).then((function(e){var n=e.hits.map((function(e){return'<div class="photo-card">\n          <img src="'.concat(e.previewURL,'" alt="" loading="lazy" />\n          <div class="info">\n            <p class="info-item">\n              <b>').concat(e.likes,'</b>\n            </p>\n            <p class="info-item">\n              <b>').concat(e.views,'</b>\n            </p>\n            <p class="info-item">\n              <b>').concat(e.comments,'</b>\n            </p>\n            <p class="info-item">\n              <b>').concat(e.downloads,"</b>\n            </p>\n          </div>\n        </div>")})).join("");j(".gallery").innerHTML+=n}));var n}))}();
//# sourceMappingURL=index.f444bf68.js.map
