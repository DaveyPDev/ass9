

import React from 'react';

const ErrorPage = ({ errorMessage }) => {
  return (
    <div>
      <h2>Error Occurred</h2>
      <p>{errorMessage}</p>
    
    </div>
  );
};

export default ErrorPage;
