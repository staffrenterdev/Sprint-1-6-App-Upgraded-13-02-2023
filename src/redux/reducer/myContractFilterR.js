import {
  myContractFilterError,
  myContractFilterSuccess,
  myContractFilterLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function myContractFilterR(state = {}, action) {
  switch (action.type) {
    case myContractFilterLoading:
      return Object.assign({}, state, {status: LOADING});
    case myContractFilterSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case myContractFilterError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
