import {getService} from '../../services/getServices';
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {gameError, gameSuccess, gameLoading} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: gameLoading});
const apiSucceed = payload => ({type: gameSuccess, payload});
const apiError = payload => ({type: gameError, payload});

export default gameA = body => async (dispatchEvent, getState) => {
  dispatchEvent(apiLoading());
  try {
    getService(apiName.game, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('ffksfksfksfkksfskfs',res)
          dispatchEvent(apiSucceed(res));
        } else {
          dispatchEvent(apiError(res));
        }
      })
      .catch(error => {
        console.log('error for game api =====================>>', error);

        dispatchEvent(apiError(error));
      });
  } catch (e) {
    dispatchEvent(apiError(e));
  }
};
