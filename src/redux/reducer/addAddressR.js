import {
  addAddressError,
  addAddressSuccess,
  addAddressLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function addAddressR(state = {}, action) {
  switch (action.type) {
    case addAddressLoading:
      return Object.assign({}, state, {status: LOADING});
    case addAddressSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case addAddressError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
