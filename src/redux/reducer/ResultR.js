import {
  ResultError,
  ResultSuccess,
  ResultLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function ResultR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case ResultLoading:
      return Object.assign({}, state, {status: LOADING});
    case ResultSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case ResultError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
