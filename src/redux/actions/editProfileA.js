import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  editProfileError,
  editProfileSuccess,
  editProfileLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: editProfileLoading});
const apiSucceed = payload => ({type: editProfileSuccess, payload});
const apiError = payload => ({type: editProfileError, payload});

export default editProfileA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.editProfile, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('editProfile ress',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for editProfile api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
