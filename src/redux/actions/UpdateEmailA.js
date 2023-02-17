import {postService} from '../../services/postServices';
import {
    UpdateEmailLoading,
    UpdateEmailSuccess,
  UpdateEmailError,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: UpdateEmailLoading});
const apiSucceed = payload => ({type: UpdateEmailSuccess, payload});
const apiError = payload => ({type: UpdateEmailError, payload});

export default UpdateEmailA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.updateemail, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('updateemail...........',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for updateemail api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
