// import axios from 'axios'
import {
  myProfileError,
  myProfileSuccess,
  myProfileLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';
import { getService } from '../../services/getServices';

const apiLoading = () => ({type: myProfileLoading});
const apiSucceed = payload => ({type: myProfileSuccess, payload});
const apiError = payload => ({type: myProfileError, payload});

export default GetProfileA = () => async (dispatchEvent, getState) => {
  
  dispatchEvent(apiLoading());
  try {
    getService(apiName.getProfile)
      .then(async res => {
        console.log('getprofile data' ,res)
        if (res.data.status !== 0) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for getProfile api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
