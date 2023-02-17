import {
  checkDataError,
  checkDataSuccess,
  checkDataLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function checkDataR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case checkDataLoading:
      return Object.assign({}, state, {status: LOADING});
    case checkDataSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case checkDataError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
