import {
  DashBoardError,
  DashBoardSuccess,
  DashBoardLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function DashBoardR(state = {}, action) {
  switch (action.type) {
    case DashBoardLoading:
      return Object.assign({}, state, {status: LOADING});
    case DashBoardSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case DashBoardError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
