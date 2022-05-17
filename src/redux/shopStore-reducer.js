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
  addCard: (state, { payload }) => {
    return [...state, payload];
  },
  updateCart: (state, { payload: { index, ...item } }) => {
    state[index] = { ...state[index], ...item };
    return state;
  },
  clearMyBag: (state, { payload }) => (state = []),
});

export default combineReducers({
  storeData,
  currency,
  showModal,
  myBag,
});
