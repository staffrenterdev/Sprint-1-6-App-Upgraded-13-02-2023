import {
  backGroundCheckError,
  backGroundCheckSuccess,
  backGroundCheckLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function backGroundCheckR(state = {}, action) {
  switch (action.type) {
    case backGroundCheckLoading:
      return Object.assign({}, state, {status: LOADING});
    case backGroundCheckSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case backGroundCheckError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
