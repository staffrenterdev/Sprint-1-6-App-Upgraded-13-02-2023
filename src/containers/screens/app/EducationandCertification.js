import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Modal,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/EducationandCertificationstyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import TextBox from '../../components/TextBox';
import Picker from 'react-native-picker';
import moment from 'moment';
import {
  checkPhotoPermissionNew,
  checkCameraPermissionNew,
  pickImageHandlerNew,
  openCameraPickerViewNew,
} from '../../components/imagePicker';
import DocumentPicker from 'react-native-document-picker';
import SignItOut from '../../components/SignItOut';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import fonts from '../../../constants/fonts';
import fontsize from '../../../constants/i18n/Fontsizes';
import {SwipeListView} from 'react-native-swipe-list-view';
import apiName from '../../../constants/apiName';
import {getService} from '../../../services/getServices';
import {DatePicker} from 'react-native-common-date-picker';
import {postService} from '../../../services/postServices';
import Loader from '../../components/loader';
import ImagePickerModal from '../../components/imagePickerModal';
import {PanGestureHandler} from 'react-native-gesture-handler';

const EducationandCertification = props => {
  const [state, setState] = useState({
    showImgOptionNew: false,
    eWorkPositionError: '',
  });
  const [newView, setNew] = useState(false);
  const [newView2, setNew2] = useState(false);
  const [Educationmodal, setEducationmodal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = useState(false);
  const [CertificationModal, setCertificationModal] = useState(false);
  const [listshow, setListshow] = useState(false);
  const [listshow2, setListshow2] = useState(false);
  const [hiddenshow, setHiddenshow] = useState(false);
  const swipelistref = useRef();
  const [schooltypelist, setSchooltypelist] = useState();
  const [schooltypedata, setSchooltypedata] = useState();
  const [schooltypename, setSchooltypename] = useState('');
  const [schooltypename2, setSchooltypename2] = useState('');
  const [schooltypeid, setSchooltypeid] = useState();
  const [diplomatypelist, setDiplomatypelist] = useState();
  const [diplomatypedata, setDiplomatypedata] = useState();
  const [diplomatypename, setDiplomatypename] = useState('');
  const [diplomatypename2, setDiplomatypename2] = useState('');
  const [diplomatypeid, setDiplomatypeid] = useState();
  const [schoolname, setSchoolname] = useState('');
  const [schoolname2, setSchoolname2] = useState('');
  const [diplomaname, setDiplomaname] = useState('');
  const [diplomaname2, setDiplomaname2] = useState('');
  const [additionnalnote, setAdditionnalnote] = useState('');
  const [additionnalnote2, setAdditionnalnote2] = useState('');
  const [datemodal, setDatemodal] = useState(false);
  const [datemodal2, setDatemodal2] = useState(false);
  const [choosedate, setChoosedate] = useState('');
  const [choosedate2, setChoosedate2] = useState('');
  const [CurrentDate, setCurrentDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear())),
  );
  const [pdfname, setPdfname] = useState('');
  const [pdfname2, setPdfname2] = useState('');
  const [pdfobj, setPdfobj] = useState();
  const [pdfsize, setPdfsize] = useState();
  const [pdfsize2, setPdfsize2] = useState();
  const [loadingupload, setLoadingupload] = useState(false);
  const [educationlist, seteducationlist] = useState([]);
  const [editeducationitemid, setEditeducationitemid] = useState();
  const [editcertificationitemid, setEditcertificationitemid] = useState();
  const [activebutton, setactivebutton] = useState(false);
  const [activebutton2, setactivebutton2] = useState(false);
  const [loadingfirst, setLoadingfirst] = useState(true);

  const [certificationtypelist, setCertificationtypelist] = useState();
  const [certificationtypedata, setCertificationtypedata] = useState();
  const [certificationtypename, setCertificationtypename] = useState('');
  const [certificationtypename2, setCertificationtypename2] = useState('');
  const [certificationtypeid, setCertificationtypeid] = useState();
  const [certificateissuername, setCertificateissuername] = useState('');
  const [certificateissuername2, setCertificateissuername2] = useState('');
  const [certificatedate, setCertificatedate] = useState('');
  const [certificatedate2, setCertificatedate2] = useState('');
  const [certificateaddinotes, setCertificateaddinotes] = useState('');
  const [certificateaddinotes2, setCertificateaddinotes2] = useState('');
  const [certificatelist, setCertificatelist] = useState();
  const [typecheck, setTypecheck] = useState();
  const [uploaddocumentlist, setUploaddocumentlist] = useState([]);
  const [uploaddocumentlistnew, setUploaddocumentlistnew] = useState([]);
  const [uploaddocumentlist2, setUploaddocumentlist2] = useState([]);
  const [editmodal, setEditmodal] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const scrollRef = useRef();
  const [agreeLogout, setAgreeLogout] = useState();
  const scrollRef2 = useRef();
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      getDropdownValues();
      getcertificationtype();
      getEducationlist();
      getCertificationlist();
    });
    return unsubscribeOnBlur;
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
    Picker.hide();
  };
  useEffect(() => {
    if (
      schoolname == '' ||
      schooltypename == '' ||
      diplomaname == '' ||
      diplomatypename == '' ||
      choosedate == '' ||
      uploaddocumentlist?.length == 0 ||
      (uploaded == false &&
        deleted == false &&
        schooltypename == schooltypename2 &&
        schoolname == schoolname2 &&
        diplomatypename == diplomatypename2 &&
        diplomaname == diplomaname2 &&
        choosedate == choosedate2 &&
        additionnalnote == additionnalnote2)
    ) {
      setactivebutton(false);
    } else {
      setactivebutton(true);
    }
  });
  useEffect(() => {
    if (
      certificationtypename == '' ||
      certificateissuername == '' ||
      certificatedate == '' ||
      uploaddocumentlist?.length == 0 ||
      (certificationtypename == certificationtypename2 &&
        certificateissuername == certificateissuername2 &&
        diplomatypename == diplomatypename2 &&
        certificatedate == certificatedate2 &&
        certificateaddinotes == certificateaddinotes2)
    ) {
      setactivebutton2(false);
    } else {
      setactivebutton2(true);
    }
  }, [
    certificationtypename,
    certificateissuername,
    certificatedate,
    editmodal == false ? uploaddocumentlist : null,
    certificateaddinotes,
  ]);
  useEffect(() => {
    if (deleted == true && editmodal == true) {
      setTimeout(() => {
        if (uploaddocumentlist.length == 0) {
          setactivebutton(false);
          setactivebutton2(false);
        } else {
          setactivebutton(true);
          setactivebutton2(true);
        }
      }, 500);
    }
  }, [uploaddocumentlist]);
  const _keyboardDidHide = () => {
    setMBottom('100%');
    setKeyboardVisible(false);
  };

  const PickerInputStyle = () => ({
    pickerConfirmBtnColor: [255, 255, 255, 1],
    pickerBg: [255, 255, 255, 1],
    pickerToolBarBg: [253, 191, 90, 1],
    pickerTitleColor: [255, 255, 255, 1],
    pickerCancelBtnColor: [255, 255, 255, 1],
  });

  const getDropdownValues = () => {
    getService(apiName.getschooltype)
      .then(async res => {
        if (res.status == 200) {
          setSchooltypelist(res?.data?.response.school_type);
          setDiplomatypelist(res?.data?.response.diploma_type);
          let tempArr = res?.data?.response.school_type;
          var newArray = [];
          tempArr.map(i => {
            newArray.push(i?.title);
          });
          let tempArr2 = res?.data?.response.diploma_type;
          var newArray2 = [];
          tempArr2.map(i => {
            newArray2.push(i?.title);
          });
        }
        setSchooltypedata(newArray);
        setDiplomatypedata(newArray2);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };
  const getcertificationtype = () => {
    getService(apiName.getcertificationtype)
      .then(async res => {
        if (res.status == 200) {
          setCertificationtypelist(res?.data?.response);
          let tempArr = res?.data?.response;
          var newArray = [];
          tempArr.map(i => {
            newArray.push(i?.title);
          });
        }
        setCertificationtypedata(newArray);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };

  //select school type
  const diploma_Type = () => {
    setNew2(true);
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: diplomatypedata,

      selectedValue: [
        `${diplomatypename ? diplomatypename : diplomatypedata[0]}`,
      ],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('Dtype'),
      onPickerConfirm: data => {
        setDiplomatypename(data[0]);
        setNew2(false);
        let value = diplomatypelist.filter(item => item?.title == data[0]);
        setDiplomatypeid(value[0]?.id);
      },
      onPickerCancel: data => {
        setNew2(false);
      },
      onPickerSelect: data => {},
    });
    Picker.show();
  };
  const school_Type = () => {
    setNew2(true);
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: schooltypedata,

      selectedValue: [`${schooltypename ? schooltypename : schooltypedata[0]}`],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('Stype'),
      onPickerConfirm: data => {
        setSchooltypename(data[0]);
        setNew2(false);
        let value = schooltypelist.filter(item => item?.title == data[0]);
        setSchooltypeid(value[0]?.id);
      },
      onPickerCancel: data => {
        setNew2(false);
      },
      onPickerSelect: data => {},
    });
    Picker.show();
  };
  const certification_type = () => {
    setNew2(true);
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: certificationtypedata,

      selectedValue: [
        `${
          certificationtypename
            ? certificationtypename
            : certificationtypedata[0]
        }`,
      ],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('Ctype'),
      onPickerConfirm: data => {
        setCertificationtypename(data[0]);
        setNew2(false);
        let value = certificationtypelist.filter(
          item => item?.title == data[0],
        );
        setCertificationtypeid(value[0]?.id);
      },
      onPickerCancel: data => {
        setNew2(false);
      },
      onPickerSelect: data => {},
    });
    Picker.show();
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
      .catch(error => {
        console.log('the error in camera permission is ', error);
      });
  };

  // stroage permission for android
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
        console.log(
          'Permission Denied!',
          'You need to give  permission to see documents',
        );
        return false;
      }
    } catch (error) {
      console.log('error = ', error);
    }
  };

  // document picker from device
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
      setPdfsize(Math.round(res.size / 1024));
      if (uploaddocumentlist.length > 2) {
        Alert.alert(I18n.t('Maximumreached'));
      } else {
        upload_document(newImage2, Math.round(newlet), res.name);
      }
      setPdfobj(newImage2);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const upload_document = (val, newlet, name) => {
    setHiddenshow(true);
    setLoadingupload(true);
    let Body = new FormData();

    setTypecheck(val.type);

    Body.append('upload_document', val);
    Body.append(
      'document_type',
      active == true ? 'certification' : 'education',
    );

    postService(apiName.eduandcertuploaddocument, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoadingupload(false);
          if (editmodal == true) {
            setUploaded(true);
            setactivebutton(true);
            setactivebutton2(true);
          }

          setNew2(false);
          setHiddenshow(false);
          var doc = {
            size: newlet,
            name: res.data.response.upload_document,
            type: res.data.response?.extension,
          };

          uploaddocumentlist.unshift(doc);
          setUploaddocumentlist([...uploaddocumentlist]);
        }
      })
      .catch(error => {});
  };

  const _rendernotiLists = (item, index) => {
    return (
      <View
        onPress={() => {}}
        style={[
          styles._rendernotiListsview,
          {
            borderTopWidth: index == 0 ? 0.3 : 0,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{width: '17%', alignSelf: 'center', marginHorizontal: 20}}>
            <Image
              source={Images.CertificationListLogo}
              style={{
                height: width * (60 / 375),
                width: width * (60 / 375),
              }}></Image>
          </View>
          <View style={{width: '66%'}}>
            <View>
              <Text style={{fontFamily: fonts.Bold}}>
                {I18n.t('Type')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>
                  {item?.certification_type?.title}
                </Text>
              </Text>
              <Text
                style={{marginVertical: 5, fontFamily: fonts.Bold}}
                numberOfLines={1}>
                {I18n.t('Issuer')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>
                  {item?.certificate_issuer}
                </Text>
              </Text>
              <Text style={{fontFamily: fonts.Bold}}>
                {I18n.t('obtained')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>
                  {moment(item.date_obtained).format('MMMM DD, YYYY')}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderHiddenItem = (rowData, rowMap) => {
    return (
      <View style={[styles.renderHiddenItemview]}>
        <TouchableOpacity
          onPress={() => {
            rowMap[rowData.item.key].closeRow();
            Picker.hide();
            setHiddenshow(true);
            EditCertification(rowData?.item?.id);
          }}
          style={CommonStyles.Editimage}>
          <Image source={Images.EditText} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Picker.hide();

            Alert.alert(
              I18n.t('deletecertification'),
              I18n.t('suredeletecertification'),
              [
                {
                  text: I18n.t(['cancel']),
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },

                {
                  text: I18n.t('OK'),
                  onPress: () => {
                    DeleteCertifications(rowData?.item?.id, rowData?.index);
                    setHiddenshow(true);
                  },
                },
              ],
              {cancelable: false},
            );
          }}
          style={CommonStyles.Deleteimage}>
          <Image source={Images.Delete} />
        </TouchableOpacity>
      </View>
    );
  };
  const _rendernotiLists2 = (item, index) => {
    return (
      <View
        onPress={() => {}}
        style={[
          styles._rendernotiLists2view,
          {
            borderTopWidth: index == 0 ? 0.3 : 0,
          },
        ]}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View
            style={{width: '20%', alignSelf: 'center', marginHorizontal: 20}}>
            <Image
              source={Images.Educationlistlogo}
              style={{
                height: width * (50 / 375),
                width: width * (60 / 375),
              }}></Image>
          </View>
          <View style={{width: '66%'}}>
            <View>
              <View style={{flexDirection: 'row', width: '70%'}}>
                <Text style={CommonStyles.SubHeadingText12}>
                  {I18n.t('Type')}:{' '}
                </Text>
                <Text style={CommonStyles.SubHeadingText13}>
                  {item?.school_type?.title}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', width: '70%', marginVertical: 5}}>
                <Text style={CommonStyles.SubHeadingText12}>
                  {I18n.t('Establisment')}:{' '}
                </Text>
                <Text style={CommonStyles.SubHeadingText13}>
                  {item.school_name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', width: '70%'}}>
                <Text style={CommonStyles.SubHeadingText12}>
                  {I18n.t('Diploma')}:{' '}
                </Text>
                <Text style={CommonStyles.SubHeadingText13}>
                  {item.diploma_type?.title}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', width: '70%', marginVertical: 5}}>
                <Text style={CommonStyles.SubHeadingText12}>
                  {I18n.t('Name')}:{' '}
                </Text>
                <Text style={CommonStyles.SubHeadingText13}>
                  {item.diploma_name}
                </Text>
              </View>
              <Text style={{fontFamily: fonts.Bold}}>
                {I18n.t('obtained')}:{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>
                  {moment(item.date_obtained).format('MMMM DD, YYYY')}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderHiddenItem2 = (rowData, rowMap) => {
    return (
      <View style={CommonStyles.renderHiddenItemview}>
        <TouchableOpacity
          onPress={() => {
            rowMap[rowData.item.key].closeRow();
            Picker.hide();
            setHiddenshow(true);
            EditEducation(rowData?.item?.id);
          }}
          style={CommonStyles.Editimage}>
          <Image source={Images.EditText} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Picker.hide();

            Alert.alert(
              I18n.t('deleteeducation'),
              I18n.t('suredeleteeducation'),
              [
                {
                  text: I18n.t(['cancel']),
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },

                {
                  text: I18n.t('OK'),
                  onPress: () => {
                    DeleteEducation(rowData?.item?.id, rowData?.index);
                    setHiddenshow(true);
                  },
                },
              ],
              {cancelable: false},
            );
          }}
          style={CommonStyles.Deleteimage}>
          <Image source={Images.Delete} />
        </TouchableOpacity>
      </View>
    );
  };
  const getEducationlist = () => {
    let Body = new FormData();
    Body.append('model_name', '\\UserEducation');

    postService(apiName.getuserrecord, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          if (res.data.response.data?.length != 0) {
            setEducationmodal(false);
            setEditeducationitemid();
            setUploaddocumentlist([]);
            setSchoolname('');
            setEditmodal(false);
            setDeleted(false);
            setUploaded(false);
            setSchooltypename('');
            setDiplomaname('');
            setDiplomatypename('');
            setChoosedate('');
            setPdfobj();
            setPdfname('');
            setPdfsize();
            setAdditionnalnote('');
            setNew(false);
            seteducationlist(res.data.response.data);
            setListshow2(true);
          }
          setTimeout(() => {
            setLoadingfirst(false);
          }, 200);
          setHiddenshow(false);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };
  const getCertificationlist = () => {
    let Body = new FormData();
    Body.append('model_name', '\\UserCertification');

    postService(apiName.getuserrecord, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          if (res.data.response.data.length != 0) {
            setCertificationModal(false);
            setEditcertificationitemid();
            setCertificationtypename('');
            setUploaddocumentlistnew([]);
            setDeleted(false);
            setUploaded(false);
            setUploaddocumentlist([]);
            setCertificateissuername('');
            setEditmodal(false);
            setCertificateaddinotes('');
            setCertificatedate('');
            setPdfname('');
            setPdfsize();
            setNew(false);
            setListshow(true);
            setCertificatelist(res.data.response.data);
          }
          setHiddenshow(false);
          setTimeout(() => {
            setLoadingfirst(false);
          }, 200);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getCertificationlist  api =====================>>',
          error,
        );
      });
  };

  const EditEducation = id => {
    let Body = new FormData();

    Body.append('id', id);
    Body.append('model_name', '\\UserEducation');
    postService(apiName.getedituserrecord, Body)
      .then(async res => {
        if (res.status == 200) {
          setEditeducationitemid(res.data.response.id);
          setHiddenshow(false);
          setEditmodal(true);
          setEducationmodal(true);
          setNew(true);
          setSchooltypename(res.data.response.school_type?.title);
          setSchooltypename2(res.data.response.school_type?.title);
          setSchooltypeid(res.data.response.school_type?.id);
          setSchoolname(res.data.response.school_name);
          setSchoolname2(res.data.response.school_name);
          setDiplomatypename(res.data.response.diploma_type?.title);
          setDiplomatypename2(res.data.response.diploma_type?.title);
          setDiplomatypeid(res.data.response.diploma_type?.id);
          setDiplomaname(res.data.response.diploma_name);
          setDiplomaname2(res.data.response.diploma_name);
          setChoosedate(res.data.response.date_obtained);
          setChoosedate2(res.data.response.date_obtained);
          setPdfname(res.data.response.upload_document);
          setPdfname2(res.data.response.upload_document);
          setPdfsize(res.data.response.document_size);
          setPdfsize2(res.data.response.document_size);
          setAdditionnalnote(res.data.response.additionnal_notes);
          setAdditionnalnote2(res.data.response.additionnal_notes);
          setUploaddocumentlist(res.data.response.user_document);
          setUploaddocumentlistnew(
            JSON.parse(JSON.stringify(res.data.response.user_document)),
          );
          setUploaddocumentlist2(res.data.response.user_document);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };
  const EditCertification = id => {
    let Body = new FormData();

    Body.append('id', id);
    Body.append('model_name', '\\UserCertification');
    postService(apiName.getedituserrecord, Body)
      .then(async res => {
        if (res.status == 200) {
          setEditcertificationitemid(res.data.response.id);
          setEditmodal(true);
          setHiddenshow(false);
          setCertificationModal(true);
          setNew(true);
          setCertificationtypeid(res.data.response.certification_type.id);
          setCertificationtypename(res.data.response.certification_type.title);
          setCertificationtypename2(res.data.response.certification_type.title);
          setCertificateissuername(res.data.response.certificate_issuer);
          setCertificateissuername2(res.data.response.certificate_issuer);
          setCertificatedate(res.data.response.date_obtained);
          setCertificatedate2(res.data.response.date_obtained);
          setPdfsize(res.data.response.document_size);
          setPdfsize2(res.data.response.document_size);
          setCertificateaddinotes(res.data.response.additionnal_notes);
          setCertificateaddinotes2(res.data.response.additionnal_notes);
          setUploaddocumentlist(res.data.response.user_document);
          setUploaddocumentlistnew(
            JSON.parse(JSON.stringify(res.data.response.user_document)),
          );
          setUploaddocumentlist2(res.data.response.user_document);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };

  const DeleteEducation = (id, index) => {
    setLoading(true);
    let Body = new FormData();

    Body.append('id', id);
    Body.append('model_name', '\\UserEducation');
    postService(apiName.userrecorddelete, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          educationlist.splice(index, 1);
          seteducationlist([...educationlist]);
          if (educationlist.length == 0) {
            setListshow2(false);
          }
          setHiddenshow(false);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };

  const DeleteCertifications = (id, index) => {
    setLoading(true);
    let Body = new FormData();

    Body.append('id', id);
    Body.append('model_name', '\\UserCertification');
    postService(apiName.userrecorddelete, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          certificatelist.splice(index, 1);
          setCertificatelist([...certificatelist]);
          if (certificatelist.length == 0) {
            setListshow(false);
          }
          setHiddenshow(false);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };
  const AddEducation = () => {
    let Body = new FormData();
    {
      editeducationitemid && Body.append('id', editeducationitemid);
    }
    Body.append('school_name', schoolname);
    Body.append('diploma_name', diplomaname);
    Body.append('school_type_id', schooltypeid);
    Body.append('diploma_type_id', diplomatypeid);
    Body.append('date_obtained', choosedate);
    uploaddocumentlist.map((i, index) => {
      Body.append('upload_document[' + index + ']' + '[size]', i.size);
      Body.append('upload_document[' + index + ']' + '[name]', i.name);
      Body.append('upload_document[' + index + ']' + '[type]', i.type);
    });

    Body.append('additionnal_notes', additionnalnote);
    postService(apiName.usereducation, Body)
      .then(async res => {
        if (res.status == 200) {
          let x = true;
          setLoading(true);
          setactivebutton(false);
          getEducationlist();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };

  const AddCertification = () => {
    let Body = new FormData();
    {
      editcertificationitemid && Body.append('id', editcertificationitemid);
    }
    Body.append('certification_type_id', certificationtypeid);
    Body.append('certificate_issuer', certificateissuername);
    Body.append('date_obtained', certificatedate);
    uploaddocumentlist.map((i, index) => {
      Body.append('upload_document[' + index + ']' + '[size]', i.size);
      Body.append('upload_document[' + index + ']' + '[name]', i.name);
      Body.append('upload_document[' + index + ']' + '[type]', i.type);
    });
    Body.append('additionnal_notes', certificateaddinotes);
    postService(apiName.usercertification, Body)
      .then(async res => {
        if (res.status == 200) {
          let x = true;
          getCertificationlist();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };

  const imageUpLoadNew = () => {
    setState({...state, showImgOptionNew: true});
    setNew2(true);
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
      var type = res[0].mime;
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
      setPdfsize(Math.round(res[0].size / 1024));
      if (uploaddocumentlist.length > 2) {
        Alert.alert(I18n.t('Maximumreached'));
      } else {
        upload_document(newImage2, Math.round(newlet), name);
      }
    }
  };

  const _rendernotiListsdocument = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={1}
        style={styles._rendernotiListsdocument}>
        <View
          style={[
            {
              flexDirection: 'row',
            },
          ]}>
          <Image
            style={styles.File_dockimg}
            source={Images.File_dock}
          />
          <View style={{flexDirection: 'row', marginLeft: 20, width: '80%'}}>
            <View>
              <View>
                {active == true ? (
                  <Text style={CommonStyles.SubHeadingText13}>
                    {I18n.t('Certification')} - {index + 1} -{' '}
                    {certificationtypename}.{item.type}
                  </Text>
                ) : (
                  <Text style={CommonStyles.SubHeadingText13}>
                    {I18n.t('Diploma')} - {index + 1} - {schoolname}.{item.type}
                  </Text>
                )}
              </View>
              <View>
                <Text style={CommonStyles.SubHeadingText13}>
                  {item?.size} {'kb'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHiddenItemdocument = (data, rowMap) => (
    <View
      style={styles.renderHiddenItemdocument}>
      <TouchableOpacity
        onPress={() => {
          Picker.hide();

          Alert.alert(
            I18n.t('deletedocument'),
            I18n.t('suredeletedocument'),
            [
              {
                text: I18n.t(['cancel']),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },

              {
                text: I18n.t('OK'),
                onPress: () => {
                  if (editmodal == true && data?.item?.id) {
                    setDeleted(true);
                    setUploaded(true);
                    setHiddenshow(true);
                    uploaddocumentlist.splice(data.index, 1);
                    setUploaddocumentlist([...uploaddocumentlist]);
                    setHiddenshow(false);
                  } else {
                    setHiddenshow(true);
                    uploaddocumentlist.splice(data.index, 1);
                    setUploaddocumentlist([...uploaddocumentlist]);
                    setHiddenshow(false);
                  }
                },
              },
            ],
            {cancelable: false},
          );
        }}
        style={styles.renderHiddendelete}>
        <Image source={Images.Delete} />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{backgroundColor: colors.whitebackground, flex: 1}}>
      {loading == true ? <Loader loading={loading} /> : null}
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />

      <View style={{backgroundColor: colors.whitebackground, flex: 1}}>
        <NavBar
          source={Images.backarrow}
          lefttext={I18n.t('Back')}
          rightText={I18n.t('Educationcertification')}
          navigation={() => props.navigation.goBack()}></NavBar>
        <ShowStatusBarWhite />
        <View style={styles.mainbuttonview}>
          <TouchableOpacity
            style={[
              styles.commanbuttonstyle,
              {
                borderColor: active == true ? colors.yellow : colors.white,
                borderWidth:
                  active == false ? width * (0 / 375) : width * (1 / 375),
                backgroundColor: active == false ? colors.yellow : colors.white,
              },
            ]}
            onPress={() => {
              setLoading(true);
              setActive(false);
              setHiddenshow(true);
              getEducationlist();
            }}>
            <Text
              style={[
                styles.commbuttontext,
                {
                  color: active == true ? colors.yellow : colors.white,
                },
              ]}>
              {I18n.t('Education')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.commanbuttonstyle,
              {
                borderColor: colors.yellow,
                borderWidth:
                  active == false ? width * (1 / 375) : width * (0 / 375),

                backgroundColor: active == true ? colors.yellow : colors.white,
              },
            ]}
            onPress={() => {
              setLoading(true);
              setHiddenshow(true);
              getCertificationlist();
              setActive(true);
            }}>
            <Text
              style={[
                styles.commbuttontext,
                {
                  color: active == true ? colors.white : colors.yellow,
                },
              ]}>
              {I18n.t('Certification')}
            </Text>
          </TouchableOpacity>
        </View>
        {loadingfirst == true ? (
          <Loader loading={loadingfirst} />
        ) : (
          <View style={{flex: 1}}>
            {/* certificate section */}
            {active == true ? (
              listshow == false ? (
                <View style={{flex: 1}}>
                  <Image
                    source={Images.CertificationLogo}
                    style={{
                      alignSelf: 'center',
                      marginTop: width * (15 / 375),
                    }}></Image>
                  <View>
                    <Text style={styles.havecertification}>
                      {I18n.t('havecertification')}
                    </Text>

                    <Text style={styles.trainingcertifications}>
                      {I18n.t('trainingcertifications')}
                    </Text>
                    <Text style={styles.Althoughcertifications}>
                      {I18n.t('Althoughcertifications')}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{flex: 1}}>
                  <Text style={styles.Certifications}>
                    {I18n.t('Certifications')}
                  </Text>
                  <SwipeListView
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    contentContainerStyle={{paddingBottom: 120}}
                    keyExtractor={item => {
                      item.id;
                    }}
                    ref={swipelistref}
                    data={certificatelist}
                    renderItem={({item, index}) =>
                      _rendernotiLists(item, index)
                    }
                    renderHiddenItem={
                      hiddenshow == true ? null : renderHiddenItem
                    }
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    directionalDistanceChangeThreshold={true}
                    disableRightSwipe={true}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                  />
                </View>
              )
            ) : // education section
            listshow2 == false ? (
              <View style={{flex: 1}}>
                <Image
                  source={Images.EducationIntro}
                  style={{
                    alignSelf: 'center',
                    marginTop: width * (15 / 375),
                  }}></Image>
                <View>
                  <Text style={styles.anydegrees}>{I18n.t('anydegrees')}</Text>

                  <Text style={styles.Pleaselet}>{I18n.t('Pleaselet')}</Text>
                  <Text style={styles.Anydiploma}>{I18n.t('Anydiploma')}</Text>
                </View>
              </View>
            ) : (
              <View style={{flex: 1}}>
                <Text style={styles.Certifications}>
                  {I18n.t('Degreesdiplomas')}
                </Text>
                <SwipeListView
                  showsVerticalScrollIndicator={false}
                  onEndReachedThreshold={0.5}
                  contentContainerStyle={{paddingBottom: 120}}
                  keyExtractor={item => {
                    item.id;
                  }}
                  data={educationlist}
                  renderItem={({item, index}) => _rendernotiLists2(item, index)}
                  renderHiddenItem={
                    hiddenshow == true ? null : renderHiddenItem2
                  }
                  leftOpenValue={75}
                  rightOpenValue={-150}
                  directionalDistanceChangeThreshold={true}
                  disableRightSwipe={true}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                />
              </View>
            )}
            {active == true ? (
              <View style={styles.addbuttonview}>
                <Button
                  buttonStyle={styles.addButton}
                  label={I18n.t('Addcertification')}
                  onPress={() => {
                    setCertificationModal(true);
                    setNew(true);
                  }}
                  isLabel={true}
                  buttonTextStyle={[CommonStyles.buttontext]}
                />
              </View>
            ) : (
              <View style={styles.addbuttonview}>
                <Button
                  buttonStyle={styles.addButton}
                  label={I18n.t('Adddegree')}
                  onPress={() => {
                    setEducationmodal(true);
                    setNew(true);
                  }}
                  isLabel={true}
                  buttonTextStyle={[CommonStyles.buttontext]}
                />
              </View>
            )}
          </View>
        )}
      </View>

      {/* modal for Education */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={Educationmodal}
        onRequestClose={() => [setReferencesModal(false), setNew(false)]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setSchoolname('');
            setUploaddocumentlistnew([]);
            setUploaddocumentlist([]);
            setSchooltypename('');
            setDiplomaname('');
            setDiplomatypename('');
            setChoosedate('');
            setPdfobj();
            setDeleted(false);
            setUploaded(false);
            setPdfname('');
            setEditmodal(false);
            setPdfsize();
            setEditeducationitemid();
            setactivebutton(false);
            setAdditionnalnote();
            setEducationmodal(false), setNew(false);
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            style={{flex: 1}}>
            <TouchableWithoutFeedback
              onPress={() => {
                setEducationmodal(true), setNew(true);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: 250,
                }}>
                <View
                  style={[
                    styles.style15,
                    {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                  ]}>
                  <TouchableOpacity
                    style={CommonStyles.backarrowview}
                    onPress={() => {
                      setUploaddocumentlistnew([]);
                      setUploaddocumentlist([]);
                      setDeleted(false);
                      setUploaded(false);
                      setSchoolname('');
                      setSchooltypename('');
                      setDiplomaname('');
                      setDiplomatypename('');
                      setChoosedate('');
                      setPdfobj();
                      setPdfname('');
                      setEditmodal(false);
                      setPdfsize();
                      setEditeducationitemid();
                      setactivebutton(false);

                      setAdditionnalnote();
                      setEducationmodal(false), setNew(false);
                    }}>
                    <Image source={Images.backarrow}></Image>
                    <Text style={CommonStyles.Backtext}>{I18n.t('Back')}</Text>
                  </TouchableOpacity>
                  <Text
                    style={[CommonStyles.HeadingText12, styles.addheadingtext]}>
                    {I18n.t('Adddegree')}
                  </Text>
                  <ScrollView
                    ref={scrollRef}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingBottom: 60,
                      flexGrow: 1,
                    }}>
                    <View>
                      <View
                        style={{
                          height: width * (100 / 375),
                        }}>
                        <Text
                          style={[
                            styles.inputTitle,
                            CommonStyles.HeadingText3,
                            {marginTop: 10, marginHorizontal: 15},
                          ]}>
                          {I18n.t('Stype')}
                        </Text>
                        <TouchableOpacity
                          style={[styles.pickerview]}
                          onPress={() => school_Type()}>
                          <Image
                            style={styles.downArrowimg}
                            source={Images.downArrow}
                          />
                          <Text
                            editable={false}
                            pointerEvents="none"
                            style={[
                              styles.errorText12,
                              {
                                marginLeft: 20,
                                marginTop: 5,
                                color: schooltypename
                                  ? 'rgb(0,0,0)'
                                  : 'rgb(183,190,197)',
                              },
                            ]}>
                            {`${
                              schooltypename
                                ? schooltypename
                                : I18n.t('Chooseschool')
                            }`}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginTop: width * (8 / 375),
                            fontSize: fontsize.Small,
                            paddingLeft: width * (18 / 375),
                          }}>
                          {state.eWorkPositionError &&
                            I18n.t(state.eWorkPositionError)}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.inputTitle,
                          CommonStyles.HeadingText3,
                          {marginTop: 15, marginHorizontal: 15},
                        ]}>
                        {I18n.t('SName')}
                      </Text>
                      <TextBox
                        viewStyle={{width: '100%'}}
                        textStyle={{color: 'rgb(0,0,0)'}}
                        text={false}
                        error={
                          state.eEnterpriseError &&
                          I18n.t(state.eEnterpriseError)
                        }
                        isPlaceHolder={true}
                        placeholder={I18n.t('Nameschool')}
                        onChangeText={prevState => {
                          setSchoolname(prevState);
                        }}
                        onSubmitEditing={Keyboard.dismiss}
                        value={schoolname}
                      />
                      <View
                        style={{
                          height: width * (100 / 375),
                        }}>
                        <Text
                          style={[
                            CommonStyles.HeadingText3,
                            {marginHorizontal: 15},
                          ]}>
                          {I18n.t('Dtype')}
                        </Text>
                        <TouchableOpacity
                          style={[styles.pickerview]}
                          onPress={() => diploma_Type()}>
                          <Image
                            style={styles.downArrowimg}
                            source={Images.downArrow}
                          />
                          <Text
                            editable={false}
                            pointerEvents="none"
                            style={[
                              styles.errorText12,
                              {
                                marginTop: 15,
                                marginLeft: 20,
                                color: diplomatypename
                                  ? 'rgb(0,0,0)'
                                  : 'rgb(183,190,197)',
                              },
                            ]}>
                            {`${
                              diplomatypename
                                ? diplomatypename
                                : I18n.t('Choosediploma')
                            }`}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginTop: width * (8 / 375),
                            fontSize: fontsize.Small,
                            paddingLeft: width * (18 / 375),
                          }}>
                          {state.eWorkPositionError &&
                            I18n.t(state.eWorkPositionError)}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.inputTitle,
                          CommonStyles.HeadingText3,
                          {marginTop: 15, marginHorizontal: 15},
                        ]}>
                        {I18n.t('Dname')}
                      </Text>
                      <TextBox
                        viewStyle={{width: '100%'}}
                        textStyle={{color: 'rgb(0,0,0)'}}
                        text={false}
                        error={
                          state.eEnterpriseError &&
                          I18n.t(state.eEnterpriseError)
                        }
                        isPlaceHolder={true}
                        placeholder={I18n.t('Namediploma')}
                        onChangeText={prevState => {
                          setDiplomaname(prevState);
                        }}
                        onSubmitEditing={Keyboard.dismiss}
                        value={diplomaname}
                        maxLength={110}
                      />
                      <View
                        style={{
                          height: width * (100 / 375),
                        }}>
                        <Text
                          style={[
                            styles.inputTitle,
                            CommonStyles.HeadingText3,
                            {marginHorizontal: 15},
                          ]}>
                          {I18n.t('obtained')}
                        </Text>
                        <TouchableOpacity
                          style={[styles.pickerview]}
                          onPress={() => {
                            setDatemodal(true), setNew2(true);
                          }}>
                          <Image
                            style={styles.downArrowimg}
                            source={Images.downArrow}
                          />
                          <Text
                            editable={false}
                            pointerEvents="none"
                            style={[
                              styles.errorText12,
                              {
                                marginTop: 15,
                                marginLeft: 20,
                                color: choosedate
                                  ? 'rgb(0,0,0)'
                                  : 'rgb(183,190,197)',
                              },
                            ]}>
                            {`${
                              choosedate
                                ? moment(choosedate).format('MMMM DD, YYYY')
                                : I18n.t('Choosedate')
                            }`}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginTop: width * (8 / 375),
                            fontSize: fontsize.Small,
                            paddingLeft: width * (18 / 375),
                          }}>
                          {state.eWorkPositionError &&
                            I18n.t(state.eWorkPositionError)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          imageUpLoadNew();
                        }}
                        style={[
                          styles.imageUpLoadNew,
                          {
                            borderColor:
                              // uploaddocumentlist?.length == 0
                              //   ? colors.disablecolor
                              //   :
                                 colors.yellow,
                          },
                        ]}>
                        {loadingupload == true ? (
                          <ActivityIndicator
                            size="large"
                            animating={loadingupload}
                            color={colors.yellow}
                          />
                        ) : (
                          <View>
                            <Image
                              style={{alignSelf: 'center'}}
                              source={
                                // uploaddocumentlist?.length == 0
                                //   ? Images.uploadInactive
                                //   :
                                   Images.StatusUpload
                              }
                            />
                            <Text
                              style={{
                                textAlign: 'center',
                                color:
                                  // uploaddocumentlist?.length == 0
                                  //   ? colors.disablecolor
                                  //   : 
                                    colors.yellow,
                                fontSize: fontsize.Regular,
                                fontFamily: fonts.Regular,
                              }}>
                              {I18n.t('Uploaddocument')}
                            </Text>
                          </View>
                        )}
                        <ImagePickerModal
                          showModal={state.showImgOptionNew}
                          onPress={() => {
                            setLoadingupload(false);
                            state.showImgOptionNew = false;
                            setNew2(false);
                          }}
                          isPdf={true}
                          onPressPdf={() => {
                            state.showImgOptionNew = false;
                            setLoadingupload(false);
                            setNew2(false);
                            Platform.OS == 'android'
                              ? checkPermissionAndroid()
                              : checkPermissionIos();
                          }}
                          onPressCamera={() => {
                            state.showImgOptionNew = false;
                            setNew2(false);
                            setLoadingupload(false);
                            setTimeout(() => {
                              imgMedium1(0);
                            }, 1000);
                          }}
                          onPressGallery={() => {
                            setLoadingupload(false);
                            setTimeout(() => {
                              imgMedium1(1);
                            }, 1000);
                            state.showImgOptionNew = false;
                            setNew2(false);
                          }}
                        />
                      </TouchableOpacity>
                      {uploaddocumentlist?.length != 0 ? (
                        <PanGestureHandler enabled={true}>
                          <SwipeListView
                            style={{
                              height:
                                uploaddocumentlist?.length > 3 ? 200 : null,
                              marginTop: 10,
                            }}
                            scrollEnabled={true}
                            data={uploaddocumentlist}
                            renderItem={({item, index}) =>
                              _rendernotiListsdocument(item, index)
                            }
                            renderHiddenItem={
                              hiddenshow == true
                                ? null
                                : renderHiddenItemdocument
                            }
                            leftOpenValue={75}
                            rightOpenValue={-120}
                            previewRowKey={'0'}
                            disableRightSwipe={true}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
                          />
                        </PanGestureHandler>
                      ) : null}
                      <Text
                        style={[
                          styles.inputTitle,
                          CommonStyles.HeadingText3,
                          {marginTop: 40, marginHorizontal: 15},
                        ]}>
                        {I18n.t('Additionnal')}
                      </Text>
                      <TextBox
                        viewStyle={{width: '100%'}}
                        textStyle={{color: 'rgb(0,0,0)'}}
                        text={false}
                        isPlaceHolder={true}
                        placeholder={I18n.t('applicable')}
                        onChangeText={prevState => {
                          setAdditionnalnote(prevState);
                        }}
                        onSubmitEditing={Keyboard.dismiss}
                        value={
                          additionnalnote != 'null' &&
                          additionnalnote != 'undefined' &&
                          additionnalnote != undefined &&
                          additionnalnote != null &&
                          additionnalnote
                        }
                        maxLength={110}
                      />
                    </View>
                    <View style={styles.Confirmbuttonview}>
                      <Button
                        buttonStyle={[
                          styles.Confirmbutton,
                          {
                            backgroundColor: activebutton
                              ? colors.yellow
                              : colors.disblebutton,
                            borderWidth: activebutton ? 0 : 0.5,
                            borderColor: activebutton
                              ? colors.yellow
                              : colors.disablecolor,
                          },
                        ]}
                        label={I18n.t('Confirm')}
                        onPress={() => {
                          AddEducation();
                        }}
                        disabled={activebutton == false}
                        isLabel={true}
                        buttonTextStyle={[
                          styles.buttonTextStyle,
                          {
                            color: activebutton
                              ? colors.white
                              : colors.disablecolor,
                            fontFamily: fonts.Bold,
                            fontSize: fontsize.Large,
                          },
                        ]}
                      />
                    </View>
                  </ScrollView>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          transparent={true}
          visible={datemodal}
          onRequestClose={() => {
            setDatemodal(false), setNew2(false);
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255)',
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <DatePicker
                monthDisplayMode={'en-long'}
                type="MM-DD-YYYY"
                defaultDate={choosedate ? choosedate : CurrentDate}
                minDate={new Date('1950-01-01')}
                maxDate={new Date()}
                confirm={selectedDate => {
                  setDatemodal(false);
                  scrollRef.current.scrollToEnd({animated: true});
                  setNew2(false);
                  setChoosedate(selectedDate);
                }}
                cancel={() => {
                  setNew2(false);
                  setDatemodal(false);
                }}
                confirmText="Confirm"
                cancelText="Cancel"
                rowHeight={50}
                toolBarCancelStyle={{color: 'white'}}
                toolBarConfirmStyle={{color: 'white'}}
                selectedRowBackgroundColor={'#fef2de'}
                textMarginHorizontal={10}
                selectedTextStyle={{
                  marginHorizontal: 10,
                  fontFamily: fonts.Bold,
                }}
                selectedBorderLineColor="white"
                listItemStyle={{fontSize: 10}}
                selectedBorderLineMarginHorizontal={10}
                selectedTextFontSize={18}
                toolBarStyle={{backgroundColor: colors.yellow, color: 'fff'}}
                onValueChange={selectedDate => {}}
              />
            </View>
          </View>
        </Modal>
        {newView2 == true ? (
          <View
            style={CommonStyles.modalbackview}
            onPress={() => setNew2(false)}></View>
        ) : null}
      </Modal>

      {/* modal for Certification */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={CertificationModal}
        onRequestClose={() => [setCertificationModal(false), setNew(false)]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setEditcertificationitemid();
            setEditmodal(false);
            setCertificationtypename('');
            setCertificateissuername('');
            setCertificatedate('');
            setCertificateaddinotes('');
            setUploaddocumentlistnew([]);
            setUploaddocumentlist([]);
            setPdfname('');
            setPdfname2('');
            setUploaded(false);
            setDeleted(false);
            setactivebutton(false);
            setactivebutton2(false);
            setPdfsize('');
            setPdfsize2('');
            setCertificationModal(false), setNew(false);
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            style={{flex: 1}}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCertificationModal(true), setNew(true);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: 250,
                }}>
                <View
                  style={[
                    styles.style15,
                    {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                  ]}>
                  <TouchableOpacity
                    style={CommonStyles.backarrowview}
                    onPress={() => {
                      setEditcertificationitemid();
                      setactivebutton(false);
                      setDeleted(false);
                      setUploaded(false);
                      setactivebutton2(false);
                      setEditmodal(false);
                      setCertificationtypename('');
                      setCertificateissuername('');
                      setCertificatedate('');
                      setCertificateaddinotes('');
                      setUploaddocumentlistnew([]);
                      setUploaddocumentlist([]);
                      setPdfname('');
                      setPdfname2('');
                      setPdfsize('');
                      setPdfsize2('');
                      setCertificationModal(false), setNew(false);
                    }}>
                    <Image source={Images.backarrow}></Image>
                    <Text style={CommonStyles.Backtext}>{I18n.t('Back')}</Text>
                  </TouchableOpacity>
                  <Text
                    style={[CommonStyles.HeadingText12, styles.addheadingtext]}>
                    {I18n.t('Addcertification')}
                  </Text>
                  <ScrollView
                    ref={scrollRef2}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{paddingBottom: 50}}
                    showsVerticalScrollIndicator={false}>
                    <View>
                      <View
                        style={{
                          height: width * (100 / 375),
                        }}>
                        <Text
                          style={[
                            styles.inputTitle,
                            CommonStyles.HeadingText3,
                            {marginTop: 30, marginHorizontal: 15},
                          ]}>
                          {I18n.t('Ctype')}
                        </Text>
                        <TouchableOpacity
                          style={[styles.pickerview]}
                          onPress={() => certification_type()}>
                          <Image
                            style={styles.downArrowimg}
                            source={Images.downArrow}
                          />
                          <Text
                            editable={false}
                            pointerEvents="none"
                            style={[
                              styles.errorText12,
                              {
                                fontSize: fontsize.Regular,
                                fontFamily: fonts.Regular,
                                marginLeft: 20,
                                marginTop: 5,
                                color: certificationtypename
                                  ? 'rgb(0,0,0)'
                                  : 'rgb(183,190,197)',
                              },
                            ]}>
                            {`${
                              certificationtypename
                                ? certificationtypename
                                : I18n.t('Choosecertification')
                            }`}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={[
                          styles.inputTitle,
                          CommonStyles.HeadingText3,
                          {marginTop: 35, marginHorizontal: 15},
                        ]}>
                        {I18n.t('Certificateissuer')}
                      </Text>
                      <TextBox
                        viewStyle={{width: '100%'}}
                        textStyle={{color: 'rgb(0,0,0)'}}
                        text={false}
                        isPlaceHolder={true}
                        placeholder={I18n.t('Nameestablishment')}
                        onChangeText={prevState => {
                          setCertificateissuername(prevState);
                        }}
                        onSubmitEditing={Keyboard.dismiss}
                        value={certificateissuername}
                      />

                      <View
                        style={{
                          height: width * (100 / 375),
                        }}>
                        <Text
                          style={[
                            styles.inputTitle,
                            CommonStyles.HeadingText3,
                            {marginHorizontal: 15},
                          ]}>
                          {I18n.t('obtained')}
                        </Text>
                        <TouchableOpacity
                          style={[styles.datepick]}
                          onPress={() => {
                            setDatemodal2(true), setNew2(true);
                          }}>
                          <Image
                            style={styles.downArrowimg}
                            source={Images.downArrow}
                          />
                          <Text
                            editable={false}
                            pointerEvents="none"
                            style={[
                              styles.errorText12,
                              {
                                marginLeft: 20,
                                color: certificatedate
                                  ? 'rgb(0,0,0)'
                                  : 'rgb(183,190,197)',
                              },
                            ]}>
                            {`${
                              certificatedate
                                ? moment(certificatedate).format(
                                    'MMMM DD, YYYY',
                                  )
                                : I18n.t('Choosedate')
                            }`}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          imageUpLoadNew();
                        }}
                        style={[
                          styles.imageUpLoadNew,
                          {
                            borderColor:
                              // uploaddocumentlist?.length == 0
                              //   ? colors.disablecolor
                              //   : 
                                colors.yellow,
                          },
                        ]}>
                        {loadingupload == true ? (
                          <ActivityIndicator
                            size="large"
                            animating={loadingupload}
                            color={colors.yellow}
                          />
                        ) : (
                          <View>
                            <Image
                              style={{alignSelf: 'center'}}
                              source={
                                // uploaddocumentlist?.length == 0
                                //   ? Images.uploadInactive
                                //   :
                                   Images.StatusUpload
                              }
                            />
                            <Text
                              style={{
                                textAlign: 'center',
                                color:
                                  // uploaddocumentlist?.length == 0
                                  //   ? colors.disablecolor
                                  //   :
                                     colors.yellow,
                                fontSize: fontsize.Regular,
                                fontFamily: fonts.Regular,
                              }}>
                              {I18n.t('Uploaddocument')}
                            </Text>
                          </View>
                        )}
                        <ImagePickerModal
                          showModal={state.showImgOptionNew}
                          onPress={() => {
                            setLoadingupload(false);
                            state.showImgOptionNew = false;
                            setNew2(false);
                          }}
                          isPdf={true}
                          onPressPdf={() => {
                            setLoadingupload(false);
                            state.showImgOptionNew = false;
                            setNew2(false);
                            Platform.OS == 'android'
                              ? checkPermissionAndroid()
                              : checkPermissionIos();
                          }}
                          onPressCamera={() => {
                            setLoadingupload(false);
                            state.showImgOptionNew = false;
                            setNew2(false);
                            setTimeout(() => {
                              imgMedium1(0);
                            }, 1000);
                          }}
                          onPressGallery={() => {
                            setLoadingupload(false);
                            setTimeout(() => {
                              imgMedium1(1);
                            }, 1000);
                            state.showImgOptionNew = false;
                            setNew2(false);
                          }}
                        />
                      </TouchableOpacity>
                      {uploaddocumentlist?.length != 0 ? (
                        <PanGestureHandler enabled={true}>
                          <SwipeListView
                            style={{
                              height:
                                uploaddocumentlist?.length > 3 ? 200 : null,
                              marginTop: 10,
                            }}
                            scrollEnabled={true}
                            data={uploaddocumentlist}
                            renderItem={({item, index}) =>
                              _rendernotiListsdocument(item, index)
                            }
                            renderHiddenItem={
                              hiddenshow == true
                                ? null
                                : renderHiddenItemdocument
                            }
                            leftOpenValue={75}
                            rightOpenValue={-120}
                            previewRowKey={'0'}
                            disableRightSwipe={true}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
                          />
                        </PanGestureHandler>
                      ) : null}

                      <Text
                        style={[
                          styles.inputTitle,
                          CommonStyles.HeadingText3,
                          {marginTop: 40, marginHorizontal: 15},
                        ]}>
                        {I18n.t('Additionnal')}
                      </Text>
                      <TextBox
                        viewStyle={{width: '100%'}}
                        textStyle={{color: 'rgb(0,0,0)'}}
                        text={false}
                        isPlaceHolder={true}
                        placeholder={I18n.t('applicable')}
                        onChangeText={prevState => {
                          setCertificateaddinotes(prevState);
                        }}
                        onSubmitEditing={Keyboard.dismiss}
                        value={
                          certificateaddinotes != 'null' &&
                          certificateaddinotes != 'undefined' &&
                          certificateaddinotes != undefined &&
                          certificateaddinotes != null &&
                          certificateaddinotes
                        }
                        maxLength={110}
                      />
                    </View>
                    <View style={styles.Confirmbuttonview}>
                      <Button
                        buttonStyle={[
                          styles.Confirmbutton,
                          {
                            backgroundColor: activebutton2
                              ? colors.yellow
                              : colors.disblebutton,
                            borderWidth: activebutton2 ? 0 : 0.5,
                            borderColor: activebutton2
                              ? colors.yellow
                              : colors.disablecolor,
                          },
                        ]}
                        label={I18n.t('Confirm')}
                        onPress={() => {
                          AddCertification();
                        }}
                        disabled={activebutton2 == false}
                        isLabel={true}
                        buttonTextStyle={[
                          styles.buttonTextStyle,
                          {
                            color: activebutton2
                              ? colors.white
                              : colors.disablecolor,
                            fontFamily: fonts.Bold,
                            fontSize: fontsize.Large,
                          },
                        ]}
                      />
                    </View>
                  </ScrollView>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          transparent={true}
          visible={datemodal2}
          onRequestClose={() => {
            setDatemodal2(false), setNew2(false);
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255)',

                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <DatePicker
                monthDisplayMode={'en-long'}
                type="MM-DD-YYYY"
                defaultDate={certificatedate ? certificatedate : CurrentDate}
                minDate={new Date('1950-01-01')}
                maxDate={new Date()}
                confirm={selectedDate => {
                  setDatemodal2(false);
                  setNew2(false);
                  scrollRef2.current.scrollToEnd({animated: true});
                  setCertificatedate(selectedDate);
                }}
                cancel={() => {
                  setNew2(false);
                  setDatemodal2(false);
                }}
                confirmText="Confirm"
                cancelText="Cancel"
                rowHeight={50}
                toolBarCancelStyle={{color: 'white'}}
                toolBarConfirmStyle={{color: 'white'}}
                selectedRowBackgroundColor={'#fef2de'}
                textMarginHorizontal={10}
                selectedTextStyle={{
                  marginHorizontal: 10,
                  fontFamily: fonts.Bold,
                }}
                selectedBorderLineColor="white"
                listItemStyle={{fontSize: 10}}
                selectedBorderLineMarginHorizontal={10}
                selectedTextFontSize={18}
                toolBarStyle={{backgroundColor: colors.yellow, color: 'fff'}}
                onValueChange={selectedDate => {}}
              />
            </View>
          </View>
        </Modal>
        {newView2 == true ? (
          <View
            style={CommonStyles.modalbackview}
            onPress={() => setNew2(false)}></View>
        ) : null}
      </Modal>

      {newView == true ? (
        <View
          style={CommonStyles.modalbackview}
          onPress={() => setNew(false)}></View>
      ) : null}
    </View>
  );
};
export default EducationandCertification;
