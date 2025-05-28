import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherChart = ({ data, type = 'line', title }) => {
  // Chart configuration options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: function(context) {
            return `${title} - ${context[0].label}`;
          },
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw;
            
            if (label.includes('Temperature')) {
              return `${label}: ${value}°C`;
            } else if (label.includes('Humidity')) {
              return `${label}: ${value}%`;
            } else if (label.includes('Pressure')) {
              return `${label}: ${value} hPa`;
            }
            
            return `${label}: ${value}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: 'bold'
          },
          color: '#6b7280',
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: type === 'bar',
        grid: {
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: 'bold'
          },
          color: '#6b7280',
          callback: function(value) {
            // Format y-axis labels based on data type
            if (this.chart.data.datasets.some(d => d.label.includes('Temperature'))) {
              return value + '°C';
            } else if (this.chart.data.datasets.some(d => d.label.includes('Humidity'))) {
              return value + '%';
            }
            return value;
          }
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
    elements: {
      point: {
        hoverRadius: 8,
        hoverBorderWidth: 3,
      },
      line: {
        borderWidth: 3,
      },
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      }
    }
  };

  // Line chart specific options
  const lineChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: false,
      }
    }
  };

  // Bar chart specific options
  const barChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: true,
      }
    }
  };

  // Render appropriate chart type
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <Line 
            data={data} 
            options={lineChartOptions}
            height={300}
          />
        );
      case 'bar':
        return (
          <Bar 
            data={data} 
            options={barChartOptions}
            height={300}
          />
        );
      default:
        return (
          <Line 
            data={data} 
            options={lineChartOptions}
            height={300}
          />
        );
    }
  };

  if (!data) {
    return (
      <div className="chart-container">
        <div className="chart-placeholder">
          <div className="chart-placeholder-icon">📊</div>
          <p>No chart data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        {renderChart()}
      </div>
    </div>
  );
};

export default WeatherChart;