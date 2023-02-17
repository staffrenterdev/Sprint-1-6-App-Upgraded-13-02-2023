import { sendOTPError, sendOTPSuccess, sendOTPLoading, SUCCESS, ERROR, LOADING, NONE } from '../constants/reduxConstant'

export default function VerificationR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case sendOTPLoading:
      return Object.assign({}, state, { status: LOADING });
    case sendOTPSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case sendOTPError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}