import {
  addReferenceError,
  addReferenceSuccess,
  addReferenceLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function addReferenceR(state = {}, action) {
  switch (action.type) {
    case addReferenceLoading:
      return Object.assign({}, state, {status: LOADING});
    case addReferenceSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case addReferenceError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
