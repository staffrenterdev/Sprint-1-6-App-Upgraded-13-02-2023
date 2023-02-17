import { resetPasswordError, resetPasswordSuccess, resetPasswordLoading, SUCCESS, ERROR, LOADING, NONE } from '../constants/reduxConstant'

export default function ResetPasswordR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case resetPasswordLoading:
      return Object.assign({}, state, { status: LOADING });
    case resetPasswordSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case resetPasswordError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}