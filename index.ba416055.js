!function(){function n(n){return n&&n.__esModule?n.default:n}var t,e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={};Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(n){return n&&n.constructor===Symbol?"symbol":typeof n};var i=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,c=/^0o[0-7]+$/i,f=parseInt,a="object"==typeof e&&e&&e.Object===Object&&e,l="object"==typeof self&&self&&self.Object===Object&&self,s=a||l||Function("return this")(),d=Object.prototype.toString,p=Math.max,v=Math.min,b=function(){return s.Date.now()};function m(t){var e=void 0===t?"undefined":n(o)(t);return!!t&&("object"==e||"function"==e)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==(void 0===t?"undefined":n(o)(t))||function(n){return!!n&&"object"==typeof n}(t)&&"[object Symbol]"==d.call(t)}(t))return NaN;if(m(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=m(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var a=u.test(t);return a||c.test(t)?f(t.slice(2),a?2:8):r.test(t)?NaN:+t}t=function(n,t,e){var o,i,r,u,c,f,a=0,l=!1,s=!1,d=!0;if("function"!=typeof n)throw new TypeError("Expected a function");function g(t){var e=o,r=i;return o=i=void 0,a=t,u=n.apply(r,e)}function h(n){return a=n,c=setTimeout(w,t),l?g(n):u}function j(n){var e=n-f;return void 0===f||e>=t||e<0||s&&n-a>=r}function w(){var n=b();if(j(n))return T(n);c=setTimeout(w,function(n){var e=t-(n-f);return s?v(e,r-(n-a)):e}(n))}function T(n){return c=void 0,d&&o?g(n):(o=i=void 0,u)}function O(){var n=b(),e=j(n);if(o=arguments,i=this,f=n,e){if(void 0===c)return h(f);if(s)return c=setTimeout(w,t),g(f)}return void 0===c&&(c=setTimeout(w,t)),u}return t=y(t)||0,m(e)&&(l=!!e.leading,r=(s="maxWait"in e)?p(y(e.maxWait)||0,t):r,d="trailing"in e?!!e.trailing:d),O.cancel=function(){void 0!==c&&clearTimeout(c),a=0,o=f=i=c=void 0},O.flush=function(){return void 0===c?u:T(b())},O};var g=document.querySelector(".search-form"),h=document.querySelector('button[type="submit"]');var j=function(n){return document.querySelector(n)};g.addEventListener("input",n(t)((function(n){var t=n.target.value.trim();console.log(t)}),300)),h.addEventListener("click",(function(n){n.preventDefault(),fetch("https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&q=yellow+flowers&image_type=photo").then((function(n){return n.json()})).then((function(n){var t=n.hits.map((function(n){return'<div class="photo-card">\n          <img src="'.concat(n.previewURL,'" alt="" loading="lazy" />\n          <div class="info">\n            <p class="info-item">\n              <b>').concat(n.likes,'</b>\n            </p>\n            <p class="info-item">\n              <b>').concat(n.views,'</b>\n            </p>\n            <p class="info-item">\n              <b>').concat(n.comments,'</b>\n            </p>\n            <p class="info-item">\n              <b>').concat(n.downloads,"</b>\n            </p>\n          </div>\n        </div>")})).join("");j(".gallery").innerHTML+=t}))}))}();
//# sourceMappingURL=index.ba416055.js.map
