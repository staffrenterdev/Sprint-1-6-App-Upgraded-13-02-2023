import {postService} from '../../services/postServices';
import {cmsError, cmsSuccess, cmsLoading} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: cmsLoading});
const apiSucceed = payload => ({type: cmsSuccess, payload});
const apiError = payload => ({type: cmsError, payload});

export default cmsA = body => async (dispatchEvent, getState) => {
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
        console.log('error for cms api1 =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
