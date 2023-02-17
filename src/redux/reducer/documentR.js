import {
  documentError,
  documentSuccess,
  documentLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function documentR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case documentLoading:
      return Object.assign({}, state, {status: LOADING});
    case documentSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case documentError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
