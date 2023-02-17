import {postService} from '../../services/postServices';
import {
  passcodeError,
  passcodeSuccess,
  passcodeLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: passcodeLoading});
const apiSucceed = payload => ({type: passcodeSuccess, payload});
const apiError = payload => ({type: passcodeError, payload});

export default passcodeA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.passcode, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('ressssss',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for passcode api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
