import {getService} from '../../services/getServices';
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  myContractFilterError,
  myContractFilterSuccess,
  myContractFilterLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: myContractFilterLoading});
const apiSucceed = payload => ({type: myContractFilterSuccess, payload});
const apiError = payload => ({type: myContractFilterError, payload});

export default myContractFilterA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.myContractFilter, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
          console.log(
            'res for myContract Filter api =====================>>',
            res,
          );
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for myContract Filter api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
