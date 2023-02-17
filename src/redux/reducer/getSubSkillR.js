import {
  getSubSkillError,
  getSubSkillSuccess,
  getSubSkillLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function getSubSkillR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case getSubSkillLoading:
      return Object.assign({}, state, {status: LOADING});
    case getSubSkillSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case getSubSkillError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
