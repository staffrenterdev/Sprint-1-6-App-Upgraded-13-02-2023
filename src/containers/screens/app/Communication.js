import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Modal,
  BackHandler,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {height, width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/Communicationstyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import TextBox from '../../components/TextBox';
import Picker from 'react-native-picker';
import {Container, Content} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {connect} from 'react-redux';

import defaultA from '../../../redux/actions/defaultA';

import {ShowStatusBarWhite} from '../../components/Statusbar';
import validate from '../../../assets/validation/validate_wrapper';
import fonts from '../../../constants/fonts';
import fontsize from '../../../constants/i18n/Fontsizes';
import ChangePasswordA from '../../../redux/actions/ChangePasswordA';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/loader';
import {showDangerToast, showToast} from '../../components/ToastMessage';
import {
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../../../redux/constants/reduxConstant';
import SignItOut from '../../components/SignItOut';

const Communication = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [showCarreful, setShowCarreful] = useState(false);
  const [showsorrymodal, setShowsorrymodal] = useState(false);
  const [newView, setNew] = useState(false);
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
    emailReq: '',
    passwordError: '',
    OldPasswordError: '',
    NewPasswordError: '',
    loading: false,
    data: '',
    otp: '',
    otpError: '',
    profileImage: '',
    fName: '',
    lName: '',
    sin: '',
    link: '',
    location: '',
    mobile: '',
    mobileError: '',
    phone: '',
    phoneError: '',
    dateFrom: '',
    dateShowFrom: '',
    minDate1: '',
    dateTo: '',
    dateFromError: '',
    SName: '',
    DType: '',
    Note: '',
    RNmae: '',
    RTitle: '',
    RPhone: '',
    REmail: '',
    RJob: '',
    currentDate1: moment(new Date()).format('YYYY-MM-DD'),
    isCurrentDateSet: '',
    currentDate12: moment(new Date()).format('YYYY-MM-DD'),
    isCurrentDateSet1: '',
    sTypeError: '',
    sNameError: '',
    DTypeError: '',
    DNameError: '',
    DateError: '',
    NoteError: '',
    esType: '',
    esName: '',
    edType: '',
    edName: '',
    eDate: '',
    eNote: '',
    cType: '',
    cDate: '',
    cListNote: '',
    cTypeError: '',
    cDateError: '',
    cNoteError: '',
    cNote: '',
    eEnterprise: '',
    eWorkPosition: '',
    eDuration: '',
    eStartDate: '',
    eEndDate: '',
    eEnterpriseError: '',
    eWorkPositionError: '',
    eStartDateError: '',
    eEndDateError: '',
    eListEnterprise: '',
    eListWorkPosition: '',
    eListDuration: '',
    rName: '',
    rTitle: '',
    rPhone: '',
    rEmail: '',
    rJobLinked: '',
    rNameError: '',
    rTitleError: '',
    rPhoneError: '',
    rEmailError: '',
    rJobLinkedError: '',
    rListName: '',
    rListTitle: '',
    rListPhone: '',
    rListEmail: '',
    rListJobLinked: '',
    experienceStartDate: '',
    experienceEndDate: '',
    experienceStartDate1: moment(new Date()).format('YYYY-MM-DD'),
    experienceEndDate1: moment(new Date()).format('YYYY-MM-DD'),
    item12: '',
    year1: '',
    month1: '',
    day1: '',
    dateSelect: false,
    education1: [],
    certificate1: [],
    experience1: [],
    reference1: [],
    educationId: 0,
    educationBubble: false,
    certificateBubble: false,
    isReferenceVisible: 0,
    collegeId: 0,
    diplomaId: 0,
    certificateId: 0,
    certificateId1: 0,
    EName: '',
    ExperienceId: 0,
    skillsId: 0,
    year12: 0,
    jobLinkedId: 0,
    editExperienceId: 0,
    rJobLinkedId: 0,
    IsEditReference: false,
    educationId1: 0,
    certificateId1: 0,
    experienceId1: 0,
    referenceId1: 0,
    referenceBubble: false,
    experienceBubble: false,
    addEducation: false,
    addCertificate: false,
    addExperience: false,
    addReference: false,
    mobilemax: 12,
    fileUrl: '',
    document1: '',
    fileUploadError: '',
    fileUrl1: '',
    fileUploadError1: '',
    document12: '',
    skillError: '',
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword: '',
  });
  const [activebutton, setActivebutton] = useState(false);
  const [messengerData31, setMessengerData31] = React.useState([
    'English',
    'French',
  ]);
  const [messenger31, setMessenger31] = React.useState();
  const [messenger, setMessenger] = React.useState('');
  const [messenger1, setMessenger1] = React.useState('');
  const [showyelloview, setShowyelloview] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  const _keyboardDidShow = e => {
    Picker.hide();
  };

  const _keyboardDidHide = () => {
    Picker.hide();
  };
  React.useEffect(() => {
    if (global.language == 'fr') {
      setMessenger31('French');
    } else {
      setMessenger31('English');
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        props.navigation.goBack(), Picker.hide();

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  useEffect(() => {
    const changePasswordRes = props.changePasswordRes.ChangePasswordR;

    if (changePasswordRes.status == LOADING) {
      setLoading(true);
    } else if (changePasswordRes.status == SUCCESS) {
      showToast(changePasswordRes?.value?.data?.message);
      state.OldPassword = '';
      state.NewPassword = '';
      setLoading(false);
      props.defaultRequest();
    } else if (changePasswordRes.status == ERROR) {
      showDangerToast(changePasswordRes?.error?.data?.message);
      setLoading(false);
      props.defaultRequest();
    }
  }, [props.changePasswordRes]);

  useEffect(() => {
    if (
      state.NewPassword != '' &&
      state.OldPassword != '' &&
      state.NewPassword?.length >= 6 &&
      state.OldPassword?.length >= 6
    ) {
      setActivebutton(true);
    } else {
      setActivebutton(false);
    }
  }, [state.NewPassword, state.OldPassword]);
  const PickerInputStyle = () => ({
    pickerConfirmBtnColor: [255, 255, 255, 1],
    pickerBg: [255, 255, 255, 1],
    pickerToolBarBg: [253, 191, 90, 1],
    pickerTitleColor: [255, 255, 255, 1],
    pickerCancelBtnColor: [255, 255, 255, 1],
  });
  const [lang, setLang] = useState('en');
  React.useEffect(() => {
    AsyncStorage.getItem('appLanguage').then(lang => {
      var val = JSON.parse(lang);
      if (val) {
        global.appLang = true;
        global.language = val;
      }

      if (val == 'en' || val == null) {
        setLang('en');
      } else {
        setLang('fr');
      }
    });
  }, [lang]);
  const english = async () => {
    setLang('en');

    await AsyncStorage.setItem('appLanguage', JSON.stringify('en'));
  };
  const french = async () => {
    setLang('fr');
    await AsyncStorage.setItem('appLanguage', JSON.stringify('fr'));
  };

  const handlePress31 = () => {
    setNew(true);
    setShowyelloview(true);
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: messengerData31,

      selectedValue: [`${messenger31 ? messenger31 : messengerData31[0]}`],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('Select_language'),
      onPickerConfirm: data => {
        setNew(false);
        if (data[0] == 'Select_language' || data[0] == 'French') {
          setLang('fr'), (I18n.locale = 'fr'), french();
        } else {
          setLang('en'), (I18n.locale = 'en'), english();
        }
        setMessenger31(data[0]);
      },
      onPickerCancel: data => {
        setNew(false);
      },
      onPickerSelect: data => {},
    });
    Picker.show();
  };
  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Communication')}
        lefttext={I18n.t('Back')}
        navigation={() => {
          props.navigation.goBack(), Picker.hide();
        }}></NavBar>
      <ShowStatusBarWhite />
      <Loader loading={loading} />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Content>
        <View style={styles.Changepasswordview}>
          <Text style={styles.Changepasswordtext}>
            {I18n.t('Changepassword')}
          </Text>
        </View>
        <TextBox
          isheighterror={true}
          error12={true}
          rightImage2={Images.eyehide}
          rightImage={Images.eyeshow}
          ishideimage={true}
          text={false}
          view1={{}}
          viewStyle={{marginHorizontal: width * (20 / 375)}}
          mainContainerStyle={{height: state.OldPasswordError ? null : 70}}
          error={state.OldPasswordError && I18n.t(state.OldPasswordError)}
          isPlaceHolder={true}
          placeholder={I18n.t('Currentpassword')}
          secureTextEntry={true}
          onChangeText={prevState => {
            setState({
              ...state,
              OldPassword: prevState == '' ? prevState : prevState,
              OldPasswordError: validate('password', prevState),
            });
          }}
          onSubmitEditing={Keyboard.dismiss}
          value={state.OldPassword}
        />
        <TextBox
          isheighterror={true}
          rightImage2={Images.eyehide}
          rightImage={Images.eyeshow}
          ishideimage={true}
          text={false}
          view1={{}}
          viewStyle={{marginHorizontal: width * (20 / 375)}}
          mainContainerStyle={{height: state.NewPasswordError ? null : 70}}
          error={state.NewPasswordError && I18n.t(state.NewPasswordError)}
          isPlaceHolder={true}
          placeholder={I18n.t('Newpassword')}
          secureTextEntry={true}
          onChangeText={prevState => {
            setState({
              ...state,
              NewPassword: prevState == '' ? prevState : prevState,
              NewPasswordError: validate('password', prevState),
            });
          }}
          onSubmitEditing={Keyboard.dismiss}
          value={state.NewPassword}
        />
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Button
            buttonStyle={[
              ,
              styles.updatebutton,
              {
                backgroundColor:
                  activebutton == true ? colors.yellow : colors.white,
                borderWidth: activebutton == true ? 0 : 1,
                borderColor: activebutton == true ? colors.white : '#CCCCCC',
              },
            ]}
            label={I18n.t('update')}
            onPress={() => {
              Picker.hide();
              let body = new FormData();

              body.append('current_password', state.OldPassword);
              body.append('new_password', state.NewPassword);

              props.changePasswordRequest(body);
            }}
            disabled={!activebutton}
            isLabel={true}
            buttonTextStyle={[
              CommonStyles.buttontext,
              {
                marginTop: 4,
                color: activebutton == true ? colors.white : '#CCCCCC',
              },
            ]}
          />
        </View>

        <View>
          <View style={styles.Systemview}>
            <Text style={styles.Systemtext}>{I18n.t('System')}</Text>
          </View>
          <View
            style={styles.pickerview}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => handlePress31()}>
              <Text
                editable={false}
                pointerEvents="none"
                style={[
                  styles.errorText12,
                  {
                    marginTop: 15,
                    marginLeft: width * (30 / 375),
                    color: messenger31 ? colors.black : '#CCCCCC',
                  },
                ]}>
                {`${messenger31 ? messenger31 : I18n.t('Select_language')}`}
              </Text>
              <Image style={styles.downArrowimg} source={Images.downArrow} />
            </TouchableOpacity>
            <Text style={[styles.view112, {marginTop: 25}]}></Text>
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: width * (10 / 375),
              marginHorizontal: width * (20 / 375),
            }}>
            <Text style={{marginHorizontal: 30}}>{I18n.t('Face')}</Text>
            <Switch
              style={{}}
              trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
              thumbColor={isEnabled ? '#f4f3f4' : 'white'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: width * (10 / 375),
              marginHorizontal: width * (20 / 375),
            }}>
            <View style={{marginRight: width * (10 / 375)}}>
              <Text style={{marginHorizontal: 30}}>
                {I18n.t('Synchronize')}
              </Text>
              <Text style={{marginHorizontal: 30, fontSize: 10}}>
                {I18n.t('importantevents')}
              </Text>
            </View>
            <Switch
              style={{}}
              trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
              thumbColor={isEnabled ? '#f4f3f4' : 'white'}
              // ios_backgroundColor="    #3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View> */}
        </View>

        {/* <TouchableOpacity style={{alignItems: 'center', marginVertical: 20}}>
          <Text
            style={{
              fontFamily: fonts.Bold,
              fontSize: fontsize.Large,
              color: colors.yellow,
            }}>
            {I18n.t('Closeaccount')}
          </Text>
        </TouchableOpacity> */}
      </Content>
      {newView == true ? (
        <View
          style={CommonStyles.modalbackview}
          onPress={() => setNew(false)}></View>
      ) : null}
      <Modal animationType="fade" transparent={true} visible={showCarreful}>
        <View
          style={CommonStyles.endmodalmainview}>
          <View
            style={CommonStyles.endmodalinnerview}>
            <TouchableOpacity
              style={CommonStyles.backarrowview}
              onPress={() => props.navigation.goBack()}>
              <Image source={Images.backarrow}></Image>
              <Text
                style={CommonStyles.Backtext}>
                {I18n.t('Back')}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                height: height / 2 + 50,
              }}>
              <Text
                style={styles.carrefultext}>
                {I18n.t('carreful')}
              </Text>
              <Image
                source={Images.Communicationred}
                style={{
                  alignSelf: 'center',
                  marginTop: width * (50 / 375),
                }}></Image>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: fonts.Bold, marginVertical: 5}}>
                  {I18n.t('goingcommitments')}
                </Text>
                <Text style={styles.commontext}>
                  {I18n.t('Closingyour')}
                </Text>
                <Text style={styles.commontext}>
                  {I18n.t('Allitems')}
                </Text>
                 <Text style={styles.commontext}>
                  {I18n.t('Youwill')}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Button
                buttonStyle={styles.Closeaccountbutton}
                label={I18n.t('Closeaccount')}
                onPress={() => {}}
                isLabel={true}
                buttonTextStyle={[CommonStyles.buttontext, {color: colors.red}]}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={showsorrymodal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: colors.modelBackground,
            marginBottom: 0,
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              borderTopLeftRadius: width * (20 / 375),
              borderTopRightRadius: width * (20 / 375),
              paddingHorizontal: width * (25 / 375),
              paddingTop: width * (25 / 375),
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
              onPress={() => props.navigation.goBack()}>
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

            <View
              style={{
                height: height / 2 + 50,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: fontsize.Large,
                  fontFamily: fonts.Bold,
                }}>
                {I18n.t('Ohno')}
              </Text>
              <Image
                source={Images.Communicationwhite}
                style={{
                  alignSelf: 'center',

                  marginTop: width * (50 / 375),
                }}></Image>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: fonts.Bold, marginVertical: 5}}>
                  {I18n.t('sorrysee')}
                </Text>
                <Text style={{textAlign: 'center', marginVertical: 5}}>
                  {I18n.t('Pleasebe')}
                </Text>
                <Text style={{textAlign: 'center', marginVertical: 5}}>
                  {I18n.t('Butwe')}
                </Text>
                <Text style={{textAlign: 'center', marginVertical: 5}}>
                  {I18n.t('Wewish')}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Button
                buttonStyle={{
                  backgroundColor: colors.yellow,

                  borderRadius: 30,
                  height: width * (40 / 375),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: width * (20 / 375),
                  marginBottom: '7%',
                  width: '80%',
                }}
                label={I18n.t('Closeaccount')}
                onPress={() => {}}
                isLabel={true}
                buttonTextStyle={[
                  CommonStyles.buttontext,
                  {color: colors.white},
                ]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    changePasswordRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePasswordRequest: body => {
      dispatch(ChangePasswordA(body));
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Communication);

// <View style={{marginTop: 10}}>
// <View
//   style={{
//     borderBottomWidth: 1,
//     borderBottomColor: '#ececec',
//     paddingBottom: 10,
//   }}>
//   <Text
//     style={{
//       fontSize: fontsize.Regular,

//       color: 'black',
//       fontFamily: fonts.Bold,
//       marginHorizontal: width * (20 / 375),
//     }}>
//     {I18n.t('Notisettings')}
//   </Text>
// </View>
// <View
//   style={{
//     alignSelf: 'center',
//     height: 50,
//     borderBottomColor: '#FDBF5A',
//     borderBottomWidth: 1,

//     width: '90%',
//   }}>
//   <TouchableOpacity
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     }}
//     onPress={() => setShowfirst(!showfirst)}>
//     <Text
//       editable={false}
//       pointerEvents="none"
//       style={[
//         styles.errorText12,
//         {
//           marginTop: 10,
//           marginLeft: width * (30 / 375),
//         },
//       ]}>
//       {I18n.t('General')}
//     </Text>
//     <Image
//       style={{
//         // alignSelf: 'center',
//         marginTop: 10,

//         width: 15,
//         height: 15,
//         marginRight: width * (15 / 375),
//         resizeMode: 'contain',
//       }}
//       source={Images.downArrow}
//     />
//   </TouchableOpacity>
//   <Text style={[styles.view112, {marginTop: 25}]}></Text>
// </View>
// {showfirst && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('Newscommunications')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showfirst && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('Serviceupdates')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// <View
//   style={{

//     alignSelf: 'center',
//     height: 50,
//     borderBottomColor: '#FDBF5A',
//     borderBottomWidth: 1,

//     width: '90%',
//   }}>
//   <TouchableOpacity
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     }}
//     onPress={() => setShowsecond(!showsecond)}
//     // onPress={() => handlePress4()}
//   >
//     <Text
//       editable={false}
//       pointerEvents="none"
//       style={[
//         styles.errorText12,
//         {
//           marginTop: 10,
//           marginLeft: width * (30 / 375),
//           // color: messenger3
//           //   ? 'rgb(0,0,0)'
//           //   : 'rgb(183,190,197)',
//         },
//       ]}>
//       {I18n.t('Ondemand')}
//     </Text>
//     <Image
//       style={{
//         // alignSelf: 'center',
//         marginTop: 10,

//         width: 15,
//         height: 15,
//         marginRight: width * (15 / 375),
//         resizeMode: 'contain',
//       }}
//       source={Images.downArrow}
//     />
//   </TouchableOpacity>
//   <Text style={[styles.view112, {marginTop: 25}]}>
//     {/* {state.langError && I18n.t(state.langError)} */}
//   </Text>
// </View>
// {showsecond && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('newcontracts')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showsecond && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>{I18n.t('lastminute')}</Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showsecond && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('confirmedcontract')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showsecond && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('contractcancelled')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showsecond && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('disputetimesheet')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showsecond && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>{I18n.t('punchout')}</Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showsecond && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('beforecontract')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// <View
//   style={{

//     alignSelf: 'center',
//     height: 50,
//     borderBottomColor: '#FDBF5A',
//     borderBottomWidth: 1,

//     width: '90%',
//   }}>
//   <TouchableOpacity
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     }}
//     onPress={() => setshowthird(!showthird)}
//     // onPress={() => handlePress4()}
//   >
//     <Text
//       editable={false}
//       pointerEvents="none"
//       style={[
//         styles.errorText12,
//         {
//           marginTop: 10,
//           marginLeft: width * (30 / 375),
//           // color: messenger3
//           //   ? 'rgb(0,0,0)'
//           //   : 'rgb(183,190,197)',
//         },
//       ]}>
//       {I18n.t('Permanentjob')}
//     </Text>
//     <Image
//       style={{
//         // alignSelf: 'center',
//         marginTop: 10,

//         width: 15,
//         height: 15,
//         marginRight: width * (15 / 375),
//         resizeMode: 'contain',
//       }}
//       source={Images.downArrow}
//     />
//   </TouchableOpacity>
//   <Text style={[styles.view112, {marginTop: 25}]}>
//     {/* {state.langError && I18n.t(state.langError)} */}
//   </Text>
// </View>
// {showthird && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('permanentjobs')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showthird && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>{I18n.t('FollowHelp')}</Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}

// <View
//   style={{

//     alignSelf: 'center',
//     height: 50,
//     borderBottomColor: '#FDBF5A',
//     borderBottomWidth: 1,

//     width: '90%',
//   }}>
//   <TouchableOpacity
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     }}
//     onPress={() => setshowfourth(!showfourth)}
//     // onPress={() => handlePress4()}
//   >
//     <Text
//       editable={false}
//       pointerEvents="none"
//       style={[
//         styles.errorText12,
//         {
//           marginTop: 10,
//           marginLeft: width * (30 / 375),
//           // color: messenger3
//           //   ? 'rgb(0,0,0)'
//           //   : 'rgb(183,190,197)',
//         },
//       ]}>
//       {I18n.t('Messenger')}
//     </Text>
//     <Image
//       style={{
//         // alignSelf: 'center',
//         marginTop: 10,

//         width: 15,
//         height: 15,
//         marginRight: width * (15 / 375),
//         resizeMode: 'contain',
//       }}
//       source={Images.downArrow}
//     />
//   </TouchableOpacity>
//   <Text style={[styles.view112, {marginTop: 25}]}>
//     {/* {state.langError && I18n.t(state.langError)} */}
//   </Text>
// </View>
// {showfourth && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('clientwrites')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showfourth && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('Supportwrites')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// <View
//   style={{

//     alignSelf: 'center',
//     height: 50,
//     borderBottomColor: '#FDBF5A',
//     borderBottomWidth: 1,

//     width: '90%',
//   }}>
//   <TouchableOpacity
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     }}
//     onPress={() => setShowfifth(!showfifth)}
//     // onPress={() => handlePress4()}
//   >
//     <Text
//       editable={false}
//       pointerEvents="none"
//       style={[
//         styles.errorText12,
//         {
//           marginTop: 10,
//           marginLeft: width * (30 / 375),
//           // color: messenger3
//           //   ? 'rgb(0,0,0)'
//           //   : 'rgb(183,190,197)',
//         },
//       ]}>
//       {I18n.t('Invoicingsystem')}
//     </Text>
//     <Image
//       style={{
//         // alignSelf: 'center',
//         marginTop: 10,

//         width: 15,
//         height: 15,
//         marginRight: width * (15 / 375),
//         resizeMode: 'contain',
//       }}
//       source={Images.downArrow}
//     />
//   </TouchableOpacity>
//   <Text style={[styles.view112, {marginTop: 25}]}>
//     {/* {state.langError && I18n.t(state.langError)} */}
//   </Text>
// </View>
// {showfifth && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>
//       {I18n.t('contractbecomes')}
//     </Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// {showfifth && (
//   <View
//     style={{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginVertical: width * (10 / 375),
//       marginHorizontal: width * (20 / 375),
//       borderBottomWidth: 0.5,
//       borderBottomColor: colors.gray,
//     }}>
//     <Text style={{marginHorizontal: 30}}>{I18n.t('invoicehas')}</Text>
//     <View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 10, color: colors.gray}}>
//           {I18n.t('Notifs')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 10,
//         }}>
//         <Text style={{marginRight: 15, color: colors.gray}}>
//           {I18n.t('Email')}
//         </Text>
//         <Switch
//           style={{marginRight: width * (20 / 375)}}
//           trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
//           thumbColor={isEnabled ? '#f4f3f4' : 'white'}
//           // ios_backgroundColor="    #3e3e3e"
//           onValueChange={toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     </View>
//   </View>
// )}
// </View>
