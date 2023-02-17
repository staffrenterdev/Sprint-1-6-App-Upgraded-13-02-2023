// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  skillAddExperienceError,
  skillAddExperienceSuccess,
  skillAddExperienceLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: skillAddExperienceLoading});
const apiSucceed = payload => ({type: skillAddExperienceSuccess, payload});
const apiError = payload => ({type: skillAddExperienceError, payload});

export default skillAddExperienceA =
  body => async (dispatchEvent, getState) => {
    dispatchEvent(apiLoading());
    try {
      postService(apiName.addExperience, body)
        .then(async res => {
          if (res.status == 200) {
            dispatchEvent(apiSucceed(res));
          } else {
            dispatchEvent(apiError(res));
          }
        })
        .catch(error => {
          console.log(
            'error for skillAddExperience api =====================>>',
            error,
          );

          dispatchEvent(apiError(error));
        });
    } catch (e) {
      dispatchEvent(apiError(e));
    }
  };
