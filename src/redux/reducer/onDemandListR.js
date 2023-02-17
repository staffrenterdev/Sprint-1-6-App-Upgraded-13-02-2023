import {
  onDemandListError,
  onDemandListSuccess,
  onDemandListLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function onDemandListR(state = {}, action) {
  switch (action.type) {
    case onDemandListLoading:
      return Object.assign({}, state, {status: LOADING});
    case onDemandListSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case onDemandListError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
