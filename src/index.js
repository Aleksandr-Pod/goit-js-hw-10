import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import 'notiflix/dist/notiflix-3.2.2.min.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const ref = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

ref.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    const searchValue = ref.searchBox.value.trim();
    if (!searchValue) {
        ref.countryList.innerHTML = "";
        ref.countryInfo.innerHTML = "";
        return;
    }
    fetchCountries(searchValue)
        .then(data => show(data))
        .catch(reject => {
            Notiflix.Notify.warning('Oops, there is no country with that name');
            return
        })
}

function show(data) {
    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    } else if (data.length > 1) {
        renderCountryList(data);
        return;
    }
    renderCountryInfo(data);
}
function renderCountryList(data) {
    ref.countryList.innerHTML = markupList(data);
    ref.countryInfo.innerHTML = "";
}
function markupList(data) {
    return data.map(({flags, name}) => (
        `<li><image src="${flags.svg}" class="iconFlag" width="40" height="25"/> - ${name.official}`)).join("");
}
function renderCountryInfo(data) {
    ref.countryList.innerHTML = "";
    ref.countryInfo.innerHTML = markupInfo(data);
}
function markupInfo(data) {
    return data.map(({flags, name, capital, population, languages}) => `<image src="${flags.svg}" class="iconFlag" width="40" height="25"/>
         <h2>${name.official}</h2>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages).join(', ')}</p>`
    ).join("")    
}
