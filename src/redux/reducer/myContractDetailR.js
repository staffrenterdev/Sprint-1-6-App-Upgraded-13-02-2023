import {
  myContractDetailError,
  myContractDetailSuccess,
  myContractDetailLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function myContractDetailR(state = {}, action) {
  switch (action.type) {
    case myContractDetailLoading:
      return Object.assign({}, state, {status: LOADING});
    case myContractDetailSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case myContractDetailError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
