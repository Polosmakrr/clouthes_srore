import { createAction } from '@reduxjs/toolkit';

export const fetchStoreDataRequest = createAction('fetchRequest');
export const fetchStoreDataSuccess = createAction('fetchSuccess');
export const fetchStoreDataError = createAction('fetchError');

export const changeCurrency = createAction('changeCurrency');

export const switchShowModal = createAction('switchShowModal');

export const addCard = createAction('addCard');

export const changeColor = createAction('changeColor');
