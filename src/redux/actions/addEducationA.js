// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  addEducationError,
  addEducationSuccess,
  addEducationLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: addEducationLoading});
const apiSucceed = payload => ({type: addEducationSuccess, payload});
const apiError = payload => ({type: addEducationError, payload});

export default addEducationA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.addEducation, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for addEducation api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
