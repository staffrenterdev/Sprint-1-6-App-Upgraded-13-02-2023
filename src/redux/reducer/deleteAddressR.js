import {
  deleteAddressError,
  deleteAddressSuccess,
  deleteAddressLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function deleteAddressR(state = {}, action) {
  switch (action.type) {
    case deleteAddressLoading:
      return Object.assign({}, state, {status: LOADING});
    case deleteAddressSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case deleteAddressError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
