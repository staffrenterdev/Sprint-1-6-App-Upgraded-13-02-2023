import {
  skillError,
  skillSuccess,
  skillLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function skillR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case skillLoading:
      return Object.assign({}, state, {status: LOADING});
    case skillSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case skillError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
