// tslint:disable-next-line:no-import-side-effect
import '@babel/polyfill';
// console.log('polyfills');

// tslint:disable-next-line:no-import-side-effect
import 'tslib';
// tslint:disable-next-line:no-import-side-effect
import './env';

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
