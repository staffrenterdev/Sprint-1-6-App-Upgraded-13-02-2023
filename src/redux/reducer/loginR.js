import { loginError, loginSuccess, loginLoading, SUCCESS, ERROR, LOADING, NONE } from '../constants/reduxConstant'

export default function loginR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case loginLoading:
      return Object.assign({}, state, { status: LOADING });
    case loginSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case loginError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}