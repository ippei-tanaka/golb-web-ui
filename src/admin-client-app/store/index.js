import { createStore as _createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';

const loggerMiddleware = createLogger();

export const createStore = (initialState) =>
{
    return _createStore(reducers,
        initialState,
        applyMiddleware(
            promiseMiddleware,
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    );
};