import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

function inputHandler(e) {
  const textInput = e.target.value.trim();

  if (!textInput) {
    cleanMarkup(listEl);
    cleanMarkup(infoEl);
    return;
  }

  fetchCountries(textInput)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }
      markup(data);
    })
    .catch(err => {
      cleanMarkup(listEl);
      cleanMarkup(infoEl);
      Notify.failure('Oops, there is no country with that name');
    });
}

function cleanMarkup(ref) {
  return (ref.innerHTML = '');
}

function markup(data) {
  if (data.length === 1) {
    cleanMarkup(listEl);
    const markupInfo = createInfoMarkup(data);
    infoEl.innerHTML = markupInfo;
  } else {
    cleanMarkup(infoEl);
    const markupList = createListMarkup(data);
    listEl.innerHTML = markupList;
  }
}

function createListMarkup(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="60" height="40">${name.official}</li>`
    )
    .join('');
}

function createInfoMarkup(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.png}" alt="${
        name.official
      }" width="40" height="40">${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
}

inputEl.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
