import React from 'react';
import App from './App';
// import { HashRouter } from 'react-router-dom';

/**
 * Internal dependencies.
 */
// import App from './App';
// import { options } from './options';

const AppContainer = ({options, nonce }) => {
  return (
    <div>
      <App options={options} nonce={nonce} />
    </div>
  );
}

export default AppContainer;