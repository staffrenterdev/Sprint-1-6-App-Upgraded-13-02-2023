import { signUpError, signUpSuccess, signUpLoading, SUCCESS, ERROR, LOADING, NONE } from '../constants/reduxConstant'

export default function signupR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case signUpLoading:
      return Object.assign({}, state, { status: LOADING });
    case signUpSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case signUpError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}