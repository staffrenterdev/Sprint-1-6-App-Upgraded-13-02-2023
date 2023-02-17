import {
  addEducationError,
  addEducationSuccess,
  addEducationLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function addEducationR(state = {}, action) {
  switch (action.type) {
    case addEducationLoading:
      return Object.assign({}, state, {status: LOADING});
    case addEducationSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case addEducationError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
