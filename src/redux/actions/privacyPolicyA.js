// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  PrivacyPolicyError,
  PrivacyPolicySuccess,
  PrivacyPolicyLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: PrivacyPolicyLoading});
const apiSucceed = (payload) => ({type: PrivacyPolicySuccess, payload});
const apiError = (payload) => ({type: PrivacyPolicyError, payload});

export default privacyPolicyA = (Body) => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.privacypolicy,Body)
      .then(async res => {
        if (res.status == 200) {
            console.log('Privacy policy res',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for FAQ api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};