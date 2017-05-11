import {combineReducers} from 'redux';
import merge from '../../utilities/object-merger';
import * as authReducers from './auth-reducers';
import * as userReducers from './user-reducers';
import * as categoryReducers from './category-reducers';

export default combineReducers(merge(authReducers, userReducers, categoryReducers));