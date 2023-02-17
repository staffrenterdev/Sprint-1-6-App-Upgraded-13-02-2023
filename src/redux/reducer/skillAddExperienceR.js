import {
  skillAddExperienceError,
  skillAddExperienceSuccess,
  skillAddExperienceLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function skillAddExperienceR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case skillAddExperienceLoading:
      return Object.assign({}, state, {status: LOADING});
    case skillAddExperienceSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case skillAddExperienceError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
