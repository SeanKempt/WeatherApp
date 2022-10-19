const locationInput = document.querySelector(`#location-set`);
const locationBtn = document.querySelector(`#location-btn`);

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
  console.log(weather);
};

locationBtn.addEventListener('click', () => {
  getWeather(locationInput.value);
});

//find way to round the values of the raw weather data. I want to run the math.round method against all of the data returned from the API
