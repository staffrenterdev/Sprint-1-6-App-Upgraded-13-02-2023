import {getService} from '../../services/getServices';
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  onDemandFilterError,
  onDemandFilterSuccess,
  onDemandFilterLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: onDemandFilterLoading});
const apiSucceed = payload => ({type: onDemandFilterSuccess, payload});
const apiError = payload => ({type: onDemandFilterError, payload});

export default onDemandFilterA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.onDemandFilter, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
          console.log(
            'res for onDemandFilter api =====================>>',
            res,
          );
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for onDemandFilter api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
