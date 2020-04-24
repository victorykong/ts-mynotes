/**
 * 根 reducer
 */

import { combineReducers } from '@reduxjs/toolkit';

// 子 reducer
import { likeReducer } from './subReducers';

export default combineReducers({
  like: likeReducer,
});
