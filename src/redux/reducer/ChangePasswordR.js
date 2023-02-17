import { updatePasswordError, updatePasswordSuccess, updatePasswordLoading, SUCCESS, ERROR, LOADING, NONE } from '../constants/reduxConstant'

export default function ResetPasswordR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case updatePasswordLoading:
      return Object.assign({}, state, { status: LOADING });
    case updatePasswordSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case updatePasswordError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}