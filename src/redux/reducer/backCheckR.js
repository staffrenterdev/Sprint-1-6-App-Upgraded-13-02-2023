import {
  backCheckError,
  backCheckSuccess,
  backCheckLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function backCheckR(state = {}, action) {
  switch (action.type) {
    case backCheckLoading:
      return Object.assign({}, state, {status: LOADING});
    case backCheckSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case backCheckError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
