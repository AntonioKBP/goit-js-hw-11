const inputRef = document.querySelector('.search-form');
const searchBtnRef = document.querySelector('button[type="submit"]');

// https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&q=yellow+flowers&image_type=photo

function getData() {
  return fetch(
    'https://pixabay.com/api/?key=31349139-c34332f5cc1455d1f889740ec&q=yellow+flowers&image_type=photo'
  )
    .then(r => r.json())
    .then(data => console.log(data));
}
getData();

inputRef.addEventListener('input', onInputChange);
searchBtnRef.addEventListener('click', toMarkup);

function onInputChange(e) {
  console.log(e.target.value);
}

function toMarkup() {}
