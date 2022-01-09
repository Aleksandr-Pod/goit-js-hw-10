export function fetchCountries(searchValue) {
    return fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
        .then(response => response.json());
    }