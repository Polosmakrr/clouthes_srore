import { combineReducers } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';

const storeData = createReducer([], {
  fetchSuccess: (_, { payload }) => [payload],
});
const currency = createReducer([], {
  changeCurrency: (_, { payload }) => [payload],
});
const showModal = createReducer([], {
  switchShowModal: (_, { payload }) => [payload],
});
const myBag = createReducer([], {
  addCard: (state, { payload }) => [...state, payload],
  changeColor: (state, { payload }) => {
    console.log('st:', state);
    console.log('p:', payload);
  },
});

export default combineReducers({
  storeData,
  currency,
  showModal,
  myBag,
});
