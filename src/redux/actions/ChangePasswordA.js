// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  updatePasswordError,
  updatePasswordSuccess,
  updatePasswordLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: updatePasswordLoading});
const apiSucceed = payload => ({type: updatePasswordSuccess, payload});
const apiError = payload => ({type: updatePasswordError, payload});

export default ResetPasswordA = body =>
  async (dispatchEvent, getState) => {
  
    dispatchEvent(apiLoading());
    try {
      postService(apiName.changePassword, body)
        .then(async res => {
          if (res.data.status !== 0) {
            console.log('gbfggfgdddddd',res)
            dispatchEvent(apiSucceed(res));
          } else {
            dispatchEvent(apiError(res));
          }
        })
        .catch(error => {
          console.log(
            'error for change password api =====================>>',
            error,
          );

          dispatchEvent(apiError(error));
        });
    } catch (e) {
      dispatchEvent(apiError(e));
    }
  };
