import {
    HelpcontentError, 
    HelpcontentSuccess, 
    HelpcontentLoading,
    SUCCESS,
    ERROR,
    LOADING,
    NONE,
  } from '../constants/reduxConstant';
  
  export default function HelpcontentR(state = {}, action) {
    // console.log("Inside apiReducer.js", action)
    switch (action.type) {
      case HelpcontentLoading:
        return Object.assign({}, state, {status: LOADING});
      case HelpcontentSuccess:
        return Object.assign({}, state, {status: SUCCESS, value: action.payload});
      case HelpcontentError:
        return Object.assign({}, state, {status: ERROR, error: action.payload});
      default:
        return Object.assign({}, state, {status: NONE});
    }
  }
  