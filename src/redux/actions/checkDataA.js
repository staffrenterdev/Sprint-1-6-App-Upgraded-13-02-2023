// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  checkDataError,
  checkDataSuccess,
  checkDataLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: checkDataLoading});
const apiSucceed = payload => ({type: checkDataSuccess, payload});
const apiError = payload => ({type: checkDataError, payload});

export default checkDataA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.checkData, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('sfdsfsfsfsfsfs',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for checkData api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
