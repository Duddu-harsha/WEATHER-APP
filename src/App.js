import React, { useState, useEffect } from 'react';
import WeatherChart from './components/WeatherChart';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Hyderabad');

  // Use environment variable for OpenWeatherMap API key
  const API_KEY = "7d9b7353feadaa5763ecf37b43bcef52";
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  // Fetch current weather
  const fetchCurrentWeather = async (cityName) => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('Weather data not found');
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Failed to fetch current weather: ${err.message}`);
    }
  };

  // Fetch 5-day forecast
  const fetchForecast = async (cityName) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('Forecast data not found');
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Failed to fetch forecast: ${err.message}`);
    }
  };

  // Generate mock historical data (since historical API requires paid plan)
  const generateHistoricalData = (currentTemp) => {
    const today = new Date();
    const historicalData = [];
    
    for (let i = 7; i >= 1; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Generate realistic temperature variations
      const tempVariation = (Math.random() - 0.5) * 10;
      const temp = currentTemp + tempVariation;
      
      historicalData.push({
        date: date.toLocaleDateString('en-IN', { 
          month: 'short', 
          day: 'numeric' 
        }),
        temp: Math.round(temp * 10) / 10,
        humidity: Math.round(40 + Math.random() * 40),
        pressure: Math.round(1000 + Math.random() * 50)
      });
    }
    
    return historicalData;
  };

  // Fetch all weather data
  const fetchWeatherData = async (cityName = city) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather and forecast in parallel
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecast(cityName)
      ]);

      setCurrentWeather(current);
      setForecastData(forecast);
      
      // Generate historical data based on current temperature
      const historical = generateHistoricalData(current && current.main ? current.main.temp : 25);
      setHistoricalData(historical);
      
      setCity(cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle city search
  const handleCitySearch = (newCity) => {
    if (newCity.trim()) {
      fetchWeatherData(newCity.trim());
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Prepare chart data
  const prepareChartData = () => {
    if (!forecastData || !historicalData || !forecastData.list) return { forecast: null, historical: null };

    const forecastChartData = {
      labels: forecastData.list.slice(0, 8).map(item => 
        new Date(item.dt * 1000).toLocaleTimeString('en-IN', {
          hour: '2-digit',
          day: 'numeric',
          month: 'short'
        })
      ),
      datasets: [
        {
          label: 'Temperature (°C)',
          data: forecastData.list.slice(0, 8).map(item => item.main ? Math.round(item.main.temp) : null),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
        },
        {
          label: 'Feels Like (°C)',
          data: forecastData.list.slice(0, 8).map(item => item.main ? Math.round(item.main.feels_like) : null),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: false,
          tension: 0.4,
          pointBackgroundColor: 'rgb(239, 68, 68)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
        }
      ]
    };

    const historicalChartData = {
      labels: historicalData.map(item => item.date),
      datasets: [
        {
          label: 'Temperature (°C)',
          data: historicalData.map(item => item.temp),
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1,
        },
        {
          label: 'Humidity (%)',
          data: historicalData.map(item => item.humidity),
          backgroundColor: 'rgba(168, 85, 247, 0.8)',
          borderColor: 'rgb(168, 85, 247)',
          borderWidth: 1,
        }
      ]
    };

    return { forecast: forecastChartData, historical: historicalChartData };
  };

  const chartData = prepareChartData();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => fetchWeatherData()} />;
  }

  return (
    <div className="app">
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">🌤️ Weather Dashboard</h1>
          <p className="app-subtitle">Current and Historical Weather Information</p>
        </header>

        {/* Search Bar */}
        <SearchBar onSearch={handleCitySearch} />

        {/* Current Weather Card */}
        {currentWeather && (
          <CurrentWeather weatherData={currentWeather} />
        )}

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Forecast Chart */}
          {chartData.forecast && (
            <div className="chart-card">
              <h3 className="chart-title">📈 24-Hour Forecast</h3>
              <WeatherChart 
                data={chartData.forecast} 
                type="line" 
                title="Temperature Forecast"
              />
            </div>
          )}

          {/* Historical Chart */}
          {chartData.historical && (
            <div className="chart-card">
              <h3 className="chart-title">📊 Past 7 Days</h3>
              <WeatherChart 
                data={chartData.historical} 
                type="bar" 
                title="Historical Data"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <p>Weather data provided by OpenWeatherMap API</p>
          <p>Last updated: {new Date().toLocaleString('en-IN')}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;