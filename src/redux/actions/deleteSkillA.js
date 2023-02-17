import {postService} from '../../services/postServices';
import {getService} from '../../services/getServices';
// import axios from 'axios'
import {
  deleteSkillError,
  deleteSkillSuccess,
  deleteSkillLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: deleteSkillLoading});
const apiSucceed = payload => ({type: deleteSkillSuccess, payload});
const apiError = payload => ({type: deleteSkillError, payload});

export default deleteSkillA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.skill_delete, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for deleteSkill api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
