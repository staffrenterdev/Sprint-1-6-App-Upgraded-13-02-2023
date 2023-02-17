import {
  completeProfileError,
  completeProfileSuccess,
  completeProfileLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function completeProfileR(state = {}, action) {
  switch (action.type) {
    case completeProfileLoading:
      return Object.assign({}, state, {status: LOADING});
    case completeProfileSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case completeProfileError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
