import {
  quizDescriptionError,
  quizDescriptionSuccess,
  quizDescriptionLoading,
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../constants/reduxConstant';

export default function quizDescriptionR(state = {}, action) {
  switch (action.type) {
    case quizDescriptionLoading:
      return Object.assign({}, state, {status: LOADING});
    case quizDescriptionSuccess:
      return Object.assign({}, state, {status: SUCCESS, value: action.payload});
    case quizDescriptionError:
      return Object.assign({}, state, {status: ERROR, error: action.payload});
    default:
      return Object.assign({}, state, {status: NONE});
  }
}
