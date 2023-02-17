import {
  gameError,
  gameSuccess,
  gameLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function gameR(state = {}, action) {
  switch (action.type) {
    case gameLoading:
      return Object.assign({}, state, {status: LOADING});
    case gameSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case gameError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
