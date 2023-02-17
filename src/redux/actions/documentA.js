import {postService} from '../../services/postServices';
import {getService} from '../../services/getServices';
// import axios from 'axios'
import {
  documentError,
  documentSuccess,
  documentLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: documentLoading});
const apiSucceed = payload => ({type: documentSuccess, payload});
const apiError = payload => ({type: documentError, payload});

export default documentA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.document, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for document api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
