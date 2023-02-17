import {getService} from '../../services/getServices';
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  experienceError,
  experienceSuccess,
  experienceLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: experienceLoading});
const apiSucceed = payload => ({type: experienceSuccess, payload});
const apiError = payload => ({type: experienceError, payload});

export default experienceA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.experiencePage, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for experience api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
