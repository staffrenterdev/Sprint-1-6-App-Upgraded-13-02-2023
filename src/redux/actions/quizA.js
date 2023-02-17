import {postService} from '../../services/postServices';
import {quizError, quizSuccess, quizLoading} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: quizLoading});
const apiSucceed = payload => ({type: quizSuccess, payload});
const apiError = payload => ({type: quizError, payload});

export default quizA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.cms, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for quiz api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
