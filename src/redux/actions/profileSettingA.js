// import { getService } from '../../services/getServices'
import {postService} from '../../services/postServices';
// import axios from 'axios'
import {
  myProfileError,
  myProfileSuccess,
  myProfileLoading,
} from '../constants/reduxConstant';
import apiName from '../../constants/apiName';

const apiLoading = () => ({type: myProfileLoading});
const apiSucceed = payload => ({type: myProfileSuccess, payload});
const apiError = payload => ({type: myProfileError, payload});

export default profileSettingA =
  (
    UserId,
    FirstName,
    LastName,
    PhoneNo,
    Email,
    Address,
    Country,
    State,
    City,
    Zipcode,
    refrence_file,
  ) =>
  async (dispatchEvent, getState) => {
    let body = new FormData();
    console.log('userid console => ==', UserId);
    body.append('user_id', UserId);
    body.append('first_name', FirstName);
    body.append('last_name', LastName);
    body.append('mobile', PhoneNo);
    body.append('email', Email);
    //body.append('new_password', Password)
    //body.append('confirm_password', ConfirmPassword)
    body.append('address', Address);
    body.append('country', Country);
    body.append('city', City);
    body.append('state', State);
    body.append('zipcode', Zipcode);
    body.append('profile_image', refrence_file);
    // const  body={
    //     first_name:FirstName,
    //     last_name:LastName,
    //     mobile:PhoneNo,
    //     email:Email,
    //     new_password:Password,
    //     confirm_password:ConfirmPassword,
    //     address:Address,
    //     country:Country,
    //     city:City,
    //     state:State,
    //     zipcode:Zipcode,

    // }
    console.log('body in profile setting ======>>', body);
    dispatchEvent(apiLoading());
    try {
      postService(apiName.updateProfile, body)
        .then(async res => {
          if (res.data.status !== 0) {
            dispatchEvent(apiSucceed(res));
          } else {
            dispatchEvent(apiError(res));
          }
        })
        .catch(error => {
          console.log(
            'error for profile setting api =====================>>',
            error,
          );

          dispatchEvent(apiError(error));
        });
    } catch (e) {
      dispatchEvent(apiError(e));
    }
  };
