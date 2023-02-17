import {
  mapError,
  mapSuccess,
  mapLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function mapR(state = {}, action) {
  // console.log("Inside apiReducer.js", action)
  switch (action.type) {
    case mapLoading:
      return Object.assign({}, state, {status: LOADING});
    case mapSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case mapError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
