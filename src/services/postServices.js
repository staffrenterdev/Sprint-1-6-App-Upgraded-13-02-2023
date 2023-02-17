//***** import libraries */
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BASEURL,
  //csrf_token
} from '../constants/apiName';

//***** common url for calling webservices */
// const URL = 'https://devnode.devtechnosys.tech/Click_dubai/';

//***** common function for post services */
export const postService = async (urlAction, params) => {
  let ServiceUrl = BASEURL + urlAction;
  let token = global.appToken == undefined ? '' : global.appToken;
  let headers = {
    'X-Requested-With': XMLHttpRequest,
    Authorization: 'Bearer' + ' ' + global.apiToken,
    language: global.language
  };
  
  console.log('ServiceUrl', ServiceUrl);
  console.log('auth headers', headers);
  console.log('params', params);
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: ServiceUrl,
      timeout: 3000 * 60,
      data: params,
      headers: headers,
    })
      .then(async reponse => {
        resolve(reponse);
      })
      .catch(error => {
        console.log('errrorrr ============>', error);
        console.log('errrorrr.message ============>', error.message);
        console.log('errrorrr.response ============>', error.response);
        console.log('errrorrr.code ============>', error.code);
        //return false;
        reject(error);
      });
  });
};
