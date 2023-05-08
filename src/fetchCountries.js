async function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags.svg,languages`;
  const response = await fetch(url);
  const countries = await response.json();
  return countries;
}

export { fetchCountries };
