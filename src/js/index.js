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
  } else if (data.total < 40) {
    buttonLoadMoreDisable();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }

  const markup = data.hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      
      <div class="photo-card">
         <div class="thumb"> 
            <a class="gallery__link" href="${largeImageURL}">
              <img class="small-img" src="${webformatURL}" alt="${tags}"loading="lazy"/>
            </a>
         </div>
         <div class="info">
           <p class="info-item">
             <b>Likes: ${likes}</b>
           </p>
           <p class="info-item">
             <b>Views: ${views}</b>
           </p>
           <p class="info-item">
             <b>Comments: ${comments}</b>
           </p>
           <p class="info-item">
            <b>Downloads: ${downloads}</b>
           </p>
         </div>
</div>`;
      }
    )
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

const lightbox = new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 350,
});
