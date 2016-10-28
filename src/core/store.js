import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';

// middleware
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

// reducers
import reducers from './reducers';

const initialState = {
  weather: {}
}

export default (initialState) => {
  let middleware = applyMiddleware(
    thunk, 
    routerMiddleware(browserHistory)
  );

  if (process.env.NODE_ENV !== 'production') {
    // configure redux-devtools-extension
    // @see https://github.com/zalmoxisus/redux-devtools-extension
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducers, initialState, middleware);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
}