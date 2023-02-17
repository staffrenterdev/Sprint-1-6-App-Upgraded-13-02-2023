import {postService} from '../../services/postServices';
import {getService} from '../../services/getServices';
import {
  backCheckError,
  backCheckSuccess,
  backCheckLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: backCheckLoading});
const apiSucceed = payload => ({type: backCheckSuccess, payload});
const apiError = payload => ({type: backCheckError, payload});

export default backCheckA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.backCheck + '?slug=' + global.backCheck)
      .then(async res => {
        console.log('respones for backCheck api =====================>>', res);
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for backCheck api1 =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
