// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  resetPasswordError,
  resetPasswordSuccess,
  resetPasswordLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: resetPasswordLoading});
const apiSucceed = payload => ({type: resetPasswordSuccess, payload});
const apiError = payload => ({type: resetPasswordError, payload});

export default ResetPasswordA = body => async (dispatchEvent, getState) => {
  console.log('body in resetPassword ======>>', body);
  dispatchEvent(apiLoading());

  try {
    postService(apiName.resetPassword, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('reset res',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for reset api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
