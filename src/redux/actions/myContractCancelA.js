import {postService} from '../../services/postServices';
import {
  myContractCancelError,
  myContractCancelSuccess,
  myContractCancelLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: myContractCancelLoading});
const apiSucceed = payload => ({type: myContractCancelSuccess, payload});
const apiError = payload => ({type: myContractCancelError, payload});

export default myContractCancelA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.on_demand_Apply, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for myContractCancel api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
