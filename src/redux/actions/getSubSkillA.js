// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  getSubSkillError,
  getSubSkillSuccess,
  getSubSkillLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: getSubSkillLoading});
const apiSucceed = payload => ({type: getSubSkillSuccess, payload});
const apiError = payload => ({type: getSubSkillError, payload});

export default getSubSkillA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.getSubSkill, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for getSubSkill api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
