const locationInput = document.querySelector(`#location-set`);
const locationBtn = document.querySelector(`#location-btn`);

const roundValue = (obj) => {
  const roundedObj = obj;
  Object.keys(roundedObj).map((key) => {
    if (typeof roundedObj[key] === 'number') {
      roundedObj[key] = Math.round(roundedObj[key]);
    }
    return roundedObj;
  });
};

const processWeather = (data) => {
  const {
    temp,
    feels_like: feelsLike,
    temp_max: high,
    temp_min: low,
  } = data.main;
  const locName = data.name;
  const weatherObj = { locName, temp, high, low, feelsLike };
  return weatherObj;
};

const getWeather = async (query) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=2295d0f4dadcc49534d0587adc7a6672&units=imperial`
  );
  const data = await response.json();
  const weather = processWeather(data);
  roundValue(weather);
  console.log(weather);
};

locationBtn.addEventListener('click', () => {
  getWeather(locationInput.value);
});
