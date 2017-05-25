import {combineReducers} from 'redux';
import merge from '../../utilities/object-merger';
import * as authReducers from './auth-reducers';
import * as userReducers from './user-reducers';
import * as categoryReducers from './category-reducers';
import * as postReducers from './post-reducers';
import * as settingReducers from './setting-reducers';

export default combineReducers(merge(authReducers, userReducers, categoryReducers, postReducers, settingReducers));