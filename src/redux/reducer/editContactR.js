import {
  editContactError,
  editContactSuccess,
  editContactLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function editContactR(state = {}, action) {
  switch (action.type) {
    case editContactLoading:
      return Object.assign({}, state, {status: LOADING});
    case editContactSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case editContactError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
