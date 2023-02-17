import {   UpdateEmailLoading,
    UpdateEmailSuccess,
  UpdateEmailError, SUCCESS, ERROR, LOADING, NONE } from '../constants/reduxConstant'

export default function UpdateEmailR(state = {}, action) {
  
  switch (action.type) {
    case UpdateEmailLoading:
      return Object.assign({}, state, { status: LOADING });
    case UpdateEmailSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case UpdateEmailError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}