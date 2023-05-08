import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  countryList: document.querySelector('.country-list'),
  searchBox: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(fetchCall, DEBOUNCE_DELAY));

function fetchCall() {
  const countryName = refs.searchBox.value.trim();
  if (countryName === '') {
    clearList();
    return;
  }
  clearList();

  fetchCountries(countryName).then(formulatingCountriesList).catch(answerError);
}

function formulatingCountriesList(name) {
  if (name.length >= 10) {
    answerWarning();
    return;
  } else if (name.length > 1 && name.length < 10) {
    multipleCountriesList(name);
  } else {
    oneCountryList(name);
  }
}

function multipleCountriesList(name) {
  name.map(({ flags, name }) => {
    const listMarkup = `<div class="list__item"><img src="${flags.svg}" width="35" height="25"><li>${name.official}</li></ul></div>`;
    refs.countryList.innerHTML += listMarkup;
  });
}

function oneCountryList(name) {
  name.map(({ flags, name, capital, population, languages }) => {
    const listMarkup = `<div class="list__item"><img src="${
      flags.svg
    }" width="35" height="25">
      <h2 class="country__name">${name.official}</h2>
      <p class="country__paragraph"><span class="simple__text">Capital:</span>${capital}</p>
      <p class="country__paragraph"><span class="simple__text">Population:</span>${population}</p>
      <p class="country__paragraph"><span class="simple__text">Languages:</span>${Object.values(
        languages
      ).join(', ')}</p></div>`;

    refs.countryList.innerHTML += listMarkup;
  });
}

function answerError() {
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    position: 'right-top',
    timeout: 2000,
  });
}

function answerWarning() {
  Notiflix.Notify.warning(
    'Too many matches found. Please enter a more specific name.',
    {
      position: 'right-top',
      timeout: 2000,
    }
  );
}

function clearList() {
  refs.countryList.innerHTML = '';
}
