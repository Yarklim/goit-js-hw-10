// export function fetchCountries(name) {
//   const URL = 'https://restcountries.com/v3.1/name/';
//   const filter = '?fields=name,capital,population,flags,languages';
//   return fetch(`${URL}${name}${filter}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.json();
//   });
// }

export function fetchCountries(name) {
  const URL = 'https://restcountries.com/v3.1/name/';
  const FILTER = '?fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}/${name}?${FILTER}`).then(response => {
    if (!response.ok) {
      return new Error(response.status);
    }
    return response.json();
  });
}
