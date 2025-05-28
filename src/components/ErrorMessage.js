import React from 'react';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Oops! Something went wrong</h2>
        <p className="error-message">{error}</p>
        <button 
          onClick={onRetry}
          className="retry-button"
        >
          🔄 Try Again
        </button>
        <div className="error-suggestions">
          <h3>Suggestions:</h3>
          <ul>
            <li>Check your internet connection</li>
            <li>Verify the city name spelling</li>
            <li>Try searching for a different city</li>
            <li>Make sure your API key is valid</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;