import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from '../constants/actionTypes';

const initialState = { loading: false, errors: {} };

const ui = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {},
      };
    default:
      return state;
  }
};

export default ui;
