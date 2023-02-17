import {
  homeError,
  homeSuccess,
  homeLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function homeR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case homeLoading:
      return Object.assign({}, state, {status: LOADING});
    case homeSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case homeError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
