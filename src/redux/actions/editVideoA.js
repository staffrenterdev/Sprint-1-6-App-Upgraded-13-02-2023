import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  editVideoError,
  editVideoSuccess,
  editVideoLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: editVideoLoading});
const apiSucceed = payload => ({type: editVideoSuccess, payload});
const apiError = payload => ({type: editVideoError, payload});

export default editVideoA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.editProfile, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for editVideo api =====================>>', error);
        // return;

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
