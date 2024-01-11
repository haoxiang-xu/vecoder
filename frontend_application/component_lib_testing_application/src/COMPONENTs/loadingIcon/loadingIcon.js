import React from 'react';
import './loadingIcon.css';
import loadingIcon from './loadingIcon.gif';

const LoadingIcon = () => {
  return (
    <div className="loading-icon-container">
      <img className="loading-icon" src={loadingIcon} alt="Loading" />
    </div>
  );
};

export default LoadingIcon;
