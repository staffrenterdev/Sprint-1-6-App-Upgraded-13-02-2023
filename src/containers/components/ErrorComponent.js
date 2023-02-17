import {ERROR} from '../../redux/constants/reduxConstant';
import {showDangerToast} from './ToastMessage';

export default handleError = response => {
  if (response.error.response.data) {
    const res = response.error.data;
    showDangerToast(res.message);
    return true;
  } else {
    const res =
      response.error.response &&
      response.error.response.data &&
      response.error.response.data.errors;
    if (res) {
      let errorArr = Object.keys(res);
      let error = '';
      errorArr.map(i => {
        res[i].map(j => {
          error = error + ' ' + j;
        });
      });
      showDangerToast(error);
    } else {
      showDangerToast(response.error.response.data.message);
    }
    return false;
  }
};

export const handleErrorTwo = response => {
  console.log('------>>>>',response)
  if (response.status == ERROR) {
    console.log('log ERROR===', response.error);
    // var status
    try {
      const status = response.error.response.status;
      console.log('status', status);
      if (status == 401) {
        const res = response.error.response.data;
        showDangerToast(res.message);

        return true;
      } else if (status == 413) {
        showDangerToast('Somthing went wrong !');
        return false;
      } else if (status == 431) {
        showDangerToast('Somthing went wrong !');
        return false;
      } else if (status == 429) {
        showDangerToast('Somthing went wrong !');
        return false;
      } else if (status == 404) {
        showDangerToast('Somthing went wrong !');
        return false;
      } else if (status == 408) {
        showDangerToast('Request Timeout');
        return false;
      } else if (status == 415) {
        showDangerToast('Unsupported Media Type');
        return false;
      } else if (status == 507) {
        showDangerToast('Insufficient Storage');
        return false;
      } else {
        const res =
          response.error.response &&
          response.error.response.data &&
          response.error.response.data.errors;
        if (res) {
          let errorArr = Object.keys(res);
          let error = '';
          errorArr.map(i => {
            res[i].map(j => {
              error = error + ' ' + j;
            });
          });
          showDangerToast(error);
          return false;
        } else {
          showDangerToast(response.error.response.data.message);
          return false;
        }
      }
    } catch (e) {
      console.log('error code', e);
      showDangerToast('Please check your internet connection ... Try again');
    }
  }
};

export const handleErrorThree = response => {
  const status = response.status;
  if (status == 401) {
    const res = response.data;
    showDangerToast(res.message);
    return true;
  } else if (status == 413) {
    showDangerToast('Somthing went wrong !');
    return false;
  } else if (status == 431) {
    showDangerToast('Somthing went wrong !');
    return false;
  } else if (status == 429) {
    showDangerToast('Somthing went wrong !');
    return false;
  } else if (status == 404) {
    showDangerToast('Somthing went wrong !');
    return false;
  } else if (status == 408) {
    showDangerToast('Request Timeout');
    return false;
  } else if (status == 415) {
    showDangerToast('Unsupported Media Type');
    return false;
  } else if (status == 507) {
    showDangerToast('Insufficient Storage');
    return false;
  } else {
    const res = response && response.data && response.data.errors;
    if (res) {
      let errorArr = Object.keys(res);
      let error = '';
      errorArr.map(i => {
        res[i].map(j => {
          error = error + ' ' + j;
        });
      });
      showDangerToast(error);
      return false;
    } else {
      showDangerToast(response.data.message);
      return false;
    }
  }
};
