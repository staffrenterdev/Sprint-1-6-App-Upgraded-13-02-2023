import {
  drawerError,
  drawerSuccess,
  drawerLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function drawerR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case drawerLoading:
      return Object.assign({}, state, {status: LOADING});
    case drawerSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case drawerError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
