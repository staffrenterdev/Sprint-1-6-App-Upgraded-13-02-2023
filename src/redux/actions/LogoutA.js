import {postService} from '../../services/postServices';
import {
    LogoutError,
    LogoutSuccess,
    LogoutLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: LogoutLoading});
const apiSucceed = payload => ({type: LogoutSuccess, payload});
const apiError = payload => ({type: LogoutError, payload});

export default LogoutA = (body) => async (dispatchEvent, getState) => {
  
  dispatchEvent(apiLoading());
  console.log('called')
  try {
    postService(apiName.logout, body)
      .then(async res => {
          console.log('nnnnnnnn',res)
        if (res.data.status !== 0) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for Logout api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    console.log('sdfskfskfskfsfsffsfffffffffffffff')
    dispatchEvent(apiError(e));
  }
};
