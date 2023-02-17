import {getService} from '../../services/getServices';
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {FAQError, FAQSuccess, FAQLoading} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: FAQLoading});
const apiSucceed = payload => ({type: FAQSuccess, payload});
const apiError = payload => ({type: FAQError, payload});

export default FAQA = (Body) => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    postService(apiName.faqs,Body)
      .then(async res => {
        if (res.status == 200) {
            console.log('faq res',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for FAQ api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
