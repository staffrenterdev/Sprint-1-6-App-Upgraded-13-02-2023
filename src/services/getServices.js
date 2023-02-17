//***** import libraries */
import axios from 'axios';

import {BASEURL} from '../constants/apiName';
import AsyncStorage from '@react-native-async-storage/async-storage';

//***** common function for get services */
export const getService = async (urlAction, getParams) => {
  let ServiceUrl = BASEURL + urlAction;
  let token = global.appToken == undefined ? '' : global.Token;

  let headers = {
    'X-Requested-With': XMLHttpRequest,
    Authorization: 'Bearer' + ' ' + global.apiToken,
     language: global.language
   
  };

  console.log('ServiceUrl', ServiceUrl);
  console.log('auth headers', headers);
  return new Promise(function (resolve, reject) {
    axios({
      method: 'get',
      url: ServiceUrl,
      timeout: 3000 * 60,
      params: getParams,
      headers: headers,
    })
      .then(async reponse => {
        resolve(reponse);
      })
      .catch(error => {
        reject(error);
      });
  });
};
