import axios from 'axios';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ref = {
  form: document.querySelector('.search-form'),
  formInput: document.querySelector('.search-form__input'),
  searchBtn: document.querySelector('.search-btn'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more-btn'),
};

const DEBOUNCE_TIME = 300;
let inputValue = '';
let page = 1;

const KEY = '31349139-c34332f5cc1455d1f889740ec';
const IMG_OPTIONS =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

ref.form.addEventListener('submit', onSubmit);
ref.formInput.addEventListener('input', debounce(getInputValue, DEBOUNCE_TIME));
ref.loadBtn.addEventListener('click', loadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: alt,
  captionDelay: 250,
});

function onSubmit(e) {
  e.preventDefault();
  clearAll();
  page = 1;

  makeResult(page);
}

function clearAll() {
  ref.gallery.innerHTML = '';
}

function getInputValue(e) {
  inputValue = e.target.value.trim();
  console.log(inputValue);
}

function loadMore(e) {
  e.preventDefault();
  page += 1;
  makeResult(page);
}

async function makeResult(page) {
  const data = await fetchAxios(page);
  const markup = await makeMarkup(data);
  lightbox.refresh();
}

function makeMarkup(data) {
  if (inputValue === '' || data.total === 0) {
    buttonLoadMoreDisable();
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (data.total > 40) {
    buttonLoadMoreAvailable();
    Notify.info(`Hooray! We found ${data.totalHits} images.`);
  } else if (data.total < 40 && data.total !== 0) {
    buttonLoadMoreDisable();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }

  const markup = data.hits
    .map(item => {
      return `<div class="photo-card">
  <a
    class="gallery__link"
    href="${item.largeImageURL}"
    onclick="event.preventDefault()"
    ><img
      class="small-img"
      src="${item.webformatURL}"
      alt="${item.tags}"
      loading="lazy"
  /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${item.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');

  return ref.gallery.insertAdjacentHTML('beforeend', markup);
}

function buttonLoadMoreAvailable() {
  ref.loadBtn.classList.remove('is-hidden');
}

function buttonLoadMoreDisable() {
  ref.loadBtn.classList.add('is-hidden');
}

async function fetchAxios(page) {
  let url = await axios.get(
    `https://pixabay.com/api/?key=${KEY}&q=${inputValue}&${IMG_OPTIONS}&page=${page}`
  );
  const data = url.data;
  return data;
}

// // console.log(inputValue.value);
// // const value = inputValue.value;
// // console.log(value);
// const getEl = x => document.querySelector(x);
// getEl('input').addEventListener(
//   'input',
//   debounce(onInputChange, DEBOUNCE_TIME)
// );
// getEl('button[type="submit"]').addEventListener('click', toMarkup);

// const loadBtn = document.querySelector('.load-more-button');

// function getData(text) {
//   return fetch(
//     `https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&q=${text}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('404');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       // console.log(data.totalHits);
//       if (inputValue === '' || data.total === 0) {
//         resetPage();

//         buttonLoadMoreDisable();
//         Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         return (getEl('.gallery').innerHTML = '');
//       }
//       if (data.total > 1) {
//       }

//       if (data.total > 40) {
//         buttonLoadMoreAvailable();
//         Notify.info(`Hooray! We found ${data.totalHits} images.`);
//       }

//       if (data.total < 40 && data.total !== 0) {
//         buttonLoadMoreDisable();
//         Notify.info(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }

//       const markup = data.hits
//         .map(
//           item => `<a class="gallery__link" href="${item.largeImageURL}" onclick="event.preventDefault()">
//           <div class="photo-card">
//           <img class="small-img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
//           <div class="info">
//             <p class="info-item">
//               <b>Likes: ${item.likes}</b>
//             </p>
//             <p class="info-item">
//               <b>Views: ${item.views}</b>
//             </p>
//             <p class="info-item">
//               <b>Comments: ${item.comments}</b>
//             </p>
//             <p class="info-item">
//               <b>Downloads: ${item.downloads}</b>
//             </p>
//           </div>
//         </div></a>`
//         )
//         .join('');

//       getEl('.gallery').innerHTML += markup;
//       page++;
//     });
// }

// loadBtn.addEventListener('click', toMarkup);

// function onInputChange(e) {
//   inputValue = e.target.value.trim();
//   console.log(inputValue);
// }

// function toMarkup(e) {
//   e.preventDefault();

//   getData(inputValue);
// }
// function buttonLoadMoreAvailable() {
//   loadBtn.classList.remove('is-hidden');
// }

// function buttonLoadMoreDisable() {
//   loadBtn.classList.add('is-hidden');
// }

// function clearAll() {
//   if (inputValue === '') {
//     buttonLoadMoreDisable();
//   }
// }
// function resetPage() {
//   page = 1;
// }

// const lightbox = new SimpleLightbox('.gallery__link', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
