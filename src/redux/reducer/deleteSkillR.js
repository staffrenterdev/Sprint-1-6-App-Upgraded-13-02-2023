import {
  deleteSkillError,
  deleteSkillSuccess,
  deleteSkillLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function deleteSkillR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case deleteSkillLoading:
      return Object.assign({}, state, {status: LOADING});
    case deleteSkillSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case deleteSkillError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
