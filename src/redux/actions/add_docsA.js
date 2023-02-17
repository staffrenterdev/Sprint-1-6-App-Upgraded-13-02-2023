// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  add_docsError,
  add_docsSuccess,
  add_docsLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: add_docsLoading});
const apiSucceed = payload => ({type: add_docsSuccess, payload});
const apiError = payload => ({type: add_docsError, payload});

export default add_docsA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.add_docs, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for add_docs api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
