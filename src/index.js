// react
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import Redbox from 'redbox-react';

// redux
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './core/store';
// import { authRouteResolver, initAuth } from './core/auth';

// components
import Root from './views/root';

// styles
import './views/styles/core.scss';

const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('app');

function render(Root) {
  ReactDOM.render(
    <AppContainer errorReporter={Redbox}>
      <Root history={syncedHistory} store={store} />
    </AppContainer>,
    rootEl
  );
}

render(Root);

if (module.hot) {
  module.hot.accept('./views/root', () => {
    render(require('./views/root').default);
  });
}

// initAuth(store.dispatch)
//   .then(() => render(Root))
//   .catch(error => console.error(error));