import {
  myContractListError,
  myContractListSuccess,
  myContractListLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function myContractListR(state = {}, action) {
  switch (action.type) {
    case myContractListLoading:
      return Object.assign({}, state, {status: LOADING});
    case myContractListSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case myContractListError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
