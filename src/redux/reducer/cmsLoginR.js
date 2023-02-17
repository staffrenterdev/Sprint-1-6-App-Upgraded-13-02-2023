import {
  cmsLoginError,
  cmsLoginSuccess,
  cmsLoginLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function cmsLoginR(state = {}, action) {
  switch (action.type) {
    case cmsLoginLoading:
      return Object.assign({}, state, {status: LOADING});
    case cmsLoginSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case cmsLoginError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
