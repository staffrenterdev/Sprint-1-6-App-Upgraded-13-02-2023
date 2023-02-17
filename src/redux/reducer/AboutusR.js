import {
    AboutusError,
    AboutusSuccess,
    AboutusLoading,
    SUCCESS,
    ERROR,
    LOADING,
    NONE,
  } from '../constants/reduxConstant';
  
  export default function AboutusR(state = {}, action) {
    switch (action.type) {
      case AboutusLoading:
        return Object.assign({}, state, {status: LOADING});
      case AboutusSuccess:
        return Object.assign({}, state, {status: SUCCESS, value: action.payload});
      case AboutusError:
        return Object.assign({}, state, {status: ERROR, error: action.payload});
      default:
        return Object.assign({}, state, {status: NONE});
    }
  }
  