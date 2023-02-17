import {
  add_docsError,
  add_docsSuccess,
  add_docsLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function add_docsR(state = {}, action) {
  switch (action.type) {
    case add_docsLoading:
      return Object.assign({}, state, {status: LOADING});
    case add_docsSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case add_docsError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
