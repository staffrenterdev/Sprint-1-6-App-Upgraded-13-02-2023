import {
    checkpasswordError,
    checkpasswordSuccess,
    checkpasswordLoading,
    SUCCESS,
    ERROR,
    LOADING,
    NONE,
  } from '../constants/reduxConstant';
  
  export default function checkpasswordR(state = {}, action) {
    switch (action.type) {
      case checkpasswordLoading:
        return Object.assign({}, state, {status: LOADING});
      case checkpasswordSuccess:
        return Object.assign({}, state, {status: SUCCESS, value: action.payload});
      case checkpasswordError:
        return Object.assign({}, state, {status: ERROR, error: action.payload});
      default:
        return Object.assign({}, state, {status: NONE});
    }
  }
  