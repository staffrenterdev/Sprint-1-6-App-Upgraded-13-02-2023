// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  forgotError,
  forgotSuccess,
  forgotLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: forgotLoading});
const apiSucceed = payload => ({type: forgotSuccess, payload});
const apiError = payload => ({type: forgotError, payload});

export default ForgotPasswordA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.forgotPassword, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('sfsfksfkskfksfkbbbbbbbbbb...........',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for forgot api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
