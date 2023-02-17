import {getService} from '../../services/getServices';
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  myContractListError,
  myContractListSuccess,
  myContractListLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: myContractListLoading});
const apiSucceed = payload => ({type: myContractListSuccess, payload});
const apiError = payload => ({type: myContractListError, payload});

export default myContractListA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.myContractList, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for myContractList api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
