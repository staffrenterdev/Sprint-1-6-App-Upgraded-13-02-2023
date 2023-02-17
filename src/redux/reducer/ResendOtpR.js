import {
  resendOtpError,
  resendOtpSuccess,
  resendOtpLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function ResendOtpR(state = {}, action) {
  switch (action.type) {
    case resendOtpLoading:
      return Object.assign({}, state, {status: LOADING});
    case resendOtpSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case resendOtpError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
