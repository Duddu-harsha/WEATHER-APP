import React from 'react';

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="current-weather-card">
      <div className="weather-header">
        <h2 className="location-name">
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <div className="weather-main">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="weather-icon"
          />
          <div className="temperature-info">
            <div className="current-temp">
              {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="weather-description">
              {weatherData.weather[0].description}
            </div>
          </div>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-value">
            {Math.round(weatherData.main.feels_like)}°C
          </div>
          <div className="detail-label">Feels Like</div>
        </div>
        <div className="detail-item">
          <div className="detail-value">
            {weatherData.main.humidity}%
          </div>
          <div className="detail-label">Humidity</div>
        </div>
        <div className="detail-item">
          <div className="detail-value">
            {Math.round(weatherData.wind.speed * 3.6)} km/h
          </div>
          <div className="detail-label">Wind Speed</div>
        </div>
        <div className="detail-item">
          <div className="detail-value">
            {weatherData.main.pressure} hPa
          </div>
          <div className="detail-label">Pressure</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
