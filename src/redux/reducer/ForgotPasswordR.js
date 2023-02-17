import { forgotError, forgotSuccess, forgotLoading, SUCCESS, ERROR, LOADING, NONE } from '../constants/reduxConstant'

export default function ForgotPasswordR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case forgotLoading:
      return Object.assign({}, state, { status: LOADING });
    case forgotSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case forgotError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}