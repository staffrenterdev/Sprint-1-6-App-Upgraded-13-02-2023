import {getService} from '../../services/getServices';
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  ResultError,
  ResultSuccess,
  ResultLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: ResultLoading});
const apiSucceed = payload => ({type: ResultSuccess, payload});
const apiError = payload => ({type: ResultError, payload});

export default ResultA = body => async (dispatchEvent, getState) => {
  console.log('body in Result ======>>', body);
  dispatchEvent(apiLoading());
  try {
    getService(apiName.Result, body)
      .then(async res => {
        console.log('bbbmbmbmbmbmbmbmbmb',res)
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for Result api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
