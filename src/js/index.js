import debounce from 'lodash.debounce';

// https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&q=yellow+flowers&image_type=photo

const DEBOUNCE_TIME = 300;
let inputValue;
// console.log(inputValue.value);
// const value = inputValue.value;
// console.log(value);
const getEl = x => document.querySelector(x);
getEl('input').addEventListener(
  'input',
  debounce(onInputChange, DEBOUNCE_TIME)
);
getEl('button[type="submit"]').addEventListener('click', toMarkup);

const loadBtn = document.querySelector('.load-more-button');

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
      console.log(data.total);
      if (data.total > 20) {
        buttonLoadMoreAvailable();
      }
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

function onInputChange(e) {
  inputValue = e.target.value.trim();
  console.log(inputValue);
}

function toMarkup(e) {
  e.preventDefault();

  getData(inputValue);
}
function buttonLoadMoreAvailable() {
  loadBtn.classList.remove('is-hidden');
}

function buttonLoadMoreDisable() {
  loadBtn.classList.add('is-hidden');
}

console.log(loadBtn);

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
