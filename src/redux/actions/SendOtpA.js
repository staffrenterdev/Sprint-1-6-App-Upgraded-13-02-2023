import {postService} from '../../services/postServices';
import {
    sendotpLoading,
  sendotpSuccess,
  sendotpError,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: sendotpLoading});
const apiSucceed = payload => ({type: sendotpSuccess, payload});
const apiError = payload => ({type: sendotpError, payload});

export default SendOtpA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.sendotp, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('sendotp...........',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for sendotp api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
