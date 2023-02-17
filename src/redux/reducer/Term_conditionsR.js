import {
    termsconditionsError,
    termsconditionsSuccess,
    termsconditionsLoading,
    SUCCESS,
    ERROR,
    LOADING,
    NONE,
  } from '../constants/reduxConstant';
  
  export default function Term_conditionsR(state = {}, action) {
    switch (action.type) {
      case termsconditionsLoading:
        return Object.assign({}, state, {status: LOADING});
      case termsconditionsSuccess:
        return Object.assign({}, state, {status: SUCCESS, value: action.payload});
      case termsconditionsError:
        return Object.assign({}, state, {status: ERROR, error: action.payload});
      default:
        return Object.assign({}, state, {status: NONE});
    }
  }
  