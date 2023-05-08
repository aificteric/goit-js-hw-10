async function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  const response = await fetch(url);
  const countries = await response.json();
  return countries;
}

export { fetchCountries };
