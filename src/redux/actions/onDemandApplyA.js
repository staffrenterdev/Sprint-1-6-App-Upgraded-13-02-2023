import {postService} from '../../services/postServices';
import {
  onDemandApplyError,
  onDemandApplySuccess,
  onDemandApplyLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: onDemandApplyLoading});
const apiSucceed = payload => ({type: onDemandApplySuccess, payload});
const apiError = payload => ({type: onDemandApplyError, payload});

export default onDemandApplyA = body => async (dispatchEvent, getState) => {
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
          'error for onDemandApply api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
