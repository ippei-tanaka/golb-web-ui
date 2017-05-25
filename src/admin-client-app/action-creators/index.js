import merge from '../../utilities/object-merger';
import * as authActionCreators from './auth-action-creators';
import * as userActionCreators from './user-action-creators';
import * as categoryActionCreators from './category-action-creators';
import * as postActionCreators from './post-action-creators';
import * as settingActionCreators from './setting-action-creators';

export default merge(authActionCreators, userActionCreators, categoryActionCreators, postActionCreators, settingActionCreators);