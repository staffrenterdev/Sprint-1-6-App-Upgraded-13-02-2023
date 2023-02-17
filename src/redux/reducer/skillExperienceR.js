import {
  skillExperienceError,
  skillExperienceSuccess,
  skillExperienceLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function skillExperienceR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case skillExperienceLoading:
      return Object.assign({}, state, {status: LOADING});
    case skillExperienceSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case skillExperienceError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
