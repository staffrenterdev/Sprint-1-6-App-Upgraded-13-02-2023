import {
  addSignError,
  addSignSuccess,
  addSignLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function addSignR(state = {}, action) {
  switch (action.type) {
    case addSignLoading:
      return Object.assign({}, state, {status: LOADING});
    case addSignSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case addSignError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
