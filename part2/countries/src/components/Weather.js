const Weather = ({ weather }) => {
  if (typeof weather !== "undefined" && weather.status === 200) {
    return (
      <>
        <h3>Weather in {weather.data.name}</h3>
        <p>
          <strong>temperature:</strong> {weather.data.main.temp} Fahrenheit
        </p>
        <p>
          <strong>wind:</strong> {weather.data.wind.speed} mph
        </p>
      </>
    );
  }

  // no weather
  return <div></div>;
};

export default Weather;
