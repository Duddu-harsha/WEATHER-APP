import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function WeatherChart({ data }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(d => d.temp),
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        fill: true
      }
    ]
  };

  return (
    <div>
      <h2>Last 5 Days Temperature</h2>
      <Line data={chartData} />
    </div>
  );
}

export default WeatherChart;
