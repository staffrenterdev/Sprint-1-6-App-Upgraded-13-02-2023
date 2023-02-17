import {postService} from '../../services/postServices';
import {getService} from '../../services/getServices';
import {
  drawerError,
  drawerSuccess,
  drawerLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: drawerLoading});
const apiSucceed = payload => ({type: drawerSuccess, payload});
const apiError = payload => ({type: drawerError, payload});

export default drawerA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.drawer + '?slug=' + global.apiGet)
      .then(async res => {
        console.log('respones for drawer api =====================>>', res);
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for drawer api1 =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
