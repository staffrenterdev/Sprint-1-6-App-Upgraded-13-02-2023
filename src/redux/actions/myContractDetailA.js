import {postService} from '../../services/postServices';
import {
  myContractDetailError,
  myContractDetailSuccess,
  myContractDetailLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: myContractDetailLoading});
const apiSucceed = payload => ({type: myContractDetailSuccess, payload});
const apiError = payload => ({type: myContractDetailError, payload});

export default myContractDetailA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.contract_details, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for myContractDetail api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
