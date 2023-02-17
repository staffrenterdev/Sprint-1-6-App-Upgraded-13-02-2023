import {
  myContractCancelError,
  myContractCancelSuccess,
  myContractCancelLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function myContractCancelR(state = {}, action) {
  switch (action.type) {
    case myContractCancelLoading:
      return Object.assign({}, state, {status: LOADING});
    case myContractCancelSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case myContractCancelError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
