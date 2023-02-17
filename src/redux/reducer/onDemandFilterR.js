import {
  onDemandFilterError,
  onDemandFilterSuccess,
  onDemandFilterLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function onDemandFilterR(state = {}, action) {
  switch (action.type) {
    case onDemandFilterLoading:
      return Object.assign({}, state, {status: LOADING});
    case onDemandFilterSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case onDemandFilterError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
