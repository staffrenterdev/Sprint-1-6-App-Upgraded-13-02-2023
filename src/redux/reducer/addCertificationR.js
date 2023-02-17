import {
  addCertificationError,
  addCertificationSuccess,
  addCertificationLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function addCertificationR(state = {}, action) {
  switch (action.type) {
    case addCertificationLoading:
      return Object.assign({}, state, {status: LOADING});
    case addCertificationSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case addCertificationError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
