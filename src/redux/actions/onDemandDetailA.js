import {postService} from '../../services/postServices';
import {
  onDemandDetailError,
  onDemandDetailSuccess,
  onDemandDetailLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: onDemandDetailLoading});
const apiSucceed = payload => ({type: onDemandDetailSuccess, payload});
const apiError = payload => ({type: onDemandDetailError, payload});

export default onDemandDetailA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.on_demand_details, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for onDemandDetail api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
