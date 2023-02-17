import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
    checkpasswordError,
    checkpasswordSuccess,
    checkpasswordLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: checkpasswordLoading});
const apiSucceed = (payload) => ({type: checkpasswordSuccess, payload});
const apiError = (payload) => ({type: checkpasswordError, payload});

export default checkpasswordA = (Body) => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.checkpassword,Body)
      .then(async res => {
        if (res.status == 200) {
            console.log('checkpassword res',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for checkpassword api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};