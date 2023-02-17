import {postService} from '../../services/postServices';
import {getService} from '../../services/getServices';
import {
  experienceSkillError,
  experienceSkillSuccess,
  experienceSkillLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: experienceSkillLoading});
const apiSucceed = payload => ({type: experienceSkillSuccess, payload});
const apiError = payload => ({type: experienceSkillError, payload});

export default experienceSkillA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.experienceSkill + '?skill_id=' + global.skill_id)
      .then(async res => {
        console.log(
          'respones for experienceSkill api =====================>>',
          res,
        );
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for experienceSkill api1 =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
