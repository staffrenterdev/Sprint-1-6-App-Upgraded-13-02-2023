import {
  editProfileError,
  editProfileSuccess,
  editProfileLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function editProfileR(state = {}, action) {
  switch (action.type) {
    case editProfileLoading:
      return Object.assign({}, state, {status: LOADING});
    case editProfileSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case editProfileError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
