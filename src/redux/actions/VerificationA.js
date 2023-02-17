// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  sendOTPError,
  sendOTPSuccess,
  sendOTPLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: sendOTPLoading});
const apiSucceed = payload => ({type: sendOTPSuccess, payload});
const apiError = payload => ({type: sendOTPError, payload});

export default VerificationA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.verifyOTP, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('VerificationA',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for verification api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
