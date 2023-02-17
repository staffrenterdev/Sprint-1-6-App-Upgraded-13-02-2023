// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
    termsconditionsError,
    termsconditionsSuccess,
    termsconditionsLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: termsconditionsLoading});
const apiSucceed = (payload) => ({type: termsconditionsSuccess, payload});
const apiError = (payload) => ({type: termsconditionsError, payload});

export default Term_conditionsA = (Body) => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.termsconditions,Body)
      .then(async res => {
        if (res.status == 200) {
            console.log('termsconditions res',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for termsconditions api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};