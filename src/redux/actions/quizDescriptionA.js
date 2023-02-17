import {postService} from '../../services/postServices';
import {
  quizDescriptionError,
  quizDescriptionSuccess,
  quizDescriptionLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: quizDescriptionLoading});
const apiSucceed = payload => ({type: quizDescriptionSuccess, payload});
const apiError = payload => ({type: quizDescriptionError, payload});

export default quizDescriptionA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.getlegalcontent, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for quizDescription api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
