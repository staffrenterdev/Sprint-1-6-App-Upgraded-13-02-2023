import {
  skillDetailError,
  skillDetailSuccess,
  skillDetailLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function skillDetailR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case skillDetailLoading:
      return Object.assign({}, state, {status: LOADING});
    case skillDetailSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case skillDetailError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
