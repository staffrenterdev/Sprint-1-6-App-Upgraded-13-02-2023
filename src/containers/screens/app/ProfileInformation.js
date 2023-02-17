import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  Modal,
  PermissionsAndroid,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  _ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import NavBar from '../../components/NavBar';
import { width } from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/profileinfo';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import TextBox from '../../components/TextBox';
import Picker from 'react-native-picker';
import ImagePickerModal from '../../components/imagePickerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import { DatePicker } from 'react-native-common-date-picker';
import GoogleAutoComplete from '../../components/googleAutoComplete';
import {
  checkPhotoPermission,
  checkCameraPermission,
  pickImageHandler,
  openCameraPickerView,
  checkPhotoPermissionNew,
  checkCameraPermissionNew,
  pickImageHandlerNew,
  openCameraPickerViewNew,
} from '../../components/imagePicker';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { connect } from 'react-redux';
import { SUCCESS, ERROR, LOADING } from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import editProfileA from '../../../redux/actions/editProfileA';
import { handleErrorTwo } from '../../components/ErrorComponent';
import Loader from '../../components/loader';
import SignItOut from '../../components/SignItOut';
import validate from '../../../assets/validation/validate_wrapper';
import { ShowStatusBarYellow } from '../../components/Statusbar';
import { Bubbles } from 'react-native-loader';
import { showDangerToast, showToast } from '../../components/ToastMessage';
import { PLAYER_STATES } from 'react-native-media-controls';
import { useFocusEffect } from '@react-navigation/native';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ResendA from '../../../redux/actions/ResendA';
import VerificationA from '../../../redux/actions/VerificationA';
import checkpasswordA from '../../../redux/actions/checkpasswordA';
import GetProfileA from '../../../redux/actions/GetProfileA';
import SendOtpA from '../../../redux/actions/SendOtpA';
import UpdateEmailA from '../../../redux/actions/UpdateEmailA';
import apiName, { DummyImage } from '../../../constants/apiName';
import { getService } from '../../../services/getServices';
import { postService } from '../../../services/postServices';

var date1 = new Date();
var emailReq = '';

const ProfileInformation = props => {
  const [state, setState] = useState({
    emailvalue: '',
    email: '',
    password: '',
    emailReq: '',
    passwordError: '',
    loading: false,
    data: '',
    otp: '',
    otpError: '',
    profileImage: '',
    fName: '',
    lName: '',
    sin: '',
    sinwithoutstar: '',
    link: '',
    mobile: '',
    mobileError: '',
    phone: '',
    other: '',
    phoneError: '',
    dateFrom: '',
    dateShowFrom: '',
    minDate1: '',
    dateTo: '',
    dateFromError: '',
    mobile1: '',
    phone1: '',
    other1: '',
    mobile1Error: '',
    phone1Error: '',
    other1Error: '',
    fNameError: '',
    lNameError: '',
    dayError: '',
    langError: '',
    sinError: '',
    link1: '',
    link2: '',
    link3: '',
    linkError: '',
    linkError1: '',
    linkError2: '',
    linkError3: '',
    image: '',
    showImgOption: false,
    showImgOptionNew: false,
    imageUser: '',
    allSpoken_language: [],
    selectedSpoken_language: [],
    monthName: '',
    fLink: '',
    iLink: '',
    lLink: '',
    tLink: '',
    imageError: '',
    imageProfile: '',
    image21: false,
    image22: false,
    image23: false,
    image24: false,
    imageSelect: false,
    firstNameUser: '',
    lastNameUser: '',
    languageUser: '',
    mobile11: '',
    mobile12: '',
    mobile13: '',
    compulsaryText: false,
    editEmail: '',
    expiredob: '',
    dob: '',
    dobold: '',
    address: '',
    editEmail1: '',
    editEmailError: '',
    email2: '',
    sinHome: '',
    FirstLink: '',
    SecondLink: '',
    ThirdLink: '',
    FourthLink: '',
    loadingEmail: false,
    loadingPhone: false,
    loadingProfile: false,
    monthUpdate: '',
    yearUpdate: '',
    dayUpdate: '',
    language1: '',
    videoUrl: '',
    uploadVideo: '',
    currentDate1: moment(new Date()).format('YYYY-MM-DD'),
    calenderDate: new Date(
      new Date().setFullYear(new Date().getFullYear() - 18),
    ),
    ExpirecalenderDate: new Date(),
    currentDateUpdate: '',
    document: '',
    document1: '',
    documentError: '',
    visibility: null,
    newCurrentDate: moment(new Date()).format('YYYY-MM-DD'),
    newCurrentAdd: moment(new Date()).format('YYYY-MM-DD'),
    newCurrentSub: moment(new Date()).format('YYYY-MM-DD'),
    canadaStatus: null,
    expirationDate: '',
    documentDownLoad: '',
    loadingUpload: false,
    errorTime: '',
    difference: 0,
    currentDay: '',
    currentDate21: moment(new Date()).format('YYYY-MM-DD'),
    interviewStatus: null,
    cancelTime: '',
    cancelDay: '',
    cancelDate: '',
    content: '',
    playerState: PLAYER_STATES.PLAYING,
    screenType: 'stretch',
    duration: 0,
    isLoading: true,
    currentTime: 0,
    paused: false,
    Video_Player: useRef(null),
    othermax: 12,
    phonemax: 12,
    mobilemax: 13,
    mapobj: [props.route.params],
    videoData: '',
    videoSize: '',
    videoName: '',
    videoFileName: '',
    Selectedlanguage: '',
    imageUpload: '',
  });
  const [choosedocumenttype, setChoosedocumenttype] = React.useState([]);
  const [choosedoc, setChoosedoc] = useState();
  const [choosedocId, setChoosedocId] = useState();
  const [choosestatustype, setChoosestatustype] = useState([]);
  const [choosestatus, setChoosestatus] = useState();
  const [choosestatusId, setChoosestatusId] = useState();
  const [activebutton, setActivebutton] = useState(false);
  const [getprofilefullres, setGetprofilefullres] = useState();
  const [selectedlang, setselectedlang] = useState([]);
  const [first, setFirst] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [legalAgeModal, setLegalAgeModal] = useState(false);
  const [SelectedLangModal, setSelectedLangModal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [otpValidate1, setOtpValidate1] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [experienceCalender, setExperienceCalender] = useState(false);
  const [workinglegaldateModal, setWorkinglegaldateModal] = useState(false);
  const [error, setOtperror] = useState(false);
  const [AddressModal, setAddressModal] = useState(false);
  const [messengerError, setMessengerError] = React.useState('');
  const [active, setActive] = useState(false);
  const [date, setDate] = useState(new Date());
  const [datepic, setDatepic] = useState(false);
  const [datepic1, setDatepic1] = useState(false);
  const [appointment, setAppointment] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingLegal, setLoadingLegal] = React.useState(false);
  const [loadingTextLegal, setLoadingTextLegal] = React.useState(false);
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [emailModal, setEmailModal] = React.useState(false);
  const [workinglegalModal, setWorkinglegalModal] = useState(false);
  const [showverifypassmodal, setShowverifypassmodal] = useState(false);
  const [bubbleloader, setBubbleloader] = useState(false);
  const [verifyotp, setVerifyotp] = useState(false);
  const [emailinvalide, setEmailinvalide] = useState('');
  const [banners, setBanners] = useState(props.route.params);
  const [newView, setNew] = useState(false);
  const [validateModal, setValidateModal] = useState(false);
  const [shouldClear, setShouldClear] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [location, setLocation] = useState('');
  const [isSave, setIsSave] = useState(true);
  const [varifedimage, setVarifedimage] = useState();
  const [sinchangevalue, setSinchangevalue] = useState(false);
  const [keyboardvalue, setkeyboardvalue] = useState(false);
  const [LegalStatusrespose, setLegalStatusrespose] = useState();
  const [workingStatusExpire, setWorkingStatusExpire] = useState(false);
  const [workingStatusUpload, setWorkingStatusUpload] = useState(false);
  const [workingStatusDocument, setWorkingStatusDocument] = useState(false);
  const scrollref = useRef();
  const [imageUploadDocument, setImageUploadDocument] = useState('');
  const [imageUploadDocumentSize, setImageUploadDocumentSize] = useState('');
  const [statusWorking, setStatusWorking] = useState();
  const [pickerShowNew, setPickerShowNew] = useState(false);
  const [deActive, setDeActive] = useState(false);
  const [oldstatus, setOldstatus] = useState();
  const [olddocument, setOlddocument] = useState();
  const [olddate, setOlddate] = useState('');
  const [oldimage, setOldimage] = useState();
  const [buttonactivevalue, setButtonactivevalue] = useState(false);
  const [dataOld, setDataOld] = useState();
  const [dataNew, setDataNew] = useState();
  const [dataLang1, setDataLang1] = useState([]);
  const [dataLang2, setDataLang2] = useState([]);
  const [dataId1, setDataId1] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [cityname, setcityname] = useState();
  const [documnenttype, setDocumnenttype] = useState()
  const [validatemessage, setValidatemessage] = useState('')
  useFocusEffect(() => {
    setBanners(props.route.params);
  });
  useEffect(() => {
    AsyncStorage.getItem('curruntLocation', (err, item) => {
      if (item != null) {
        var location = JSON.parse(item);
        state.location = location;
        setState({ ...state, location: location });
      }
    });
  }, []);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  const _keyboardDidShow = e => {
    setMBottom(e.endCoordinates.height);

    setKeyboardVisible(true);
    setIsSave(false);
    Picker.hide();
  };

  const _keyboardDidHide = () => {
    setIsSave(true);
    setMBottom('100%');
    setKeyboardVisible(false);
  };
  useEffect(() => {
    var newKey = dataLang1.filter(d => !dataLang2.includes(d));

    if (
      getprofilefullres?.first_name != state.fName ||
      getprofilefullres?.last_name != state.lName ||
      getprofilefullres?.phone_number != state.mobile1 ||
      getprofilefullres?.email != state.emailvalue ||
      getprofilefullres?.dob != state.dob ||
      getprofilefullres?.address != location ||
      getprofilefullres?.social_insurance_number != state.sin ||
      newKey != 0 ||
      dataLang1.length != dataLang2.length
    ) {
      setActivebutton(true);
    } else {
      setActivebutton(false);
    }
  }, [state, location, dataLength]);
  const onChangeAndroid = (event, selectedDate) => {
    if (event.type == 'set') {
      const currentDate = selectedDate;
      setDatepic(false);

      setDate(currentDate);
    }
  };
  const onChangeIos = (event, selectedDate) => {
    const currentDate = selectedDate;

    date1 = selectedDate;
    setDate(currentDate);
  };
  const onPress1 = () => {
    setDate(date1);
    setDatepic1(false);
  };

  const checkPermissionIos = () => {
    return check(PERMISSIONS.IOS.CAMERA)
      .then(response => {
        if (response == RESULTS.BLOCKED) {
          return;
        } else {
          return documentPic();
        }
      })
      .catch(error => { });
  };
  const checkPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permission',
          message: 'Staff Renter Port needs to read storage ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true, documentPic();
      } else {
        return false;
      }
    } catch (error) { }
  };
  const documentPic = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      var uriNew = res.uri;
      var newlet = res.size / 1024;

      var newImage2 = {
        name: res.name,
        type: 'application/pdf',
        uri: uriNew,
      };

      setLoadingLegal(true);
      setLoadingTextLegal(false);
      uploaddocumentfun(newImage2, Math.round(newlet), res.name);
      if (workingStatusExpire == true) {
        if (state.expiredob == '') {
          setDeActive(false);
        } else {
          setDeActive(true);
        }
      } else {
        setDeActive(true);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const imgMedium1 = index => {
    if (index == 0) {
      Platform.OS == 'ios'
        ? checkCameraPermissionNew().then(res => {
          handleImgRes1(res);
        })
        : openCameraPickerViewNew().then(res => {
          handleImgRes1(res);
        });
    } else if (index == 1) {
      Platform.OS == 'ios'
        ? checkPhotoPermissionNew(false).then(res => {
          handleImgRes1(res);
        })
        : pickImageHandlerNew(false).then(res => {
          handleImgRes1(res);
        });
    }
  };

  const handleImgRes1 = async res => {
    if (typeof res != 'string') {
      var lstIndex = res[0].path.lastIndexOf('-');
      var fileNameAndroid = res[0].path.slice(lstIndex + 1, res[0].path.length);

      var name =
        Platform.OS == 'ios'
          ? res[0].filename == null
            ? 'newImgIos.jpg'
            : res[0].filename
          : fileNameAndroid;
      var uri = res[0].path;
      var newlet = res[0].size / 1024;
      setState({
        ...state,

        imageUpload: {
          name: name,
          type: 'image/jpg',
          uri: 'file://' + uri,
          size: Math.round(newlet),
        },

        showImgOption: false,
        imageError: '',
        imageSelect: true,
      });
      var newImage2 = {
        name: name,
        type: 'image/jpg',
        uri: 'file://' + uri,
      };

      setLoadingLegal(true);
      setLoadingTextLegal(false);
      uploaddocumentfun(newImage2, Math.round(newlet), name);
      if (workingStatusExpire == true) {
        if (state.expiredob == '') {
          setDeActive(false);
        } else {
          setDeActive(true);
        }
      } else {
        setDeActive(true);
      }
    }
  };

  const onImageUpload = () => {
    Alert.alert('Please select official document', '', [
      { text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel' },
    ]);
  };
  const onOfficialDocument = () => {
    Alert.alert('Please select status', '', [
      { text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel' },
    ]);
  };
  const checkValidation = () => {
    if (imageUploadDocument == '' || choosedoc == '' || choosestatus == '') {
      Alert.alert('Please fill all necessary details', '', [
        { text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel' },
      ]);
      return false;
    }
    if (workingStatusExpire == true && state.expiredob == '') {
      Alert.alert('Please fill all necessary details', '', [
        { text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel' },
      ]);
      return false;
    }

    return true;
  };

  const imgMedium = index => {
    if (index == 0) {
      Platform.OS == 'ios'
        ? checkCameraPermission().then(res => {
          handleImgRes(res);
        })
        : openCameraPickerView().then(res => {
          handleImgRes(res);
        });
    } else if (index == 1) {
      Platform.OS == 'ios'
        ? checkPhotoPermission(false).then(res => {
          handleImgRes(res);
        })
        : pickImageHandler(false).then(res => {
          handleImgRes(res);
        });
    }
  };

  const handleImgRes = async res => {
    if (typeof res != 'string') {
      var lstIndex = res[0].path.lastIndexOf('/');
      var fileNameAndroid = res[0].path.slice(lstIndex + 1, res[0].path.length);
      var name =
        Platform.OS == 'ios'
          ? res[0].filename == null
            ? 'newImgIos.jpg'
            : res[0].filename
          : fileNameAndroid;
      var type = res[0].mime;
      var uri = res[0].path;
      setState({
        ...state,

        image: {
          name: name,
          type: 'image/jpg',
          uri: 'file://' + uri,
        },
        imageUser: 'file://' + uri,
        showImgOption: false,
        imageError: '',
        imageSelect: true,
      });
      var newImage = {
        name: name,
        type: 'image/jpg',
        uri: 'file://' + uri,
      };
    }
    setLoading(true);
    setTimeout(() => {
      updateProfileImage(newImage);
    }, 2000);
  };
  const checkValidEmail = () => {
    var emailReq = '';
    if (
      state.editEmail1 == null ||
      state.editEmail1 == 'null' ||
      state.editEmail1 == ''
    )
      state.editEmail1 = '';
    state.editEmail1 != ''
      ? (emailReq = validate('email', state.editEmail1))
      : null;

    if (emailReq) {
      setState({
        ...state,
        editEmailError: emailReq,
      });
      return false;
    } else {
      setState({
        ...state,
        editEmailError: '',
      });
      return true;
    }
  };
  const validEmail = () => {
    if (!checkValidEmail()) {
      return;
    }
    state.loadingEmail = true;
    let body = new FormData();
    body.append('email2', state.editEmail1.toLowerCase());
    props.editProfileRequest(body);
  };

  const setPlaces = (data, details) => {
    data && setNewLocation('');
    setShouldClear(false);
    setTimeout(() => {
      setLocation(data?.description);
      setLatitude(details?.geometry?.location?.lat);
      setLongitude(details?.geometry?.location?.lng);
      setcityname(details?.vicinity);
    }, 200);
    setAddressModal(false);
    setNew(false);
  };

  const checkotpvalidation = () => {
    const otpError = validate('otp', state.otp);

    if (otpError) {
      setState({
        ...state,
        otpError: otpError,
      });
      return false;
    } else {
      setState({
        ...state,
        otpError: '',
      });
      return true;
    }
  };

  const verificationOtp = () => {
    state.resendOtp = '';
    if (!checkotpvalidation()) {
      return;
    }
    let body = new FormData();
    body.append('email', state.emailvalue.toLowerCase());
    body.append('otp', state.otp);
    body.append('role_id', 3);
    body.append('language', global.language);
    props.verificationRequest(body);
  };
  useEffect(() => {
    const verification = props.verificationRes.VerificationR;

    if (verification.status == LOADING) {
      setOtpValidate(true);
    } else if (verification.status == SUCCESS) {
      setOtpValidate(false);
      setOtperror(false);
      setVerifyotp(false);

      let body = new FormData();
      setValidateModal(false);
      setNew(false);
      body.append('email', state.email.toLowerCase());
      props.UpdateEmailRequest(body);
      props.defaultRequest();
    } else if (verification.status == ERROR) {
      setOtpValidate(false);
      setOtperror(true);

      props.defaultRequest();
    }
  }, [props.verificationRes]);
  useEffect(() => {
    const UpdateEmail = props.UpdateEmailreq.UpdateEmailR;

    if (UpdateEmail.status == LOADING) {
      setLoading(true);
    } else if (UpdateEmail.status == SUCCESS) {
      props.navigation.navigate('Home');

      setLoading(false);

      props.defaultRequest();
    } else if (UpdateEmail.status == ERROR) {
      props.defaultRequest();
    }
  }, [props.UpdateEmailreq]);

  useEffect(() => {
    const Resend = props.ResendRes.ResendOtpR;

    if (Resend.status == LOADING) {
      setOtpValidate1(true);
    } else if (Resend.status == SUCCESS) {
      state.resendOtp = Resend.value.data.message;

      setOtpValidate1(false);
      props.defaultRequest();
    } else if (Resend.status == ERROR) {
      setOtpValidate1(false);

      props.defaultRequest();
    }
  }, [props.ResendRes]);

  // check email is valide or not
  const CheckEmailValidation = () => {
    emailReq = validate('email', state.email);
    if (emailReq) {
      setState({
        ...state,
        emailReq: emailReq,
      });
      return false;
    } else {
      return true;
    }
  };
  const onSend = () => {
    if (!CheckEmailValidation()) {
      return;
    }

    if (state.email == state.emailvalue) {
      setEmailinvalide(I18n.t('Thisemail'));
    } else {
      setState({ ...state, otp: '' });
      let body = new FormData();
      body.append('email', state.email.toLowerCase());
      body.append('type', 'change_email');
      props.SendOtpRequest(body);
    }
  };

  useEffect(() => {
    const SendOtp = props.SendOtpReq.SendOtpR;
    if (SendOtp.status == LOADING) {
      setBubbleloader(true);
    } else if (SendOtp.status == SUCCESS) {
      setBubbleloader(false);
      state.otp = '';
      state.resendOtp = '';
      setVerifyotp(true), setValidateModal(false), setNew(true);

      props.defaultRequest();
    } else if (SendOtp.status == ERROR) {
      setBubbleloader(false);
      if (SendOtp.error.response.status == 401) {
        setEmailinvalide(SendOtp?.error?.response?.data?.message);
      } else {
        setEmailinvalide('');
      }
      props.defaultRequest();
    }
  }, [props.SendOtpReq]);

  const resendOtp = () => {
    state.otp = '';
    state.otpError = '';
    (state.resendOtp = ''), setOtperror(false);
    let body = new FormData();

    body.append('email', state.emailvalue.toLowerCase());
    body.append('role_id', 3);
    body.append('language', global.language);
    props.resendRequest(body);
  };

  const onSelectData = (item, index) => {
    let tempArr1 = dataNew;

    if (item.check == false || !item.check) {
      tempArr1[index].check = true;
      setDataLength(dataLength + 1);
    } else {
      tempArr1[index].check = false;

      if (dataLength >= 1) {
        setDataLength(dataLength - 1);
      }
    }

    setDataNew([...tempArr1]);
  };
  const onBackPressHandler = () => {
    setNew(false);
    setDataLength(0);
    setSelectedLangModal(false),
      setDataNew(JSON.parse(JSON.stringify(dataOld)));
    JSON.parse(JSON.stringify(dataOld))?.map(i => {
      if (dataLang1.includes(i.language) == true && i.check == false) {
        dataLang1.splice(indexOf(i.language), 1);
        dataId1.splice(indexOf(i.id), 1);
        setDataLength(dataLength - 1);
      }
    });
  };
  const onCancelHandler = () => {
    setNew(false);
    setDataLength(0);
    setSelectedLangModal(false);
    setDataNew(JSON.parse(JSON.stringify(dataOld)));
    JSON.parse(JSON.stringify(dataOld))?.map(i => {
      if (dataLang1.includes(i.language) == true && i.check == false) {
        dataLang1.splice(indexOf(i.language), 1);
        dataId1.splice(indexOf(i.id), 1);
        setDataLength(dataLength - 1);
      }
    });
  };
  const onConfirmHandler = () => {
    setNew(false);
    setDataLength(0);

    setSelectedLangModal(false);
    setDataOld(JSON.parse(JSON.stringify(dataNew)));
    JSON.parse(JSON.stringify(dataNew))?.map(i => {
      if (dataLang1.includes(i.language) == false && i.check == true) {
        dataLang1.push(i.language);
        dataId1.push(i.id);
        setDataLength(dataLength + 1);
      } else if (dataLang1.includes(i.language) == true && i.check == false) {
        dataLang1.splice(dataLang1.indexOf(i.language), 1);
        dataId1.splice(dataId1.indexOf(i.id), 1);

        setDataLength(dataLength - 1);
      }
    });
  };

  useEffect(() => {
    if (
      choosestatus != oldstatus ||
      choosedoc != olddocument ||
      imageUploadDocument != oldimage
    ) {
      setButtonactivevalue(true);
    } else {
      setButtonactivevalue(false);
    }
  }, [
    choosestatus,
    choosedoc,
    state.expiredob,
    imageUploadDocument,
    workinglegalModal,
  ]);
  useEffect(() => {
    if (state.expiredob != olddate) {
      setButtonactivevalue(true);
    } else {
      setButtonactivevalue(false);
    }
  }, [state.expiredob]);

  const _rendernotiLists = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: width * (20 / 375),
            marginVertical: 5,
          }}
          onPress={() => {
            onSelectData(item, index);
          }}>
          <Text>{item.language}</Text>
          {item.check == true ? (
            <Image source={Images.RoundCheck} />
          ) : (
            <Image source={Images.RoundUnCheck} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const onConfirm = () => {
    let Body = new FormData();
    Body.append('password', state.password);
    if (state.password != '') {
      props.checkpasswordRequest(Body);
    } else {
      setMessengerError(I18n.t('Pleaseenter'));
    }
  };
  useEffect(() => {
    const checkpasswordRes = props.checkpasswordRes.checkpasswordR;

    if (checkpasswordRes?.status == LOADING) {
      setBubbleloader(true);
    } else if (checkpasswordRes?.status == SUCCESS) {
      setBubbleloader(false);
      if (
        checkpasswordRes?.status == SUCCESS &&
        checkpasswordRes.value.data.status == 'error'
      ) {
        setMessengerError(checkpasswordRes.value.data.message);
      } else {
        setNew(false);
        setShowverifypassmodal(false);
        setValidateModal(true);
        setNew(true);
      }

      props.defaultRequest();
    } else if (checkpasswordRes?.status == ERROR) {
      setBubbleloader(false);
      props.defaultRequest();
    }
  }, [props.checkpasswordRes]);

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      setTimeout(() => {
        props.GetProfileRequest();
      }, 500);
      setTimeout(() => {
        WorkingLegalStatus();
      }, 1000);
    });
    return unsubscribeOnBlur;
  }, []);

  const editProfile = () => {
    if (!checkValidation1()) {
      return;
    }
    if (!checkValidation2()) {
      return;
    }
    state.loadingProfile = true;
    let body = new FormData();
    dataId1.forEach(item => {
      body.append('spoken_language[]', item);
    });
    body.append('first_name', state.fName);
    body.append('last_name', state.lName);
    body.append('phone_number', state.mobile1 == null ? '' : state.mobile1);
    body.append('email', state.emailvalue);
    body.append('dob', state.dob);
    body.append('address', location == null ? '' : location);
    body.append('city', cityname == null ? '' : cityname);
    body.append('social_insurance_number', state.sin == null ? '' : state.sin);
    props.editProfileRequest(body);
  };
  useEffect(() => {
    const editProfileReq = props.editProfileReq.editProfileR;

    if (editProfileReq.status == LOADING) {
      setLoading(true);
    } else if (editProfileReq.status == SUCCESS) {
      setLoading(false);
      if (editProfileReq.value?.data?.status == 0) {
        showDangerToast(editProfileReq.value.data.message);
      } else {
        setTimeout(() => {
          showToast(editProfileReq.value.data.message);
        }, 200);
        props.navigation.goBack();
      }
      props.defaultRequest();
    } else if (editProfileReq.status == ERROR) {
      setLoading(false);
      setAgreeLogout(handleErrorTwo(editProfileReq));
      props.defaultRequest();
    }
  }, [props.editProfileReq]);
  useEffect(() => {
    const GetProfileReq = props.GetProfileReq.GetProfileR;
    if (GetProfileReq.status == LOADING) {
      setLoading(true);
    } else if (GetProfileReq.status == SUCCESS) {
      setGetprofilefullres(GetProfileReq?.value.data?.response);
      setFirst(GetProfileReq.value.data?.response?.spoken_languages);
      setState({
        ...state,
        emailvalue: GetProfileReq.value.data?.response?.email,
        email: GetProfileReq.value.data?.response?.email,
        fName: GetProfileReq.value.data?.response?.first_name,
        lName: GetProfileReq.value.data?.response?.last_name,
        phone: GetProfileReq.value.data?.response?.phone_number,
        mobile1: GetProfileReq.value.data?.response?.phone_number,
        dob: GetProfileReq.value.data?.response?.dob,
        dobold: GetProfileReq.value.data?.response?.dob,
        calenderDate: GetProfileReq.value.data?.response?.dob,
        sin: GetProfileReq.value.data?.response?.social_insurance_number,
        sinwithoutstar:
          GetProfileReq.value.data?.response?.comp_social_insurance_number,
        imageUser: GetProfileReq.value.data?.response?.profile_image,
        allSpoken_language: tempArr,
        selectedSpoken_language:
          GetProfileReq.value.data?.response?.spoken_languages,
      });
      setselectedlang(GetProfileReq.value.data?.response?.spoken_languages);
      setLocation(GetProfileReq.value.data?.response?.address);
      setStatusWorking(
        GetProfileReq.value.data?.response?.working_legal_status?.title,
      );

      var tempArr = GetProfileReq.value.data?.response?.all_spoken_lang;
      var letTemp = [];
      var letId = [];

      setTimeout(() => {
        GetProfileReq.value.data?.response?.all_spoken_lang?.map((i, index) => {
          GetProfileReq.value.data?.response?.spoken_languages?.map(i2 => {
            if (i2.id == i.id) {
              letTemp.push(i2.title);
              setDataLength(dataLength + 1);
              letId.push(i2.id);
              tempArr[index].check = true;
            }
          });
        });
      }, 400);
      setTimeout(() => {
        setDataLang1(letTemp);
        setDataId1(letId);
        setDataNew(tempArr);
        setDataLang2(JSON.parse(JSON.stringify(letTemp)));
        setDataOld(JSON.parse(JSON.stringify(tempArr)));
        setLoading(false);
      }, 1000);

      props.defaultRequest();
    } else if (GetProfileReq.status == ERROR) {
      setLoading(false);
      props.defaultRequest();
    }
  }, [props.GetProfileReq]);
  const deleteImage = () => {
    state.imageUser = DummyImage;
    state.image = '';
    setState({ ...state, imageUser: DummyImage, image: '' });
    getService(apiName.removeprofileimage)
      .then(async res => {
        setLoading(true);
        if (res.status == 200) {
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };
  const imageUpdate = () => {
    if (state.imageUser == DummyImage) {
      setState({ ...state, showImgOption: true });
      setNew(true);
    } else {
      Alert.alert(
        I18n.t('Removeprofile'),
        I18n.t('sureyou'),
        [
          {
            text: I18n.t(['cancel']),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },

          {
            text: I18n.t('OK'),
            onPress: () => {
              deleteImage();
            },
          },
        ],
        { cancelable: false },
      );
    }
  };
  const BackpressAlert = () => {
    Alert.alert(
      I18n.t('saveyourchanges'),
      '',

      [
        {
          text: I18n.t(['cancel']),
          onPress: () => props.navigation.navigate('Home'),
          style: 'cancel',
        },

        {
          text: I18n.t('OK'),
          onPress: () => {
            editProfile();
          },
        },
      ],
      { cancelable: false },
    );
  };

  const updateProfileImage = val => {
    let Body = new FormData();

    Body.append('profile_image', val);
    postService(apiName.updateprofileimage, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };
  const uploaddocumentfun = (val, newlet, name) => {
    let Body = new FormData();
    Body.append('upload_document', val);

    postService(apiName.workingLegalUploadDocument, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoadingLegal(false);
          setLoadingTextLegal(false);
          setImageUploadDocument(res.data.response.upload_document);
          setOldimage(res.data.response.upload_document);
          setDocumnenttype(res.data.response.document_type);
          setImageUploadDocumentSize(newlet);
        }
      })
      .catch(error => {
        setImageUploadDocument('');

        setImageUploadDocumentSize('');
        setLoadingLegal(false);
        setLoadingTextLegal(true);
      });
  };

  const imageUpLoadNew = () => {
    setState({ ...state, showImgOptionNew: true });
    setNew(true);
  };
  const imageUpLoad = () => {
    setState({ ...state, showImgOption: true });
    setNew(true);
  };
  const numberInput = input => {
    state.mobilemax = 13;
    if (state.mobile1 == '' && state.mobile?.length == 0) {
      state.mobile1Error = '';
      return;
    } else if (!checkValidation1()) {
      return;
    } else {
      const num = formatPhoneNumber1(input);
      setState({ ...state, mobile1: num, mobile1Error: '' });
    }
  };
  const checkValidation1 = () => {
    let mobile1Error = '';

    if (
      state.mobile1?.length == 0 ||
      state.mobile1 == null ||
      state.mobile1 == 'null'
    ) {
      return true;
    }
    if (state.mobile1?.includes('-')) {
      mobile1Error = validate('profile_Contact', state.mobile1);
    } else {
      mobile1Error = validate('mobile', state.mobile1);
    }
    if (mobile1Error) {
      setState({
        ...state,
        mobile1Error: mobile1Error,
      });
      return false;
    } else {
      setState({
        ...state,
        mobile1Error: '',
      });
      return true;
    }
  };
  useEffect(() => {
    if (state.sin?.length == 11) {
      Keyboard.dismiss();
    }
  }, [state.sin]);
  useEffect(() => {
    if (
      keyboardvalue == true &&
      state.mobile1?.length == 10 &&
      !state.mobile1?.includes('-')
    ) {
      Keyboard.dismiss();
    } else {
      setkeyboardvalue(false);
    }
  }, [state.mobile1]);
  const checkValidation2 = () => {
    if (
      state.sin != 'null' &&
      state.sin?.length != 0 &&
      state.sin?.length < 11
    ) {
      return false;
    }
    if (state.sin?.length == 11 && varifedimage == false) {
      return false;
    }
    if (state.sin == 'null' || state.sin == '' || state.sin == null) {
      return true;
    }
    if (state.sin?.length == 11 && varifedimage == true) {
      return true;
    }
  };

  function formatPhoneNumber1(phoneNumberString) {
    var cleaned = ('' + phoneNumberString)?.replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ')' + match[2] + '-' + match[3];
    }
    return null;
  }

  const ValidateSinNumber = () => {
    let body = new FormData();
    body.append(
      'sin_number',
      sinchangevalue == true ? state.sin.replace(/\s/g, '') : state.sinwithoutstar,
    );
    postService(apiName.checksinnumber, body)
      .then(async res => {
        if (res.data.status == 1) {
          setVarifedimage(true);
        }
      })

      .catch(error => {
        setValidatemessage(error.response.data.message)
        scrollref.current.scrollToEnd({animated: true})
        setVarifedimage(false);
      });
  };
  useEffect(() => {
    if (state.sin?.length == 11) {
      ValidateSinNumber();
    } else {
      setVarifedimage();
    }
  }, [state.sin]);

  const PickerInputStyle = () => ({
    pickerConfirmBtnColor: [255, 255, 255, 1],
    pickerBg: [255, 255, 255, 1],
    pickerToolBarBg: [253, 191, 90, 1],
    pickerTitleColor: [255, 255, 255, 1],
    pickerCancelBtnColor: [255, 255, 255, 1],
  });

  const documentsChoose = () => {
    Keyboard.dismiss();
    setPickerShowNew(true);
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: choosedocumenttype,

      selectedValue: [
        `${choosedocumenttype ? choosedoc : choosedocumenttype[0]}`,
      ],
      pickerTextEllipsisLen: 25,
      pickerTitleText: '',
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      onPickerConfirm: data => {
        setDeActive(false);
        setPickerShowNew(false);
        if (choosedoc == data[0]) {
          return;
        } else {
          setWorkingStatusExpire(false);
          var newData1 = '';
          setState({
            ...state,
            expiredob: '',
            imageUpload: '',
          });
          setImageUploadDocument(''), setImageUploadDocumentSize('');
          if (data[0] == 'undefined') {
            setChoosedoc(choosedocumenttype[0]);
            newData1 = choosedocumenttype[0];
          } else {
            setChoosedoc(data[0]);
            newData1 = data[0];
          }

          let tempArr = LegalStatusrespose;
          let newArray = [];
          tempArr.map(i => {
            if (i.title == choosestatus) {
              i?.document_accepted.map(i => {
                if (i.title == newData1) {
                  setChoosedocId(i.id);
                  if (i.is_expiration_required == 1) {
                    setWorkingStatusExpire(true);
                  }
                }
              });
            }
          });

          setWorkingStatusUpload(true);
        }
      },
      onPickerCancel: data => {
        setPickerShowNew(false);
      },
      onPickerSelect: data => {
        setPickerShowNew(false);
      },
    });
    Picker.show();
  };
  const statusChoose = () => {
    Keyboard.dismiss();
    setPickerShowNew(true);
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: choosestatustype,
      pickerTitleText: '',
      selectedValue: [
        `${choosestatustype ? choosestatus : choosestatustype[0]}`,
      ],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      onPickerConfirm: data => {
        setDeActive(false);
        setPickerShowNew(false);
        if (choosestatus == data[0]) {
          return;
        } else {
          setChoosedocId();
          var newData = '';
          setChoosedoc();
          setState({
            ...state,
            expiredob: '',
            imageUpload: '',
          });
          setImageUploadDocument(''), setImageUploadDocumentSize('');
          if (data[0] == 'undefined') {
            setChoosestatus(choosestatustype[0]);
            newData = choosestatustype[0];
          } else {
            setChoosestatus(data[0]);
            newData = data[0];
          }
          let tempArr = LegalStatusrespose;
          let newArray = [];
          tempArr.map(i => {
            if (i.title == newData) {
              setChoosestatusId(i.id);
              i?.document_accepted.map(i => {
                newArray.push(i.title);
              });
            }
            setChoosedocumenttype(newArray);
          });
          setWorkingStatusDocument(true);
          setWorkingStatusUpload(false);
          setWorkingStatusExpire(false);
        }
      },
      onPickerCancel: data => {
        setPickerShowNew(false);
      },
      onPickerSelect: data => {
        setPickerShowNew(false);
      },
    });
    Picker.show();
  };
  const onConfirmButton = () => {
    if (!checkValidation()) {
      return;
    }
    let Body = new FormData();
    Body.append('official_document_id', choosedocId);
    Body.append('legal_status_id', choosestatusId);
    Body.append('upload_document', imageUploadDocument);
    Body.append('document_size', imageUploadDocumentSize);
    Body.append('document_type', documnenttype);
    if (state.expiredob != '') {
      Body.append('expiration_date', state.expiredob);
    }
    postService(apiName.workingLegalStatus, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          setWorkinglegalModal(false);
          Picker.hide();
          setStatusWorking(choosestatus);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };
  const WorkingLegalStatus = val => {
    setChoosestatus();
    setChoosedoc();
    setImageUploadDocument('');
    setImageUploadDocumentSize();
    state.expiredob = '';
    setDeActive(false);

    getService(apiName.getWorkingLegalStatus)
      .then(async res => {
        if (res.status == 200) {
          if (res.data.response.getWorkingLegalStatus == null) {
            setWorkingStatusUpload(false);
            setWorkingStatusDocument(false);
            setWorkingStatusExpire(false);
            setChoosestatusId();

            setChoosedocId();
            state.expiredob = '';
          } else {
            setChoosestatusId(
              res.data.response.getWorkingLegalStatus.legal_status_id,
            );
            setDocumnenttype(
              res.data.response.getWorkingLegalStatus.document_type,
            );
            setChoosedocId(
              res.data.response.getWorkingLegalStatus.official_document_id,
            );
            setOldimage(
              res.data.response.getWorkingLegalStatus.upload_document,
            );
            setImageUploadDocument(
              res.data.response.getWorkingLegalStatus.upload_document,
            );
            setImageUploadDocumentSize(
              res.data.response.getWorkingLegalStatus.document_size,
            );
            setDeActive(true);

            let tempArr1 = res?.data?.response?.legalStatusDocuments;
            let newArray1 = [];
            tempArr1.map(i => {
              if (
                i.id == res.data.response.getWorkingLegalStatus.legal_status_id
              ) {
                setChoosestatus(i.title);
                setOldstatus(i.title);
                i?.document_accepted.map(i => {
                  if (
                    i.id ==
                    res.data.response.getWorkingLegalStatus.official_document_id
                  ) {
                    setChoosedoc(i.title);
                    setOlddocument(i.title);
                  }
                  newArray1.push(i.title);
                });
              }

              setChoosedocumenttype(newArray1);
            });

            tempArr1.map(i => {
              if (
                i.id == res.data.response.getWorkingLegalStatus.legal_status_id
              ) {
                i.document_accepted.map(i => {
                  if (
                    i.id ==
                    res.data.response.getWorkingLegalStatus.official_document_id
                  ) {
                    if (
                      i.is_expiration_required == 1 &&
                      res.data.response.getWorkingLegalStatus.expiration_date !=
                      null
                    ) {
                      setWorkingStatusExpire(true);
                      setOlddate(
                        res.data.response.getWorkingLegalStatus.expiration_date,
                      );
                      state.expiredob =
                        res.data.response.getWorkingLegalStatus.expiration_date;
                    }
                  }
                });
              }
            });
            setWorkingStatusUpload(true);
            if (choosedoc == undefined) {
              setWorkingStatusDocument(false);
            } else {
              setWorkingStatusDocument(true);
            }
          }

          setLegalStatusrespose(res?.data?.response?.legalStatusDocuments);
          setLoading(false);

          let tempArr = res?.data?.response?.legalStatusDocuments;
          var newArray = [];
          tempArr.map(i => {
            newArray.push(i.title);
          });
          setChoosestatustype(newArray);
          if (
            statusWorking != undefined &&
            newArray.includes(choosestatus) == false
          ) {
            setChoosedocId();
            var newData = '';
            setChoosedoc();
            setState({
              ...state,
              expiredob: '',
            });
            setImageUploadDocument(''), setImageUploadDocumentSize('');

            setWorkingStatusUpload(false);
            setWorkingStatusExpire(false);
          }
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : ''}
      style={{ flex: 1 }}>
      <ShowStatusBarYellow />
      <View style={styles.container}>
        <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
        <NavBar
          navheadercolor={{ backgroundColor: colors.yellow }}
          lefttext={I18n.t('Back')}
          source={Images.blackbackarrow}
          isTextBlack={true}
          navigation={() => {
            activebutton ? BackpressAlert() : props.navigation.goBack();
          }}
          rightText={I18n.t('MyInformation')}></NavBar>
        <Loader loading={loading} />
        <ImageBackground
          source={Images.ProfileBackground}
          style={{ backgroundColor: colors.yellow }}>
          <SafeAreaView style={{ marginVertical: 30 }}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={{ borderRadius: width * (110 / 375) }}
                onPress={() => {
                  imageUpLoad();
                }}>
                <Image
                  source={{ uri: state.imageUser }}
                  style={[
                    styles.image,
                    {
                      borderColor:
                        state.imageUser == DummyImage
                          ? colors.yellow
                          : colors.white,
                      borderWidth: state.imageUser == DummyImage ? 0 : 2,
                    },
                  ]}></Image>

                <TouchableOpacity
                  onPress={() => {
                    imageUpdate();
                  }}
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 3,
                    backgroundColor: colors.yellow,
                    borderRadius: 30,
                    padding: 4,
                    borderWidth: state.imageUser == DummyImage ? 0 : 2,
                    borderColor:
                      state.imageUser == DummyImage
                        ? colors.yellow
                        : colors.white,
                  }}>
                  <Image
                    source={
                      state.imageUser == DummyImage
                        ? Images.PlusImage
                        : Images.closeImage
                    }
                  />
                </TouchableOpacity>

                <ImagePickerModal
                  showModal={state.showImgOption}
                  onPress={() => {
                    setState({ ...state, showImgOption: false });
                    setNew(false);
                  }}
                  onPressCamera={() => {
                    setState({ ...state, showImgOption: false });
                    setNew(false);
                    setTimeout(() => {
                      imgMedium(0);
                    }, 1000);
                  }}
                  onPressGallery={() => {
                    setTimeout(() => {
                      imgMedium(1);
                    }, 1000);
                    setState({ ...state, showImgOption: false });
                    setNew(false);
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: fontsize.Small,
                  color: colors.red,
                  marginTop: width * (10 / 375),
                }}>
                {state.imageError && I18n.t(state.imageError)}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: width * (20 / 375),
                  fontFamily: fonts.Bold,
                  fontWeight: 'bold',
                }}>
                {state.fName} {state.lName}
              </Text>
            </View>
          </SafeAreaView>
        </ImageBackground>

        <ScrollView
          ref={scrollref}
          contentContainerStyle={{ paddingBottom: isSave == true ? 80 : 0 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View>
            <TextBox
              viewStyle={[styles.textboxView, { width: '90%' }]}
              inputTitle={I18n.t('First_name')}
              view1={[styles.textboxView1, { marginTop: width * (10 / 375) }]}
              textStyle={{ padding: 0 }}
              isPlaceHolder={true}
              placeholder={I18n.t('fname1')}
              onChangeText={prevState => {
                setState({
                  ...state,
                  fName: prevState == '' ? prevState : prevState.trimLeft(),
                });
              }}
              onSubmitEditing={Keyboard.dismiss}
              value={state.fName}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              onFocus={() => setIsSave(false)}
            />
            <TextBox
              viewStyle={[styles.textboxView, { width: '90%' }]}
              inputTitle={I18n.t('Last_name')}
              view1={[styles.textboxView1, {}]}
              textStyle={{ padding: 0 }}
              isPlaceHolder={true}
              placeholder={I18n.t('Lname1')}
              onChangeText={prevState => {
                setState({
                  ...state,
                  lName: prevState == '' ? prevState : prevState.trimLeft(),
                });
              }}
              onSubmitEditing={Keyboard.dismiss}
              value={state.lName}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              onFocus={() => setIsSave(false)}
            />
            <TextBox
              rightImage={
                state.mobile1 == 'null' || state.mobile1 == ''
                  ? Images.phoneiconwhite
                  : Images.phoneicon
              }
              viewStyle={[styles.textboxView, { width: '90%' }]}
              maxLength={state.mobilemax}
              inputTitle={I18n.t('Phone_number')}
              view1={[styles.textboxView1, {}]}
              textStyle={{ padding: 0 }}
              isPlaceHolder={true}
              placeholder={I18n.t('Wnumber')}
              error={state?.mobile1Error && I18n.t(state?.mobile1Error)}
              errorStyle={{ marginHorizontal: 0 }}
              keyboardType={'number-pad'}
              onChangeText={prevState => {
                setkeyboardvalue(true);
                setState({
                  ...state,
                  mobile1: prevState == '' ? prevState : prevState.trimLeft(),
                });
              }}
              onBlur={() => (state.mobile1 ? numberInput(state.mobile1) : '')}
              onFocus={() => {
                setIsSave(false);
                state.mobile1
                  ? setState({
                    ...state,
                    mobile1: state.mobile1
                      ?.replace(/-/g, '')
                      ?.replace('(', '')
                      ?.replace(')', ''),
                    mobilemax: 10,
                  })
                  : setState({
                    ...state,
                    mobilemax: 10,
                  });
              }}
              onSubmitEditing={Keyboard.dismiss}
              value={state.mobile1 != 'null' && state.mobile1}
              rest={true}
              threedot={true}
              isheighterror={true}
              data={true}
              text1={I18n.t('Mobile')}
            />
            <View
              style={{ marginHorizontal: 15, marginTop: 30, marginBottom: 25 }}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {
                    color: colors.inputTitle,
                    paddingBottom: width * (10 / 375),
                    marginLeft: 18,
                  },
                ]}>
                {I18n.t('Email')}
              </Text>

              <View
                style={{
                  alignSelf: 'center',
                  height: 50,
                  borderBottomColor: '#FDBF5A',
                  borderBottomWidth: 1,

                  width: '90%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowverifypassmodal(true), setNew(true);
                    Keyboard.dismiss();
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    editable={false}
                    pointerEvents="none"
                    style={[
                      styles.errorText12,
                      {
                        marginTop: 10,
                        marginLeft: width * (15 / 375),
                        color: state.emailvalue
                          ? 'rgb(0,0,0)'
                          : 'rgb(183,190,197)',
                      },
                    ]}>
                    {`${state.emailvalue ? state.emailvalue : I18n.t('Writeemail')
                      }`}
                  </Text>
                  <Image
                    style={{
                      marginTop: 15,
                      width: 23,
                      height: 23,
                      marginRight: width * (15 / 375),
                      resizeMode: 'contain',
                    }}
                    source={Images.mailicon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 25 }}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {
                    color: colors.inputTitle,
                    paddingBottom: width * (10 / 375),
                    marginLeft: 18,
                  },
                ]}>
                {I18n.t('Date_of_birth')}
              </Text>

              <View
                style={{
                  alignSelf: 'center',
                  height: 50,
                  borderBottomColor: '#FDBF5A',
                  borderBottomWidth: 1,

                  width: '90%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    setExperienceCalender(true), setNew(true);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    editable={false}
                    pointerEvents="none"
                    style={[
                      styles.errorText12,
                      {
                        marginTop: 10,
                        marginLeft: width * (15 / 375),
                        color: state.dob ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      },
                    ]}>
                    {`${state.dob
                      ? moment(state.dob).format('DD-MM-YYYY')
                      : I18n.t('date_select')
                      }`}
                  </Text>

                  <Image
                    style={{
                      marginTop: 20,
                      width: 15,
                      height: 15,
                      marginRight: width * (20 / 375),
                      resizeMode: 'contain',
                    }}
                    source={Images.downArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 25 }}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {
                    color: colors.inputTitle,
                    paddingBottom: width * (10 / 375),
                    marginLeft: 18,
                  },
                ]}>
                {I18n.t('address')}
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                  borderBottomColor: '#FDBF5A',
                  borderBottomWidth: 1,

                  width: '90%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setAddressModal(true), setNew(true);
                    Keyboard.dismiss();
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    editable={false}
                    pointerEvents="none"
                    style={[
                      styles.errorText12,
                      {
                        marginBottom: 3,
                        width: '80%',
                        marginLeft: width * (15 / 375),
                        color: location ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      },
                    ]}>
                    {`${location ? location : I18n.t('Waddress')}`}
                  </Text>
                  <Image
                    style={{
                      marginTop: 10,
                      marginBottom: location == '' || location == null ? 5 : 10,
                      width: location == '' || location == null ? 30 : 23,
                      height: location == '' || location == null ? 30 : 23,
                      marginRight: width * (15 / 375),
                      resizeMode: 'contain',
                    }}
                    source={
                      location == '' || location == null
                        ? Images.mapiconwhite
                        : Images.mapicon
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 25 }}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {
                    color: colors.inputTitle,
                    paddingBottom: width * (10 / 375),
                    marginLeft: 18,
                  },
                ]}>
                {I18n.t('Spoken_languages')}
              </Text>

              <View
                style={{
                  alignSelf: 'center',
                  height: dataLang1?.length > 4 ? 60 : 45,
                  borderBottomColor: '#FDBF5A',
                  borderBottomWidth: 1,

                  width: '90%',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Keyboard.dismiss();
                    setSelectedLangModal(true),
                      setNew(true),
                      setDataLength(dataLang1.length);
                  }}>
                  <Text
                    editable={false}
                    pointerEvents="none"
                    numberOfLines={2}
                    style={[
                      styles.errorText12,
                      {
                        marginBottom: 4,
                        width: '80%',
                        marginTop: 10,
                        marginLeft: width * (15 / 375),

                        color:
                          dataLang1.length != 0
                            ? 'rgb(0,0,0)'
                            : 'rgb(183,190,197)',
                      },
                    ]}>
                    {`${dataLang1.length != 0
                      ? dataLang1
                      : I18n.t('Chooselanguages')
                      }`}
                  </Text>
                  <Image
                    style={{
                      marginTop: 10,

                      width: 15,
                      height: 15,
                      marginRight: width * (20 / 375),
                      resizeMode: 'contain',
                    }}
                    source={Images.downArrow}
                  />
                </TouchableOpacity>
                <Text style={[styles.view112, { marginTop: 25 }]}>
                  {state.langError && I18n.t(state.langError)}
                </Text>
              </View>
            </View>
            <View
              style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 25 }}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {
                    color: colors.inputTitle,
                    paddingBottom: width * (10 / 375),
                    marginLeft: 18,
                  },
                ]}>
                {I18n.t('Workinglegal')}
              </Text>

              <View
                style={{
                  alignSelf: 'center',
                  height: 50,
                  borderBottomColor: '#FDBF5A',
                  borderBottomWidth: 1,

                  width: '90%',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    WorkingLegalStatus(),
                      setWorkinglegalModal(true),
                      Picker.hide();
                  }}>
                  <Text
                    editable={false}
                    pointerEvents="none"
                    style={[
                      styles.errorText12,
                      {
                        marginTop: 10,
                        marginLeft: width * (15 / 375),
                        color: statusWorking
                          ? 'rgb(0,0,0)'
                          : 'rgb(183,190,197)',
                      },
                    ]}>
                    {statusWorking ? statusWorking : I18n.t('Selectstatus')}
                  </Text>
                  <Image
                    style={{
                      marginTop: 20,

                      width: 15,
                      height: 15,
                      marginRight: width * (20 / 375),
                      resizeMode: 'contain',
                    }}
                    source={Images.downArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TextBox
              rightImage={
                varifedimage == true
                  ? Images.Verified
                  : varifedimage == false
                    ? Images.notverifedsin
                    : Images.lockicon
              }
              viewStyle={[
                styles.textboxView,
                {
                  width: '90%',
                  borderBottomColor:
                    varifedimage == true
                      ? colors.yellow
                      : varifedimage == false
                        ? colors.red
                        : colors.yellow,
                },
              ]}
              inputTitle={I18n.t('Socialinsurance')}
              view1={[styles.textboxView1, { marginTop: width * (10 / 375) }]}
              textStyle={{
                color:
                  varifedimage == true
                    ? colors.textinputColor
                    : varifedimage == false
                      ? colors.red
                      : colors.textinputColor,
                padding: 0,
                borderBottomColor:
                  varifedimage == true
                    ? colors.yellow
                    : varifedimage == false
                      ? colors.red
                      : colors.yellow,
              }}
              maxLength={11}
              error={state.sinError && I18n.t(state.sinError)}
              isPlaceHolder={true}
              placeholder={I18n.t('valid_number')}
              onChangeText={prevState => {
                setState({
                  ...state,
                  sin: prevState == '' ? prevState : prevState.trimLeft(),
                });
                setSinchangevalue(true);
              }}
              onSubmitEditing={Keyboard.dismiss}
              value={
                sinchangevalue == true
                  ? state.sin
                    ?.replace(/[^\dA-Z]/g, '')
                    .replace(/(.{3})/g, '$1 ')
                    .trim()
                  : state.sin != 'null' && state.sin
              }
              keyboardType={'numeric'}
              autoCapitalize={'none'}
              onFocus={() => setIsSave(false)}
            />
            {varifedimage == false ? (
              <Text
                style={{
                  fontSize: fontsize.Small,
                  color: colors.red,
                  marginHorizontal: width * (30 / 375),
                  position: 'relative',
                  bottom: 30,
                }}>
                {validatemessage}
              </Text>
            ) : state.sin != 'null' &&
              state.sin?.length != 0 &&
              state.sin?.length < 11 ? (
              <Text
                style={{
                  fontSize: fontsize.Small,
                  color: colors.red,
                  marginHorizontal: width * (30 / 375),
                  position: 'relative',
                  bottom: 30,
                }}>
                {I18n.t('validsinnum')}
              </Text>
            ) : null}
            {isSave == false && (
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  backgroundColor: colors.white,
                }}>
                <Button
                  buttonStyle={{
                    backgroundColor:
                      activebutton == true &&
                        (state.sin == '' ||
                          state.sin == null ||
                          state.sin == 'null' ||
                          varifedimage == true)
                        ? colors.yellow
                        : colors.palegray,

                    borderRadius: 30,
                    height: width * (50 / 375),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: width * (20 / 375),
                    marginBottom: '7%',
                    width: '90%',
                    borderColor:
                      activebutton == true &&
                        (state.sin == '' ||
                          state.sin == null ||
                          state.sin == 'null' ||
                          varifedimage == true)
                        ? colors.yellow
                        : colors.palegrayborder,
                    borderWidth:
                      activebutton == true &&
                        (state.sin == '' ||
                          state.sin == null ||
                          state.sin == 'null' ||
                          varifedimage == true)
                        ? 0
                        : 1,
                  }}
                  disabled={
                    !(
                      activebutton == true &&
                      (state.sin == '' ||
                        state.sin == null ||
                        state.sin == 'null' ||
                        varifedimage == true)
                    )
                  }
                  label={I18n.t('Save')}
                  onPress={() => editProfile()}
                  isLabel={true}
                  buttonTextStyle={[
                    CommonStyles.buttontext,
                    {
                      color:
                        activebutton == true &&
                          (state.sin == '' ||
                            state.sin == null ||
                            state.sin == 'null' ||
                            varifedimage == true)
                          ? colors.white
                          : colors.palegrayText,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </ScrollView>

        {isSave == true && (
          <View
            style={{
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              bottom: 0,
              backgroundColor: colors.white,
            }}>
            <Button
              buttonStyle={{
                backgroundColor:
                  activebutton == true &&
                    (state.sin == '' ||
                      state.sin == null ||
                      state.sin == 'null' ||
                      varifedimage == true)
                    ? colors.yellow
                    : colors.palegray,

                borderRadius: 30,
                height: width * (50 / 375),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: width * (20 / 375),
                marginBottom: '7%',
                width: '90%',
                borderColor:
                  activebutton == true &&
                    (state.sin == '' ||
                      state.sin == null ||
                      state.sin == 'null' ||
                      varifedimage == true)
                    ? colors.yellow
                    : colors.palegrayborder,
                borderWidth:
                  activebutton == true &&
                    (state.sin == '' ||
                      state.sin == null ||
                      state.sin == 'null' ||
                      varifedimage == true)
                    ? 0
                    : 1,
              }}
              disabled={
                !(
                  activebutton == true &&
                  (state.sin == '' ||
                    state.sin == null ||
                    state.sin == 'null' ||
                    varifedimage == true)
                )
              }
              label={I18n.t('Save')}
              onPress={() => editProfile()}
              isLabel={true}
              buttonTextStyle={[
                CommonStyles.buttontext,
                {
                  color:
                    activebutton == true &&
                      (state.sin == '' ||
                        state.sin == null ||
                        state.sin == 'null' ||
                        varifedimage == true)
                      ? colors.white
                      : colors.palegrayText,
                },
              ]}
            />
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={AddressModal}
          onRequestClose={() => {
            setAddressModal(false), setNew(false);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setAddressModal(false), setNew(false);
            }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : ''}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setAddressModal(true), setNew(true);
                }}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderTopLeftRadius: width * (20 / 375),
                    borderTopRightRadius: width * (20 / 375),
                    paddingTop: width * (15 / 375),
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      height: width * (40 / 375),

                      alignItems: 'center',
                      width: width * (50 / 375),
                      justifyContent: 'space-between',
                      marginHorizontal: '3%',
                    }}
                    onPress={() => {
                      setAddressModal(false), setNew(false);
                      setState({
                        ...state,
                        AutocompleteId: '',
                        AutocompleteTitle: '',
                      });
                    }}>
                    <Image source={Images.backarrow}></Image>
                    <Text style={CommonStyles.backbuttonText}>
                      {I18n.t('Back')}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: fonts.Bold,
                      fontSize: fontsize.Large,
                      alignSelf: 'center',
                    }}>
                    {I18n.t('address')}
                  </Text>
                  <View style={{ height: 300 }}>
                    <GoogleAutoComplete
                      placeName={setPlaces}
                      shouldClear={shouldClear}
                      newLocation={newLocation}
                      placeholder={I18n.t('Search')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
        {/* Modal for Legal status */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={workinglegalModal}
          onRequestClose={() => {
            if (loadingLegal == false) {
              Picker.hide(), setWorkinglegalModal(false), setNew(false);
            } else {
            }
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: colors.white,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.white,
                borderTopLeftRadius: width * (20 / 375),
                borderTopRightRadius: width * (20 / 375),
                paddingHorizontal: width * (25 / 375),
                paddingTop:
                  Platform.OS == 'android'
                    ? width * (5 / 375)
                    : width * (25 / 375),
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  height: width * (40 / 375),

                  alignItems: 'center',
                  width: width * (50 / 375),
                  justifyContent: 'space-between',
                  marginVertical: Platform.OS == 'android' ? '3%' : '5%',
                }}
                onPress={() => {
                  if (loadingLegal == false) {
                    Picker.hide(), setWorkinglegalModal(false), setNew(false);
                  } else {
                  }
                }}>
                <Image source={Images.backarrow}></Image>
                <Text
                  style={{
                    color: colors.yellow,
                    fontSize: fontsize.Regular,
                    marginLeft: 2,
                  }}>
                  {I18n.t('Back')}
                </Text>
              </TouchableOpacity>
              <ScrollView
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: fontsize.Large,
                    fontFamily: fonts.Bold,
                    textAlign: 'center',
                  }}>
                  {I18n.t('Workinglegal')}
                </Text>
                <View style={{ marginTop: 10, marginBottom: 25 }}>
                  <Text
                    style={[
                      CommonStyles.HeadingText3,
                      {
                        color: colors.inputTitle,
                        paddingBottom: width * (10 / 375),
                      },
                    ]}>
                    {I18n.t('Status')}
                  </Text>

                  <View
                    style={{
                      alignSelf: 'center',
                      height: 50,
                      borderBottomColor: '#FDBF5A',
                      borderBottomWidth: 1,

                      width: '100%',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        statusChoose();
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      disabled={loadingLegal == false ? false : true}>
                      <Text
                        editable={false}
                        pointerEvents="none"
                        style={[
                          styles.errorText12,
                          {
                            marginTop: 10,
                            marginLeft: width * (15 / 375),
                            color: choosestatus
                              ? 'rgb(0,0,0)'
                              : 'rgb(183,190,197)',
                          },
                        ]}>
                        {`${choosestatus ? choosestatus : I18n.t('Choosestatus')
                          }`}
                      </Text>
                      <Image
                        style={{
                          marginTop: 20,

                          width: 15,
                          height: 15,
                          marginRight: width * (20 / 375),
                          resizeMode: 'contain',
                        }}
                        source={Images.downArrow}
                      />
                    </TouchableOpacity>
                    <Text style={[styles.view112, { marginTop: 25 }]}>
                      {state.langError && I18n.t(state.langError)}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 10, marginBottom: 25 }}>
                  <Text
                    style={[
                      CommonStyles.HeadingText3,
                      {
                        color: colors.inputTitle,
                        paddingBottom: width * (10 / 375),
                      },
                    ]}>
                    {I18n.t('Official')}
                  </Text>

                  <View
                    style={{
                      alignSelf: 'center',
                      height: 50,
                      borderBottomColor: '#FDBF5A',
                      borderBottomWidth: 1,

                      width: '100%',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        workingStatusDocument == true
                          ? documentsChoose()
                          : onOfficialDocument();
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      disabled={loadingLegal == false ? false : true}>
                      <Text
                        editable={false}
                        pointerEvents="none"
                        style={[
                          styles.errorText12,
                          {
                            marginTop: 10,
                            marginLeft: width * (15 / 375),
                            color: choosedoc
                              ? 'rgb(0,0,0)'
                              : 'rgb(183,190,197)',
                          },
                        ]}>
                        {`${choosedoc ? choosedoc : I18n.t('Choosedocument')}`}
                      </Text>
                      <Image
                        style={{
                          marginTop: 20,

                          width: 15,
                          height: 15,
                          marginRight: width * (20 / 375),
                          resizeMode: 'contain',
                        }}
                        source={Images.downArrow}
                      />
                    </TouchableOpacity>
                    <Text style={[styles.view112, { marginTop: 25 }]}>
                      {state.langError && I18n.t(state.langError)}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 10, marginBottom: 25 }}>
                  <Text
                    style={[
                      CommonStyles.HeadingText3,
                      {
                        color:
                          workingStatusExpire == true
                            ? colors.inputTitle
                            : 'rgb(183,190,197)',
                        paddingBottom: width * (10 / 375),
                      },
                    ]}>
                    {I18n.t('expiry')}
                  </Text>

                  <View
                    style={{
                      alignSelf: 'center',
                      height: 50,
                      borderBottomColor:
                        workingStatusExpire == true
                          ? '#FDBF5A'
                          : 'rgb(183,190,197)',
                      borderBottomWidth: 1,

                      width: '100%',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        workingStatusExpire == true
                          ? (setWorkinglegaldateModal(true),
                            setNew(true),
                            Picker.hide())
                          : {};
                      }}
                      disabled={loadingLegal == false ? false : true}>
                      <Text
                        editable={false}
                        pointerEvents="none"
                        style={[
                          styles.errorText12,
                          {
                            marginTop: 10,
                            marginLeft: width * (15 / 375),
                            color: state.expiredob
                              ? 'rgb(0,0,0)'
                              : 'rgb(183,190,197)',
                          },
                        ]}>
                        {`${state.expiredob
                          ? moment(state.expiredob).format('DD-MM-YYYY')
                          : I18n.t('Choosedate')
                          }`}
                      </Text>
                      {workingStatusExpire == true && (
                        <Image
                          style={{
                            marginTop: 20,

                            width: 15,
                            height: 15,
                            marginRight: width * (20 / 375),
                            resizeMode: 'contain',
                          }}
                          source={Images.downArrow}
                        />
                      )}
                    </TouchableOpacity>
                    <Text style={[styles.view112, { marginTop: 25 }]}>
                      {state.langError && I18n.t(state.langError)}
                    </Text>
                  </View>
                </View>
                {loadingTextLegal == true && (
                  <View
                    style={{
                      borderColor: colors.red,
                      borderWidth: 1,
                      alignItems: 'center',
                      borderRadius: 20,
                      marginBottom: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      paddingVertical: 10,
                      backgroundColor: colors.lightRedbackground,
                      paddingHorizontal: 5,
                    }}>
                    <Image source={Images.Rederror}></Image>
                    <Text style={{ color: colors.red, fontSize: fontsize.Small }}>
                      {I18n.t('reupload')}
                    </Text>
                    <Image source={Images.redCross}></Image>
                  </View>
                )}
                {loadingLegal == false ? (
                  <TouchableOpacity
                    onPress={() => {
                      Picker.hide(),
                        workingStatusUpload == true
                          ? imageUpLoadNew()
                          : onImageUpload();
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor:
                        workingStatusUpload == true ? colors.yellow : '#CCCCCC',
                      padding: 20,
                      borderRadius: 20,
                    }}>
                    <Image
                      style={{ alignSelf: 'center' }}
                      source={
                        workingStatusUpload == true
                          ? Images.StatusUpload
                          : Images.uploadInactive
                      }
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        color:
                          workingStatusUpload == true
                            ? colors.yellow
                            : 'rgb(183,190,197)',
                        fontSize: fontsize.Regular,
                        fontFamily: fonts.Regular,
                      }}>
                      {I18n.t('Uploaddocument')}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      workingStatusUpload == true
                        ? imageUpLoadNew()
                        : onImageUpload();
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: '#CCCCCC',
                      padding: 20,
                      borderRadius: 20,
                    }}>
                    <ActivityIndicator
                      size="large"
                      animating={loadingLegal}
                      color={colors.yellow}
                    />
                    <Text
                      // numberOfLines={1}
                      style={{
                        textAlign: 'center',
                        color:
                          workingStatusUpload == true
                            ? colors.yellow
                            : 'rgb(183,190,197)',
                        fontSize: fontsize.Regular,
                        fontFamily: fonts.Regular,
                      }}>
                      {I18n.t('uploading')}
                    </Text>
                  </TouchableOpacity>
                )}
                {imageUploadDocument != '' && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#CCCCCC',
                      padding: 10,
                      borderRadius: 10,
                      flexDirection: 'row',
                      marginTop: 10,
                      // height: 55,
                    }}>
                    <Image
                      style={{
                        alignSelf: 'center',
                        marginRight: 10,
                        height: 35,
                        width: 35,
                      }}
                      source={Images.File_dock}
                    />
                    <View style={{ width: '100%', marginLeft: 20 }}>
                      <Text
                        style={{
                          width: '80%',
                          fontSize: fontsize.Small,
                          fontFamily: fonts.Regular,
                        }}>
                        {choosedoc} - {state.fName} {state.lName}.{documnenttype}
                      </Text>
                      <Text
                        style={{
                          fontSize: fontsize.Small,
                          fontFamily: fonts.Regular,
                        }}>
                        {imageUploadDocumentSize} {'kb'}
                      </Text>
                    </View>
                  </View>
                )}
                <ImagePickerModal
                  showModal={state.showImgOptionNew}
                  onPress={() => {
                    state.showImgOptionNew = false;
                    setNew(false);
                  }}
                  isPdf={true}
                  onPressPdf={() => {
                    state.showImgOptionNew = false;
                    setNew(false);
                    Platform.OS == 'android'
                      ? checkPermissionAndroid()
                      : checkPermissionIos();
                  }}
                  onPressCamera={() => {
                    state.showImgOptionNew = false;
                    setNew(false);
                    setTimeout(() => {
                      imgMedium1(0);
                    }, 1000);
                  }}
                  onPressGallery={() => {
                    setTimeout(() => {
                      imgMedium1(1);
                    }, 1000);
                    state.showImgOptionNew = false;
                    setNew(false);
                  }}
                />
                {state.documentError != '' && (
                  <Text style={styles.view90}>
                    {I18n.t(state.documentError)}
                  </Text>
                )}
              </ScrollView>
              <View style={{ alignItems: 'center' }}>
                {loadingLegal == false ? (
                  <Button
                    buttonStyle={{
                      borderColor:
                        deActive == false || buttonactivevalue == false
                          ? colors.disablecolor
                          : colors.yellow,
                      borderWidth:
                        deActive == false || buttonactivevalue == false ? 1 : 0,
                      backgroundColor:
                        deActive == false || buttonactivevalue == false
                          ? colors.disblebutton
                          : colors.yellow,
                      borderRadius: 30,
                      height: width * (50 / 375),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: width * (20 / 375),
                      marginBottom: pickerShowNew == true ? '17%' : '7%',
                      width: '100%',
                    }}
                    label={I18n.t('Confirm')}
                    onPress={() => {
                      onConfirmButton();
                    }}
                    isLabel={true}
                    disabled={!deActive || !buttonactivevalue}
                    buttonTextStyle={[
                      CommonStyles.buttontext,
                      {
                        color:
                          deActive == false || buttonactivevalue == false
                            ? colors.disablecolor
                            : colors.white,
                      },
                    ]}
                  />
                ) : (
                  <Button
                    buttonStyle={{
                      borderColor:
                        deActive == false ? colors.disablecolor : colors.yellow,
                      borderWidth: deActive == false ? 1 : 0,
                      backgroundColor:
                        deActive == false ? colors.disblebutton : colors.yellow,
                      borderRadius: 30,
                      height: width * (50 / 375),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: width * (20 / 375),
                      marginBottom: pickerShowNew == true ? '12%' : '7%',
                      width: '100%',
                    }}
                    label={I18n.t('Confirm')}
                    onPress={() => {
                      onConfirmButton();
                    }}
                    isLabel={true}
                    disabled={true}
                    buttonTextStyle={[
                      CommonStyles.buttontext,
                      {
                        color:
                          deActive == false
                            ? colors.disablecolor
                            : colors.white,
                      },
                    ]}
                  />
                )}
              </View>
            </View>
          </View>
          {newView == true ? (
            <View
              style={CommonStyles.modalbackview}
              onPress={() => setNew(false)}></View>
          ) : null}
          {/* date picker for working legal status */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={workinglegaldateModal}
            onRequestClose={() => {
              setWorkinglegaldateModal(false), setNew(false);
            }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255)',

                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <DatePicker
                  monthDisplayMode={'en-long'}
                  type="MM-DD-YYYY"
                  defaultDate={
                    state.expiredob
                      ? moment(state.expiredob).format('YYYY-MM-DD')
                      : state.ExpirecalenderDate
                  }
                  minDate={new Date()}
                  maxDate={'2050-12-20'}
                  confirm={selectedDate => {
                    if (imageUploadDocument) {
                      setDeActive(true);
                    } else {
                      setDeActive(false);
                    }
                    setWorkinglegaldateModal(false);
                    setNew(false);

                    setState({
                      ...state,
                      expiredob: moment(selectedDate).format(
                        'YYYY-MM-DD',
                      ),
                    });
                  }}
                  cancel={() => {
                    setNew(false);
                    setWorkinglegaldateModal(false);
                  }}
                  confirmText="Confirm"
                  cancelText="Cancel"
                  rowHeight={50}
                  toolBarCancelStyle={{ color: 'white' }}
                  toolBarConfirmStyle={{ color: 'white' }}
                  selectedRowBackgroundColor={'#fef2de'}
                  textMarginHorizontal={10}
                  selectedTextStyle={{
                    marginHorizontal: 10,
                    fontFamily: fonts.Bold,
                  }}
                  selectedBorderLineColor="white"
                  listItemStyle={{ fontSize: 10 }}
                  selectedBorderLineMarginHorizontal={10}
                  selectedTextFontSize={18}
                  toolBarStyle={{ backgroundColor: colors.yellow, color: 'fff' }}
                  onValueChange={selectedDate => {

                  }}
                />
              </View>
            </View>
          </Modal>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={experienceCalender}
          onRequestClose={() => {
            setExperienceCalender(false), setNew(false);
          }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255)',

                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <DatePicker
                monthDisplayMode={'en-long'}
                type="MM-DD-YYYY"
                defaultDate={
                  state.dob
                    ? moment(state.dob).format('YYYY-MM-DD')
                    : state.calenderDate
                }
                minDate={new Date('1950-01-21')}
                maxDate={new Date()}
                confirm={selectedDate => {
                  setExperienceCalender(false);
                  setNew(false);
                  let pickYear = moment(state.calenderDate).format('YYYY');
                  let PresentYear = moment(new Date()).format('YYYY');
                  let agevalue = PresentYear - pickYear;
                  if (agevalue < 18) {
                    if (Platform.OS == 'android') {
                      setTimeout(() => {
                        setLegalAgeModal(true);
                      }, 500);
                    } else {
                      setLegalAgeModal(true);
                    }
                  } else {
                    setState({
                      ...state,
                      dob: moment(selectedDate).format('YYYY-MM-DD'),
                    });
                  }
                }}
                cancel={() => {
                  setNew(false);
                  setExperienceCalender(false);
                }}
                confirmText="Confirm"
                cancelText="Cancel"
                rowHeight={50}
                toolBarCancelStyle={{ color: 'white' }}
                toolBarConfirmStyle={{ color: 'white' }}
                selectedRowBackgroundColor={'#fef2de'}
                textMarginHorizontal={10}
                selectedTextStyle={{
                  marginHorizontal: 10,
                  fontFamily: fonts.Bold,
                }}
                selectedBorderLineColor="white"
                listItemStyle={{ fontSize: 10 }}
                selectedBorderLineMarginHorizontal={10}
                selectedTextFontSize={18}
                toolBarStyle={{ backgroundColor: colors.yellow, color: 'fff' }}
                onValueChange={selectedDate => {
                }}
              />
            </View>
          </View>
        </Modal>

        {/* setLegalAgeModal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={legalAgeModal}
          onRequestClose={() => setLegalAgeModal(false)}>
          <TouchableWithoutFeedback
            onPressOut={() => {
              setLegalAgeModal(false);
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.modelBackground,
                justifyContent: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setLegalAgeModal(true);
                }}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,

                    elevation: 15,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: width * (15 / 375),
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      height: width * (40 / 375),

                      alignItems: 'center',
                      width: width * (50 / 375),
                      justifyContent: 'space-between',
                      marginVertical: '3%',
                      marginHorizontal: '3%',
                    }}
                    onPress={() => setLegalAgeModal(false)}>
                    <Image source={Images.close}></Image>
                    <Text
                      style={{
                        color: colors.yellow,
                        fontSize: fontsize.Regular,
                        marginLeft: 2,
                      }}></Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: fontsize.Large,
                        fontFamily: fonts.Bold,
                      }}>
                      {I18n.t('Legalage')}
                    </Text>
                    <Image
                      source={Images.AgeLockicon}
                      style={{
                        alignSelf: 'center',
                        marginVertical: 20,
                      }}></Image>

                    <Text
                      style={[
                        styles.titleText,
                        {
                          alignSelf: 'center',
                          marginVertical: 20,
                          textAlign: 'center',
                          marginHorizontal: 40,
                        },
                      ]}>
                      {I18n.t('Unfortunately')}
                    </Text>
                    <Text
                      style={[
                        styles.titleText,
                        { alignSelf: 'center', marginVertical: 20 },
                      ]}>
                      {I18n.t('Seesoon')}
                    </Text>

                    <View style={{ alignItems: 'center' }}>
                      <Button
                        buttonStyle={{
                          backgroundColor: colors.yellow,
                          borderRadius: 30,
                          height: width * (45 / 375),
                          marginTop: width * (30 / 375),
                          marginBottom: '10%',
                          width: '55%',
                        }}
                        label={I18n.t('got_it2')}
                        onPress={() => {
                          setLegalAgeModal(false);
                        }}
                        isLabel={true}
                        buttonTextStyle={[
                          CommonStyles.buttontext,
                          {
                            fontsize: fontsize.Regular,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* calander */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={appointment}
          onRequestClose={() => setAppointment(false)}>
          <View
            style={{
              backgroundColor: 'rgba(255,255,355,0.6)',

              flex: 1,
              justifyContent: 'flex-end',
              paddingHorizontal: width * (15 / 375),
              paddingBottom: 80,
              marginBottom:
                isKeyboardVisible == true && Platform.OS == 'ios' ? mBottom : 0,
            }}>
            <View style={styles.view83}>
              <TouchableOpacity
                onPress={() => setAppointment(false)}
                style={styles.view82}>
                <Image source={Images.close}></Image>
              </TouchableOpacity>

              {Platform.OS == 'android' && (
                <DateTimePicker
                  style={{ height: 300 }}
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={
                    Platform.OS === 'ios' ? onChangeIos : onChangeAndroid
                  }
                  minimumDate={new Date()}
                  maximumDate={new Date().setFullYear(
                    new Date().getFullYear() + 3,
                  )}
                />
              )}
              {Platform.OS == 'ios' && (
                <View style={{ backgroundColor: colors.yellow }}>
                  <DateTimePicker
                    style={{ backgroundColor: colors.yellow }}
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    display={'inline'}
                    onChange={onChangeIos}
                    minimumDate={new Date()}
                    maximumDate={new Date().setFullYear(
                      new Date().getFullYear() + 3,
                    )}
                  />
                </View>
              )}
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={datepic1}
            onRequestClose={() => setDatepic1(false)}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255)',

                flex: 1,
                justifyContent: 'flex-end',
                paddingHorizontal: width * (15 / 375),
                paddingBottom: 180,
                marginBottom:
                  isKeyboardVisible == true && Platform.OS == 'ios'
                    ? mBottom
                    : 0,
              }}>
              <TouchableOpacity style={{}} onPress={() => onPress1()}>
                <Text style={styles.view81}>Done</Text>
              </TouchableOpacity>
              {datepic1 == true && Platform.OS == 'ios' && (
                <View style={{ backgroundColor: colors.yellow }}>
                  <DateTimePicker
                    style={{ backgroundColor: colors.yellow }}
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    display={'inline'}
                    onChange={onChangeIos}
                    minimumDate={new Date()}
                    maximumDate={new Date().setFullYear(
                      new Date().getFullYear() + 3,
                    )}
                  />
                </View>
              )}
            </View>
          </Modal>
        </Modal>

        {/* model for edit email */}
        <Modal animationType="fade" transparent={true} visible={emailModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.modelBackground,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: width * (15 / 375),
              }}>
              {Platform.OS == 'android' ? (
                <View
                  style={{
                    backgroundColor: colors.whitebackground,
                    padding: width * (15 / 375),
                    borderRadius: width * (30 / 375),
                  }}>
                  <TouchableOpacity
                    onPress={() => setEmailModal(false)}
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: width * (25 / 375),
                      marginLeft: width * (10 / 375),
                    }}>
                    <Image source={Images.close}></Image>
                  </TouchableOpacity>
                  <Text
                    style={[CommonStyles.HeadingText2, { alignSelf: 'center' }]}>
                    {I18n.t('editEmail')}
                  </Text>
                  <View style={[CommonStyles.shadowStyle, styles.view70]}>
                    <Text
                      style={{ flex: 0.8, paddingRight: 3 }}
                      numberOfLines={1}>
                      {state.editEmail}
                    </Text>
                    <Image style={{ flex: 0.1 }} source={Images.key}></Image>
                    <TouchableOpacity
                      style={{
                        flex: 0.1,
                      }}>
                      <Image
                        style={{ alignSelf: 'flex-end' }}
                        source={Images.threeDots}></Image>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      color: colors.gray,
                      width: '100%',

                      paddingLeft: width * (10 / 375),
                    }}>
                    {I18n.t('anotherEmail')}
                  </Text>
                  <TextBox
                    view1={{ marginTop: width * (-12 / 375) }}
                    error={state.editEmailError && I18n.t(state.editEmailError)}
                    isPlaceHolder={true}
                    placeholder="Email Address"
                    onChangeText={prevState => {
                      setState({
                        ...state,
                        editEmail1:
                          prevState == '' ? prevState : prevState.trimLeft(),
                      });
                    }}
                    onSubmitEditing={Keyboard.dismiss}
                    keyboardType={'email-address'}
                    value={state.editEmail1}
                    errorStyle={{ marginHorizontal: width * (0 / 375) }}
                  />
                  {state.loadingEmail == true ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginVertical: 30,
                        alignItems: 'center',
                        height: width * (50 / 375),
                      }}>
                      <Bubbles size={10} color="rgba(253, 191, 90, 1)" />
                    </View>
                  ) : (
                    <View style={styles.view69}>
                      <Button
                        buttonStyle={styles.view68}
                        label={I18n.t('Set')}
                        onPress={() => {
                          validEmail();
                        }}
                        isLabel={true}
                        buttonTextStyle={[
                          {
                            color: colors.black,
                            fontSize: fontsize.Regular,
                          },
                        ]}
                      />
                    </View>
                  )}
                </View>
              ) : (
                <KeyboardAvoidingView behavior={'padding'}>
                  <View style={styles.view67}>
                    <TouchableOpacity
                      onPress={() => setEmailModal(false)}
                      style={styles.view66}>
                      <Image source={Images.close}></Image>
                    </TouchableOpacity>
                    <Text
                      style={[
                        CommonStyles.HeadingText2,
                        { alignSelf: 'center' },
                      ]}>
                      {I18n.t('editEmail')}
                    </Text>
                    <View style={[CommonStyles.shadowStyle, styles.view65]}>
                      <Text
                        style={{ flex: 0.8, paddingRight: 3 }}
                        numberOfLines={1}>
                        {state.editEmail}
                      </Text>
                      <Image style={{ flex: 0.1 }} source={Images.key}></Image>
                      <TouchableOpacity
                        style={{
                          flex: 0.1,
                        }}>
                        <Image
                          style={{ alignSelf: 'flex-end' }}
                          source={Images.threeDots}></Image>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.view64}>{I18n.t('anotherEmail')}</Text>
                    <TextBox
                      view1={{ marginTop: width * (-12 / 375) }}
                      error={
                        state.editEmailError && I18n.t(state.editEmailError)
                      }
                      isPlaceHolder={true}
                      placeholder="Email Address"
                      onChangeText={prevState => {
                        setState({
                          ...state,
                          editEmail1:
                            prevState == '' ? prevState : prevState.trimLeft(),
                        });
                      }}
                      onSubmitEditing={Keyboard.dismiss}
                      keyboardType={'email-address'}
                      value={state.editEmail1}
                      errorStyle={{ marginLeft: 13 }}
                    />
                    {state.loadingEmail == true ? (
                      <View style={styles.view63}>
                        <Bubbles size={10} color="rgba(253, 191, 90, 1)" />
                      </View>
                    ) : (
                      <View style={styles.view62}>
                        <Button
                          buttonStyle={styles.view61}
                          label={I18n.t('Set')}
                          onPress={() => {
                            validEmail();
                          }}
                          isLabel={true}
                          buttonTextStyle={[
                            {
                              color: colors.black,
                              fontSize: fontsize.Regular,
                            },
                          ]}
                        />
                      </View>
                    )}
                  </View>
                </KeyboardAvoidingView>
              )}
            </View>
          </View>
        </Modal>
        {/* modal for change email address */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={validateModal}
          onRequestClose={() => {
            setValidateModal(false), setNew(false);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setValidateModal(false), setNew(false);
            }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setValidateModal(true), setNew(true);
                }}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderTopLeftRadius: width * (20 / 375),
                    borderTopRightRadius: width * (20 / 375),
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      height: width * (40 / 375),

                      alignItems: 'center',
                      width: width * (50 / 375),
                      justifyContent: 'space-between',
                      marginVertical: '3%',
                      marginHorizontal: '3%',
                    }}
                    onPress={() => {
                      setValidateModal(false), setNew(false);
                    }}>
                    <Image source={Images.backarrow}></Image>
                    <Text style={CommonStyles.backbuttonText}>
                      {I18n.t('Back')}
                    </Text>
                  </TouchableOpacity>

                  <ScrollView
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={{}}
                    showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          setValidateModal(false), setNew(false);
                        }}></TouchableOpacity>
                    </View>
                    <View
                      style={[
                        styles.headingview,
                        {
                          marginTop: width * (10 / 375),
                          marginBottom: width * (60 / 375),
                        },
                      ]}>
                      <Text
                        style={[
                          CommonStyles.SubHeadingText1,
                          {
                            textAlign: 'center',
                            fontFamily: fonts.Bold,
                            fontSize: fontsize.Large,
                            lineHeight: width * (22 / 375),
                          },
                        ]}>
                        {I18n.t('Validateemail')}
                      </Text>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 15 }}>
                      <Text style={CommonStyles.SubHeadingText4}>
                        {I18n.t('Validation_guide')}
                      </Text>
                      <Text
                        style={[
                          CommonStyles.RegularText,
                          { fontWeight: 'bold', marginVertical: '5%' },
                        ]}>
                        {state.email}
                      </Text>

                      <Text
                        style={[
                          CommonStyles.SubHeadingText4,
                          {
                            color: colors.yellow,
                            marginTop: width * (5 / 375),
                            marginBottom: width * (20 / 375),
                            bottom: isKeyboardVisible ? 0 : 0,
                          },
                        ]}
                        onPress={() => setActive(true)}>
                        {I18n.t('Changeemail')}
                      </Text>
                    </View>
                    <View style={{ bottom: isKeyboardVisible ? 0 : 0 }}>
                      {active == true && (
                        <TextBox
                          secureTextEntry={false}
                          rightImage={Images.emailRightarrow}
                          inputTitle={I18n.t('Email')}
                          viewStyle={{ marginHorizontal: width * (20 / 375) }}
                          view1={{ marginHorizontal: width * (20 / 375) }}
                          error={
                            (state.emailReq && I18n.t(state.emailReq)) ||
                            emailinvalide
                          }
                          isPlaceHolder={true}
                          placeholder={I18n.t('enter_email')}
                          onChangeText={prevState => {
                            setState({
                              ...state,
                              email:
                                prevState == ''
                                  ? prevState
                                  : prevState.trimLeft(),
                              emailReq: validate('emailReq', prevState),
                            });
                          }}
                          onSubmitEditing={Keyboard.dismiss}
                          keyboardType={'email-address'}
                          value={state.email}
                          autoCapitalize={'none'}
                        />
                      )}

                      {bubbleloader == true && (
                        <View
                          style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            bottom: width * (0 / 375),
                            zIndex: 10,
                            width: width,
                            alignItems: 'center',
                            height: width * (50 / 375),
                          }}>
                          <Bubbles size={10} color="#FFF" />
                        </View>
                      )}
                      <View style={{ alignItems: 'center' }}>
                        <Button
                          buttonStyle={{
                            backgroundColor:
                              active == true
                                ? colors.yellow
                                : colors.disablecolor,
                            borderRadius: 30,
                            height: width * (45 / 375),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: width * (20 / 375),
                            marginBottom: width * (30 / 375),
                          }}
                          disabled={!active}
                          label={I18n.t('Send_validation_code')}
                          onPress={() => {
                            onSend();
                          }}
                          isLabel={true}
                          buttonTextStyle={CommonStyles.buttontext}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
        {/* Modal for otp veriy */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={verifyotp}
          onRequestClose={() => {
            setVerifyotp(false), setNew(false);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setVerifyotp(false), setNew(false);
            }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setVerifyotp(true), setNew(true);
                }}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderTopLeftRadius: width * (20 / 375),
                    borderTopRightRadius: width * (20 / 375),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: width * (10 / 375),
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        height: width * (40 / 375),

                        alignItems: 'center',
                        width: width * (50 / 375),
                        justifyContent: 'space-between',
                        marginVertical: '3%',
                        marginHorizontal: '3%',
                      }}
                      onPress={() => {
                        setVerifyotp(false), setNew(false);
                      }}>
                      <Image source={Images.backarrow}></Image>
                      <Text style={CommonStyles.backbuttonText}>
                        {I18n.t('Back')}
                      </Text>
                    </TouchableOpacity>

                    {otpValidate == true && (
                      <View
                        style={{
                          position: 'absolute',
                          justifyContent: 'center',
                          alignSelf: 'center',

                          zIndex: 1,

                          right: 0,
                          alignItems: 'center',
                          height: width * (50 / 375),
                        }}>
                        <Bubbles size={10} color="rgba(253, 191, 90, 1)" />
                      </View>
                    )}
                    {otpValidate == false && (
                      <TouchableOpacity onPress={() => verificationOtp()}>
                        <Text
                          style={[
                            CommonStyles.HeadingText3,
                            {
                              color: colors.yellow,
                              fontSize: fontsize.Regular,
                              marginTop: 20,
                              marginRight: 20,
                            },
                          ]}>
                          {I18n.t('Confirm')}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <ScrollView
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View style={{ flex: 1 }}>
                        <View
                          style={[
                            {
                              marginTop: width * (40 / 375),
                              marginBottom: width * (40 / 375),
                              alignSelf: 'center',
                              alignItems: 'center',
                            },
                          ]}>
                          <Text
                            style={[
                              CommonStyles.SubHeadingText1,
                              {
                                alignSelf: 'center',
                                fontSize: fontsize.Extralarge,
                                lineHeight: width * (38 / 375),
                              },
                            ]}>
                            {I18n.t('Validate_your')}
                          </Text>
                          <Text
                            style={[
                              CommonStyles.SubHeadingText1,
                              {
                                fontSize: fontsize.Extralarge,
                                lineHeight: width * (38 / 375),
                              },
                            ]}>
                            <Text style={{ color: colors.yellow }}>
                              {' '}
                              {I18n.t('account')}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text
                      style={[
                        CommonStyles.RegularText4,
                        { alignSelf: 'center' },
                      ]}>
                      {I18n.t('digit_code')}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.RegularText4,
                        { textAlign: 'center', width: '100%' },
                      ]}>
                      {I18n.t('code_send')}
                      <Text
                        style={{ color: colors.black, fontFamily: fonts.Bold }}>
                        {' '}
                        {state.email}
                      </Text>
                    </Text>

                    <OTPInputView
                      style={[
                        {
                          height: 80,
                          marginTop: width * (20 / 375),
                          marginHorizontal: '5%',
                          shadowColor: colors.shadowColor,
                          shadowOpacity: 10,
                          shadowRadius: 5,
                          shadowOffset: {
                            height: 0,
                            width: 0,
                          },
                          borderWidth: 0,
                        },
                      ]}
                      pinCount={4}
                      code={state.otp}
                      onCodeChanged={code => {
                        setOtperror(false);
                        setState({
                          ...state,
                          otp: code == '' ? code : code,
                          otpStatus: false,
                          resendOtp: '',
                        });
                      }}
                      codeInputHighlightStyle={{
                        borderColor: colors.yellow,
                        borderWidth: 3,
                      }}
                      autoFocusOnLoad={false}
                      placeholderTextColor={colors.darkBlueGreen}
                      keyboardType="phone-pad"
                      codeInputFieldStyle={[
                        styles.codeInput,
                        {
                          borderColor:
                            error == true ? colors.red : colors.yellow,
                          color: error == true ? colors.red : colors.black,
                          backgroundColor:
                            error == true ? colors.otperrorback : colors.white,
                          width: width * (75 / 375),
                          height: width * (60 / 375),
                          borderWidth: 1,
                          borderRadius: width * (20 / 375),
                          fontSize: width * (24 / 375),
                          textAlign: 'center',
                        },
                      ]}
                      onCodeFilled={otp => {
                        setState({
                          ...state,
                          otp: otp,
                          otpStatus: false,
                          resendOtp: '',
                        });
                      }}
                    />
                    {error == true && (
                      <View
                        style={{
                          paddingTop: 20,
                          flexDirection: 'row',
                          borderRadius: width * (25 / 375),
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{ alignSelf: 'center' }}
                          source={Images.Rederror}
                        />
                        <Text
                          style={{
                            color: 'red',
                            alignSelf: 'center',
                            paddingHorizontal: width * (10 / 375),
                            paddingVertical: width * (3 / 375),
                          }}>
                          {I18n.t('Wrongcode')}
                        </Text>
                      </View>
                    )}
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: fontsize.Small,
                        color: colors.red,
                        marginTop: 10,
                        marginBottom:
                          otpValidate1 == true ? width * (140 / 375) : 0,
                      }}>
                      {state.otpError && I18n.t(state.otpError)}
                    </Text>
                    {state.resendOtp != '' ? (
                      <Text style={{ textAlign: 'center' }}>
                        {state.resendOtp}
                      </Text>
                    ) : null}
                    {otpValidate1 == true && (
                      <View
                        style={{
                          position: 'absolute',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          bottom: width * (30 / 375),
                          zIndex: 1,
                          width: width,

                          alignItems: 'center',

                          height: width * (50 / 375),
                        }}>
                        <Bubbles size={10} color="rgba(253, 191, 90, 1)" />
                      </View>
                    )}
                    {otpValidate1 == false && (
                      <Text
                        style={{
                          fontSize: fontsize.Small,
                          fontFamily: fonts.Bold,
                          color: colors.yellow,
                          alignSelf: 'center',
                          marginTop: error == true ? 0 : width * (50 / 375),
                          marginBottom: 30,
                        }}
                        onPress={() => resendOtp()}>
                        {I18n.t('Resend')}
                      </Text>
                    )}
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
        {/* model for verify password */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showverifypassmodal}
          onRequestClose={() => {
            setShowverifypassmodal(false), setNew(false);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowverifypassmodal(false), setNew(false);
            }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : ''}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setShowverifypassmodal(true), setNew(true);
                }}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderTopLeftRadius: width * (20 / 375),
                    borderTopRightRadius: width * (20 / 375),
                    paddingTop: width * (10 / 375),
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      height: width * (40 / 375),

                      alignItems: 'center',
                      width: width * (50 / 375),
                      justifyContent: 'space-between',

                      marginHorizontal: '3%',
                    }}
                    onPress={() => {
                      setShowverifypassmodal(false), setNew(false);
                    }}>
                    <Image source={Images.backarrow}></Image>
                    <Text
                      style={{
                        color: colors.yellow,
                        fontSize: fontsize.Regular,
                        marginLeft: 2,
                      }}>
                      {I18n.t('Back')}
                    </Text>
                  </TouchableOpacity>

                  <View style={{}}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: fontsize.Large,
                        fontFamily: fonts.Bold,
                      }}>
                      {I18n.t('Changeauthentification')}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: fontsize.Regular,
                        fontFamily: fonts.Regular,
                        margin: width * (20 / 375),
                      }}>
                      {I18n.t('changeyour')}
                    </Text>
                  </View>
                  <TextBox
                    rightImage2={Images.eyehide}
                    rightImage={Images.eyeshow}
                    ishideimage={true}
                    viewStyle={styles.textboxView2}
                    errorStyle={{ marginHorizontal: width * (0 / 375) }}
                    view1={{ marginHorizontal: width * (20 / 375) }}
                    error={
                      (state.passwordError && I18n.t(state.passwordError)) ||
                      messengerError
                    }
                    isPlaceHolder={true}
                    placeholder={I18n.t('Writepassword')}
                    secureTextEntry={true}
                    onChangeText={prevState => {
                      setState({
                        ...state,
                        password: prevState == '' ? prevState : prevState,
                        passwordError: validate('Login_password', prevState),
                      });
                      setMessengerError('');
                    }}
                    onSubmitEditing={Keyboard.dismiss}
                    value={state.password}
                  />
                  <View style={{ alignItems: 'center' }}>
                    <Button
                      buttonStyle={{
                        backgroundColor: colors.yellow,
                        borderRadius: 30,
                        height: width * (50 / 375),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: width * (20 / 375),
                        marginBottom: '7%',
                        width: '90%',
                      }}
                      label={I18n.t('Confirm')}
                      onPress={() => {
                        onConfirm();
                      }}
                      isLabel={true}
                      buttonTextStyle={[CommonStyles.buttontext]}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
          {bubbleloader == true && (
            <View
              style={{
                bottom: 0,
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center',
                bottom: width * (20 / 375),
                zIndex: 10,
                width: width,
                right: 0,
                alignItems: 'center',
                height: width * (50 / 375),
              }}>
              <Bubbles size={10} color="white" />
            </View>
          )}
        </Modal>

        {/* language select modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={SelectedLangModal}
          onRequestClose={() => {
            onBackPressHandler();
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              onBackPressHandler();
            }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255)',

                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <TouchableWithoutFeedback style={{}} onPress={() => { }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: 400,
                      borderTopLeftRadius: width * (10 / 375),
                      borderTopRightRadius: width * (10 / 375),
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.yellow,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 14,
                        borderTopLeftRadius: width * (10 / 375),
                        borderTopRightRadius: width * (10 / 375),
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          onCancelHandler();
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontSize: fontsize.Regular,
                          }}>
                          {I18n.t('cancel')}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: fontsize.Regular,
                        }}>
                        {I18n.t('Select')}({dataLength})
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          onConfirmHandler();
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontSize: fontsize.Regular,
                          }}>
                          {I18n.t('Confirm')}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        margin: 10,
                        marginLeft: 15,
                        fontFamily: fonts.Bold,
                      }}>
                      {I18n.t('languages')}
                    </Text>

                    <FlatList
                      data={dataNew}
                      contentContainerStyle={{ paddingBottom: 20 }}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }) =>
                        _rendernotiLists(item, index)
                      }
                      keyExtractor={(item, index) => String(index)}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      {newView == true ? (
        <View
          style={CommonStyles.modalbackview}
          onPress={() => setNew(false)}></View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => {
  return {
    editProfileRes: state,
    verificationRes: state,
    ResendRes: state,
    editEmailRes: state,
    editAddressRes: state,
    editVideoRes: state,
    editStatusRes: state,
    editInterViewRes: state,
    cancelInterViewRes: state,
    removeAttachment: state,
    checkpasswordRes: state,
    GetProfileReq: state,
    editProfileReq: state,
    SendOtpReq: state,
    UpdateEmailreq: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProfileRequest: body => {
      dispatch(editProfileA(body));
    },
    SendOtpRequest: body => {
      dispatch(SendOtpA(body));
    },

    verificationRequest: body => {
      dispatch(VerificationA(body));
    },
    UpdateEmailRequest: body => {
      dispatch(UpdateEmailA(body));
    },
    resendRequest: body => {
      dispatch(ResendA(body));
    },
    checkpasswordRequest: body => {
      dispatch(checkpasswordA(body));
    },
    GetProfileRequest: body => {
      dispatch(GetProfileA(body));
    },

    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileInformation);
