import {
    PrivacyPolicyError,
    PrivacyPolicySuccess,
    PrivacyPolicyLoading,
    SUCCESS,
    ERROR,
    LOADING,
    NONE,
  } from '../constants/reduxConstant';
  
  export default function PrivacyPolicyR(state = {}, action) {
    switch (action.type) {
      case PrivacyPolicyLoading:
        return Object.assign({}, state, {status: LOADING});
      case PrivacyPolicySuccess:
        return Object.assign({}, state, {status: SUCCESS, value: action.payload});
      case PrivacyPolicyError:
        return Object.assign({}, state, {status: ERROR, error: action.payload});
      default:
        return Object.assign({}, state, {status: NONE});
    }
  }
  