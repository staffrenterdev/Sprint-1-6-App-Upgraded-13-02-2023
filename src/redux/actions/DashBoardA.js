import {getService} from '../../services/getServices';
// import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  DashBoardError,
  DashBoardSuccess,
  DashBoardLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: DashBoardLoading});
const apiSucceed = payload => ({type: DashBoardSuccess, payload});
const apiError = payload => ({type: DashBoardError, payload});

export default DashBoardA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.dashboard, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for DashBoard api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
