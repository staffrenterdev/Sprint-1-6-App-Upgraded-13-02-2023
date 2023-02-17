import {
  onDemandApplyError,
  onDemandApplySuccess,
  onDemandApplyLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function onDemandApplyR(state = {}, action) {
  switch (action.type) {
    case onDemandApplyLoading:
      return Object.assign({}, state, {status: LOADING});
    case onDemandApplySuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case onDemandApplyError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
