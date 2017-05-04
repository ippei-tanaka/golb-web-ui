import {combineReducers} from 'redux';
import merge from '../../utilities/object-merger';
import * as authReducers from './auth-reducers';
import * as userReducers from './user-reducers';
import * as formReducers from './form-reducers';

export default combineReducers(merge(authReducers, userReducers, formReducers));