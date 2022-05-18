import * as actions from './shopStore-action';
import axios from 'axios';

axios.defaults.baseURL = 'https://62658ffcdbee37aff9a6bf70.mockapi.io/';
// axios.defaults.baseURL = 'http://demo9830117.mockable.io';

export const fetchStoreData = () => dispatch => {
  dispatch(actions.fetchStoreDataRequest());

  axios
    .get('/store')
    .then(({ data }) => {
      dispatch(actions.fetchStoreDataSuccess(data));
    })

    .catch(error => dispatch(actions.fetchStoreDataError(error)));
};
