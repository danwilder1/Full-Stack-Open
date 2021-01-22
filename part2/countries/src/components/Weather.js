const Weather = ({ weather }) => {
  const convertToF = (c) => (c * 9) / 5 + 32;

  if (typeof weather !== "undefined") {
    return (
      <>
        <h3>Weather in {weather.location.name}</h3>
        <p>
          <strong>temperature:</strong>{" "}
          {convertToF(weather.current.temperature)} Fahrenheit
        </p>
        <img src={weather.current.weather_icons[0]} alt="weather icon" />
        <p>
          <strong>wind:</strong> {weather.current.wind_speed} mph direction{" "}
          {weather.current.wind_dir}
        </p>
      </>
    );
  }

  // no weather
  return <div></div>;
};

export default Weather;
