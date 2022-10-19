const locationInput = document.querySelector(`#location-set`);
const locationBtn = document.querySelector(`#location-btn`);
const mainBackground = document.querySelector(`#main-container`);

const roundValue = (obj) => {
  const roundedObj = obj;
  Object.keys(roundedObj).map((key) => {
    if (typeof roundedObj[key] === 'number') {
      roundedObj[key] = Math.round(roundedObj[key]);
    }
    return roundedObj;
  });
};

const capatalize = (word) => {
  const newWord = word
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  return newWord;
};

const renderWeather = (data) => {
  const tempHigh = document.querySelector('#high-temp');
  const tempLow = document.querySelector('#low-temp');
  const current = document.querySelector('#current-temp');
  const skies = document.querySelector('#skies');
  const name = document.querySelector('#city-name');
  const feel = document.querySelector('#feels-like');

  tempHigh.textContent = `H: ${data.high}\xB0F`;
  tempLow.textContent = `L: ${data.low}\xB0F`;
  current.textContent = `${data.temp}\xB0F`;
  feel.textContent = `Feels like: ${data.feelsLike}\xB0F`;
  name.textContent = data.locName;
  skies.textContent = data.description;
};

const processWeather = (data) => {
  const {
    temp,
    feels_like: feelsLike,
    temp_max: high,
    temp_min: low,
  } = data.main;
  let { description } = data.weather[0];
  description = capatalize(description);
  const locName = data.name;
  const weatherObj = { locName, temp, high, low, feelsLike, description };
  return weatherObj;
};

const getBackground = async (query) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=VLCvlb8U8TbnVjd481K4EbnONcHHDjaX&q=${query}+weather`,
    { mode: 'cors' }
  );
  const bgData = await response.json();
  console.log(bgData);
  mainBackground.style.backgroundImage = `url(${bgData.data[0].images.original.url})`;
};

const getWeather = async (query) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=2295d0f4dadcc49534d0587adc7a6672&units=imperial`
    );
    const data = await response.json();
    console.log(data);
    const weather = processWeather(data);
    roundValue(weather);
    renderWeather(weather);
    getBackground(weather.description);
  } catch (error) {
    console.log(error);
    console.log(`something went wrong!`);
  }
};

locationInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    locationBtn.click();
  }
});

locationBtn.addEventListener('click', () => {
  getWeather(locationInput.value);
});
