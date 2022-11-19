const inputRef = document.querySelector('.search-form');
const searchBtnRef = document.querySelector('button[type="submit"]');
import debounce from 'lodash.debounce';

// https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&q=yellow+flowers&image_type=photo

const DEBOUNCE_TIME = 300;
let inputValue = 'dog';
console.log(inputValue);

function getData(text) {
  return fetch(
    `https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&q=${text}&image_type=photo`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('404');
      }
      return response.json();
    })
    .then(data => {
      const markup = data.hits
        .map(
          item => `<div class="photo-card">
          <img src="${item.previewURL}" alt="" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>${item.likes}</b>
            </p>
            <p class="info-item">
              <b>${item.views}</b>
            </p>
            <p class="info-item">
              <b>${item.comments}</b>
            </p>
            <p class="info-item">
              <b>${item.downloads}</b>
            </p>
          </div>
        </div>`
        )
        .join('');

      getEl('.gallery').innerHTML += markup;
    });
}

const getEl = x => document.querySelector(x);

inputRef.addEventListener('input', debounce(onInputChange, DEBOUNCE_TIME));
searchBtnRef.addEventListener('click', toMarkup);

function onInputChange(e) {
  const inputValue = e.target.value.trim();
  
}

function toMarkup(e) {
  e.preventDefault();

  getData(inputValue);
}

// .then(data => {
//       const markup = data.hits
//         .map(
//           item => `<div class="photo-card">
//           <img src="${data.pageURL}" alt="" loading="lazy" />
//           <div class="info">
//             <p class="info-item">
//               <b>${data.likes}</b>
//             </p>
//             <p class="info-item">
//               <b>${data.views}</b>
//             </p>
//             <p class="info-item">
//               <b>${data.comments}</b>
//             </p>
//             <p class="info-item">
//               <b>${data.downloads}</b>
//             </p>
//           </div>
//         </div>`
//         )
//         .join('');
//       getEl('.gallery').innerHTML += markup;
//     });
