import {
  addOffenceError,
  addOffenceSuccess,
  addOffenceLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function addOffenceR(state = {}, action) {
  switch (action.type) {
    case addOffenceLoading:
      return Object.assign({}, state, {status: LOADING});
    case addOffenceSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case addOffenceError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
