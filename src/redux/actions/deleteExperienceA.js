// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  deleteExperienceError,
  deleteExperienceSuccess,
  deleteExperienceLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: deleteExperienceLoading});
const apiSucceed = payload => ({type: deleteExperienceSuccess, payload});
const apiError = payload => ({type: deleteExperienceError, payload});

export default deleteExperienceA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.delete_skillset, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for deleteExperience api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
