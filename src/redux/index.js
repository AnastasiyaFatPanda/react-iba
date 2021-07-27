import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';

// enable Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = () => next => action => {
    // eslint-disable-next-line no-console
    console.log(action.type, action.payload);
    return next(action);
};

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

export default store;
