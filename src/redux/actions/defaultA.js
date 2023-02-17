// import { getService } from '../../services/getServices'
// import { postService } from '../../services/postServices'
// import axios from 'axios'
import {defaultError, defaultSuccess, defaultLoading} from '../constants/reduxConstant'


const apiLoading = () => ({ type: 'None' });
const apiSucceed = payload => ({ type: defaultSuccess, payload });
const apiError = payload => ({ type: defaultError, payload });


export default defaultA = () => async (dispatchEvent, getState ) => {
    

    // console.log("default action function entered");
    dispatchEvent(apiLoading());
    
};