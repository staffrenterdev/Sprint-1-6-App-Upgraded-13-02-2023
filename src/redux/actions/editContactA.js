import {postService} from '../../services/postServices';
import {
  editContactError,
  editContactSuccess,
  editContactLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: editContactLoading});
const apiSucceed = payload => ({type: editContactSuccess, payload});
const apiError = payload => ({type: editContactError, payload});

export default editContactA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.editContact, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for editContact api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
