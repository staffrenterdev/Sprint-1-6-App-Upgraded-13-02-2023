import {
  experienceError,
  experienceSuccess,
  experienceLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function experienceR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case experienceLoading:
      return Object.assign({}, state, {status: LOADING});
    case experienceSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case experienceError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
