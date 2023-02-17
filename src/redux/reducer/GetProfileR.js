import { myProfileError, myProfileSuccess, myProfileLoading, ERROR, LOADING, NONE, SUCCESS } from '../constants/reduxConstant'

export default function GetProfileR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case myProfileLoading:
      return Object.assign({}, state, { status: LOADING });
    case myProfileSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case myProfileError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}