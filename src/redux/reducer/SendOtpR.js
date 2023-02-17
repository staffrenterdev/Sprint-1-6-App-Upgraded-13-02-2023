import {   sendotpLoading,
    sendotpSuccess,
    sendotpError, SUCCESS, ERROR, LOADING, NONE } from '../constants/reduxConstant'

export default function SendOtpR(state = {}, action) {
  
  switch (action.type) {
    case sendotpLoading:
      return Object.assign({}, state, { status: LOADING });
    case sendotpSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case sendotpError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}