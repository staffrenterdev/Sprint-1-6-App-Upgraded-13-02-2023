import { LogoutError, LogoutSuccess, LogoutLoading, SUCCESS, ERROR, LOADING, NONE } from '../constants/reduxConstant'

export default function LogoutR(state = {}, action) {
  
  switch (action.type) {
    case LogoutLoading:
      return Object.assign({}, state, { status: LOADING });
    case LogoutSuccess:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });
    case LogoutError:
      return Object.assign({}, state, { status: ERROR, error: action.payload });
    default:
      return Object.assign({}, state, { status: NONE });
  }
}