# 🌤️ Weather Dashboard

A modern, responsive weather dashboard built with React and Chart.js that displays current weather conditions and visualizes weather data through interactive charts.

## ✨ Features

- **Current Weather Display**: Real-time weather information with detailed metrics
- **Interactive Charts**: 
  - 24-hour temperature forecast (Line Chart)
  - 7-day historical data visualization (Bar Chart)
- **City Search**: Search weather for any city worldwide
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds with smooth animations
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Elegant loading animations and states

## 🚀 Live Demo

[View Live Demo](https://yourusername.github.io/weather-dashboard)

## 📸 Screenshots

![Weather Dashboard](./screenshots/dashboard.png)
*Main dashboard showing current weather and charts*

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Chart.js 4** - Data visualization
- **React-ChartJS-2** - React wrapper for Chart.js
- **Tailwind CSS** - Utility-first CSS framework
- **OpenWeatherMap API** - Weather data source
- **GitHub Pages** - Deployment platform

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- OpenWeatherMap API key

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate your API key
4. Copy the API key

### 4. Configure API Key

Open `src/App.js` and replace `YOUR_API_KEY_HERE` with your actual API key:

```javascript
const API_KEY = 'your_actual_api_key_here';
```

### 5. Start Development Server

```bash
npm start
# or
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment to GitHub Pages

### 1. Install gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Update package.json

Ensure your `package.json` has the correct homepage URL:

```json
{
  "homepage": "https://yourusername.github.io/weather-dashboard"
}
```

### 3. Deploy

```bash
npm run deploy
```

This will:
- Build the project
- Create a `gh-pages` branch
- Deploy to GitHub Pages

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Select `gh-pages` branch as source
4. Your app will be available at the homepage URL

## 📁 Project Structure

```
weather-dashboard/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point with error boundary
│   ├── index.css           # Global styles and animations
│   └── components/         # Reusable components (if any)
├── package.json            # Dependencies and scripts
├── README.md              # Project documentation
└── .gitignore             # Git ignore rules
```

## 🎨 Features Overview

### Current Weather Display
- Temperature with "feels like" information
- Weather conditions with icons
- Humidity, wind speed, and pressure
- Beautiful weather-themed design

### Chart Visualizations
- **Forecast Chart**: Interactive line chart showing 24-hour temperature and "feels like" data
- **Historical Chart**: Bar chart displaying past 7 days temperature and humidity
- **Responsive Charts**: Charts adapt to different screen sizes
- **Interactive Tooltips**: Hover effects with detailed information

### Search Functionality
- Search any city worldwide
- Real-time validation and error handling
- Automatic data refresh on city change
- Enter key support for quick searches

## 🔧 Configuration Options

### Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
REACT_APP_DEFAULT_CITY=Hyderabad
```

Then update your `App.js`:

```javascript
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'YOUR_API_KEY_HERE';
```

### Customization

#### Changing Default City
In `App.js`, modify the initial state:

```javascript
const [city, setCity] = useState('YourCity');
```

#### Chart Colors
Modify chart colors in the `forecastChartData` and `historicalChartData` objects:

```javascript
borderColor: 'rgb(59, 130, 246)', // Blue
backgroundColor: 'rgba(59, 130, 246, 0.1)', // Light blue
```

#### Temperature Units
To change from Celsius to Fahrenheit, update the API calls:

```javascript
`${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=imperial`
```

## 📊 API Endpoints Used

### Current Weather
```
GET https://api.openweathermap.org/data/2.5/weather
Parameters:
- q: city name
- appid: API key
- units: metric (Celsius) / imperial (Fahrenheit)
```

### 5-Day Forecast
```
GET https://api.openweathermap.org/data/2.5/forecast
Parameters:
- q: city name
- appid: API key
- units: metric (Celsius) / imperial (Fahrenheit)
```

## 🎯 Performance Optimizations

- **Lazy Loading**: Charts load only when data is available
- **Error Boundaries**: Prevents app crashes from API failures
- **Debounced Search**: Prevents excessive API calls
- **Responsive Images**: Weather icons load efficiently
- **Minimal Re-renders**: Optimized state management

## 🐛 Troubleshooting

### Common Issues

**API Key Error**
```
Error: Failed to fetch current weather: Weather data not found
```
**Solution**: Verify your API key is correct and active

**City Not Found**
```
Error: Weather data not found
```
**Solution**: Check city name spelling or try different format

**Charts Not Displaying**
**Solution**: Ensure Chart.js is properly imported and registered

**Build Failures**
**Solution**: Clear node_modules and reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🔒 Security Notes

- **API Key**: Never commit API keys to version control
- **Environment Variables**: Use `.env` files for sensitive data
- **CORS**: OpenWeatherMap API supports CORS for client-side requests
- **Rate Limiting**: Free tier has 1000 calls/day limit

## 🚀 Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Multiple location comparison
- [ ] Weather maps integration
- [ ] Offline mode with cached data
- [ ] Dark/light theme toggle
- [ ] Export chart data functionality
- [ ] Weather predictions using AI
- [ ] Social sharing features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [React](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you have any questions or need help with setup:

- Open an issue on GitHub
- Email: your.email@example.com
- Twitter: [@yourusername](https://twitter.com/yourusername)

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by [Your Name](https://github.com/yourusername)