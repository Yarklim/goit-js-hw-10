const BASE_URL = 'https://restcountries.com/v3.1/name';
const filter = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?${filter}`).then(response => {
    if (response.status === 404) {
      return Promise.reject(new Error());
    }
    return response.json();
  });
}
