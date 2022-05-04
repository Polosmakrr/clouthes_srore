import { combineReducers } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';
import actions from './shopStore-action';

const items = createReducer([], {
  'items/increment': (state, { payload }) => [...state, payload],
});

export default combineReducers({
  items,
});
