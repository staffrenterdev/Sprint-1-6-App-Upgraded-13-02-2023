import {
  addSkillError,
  addSkillSuccess,
  addSkillLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function addSkillR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case addSkillLoading:
      return Object.assign({}, state, {status: LOADING});
    case addSkillSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case addSkillError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
