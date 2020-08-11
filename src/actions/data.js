import axios from 'axios';

import {
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
} from '../constants/actionTypes';

export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/screams')
    .then((res) => {
      console.log(res.data);
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_SCREAMS, payload: [] });
    });
};

export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_SCREAM, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_SCREAM, payload: res.data });
    })
    .catch((err) => console.log(err));
};
