import {postService} from '../../services/postServices';
import {
  cmsLoginError,
  cmsLoginSuccess,
  cmsLoginLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: cmsLoginLoading});
const apiSucceed = payload => ({type: cmsLoginSuccess, payload});
const apiError = payload => ({type: cmsLoginError, payload});

export default cmsLoginA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.cmsLogin, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('res', res);
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for cmsLogin api1 =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
