import {postService} from '../../services/postServices';
import {getService} from '../../services/getServices';
import {
  skillExperienceError,
  skillExperienceSuccess,
  skillExperienceLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: skillExperienceLoading});
const apiSucceed = payload => ({type: skillExperienceSuccess, payload});
const apiError = payload => ({type: skillExperienceError, payload});

export default skillExperienceA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.drawer + '?slug=' + global.apiGet)
      .then(async res => {
        console.log(
          'respones for skillExperience api =====================>>',
          res,
        );
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for skillExperience api1 =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
