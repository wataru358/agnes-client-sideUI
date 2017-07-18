import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import combinedReducers from './reducers';


const logger = createLogger({
  collapsed: true,
});

const initialState = {

};
/*const middleware = applyMiddleware(
  logger
);*/

const middleware = [logger];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( combinedReducers, initialState, composeEnhancers(
    applyMiddleware(...middleware)
  ));

/* istanbul ignore next */
/*
if ( module.hot ) {
  module.hot.accept( './reducers', () => {
    const nextRootReducer = require( './reducers' ).default;
    store.replaceReducer( nextRootReducer );
  })
}
*/

export default store;
