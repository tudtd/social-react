import { LOADING_UI, SET_ERRORS, SET_USER } from '../constants/actionTypes';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then((res) => {
      //   setLoading(false);
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FBIdToken', FBIdToken);
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      dispatch(getUserData());
      history.push('/');
    })
    .catch((err) => {
      //   setLoading(false);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

const getUserData = () => (dispatch) => {
  console.log('hello from getUserData');
  axios
    .get('/user')
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};
