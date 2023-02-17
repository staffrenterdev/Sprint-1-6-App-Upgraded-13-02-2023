// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  AboutusError,
  AboutusSuccess,
  AboutusLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';
import { getService } from '../../services/getServices';

const apiLoading = () => ({type: AboutusLoading});
const apiSucceed = (payload) => ({type: AboutusSuccess, payload});
const apiError = (payload) => ({type: AboutusError, payload});


export default AboutusA = () => async (dispatchEvent, getState) => {
  
  dispatchEvent(apiLoading());
  try {
    getService(apiName.Aboutus)
      .then(async res => {
        console.log('getprofile data' ,res)
        if (res.data.status !== 0) {
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for getProfile api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
