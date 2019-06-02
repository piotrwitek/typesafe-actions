// tslint:disable no-import-side-effect
// tslint:disable no-submodule-imports
// This must be the first line in src/index.js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'tslib';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Home from './routes/home';
import store from './store';

const styles: React.CSSProperties = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const Root = () => (
  <div style={styles}>
    <Provider store={store}>
      <Home />
    </Provider>
  </div>
);

render(<Root />, document.getElementById('root'));
