import {
  backGroundSuccessError,
  backGroundSuccessSuccess,
  backGroundSuccessLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function backGroundSuccessR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case backGroundSuccessLoading:
      return Object.assign({}, state, {status: LOADING});
    case backGroundSuccessSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case backGroundSuccessError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
