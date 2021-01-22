const Weather = ({ weather }) => {
  // Make sure API request went through
  if (typeof weather !== "undefined" && weather.status === 200) {
    return (
      <>
        <h3>Weather in {weather.data.name}</h3>
        <figure>
          <img
            src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <figcaption>{weather.data.weather[0].description}</figcaption>
        </figure>
        <p>
          <strong>temperature:</strong> {weather.data.main.temp} Fahrenheit
        </p>
        <p>
          <strong>humidity:</strong> {weather.data.main.humidity}%
        </p>
        <p>
          <strong>wind:</strong> {weather.data.wind.speed} mph
        </p>
      </>
    );
  }

  // no weather
  return <div>loading...</div>;
};

export default Weather;
