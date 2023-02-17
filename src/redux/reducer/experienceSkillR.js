import {
  experienceSkillError,
  experienceSkillSuccess,
  experienceSkillLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function experienceSkillR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case experienceSkillLoading:
      return Object.assign({}, state, {status: LOADING});
    case experienceSkillSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case experienceSkillError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
