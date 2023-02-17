import {getService} from '../../services/getServices';
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {HelpcontentError, HelpcontentSuccess, HelpcontentLoading} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: HelpcontentLoading});
const apiSucceed = payload => ({type: HelpcontentSuccess, payload});
const apiError = payload => ({type: HelpcontentError, payload});

export default HelpcontentA = () => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.Helpcontent)
      .then(async res => {
        if (res.status == 200) {
            console.log('sfsfsfsfff',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for Helpcontent api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
