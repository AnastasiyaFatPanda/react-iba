import { createStore, applyMiddleware, compose , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import cardReducer from './reducers/cardReducer';
import AuthReducer from './reducers/authReducer';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
    cardReducer,
    authReducer: AuthReducer,
    settingsReducer,
});

// enable Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = () => next => action => {
    // eslint-disable-next-line no-console
    console.log(action.type, action.payload);
    return next(action);
};

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

export default store;
