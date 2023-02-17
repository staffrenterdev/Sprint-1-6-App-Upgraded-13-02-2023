import {
  passcodeError,
  passcodeSuccess,
  passcodeLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function passcodeR(state = {}, action) {
  switch (action.type) {
    case passcodeLoading:
      return Object.assign({}, state, {status: LOADING});
    case passcodeSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case passcodeError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
