import {
    FAQError,
    FAQSuccess,
    FAQLoading,
    SUCCESS,
    ERROR,
    LOADING,
    NONE,
  } from '../constants/reduxConstant';
  
  export default function FAQR(state = {}, action) {
    // console.log("Inside apiReducer.js", action)
    switch (action.type) {
      case FAQLoading:
        return Object.assign({}, state, {status: LOADING});
      case FAQSuccess:
        return Object.assign({}, state, {status: SUCCESS, value: action.payload});
      case FAQError:
        return Object.assign({}, state, {status: ERROR, error: action.payload});
      default:
        return Object.assign({}, state, {status: NONE});
    }
  }
  