import {
  deleteExperienceError,
  deleteExperienceSuccess,
  deleteExperienceLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function deleteExperienceR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case deleteExperienceLoading:
      return Object.assign({}, state, {status: LOADING});
    case deleteExperienceSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case deleteExperienceError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
