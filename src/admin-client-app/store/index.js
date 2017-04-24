import { createStore as _createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

export const createStore = (initialState) =>
{
    return _createStore(reducers,
        initialState,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    );
};