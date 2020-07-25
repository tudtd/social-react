import { combineReducers } from 'redux';

import user from './user';
import data from './data';
import UI from './ui';

export default combineReducers({
  user,
  data,
  UI,
});
