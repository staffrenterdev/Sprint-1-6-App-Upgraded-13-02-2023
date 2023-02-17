import {
  quizError,
  quizSuccess,
  quizLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function quizR(state = {}, action) {
  switch (action.type) {
    case quizLoading:
      return Object.assign({}, state, {status: LOADING});
    case quizSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case quizError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
