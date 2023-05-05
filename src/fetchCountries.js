export { fetchCountries };

const fetchCountries = async name => {
  const response =
    await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags
    `);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};
