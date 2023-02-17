import {
  addExperienceError,
  addExperienceSuccess,
  addExperienceLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function addExperienceR(state = {}, action) {
  switch (action.type) {
    case addExperienceLoading:
      return Object.assign({}, state, {status: LOADING});
    case addExperienceSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case addExperienceError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
