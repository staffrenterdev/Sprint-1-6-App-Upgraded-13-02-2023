// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  addCertificationError,
  addCertificationSuccess,
  addCertificationLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: addCertificationLoading});
const apiSucceed = payload => ({type: addCertificationSuccess, payload});
const apiError = payload => ({type: addCertificationError, payload});

export default addCertificationA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.addCertification, body)
      .then(async res => {
        if (res.status == 200) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log(
          'error for addCertification api =====================>>',
          error,
        );

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
