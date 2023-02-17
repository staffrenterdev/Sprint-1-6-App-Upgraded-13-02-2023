import {
  cmsError,
  cmsSuccess,
  cmsLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function cmsR(state = {}, action) {
  switch (action.type) {
    case cmsLoading:
      return Object.assign({}, state, {status: LOADING});
    case cmsSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case cmsError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
