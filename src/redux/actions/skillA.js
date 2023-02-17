// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  skillError,
  skillSuccess,
  skillLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: skillLoading});
const apiSucceed = payload => ({type: skillSuccess, payload});
const apiError = payload => ({type: skillError, payload});

export default skillA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.skill, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for skill api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
