import {
  addCVError,
  addCVSuccess,
  addCVLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function addCVR(state = {}, action) {
  switch (action.type) {
    case addCVLoading:
      return Object.assign({}, state, {status: LOADING});
    case addCVSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case addCVError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
