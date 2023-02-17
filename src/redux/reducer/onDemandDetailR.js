import {
  onDemandDetailError,
  onDemandDetailSuccess,
  onDemandDetailLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function onDemandDetailR(state = {}, action) {
  switch (action.type) {
    case onDemandDetailLoading:
      return Object.assign({}, state, {status: LOADING});
    case onDemandDetailSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case onDemandDetailError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
