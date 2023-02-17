import {postService} from '../../services/postServices';
import {getService} from '../../services/getServices';
import {
  backGroundSuccessError,
  backGroundSuccessSuccess,
  backGroundSuccessLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: backGroundSuccessLoading});
const apiSucceed = payload => ({type: backGroundSuccessSuccess, payload});
const apiError = payload => ({type: backGroundSuccessError, payload});

export default backGroundSuccessA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.backGroundSuccess + '?slug=' + global.apiGet)
      .then(async res => {
        console.log(
          'respones for backGroundSuccess api =====================>>',
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
          'error for backGroundSuccess api1 =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
