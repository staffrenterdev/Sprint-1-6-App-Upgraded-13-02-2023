import { openImageSettings, openCameraSettings } from "../../assets/utility/openSettings";
import ImagePicker from "react-native-image-crop-picker";
import ImageResizer from "react-native-image-resizer";
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { Platform,PermissionsAndroid } from "react-native";


const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    let status = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (status === 'denied' || status === 'never_ask_again') {
      throw Error('Permission not granted to access contacts');
    }
  }
};

export const checkPhotoPermission = (multiple = false) => {
    return (
        check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(response => {
            if (response == RESULTS.BLOCKED) {
                openImageSettings();
                return;
            } else {
                return pickImageHandler(multiple);
       
            }
        })
    )
};

export const checkPhotoPermissionNew = (multiple = false) => {
    return (
        check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(response => {
            if (response == RESULTS.BLOCKED) {
                openImageSettings();
                return;
            } else {
                return pickImageHandlerNew(multiple);
       
            }
        })
    )
};

export const pickImageHandler = (multiple = false) => {
    return (
        ImagePicker.openPicker({
            cropperCircleOverlay:true,
            cropping: true,
            mediaType: "photo",
            multiple: multiple,
            maxFiles: 8
        }).then(async image => {
            if (multiple == true) {
                await image.map(async i => {
                    return await ImageResizer.createResizedImage(i.path, 400, 400, "JPEG", 50).then(
                        response => {
                            
                            i.uri = response.uri
                            i.path = response.uri
                            i.name = response.name
                            i.height = response.height
                            i.width = response.width
                        }
                    );
                })
            


                return image
            } else {
                return ImageResizer.createResizedImage(image.path, 400, 400, "JPEG", 50).then(
                    response => {
                        return [response];
                    }
                );
            }

        })
            .catch(err => {
                console.log("the error in image picker is 4 ", err.message);
                return err.message
            })
    )

};
export const checkStoragePermission = () => {
    return check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then((response) => {
        console.log('responseresponse',response)
        if (response == RESULTS.BLOCKED) {
          openStorageSettings();
          return false;
        } else {
          return true;
        }
      })
      .catch((error) => {
        console.log('error======>', error);
      });
  };
  export const checkStoragePermissionAndroid = () => {
    console.log(
      'lpermission check = ',
      check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE ||
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ),
    );
    return check(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE ||
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    )
      .then((response) => {
        console.log('permission response ==', response);
        if (response == RESULTS.BLOCKED) {
          openStorageSettings();
          return false;
        } else {
          return true;
        }
      })
      .catch((error) => {
        console.log('error = ', error);
      });
  };
export const pickImageHandlerNew = (multiple = false) => {
    return (
        ImagePicker.openPicker({
        
            mediaType: "photo",
           
        }).then(async image => {
            if (multiple == true) {
                await image.map(async i => {
                    return await ImageResizer.createResizedImage(i.path, 400, 400, "JPEG", 50).then(
                        response => {
                            
                            i.uri = response.uri
                            i.path = response.uri
                            i.name = response.name
                            i.height = response.height
                            i.width = response.width
                        }
                    );
                })
            


                return image
            } else {
                return ImageResizer.createResizedImage(image.path, 400, 400, "JPEG", 50).then(
                    response => {
                        return [response];
                    }
                );
            }

        })
            .catch(err => {
                console.log("the error in image picker is 4 ", err.message);
                return err.message
            })
    )

};

export const checkCameraPermission = () => {
    return (
        check(PERMISSIONS.IOS.CAMERA).then(response => {
            if (response == RESULTS.BLOCKED) {
                openCameraSettings();
                return;
            } else {
                return openCameraPickerView();
            }
        })
            .catch(error => {
                console.log("the error in camera permission is ", error);
            })
    )
};
export const checkCameraPermissionNew = () => {
    return (
        check(PERMISSIONS.IOS.CAMERA).then(response => {
            if (response == RESULTS.BLOCKED) {
                openCameraSettings();
                return;
            } else {
                return openCameraPickerViewNew();
            }
        })
            .catch(error => {
                console.log("the error in camera permission is ", error);
            })
    )
};

export const openCameraPickerView = () => {
    return (
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropperCircleOverlay:true,
            cropping: true,
        })
            .then(async image => {
                
                return ImageResizer.createResizedImage(image.path, 400, 400, "JPEG", 50).then(
                    response => {
                        if (Platform.OS == 'android') {
                            response.path = response.uri
                        }
                        return [response];
                    }
                );
            })
            .catch(error => {
                console.log("error in open camera", error);
                return error.message
            })
    )
};
export const openCameraPickerViewNew = () => {
    return (
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            // cropperCircleOverlay:true,
            // cropping: true,
        })
            .then(async image => {
                
                return ImageResizer.createResizedImage(image.path, 400, 400, "JPEG", 50).then(
                    response => {
                        if (Platform.OS == 'android') {
                            response.path = response.uri
                        }
                        return [response];
                    }
                );
            })
            .catch(error => {
                console.log("error in open camera", error);
                return error.message
            })
    )
};
const getStoragePermission = async () => {
    await requestPermissions();
    return new Promise(function (res, rej) {
      check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE ||
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      )
        .then((response) => {
          if (response == RESULTS.BLOCKED) {
            openStorageSettings();
            rej(false);
          } else {
            res(true);
          }
        })
        .catch((error) => {
          console.log('error = ', error);
        });
    });
  };

export const StorageAndroid = {getStoragePermission};






