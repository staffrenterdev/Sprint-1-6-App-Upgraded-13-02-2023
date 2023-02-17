import {postService} from '../../services/postServices';
import {
  resendOtpError,
  resendOtpSuccess,
  resendOtpLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: resendOtpLoading});
const apiSucceed = payload => ({type: resendOtpSuccess, payload});
const apiError = payload => ({type: resendOtpError, payload});

export default ResendA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    console.log('fksfkkfkfkskfkfkfkkfkfkf')
    postService(apiName.resendOTP, body)
      .then(async res => {
        console.log('resendOTPsucc',res)
        if (res.status == 200) {
          console.log('resendOTPsucc',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for resendOTP api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    console.log('error for fffffffresendOTP api =====================>>', error);
    dispatchEvent(apiError(e));
  }
};
