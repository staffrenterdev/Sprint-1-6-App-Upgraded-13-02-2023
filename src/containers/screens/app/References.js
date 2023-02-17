import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/Referencesstyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import TextBox from '../../components/TextBox';
import SignItOut from '../../components/SignItOut';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import Loader from '../../components/loader';
import fonts from '../../../constants/fonts';
import fontsize from '../../../constants/i18n/Fontsizes';
import {SwipeListView} from 'react-native-swipe-list-view';
import Picker from 'react-native-picker';
import {getService} from '../../../services/getServices';
import apiName from '../../../constants/apiName';
import HTML from 'react-native-render-html';
import {postService} from '../../../services/postServices';
import validate from '../../../assets/validation/validate_wrapper';

const References = props => {
  const [loading, setLoading] = useState(false);
  const [agreeLogout, setAgreeLogout] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [active, setActive] = useState(false);
  const [ReferencesModal, setReferencesModal] = useState(false);
  const [showlist, setShowlist] = useState(false);
  const [newView, setNew] = useState(false);
  const [newView2, setNew2] = useState(false);
  const [checksign, setChecksign] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneerror, setPhoneerror] = useState();
  const [email, setEmail] = useState('');
  const [emailerror, setEmailerror] = useState();
  const [joblinked, setJoblinked] = useState('');
  const [messengerData31, setMessengerData31] = useState([]);
  const [messenger31, setMessenger31] = useState();
  const [joblinklist, setJoblinklist] = useState();
  const [hiddenshow, setHiddenshow] = useState(false);
  const [currentpage, setCurrentpage] = useState();
  const [lastpage, setlastpage] = useState();
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [Referencelist, setReferencelist] = useState([]);
  const [listrefresh, setListrefresh] = useState(false);
  const [listloader, setListloader] = useState(false);
  const [page, setPage] = useState(1);
  const [buttonActive, setButtonActive] = useState(false);
  const [mobilemax, setMobilemax] = useState(13);
  const [ReferencepolicyModal, setReferencepolicyModal] = useState(false);
  const [keyboardvalue, setkeyboardvalue] = useState(false);
  const [goodnewsModal, setGoodnewsModal] = useState(false);
  const [content, setContent] = useState();
  const getcmsData = () => {
    let Body = new FormData();
    Body.append('slug', 'references_explanations_policy');

    postService(apiName.getlegalcontent, Body)
      .then(async res => {
        if (res.status == 200) {
          setContent(res.data.response.description);
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

  useEffect(() => {
    if (props.route?.params?.firstmodal == true) {
      setGoodnewsModal(true);
      setNew(true);
    }
  }, [props.route.params]);
  useEffect(() => {
    if (
      props.route?.params?.modaltrue == true &&
      (props.route?.params?.firstmodal == false ||
        props.route?.params?.firstmodal == undefined)
    ) {
      setReferencesModal(true);
      setNew(true);
      setName(props.route?.params?.values?.name);
      setTitle(props.route?.params?.values?.title);
      setPhone(props.route?.params?.values?.phone);
      setEmail(props.route?.params?.values?.email);
      setJoblinked(props.route?.params?.values?.joblinked);
    }
  }, [props?.route?.params]);
  useEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Picker.hide();
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [ReferencepolicyModal]),
  );
  useEffect(
    () => {
      if (ReferencepolicyModal == false) {
        Picker.hide();
      }
    },
    {ReferencepolicyModal},
  );

  useEffect(() => {
    if (listrefresh == true) {
      const array = Referencelist;
      const key = 'id';

      const arrayUniqueByKey = [
        ...new Map(array.map(item => [item[key], item])).values(),
      ];

      setReferencelist(arrayUniqueByKey);
    }
    return setListrefresh(false);
  }, [listrefresh]);
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      getReferencelist(1);
      getUserDetail();
      getcmsData();
    });
    return unsubscribeOnBlur;
  }, []);
  useEffect(() => {
    if (name == '' || title == '' || phone == '' || email == '') {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  }, [name, title, phone, email, joblinked]);
  useEffect(() => {
    if (keyboardvalue == true && phone?.length == 10 && !phone?.includes('-')) {
      Keyboard.dismiss();
    } else {
      setkeyboardvalue(false);
    }
  }, [phone]);
  const checkValidation = () => {
    let emailReq = validate('email', email);

    if (emailReq) {
      setEmailerror(emailReq);
      return false;
    } else {
      setEmailerror('');
      return true;
    }
  };
  const checkValidation1 = () => {
    let mobile1Error = '';
    if (phone?.length == 0 || phone == null || phone == 'null') {
      return true;
    }
    if (phone?.includes('-')) {
      mobile1Error = validate('profile_Contact', phone);
    } else {
      mobile1Error = validate('mobile', phone);
    }
    if (mobile1Error) {
      setPhoneerror(mobile1Error);

      return false;
    } else {
      setPhoneerror('');
      return true;
    }
  };
  function formatPhoneNumber1(phoneNumberString) {
    var cleaned = ('' + phoneNumberString)?.replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ')' + ' ' + match[2] + '-' + match[3];
    }
    return null;
  }
  const numberInput = input => {
    setMobilemax(13);
    if (phone == '' && phone?.length == 0) {
      setPhoneerror('');
      return;
    } else if (!checkValidation1()) {
      return;
    } else {
      const num = formatPhoneNumber1(input);
      setPhone(num);
      setPhoneerror('');
    }
  };
  const getReferencelist = (pagenumber, x) => {
    let Body = new FormData();
    Body.append('model_name', '\\UserReference');
    Body.append('status', 0);
    {
      pagenumber && Body.append('page', pagenumber);
    }
    postService(apiName.getuserrecord, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          setLoadingFirst(false);
          setListloader(false);

          if (res.data.response.data.length != 0) {
            setlastpage(res.data.response.last_page);
            setCurrentpage(res.data.response.current_page);
            setShowlist(true);
            setName(''),
              setTitle(''),
              setPhone(''),
              setEmail(''),
              setJoblinked('');
            setReferencelist(res.data.response.data);
          }
          if (x == true) {
            setListrefresh(true);
          } else {
            setListrefresh(false);
          }
        } else {
          setLoadingFirst(false);
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

  const getUserDetail = () => {
    getService(apiName.getProfile)
      .then(async res => {
        // setLoading(true);
        if (res.status == 200) {
          if (
            res.data.response.user_reference_sign == null ||
            res.data.response.user_reference_sign == ''
          ) {
            setChecksign(false);
          } else {
            setChecksign(true);
          }
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };
  const AddReference = () => {
    if (!checkValidation()) {
      return;
    }
    if (!checkValidation1()) {
      return;
    }
    let Body = new FormData();
    if (checksign == true) {
      Body.append(
        'name',
        props.route?.params?.values?.name
          ? props.route.params?.values?.name
          : name,
      );
      Body.append(
        'title',
        props.route?.params?.values?.title
          ? props.route.params?.values?.title
          : title,
      );
      Body.append(
        'phone',
        props.route?.params?.values?.phone
          ? props.route.params?.values?.phone
          : phone,
      );
      Body.append(
        'email',
        props.route?.params?.values?.email
          ? props.route.params?.values?.email
          : email,
      );
      Body.append(
        'job_linked_id',
        props.route?.params?.values?.joblinked
          ? props.route.params?.values?.joblinked
          : joblinked,
      );
      postService(apiName.userreference, Body)
        .then(async res => {
          if (res.status == 200) {
            setReferencesModal(false);

            setNew(false);
            let x = true;
            getReferencelist(lastpage, x);
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(
            'error for AddReference  api =====================>>',
            error,
          );
        });
    } else {
      props.navigation.navigate('Consentreference', {
        name: name,
        title: title,
        phone: phone,
        email: email,
        joblinked: joblinked,
      });
      setReferencesModal(false);
      setNew(false);
    }
  };

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      getJobLinklist();
    });
    return unsubscribeOnBlur;
  }, []);
  const getJobLinklist = () => {
    getService(apiName.getjoblink)
      .then(async res => {
        if (res.status == 200) {
          let tempArr = res?.data?.response;
          setJoblinklist(res?.data?.response);
          var newArray = [];
          tempArr.map(i => {
            newArray.push(i);
          });
        }
        setMessengerData31(newArray);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };
  const DeleteReference = (id, index) => {
    let Body = new FormData();

    Body.append('id', id);
    Body.append('model_name', '\\UserReference');
    postService(apiName.userrecorddelete, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          Referencelist.splice(index, 1);
          setReferencelist([...Referencelist]);
          if (Referencelist.length == 0 && currentpage == 1) {
            setShowlist(false);
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
  const PickerInputStyle = () => ({
    pickerConfirmBtnColor: [255, 255, 255, 1],
    pickerBg: [255, 255, 255, 1],
    pickerToolBarBg: [253, 191, 90, 1],
    pickerTitleColor: [255, 255, 255, 1],
    pickerCancelBtnColor: [255, 255, 255, 1],
  });
  const handlePress31 = () => {
    setNew2(true);
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: messengerData31,
      selectedValue: [`${messenger31 ? messenger31 : messengerData31[0]}`],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: '',
      onPickerConfirm: data => {
        setMessenger31(data[0]);
        setJoblinked(data[0]);
        setNew2(false);
      },
      onPickerCancel: data => {
        setNew2(false);
      },
      onPickerSelect: data => {},
    });
    Picker.show();
  };

  const _rendernotiLists = (item, index) => {
    return (
      <View
       
        style={styles._rendernotiListsview}>
        {active == false ? (
          <View style={{width: '25%', marginLeft: 40}}>
            <Image style={{}} source={Images.ReferenceItem} />
          </View>
        ) : (
          <View style={{width: '25%', marginLeft: 40}}>
            <Image style={{}} source={Images.ReferenceItem2} />
          </View>
        )}
        <View
          style={[
            styles.renderitem1,
            {
              width: '60%',
              marginTop: width * (0 / 375),
              marginHorizontal: width * (7 / 375),
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={{flexDirection: 'row', width: '70%'}}>
                <Text style={CommonStyles.SubHeadingText12}>
                  {I18n.t('Name')}:{' '}
                </Text>
                <Text style={CommonStyles.SubHeadingText13}>{item?.name}</Text>
              </View>
              <View style={{flexDirection: 'row', width: '70%'}}>
                <Text style={CommonStyles.SubHeadingText12}>
                  {I18n.t('Title')}:{' '}
                </Text>
                <Text style={CommonStyles.SubHeadingText13}>{item?.title}</Text>
              </View>
              <Text style={CommonStyles.SubHeadingText12}>
                {I18n.t('phone')}:
                <Text style={CommonStyles.SubHeadingText13}>
                  {' '}
                  {item?.phone}
                </Text>
              </Text>
              <View style={{flexDirection: 'row', width: '90%'}}>
                <Text style={CommonStyles.SubHeadingText12}>
                  {I18n.t('Email')}:{' '}
                </Text>
                <Text style={CommonStyles.SubHeadingText13}>{item?.email}</Text>
              </View>

              <View style={{flexDirection: 'row', width: '90%'}}>
                <Text style={CommonStyles.SubHeadingText12}>
                  {I18n.t('linked')}:{' '}
                </Text>
                <Text style={CommonStyles.SubHeadingText13}>
                  {item?.job_linked_id}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {active == false ? (
          <View style={{width: '20%', marginRight: 40, marginBottom: 60}}>
            <View
              style={[styles.commonstatus,{
                borderColor: colors.disablecolor,
                
              }]}>
              <Text
                style={{color: colors.disablecolor, fontFamily: fonts.Bold}}>
                {I18n.t('Pending')}
              </Text>
            </View>
          </View>
        ) : (
          <View style={{width: '22%', marginRight: 40, marginBottom: 60}}>
            <View
             style={[styles.commonstatus,{
                borderColor: colors.green,
              }]}>
              <Text style={{color: colors.green, fontFamily: fonts.Bold}}>
                {I18n.t('Validated')}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF7EB',
        flex: 1,

        paddingLeft: 15,
      }}>
      <TouchableOpacity
        onPress={() => {
          Picker.hide();

          Alert.alert(
            I18n.t('deletereference'),
            I18n.t('suredeletereference'),
            [
              {
                text: I18n.t(['cancel']),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },

              {
                text: I18n.t('OK'),
                onPress: () => {
                  setLoading(true);
                  DeleteReference(data?.item?.id, data?.index);
                  setHiddenshow(true);
                },
              },
            ],
            {cancelable: false},
          );
        }}
        style={styles.deleteimg}>
        <Image source={Images.Delete} />
      </TouchableOpacity>
    </View>
  );
  const PaginationData = () => {
    let pagenumber = page + 1;
    setPage(pagenumber);
    if (pagenumber <= lastpage) {
      setListloader(true);

      getReferencelist(pagenumber);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <Loader loading={loading} />
      <NavBar
        source={Images.backarrow}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}
        rightText={I18n.t('References')}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      {loadingFirst == true ? (
        <Loader loading={loadingFirst} />
      ) : (
        <View style={{flex: 1}}>
          {showlist == false ? (
            <View style={{marginHorizontal: 10, flex: 1}}>
              <Image
                source={Images.ReferenceLogo}
                style={{
                  alignSelf: 'center',
                }}></Image>
              <View>
                <Text style={styles.betterprofiletext}>
                  {I18n.t('betterprofile')}
                </Text>
                <Text style={styles.Referencesaretext}>
                  {I18n.t('Referencesare')}
                </Text>
                <Text style={styles.usingpeopletext}>
                  {I18n.t('usingpeople')}
                </Text>
                <Text style={styles.morereferencestext}>
                  {I18n.t('morereferences')}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <View style={styles.Addexperiencebuttonview}>
                <TouchableOpacity
                  style={[
                    styles.Addexperiencebutton,
                    {
                      borderColor:
                        active == true ? colors.yellow : colors.white,
                      borderWidth:
                        active == false ? width * (0 / 375) : width * (1 / 375),
                      backgroundColor:
                        active == false ? colors.yellow : colors.white,
                    },
                  ]}
                  onPress={() => {
                    setActive(false);
                  }}>
                  <Text
                    style={{
                      color: active == true ? colors.yellow : colors.white,
                      fontSize: fontsize.Regular,
                      fontFamily: fonts.Bold,
                    }}>
                    {I18n.t('Pending')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.Addexperiencebutton,
                    {
                      borderColor:colors.yellow,
                      borderWidth:
                        active == false ? width * (1 / 375) : width * (0 / 375),
                      marginLeft: width * (10 / 375),
                      backgroundColor:
                        active == true ? colors.yellow : colors.white,
                    },
                  ]}
                  onPress={() => {
                    setActive(true);
                  }}>
                  <Text
                    style={{
                      color: active == true ? colors.white : colors.yellow,
                      fontFamily: fonts.Bold,
                      fontSize: fontsize.Regular,
                    }}>
                    {I18n.t('Validated')}
                  </Text>
                </TouchableOpacity>
              </View>
              {active == false ? (
                <SwipeListView
                  contentContainerStyle={{paddingBottom: 100}}
                  data={Referencelist}
                  onEndReached={PaginationData}
                  renderItem={({item, index}) => _rendernotiLists(item, index)}
                  renderHiddenItem={
                    hiddenshow == true ? null : renderHiddenItem
                  }
                  leftOpenValue={75}
                  rightOpenValue={-150}
                  previewRowKey={'0'}
                  disableRightSwipe={true}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                />
              ) : null}
            </View>
          )}
          <View style={styles.Buttonview}>
            <Button
              buttonStyle={styles.Addreference}
              label={I18n.t('Addreference')}
              onPress={() => {
                setReferencepolicyModal(true);
                setNew(true);
                setName('');
                setTitle('');
                setPhone('');
                setEmail('');
                setJoblinked('');
              }}
              isLabel={true}
              buttonTextStyle={[CommonStyles.buttontext]}
            />
            {listloader == true && (
              <ActivityIndicator
                style={{position: 'absolute', bottom: 100, alignSelf: 'center'}}
                size={'large'}
                color={colors.yellow}
              />
            )}
          </View>
        </View>
      )}
      {/* modal for References */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ReferencesModal}
        onRequestClose={() => [setReferencesModal(false), setNew(false)]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setReferencesModal(false), setNew(false);
            setName(''),
              setTitle(''),
              setPhone(''),
              setEmail(''),
              setJoblinked('');
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            style={{flex: 1}}>
            <TouchableWithoutFeedback
              onPress={() => {
                setReferencesModal(true), setNew(true);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: 150,
                }}>
                <View
                  style={[
                    styles.style15,
                    {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                  ]}>
                  <TouchableOpacity
                    style={CommonStyles.backarrowview}
                    onPress={() => {
                      setName(''),
                        setTitle(''),
                        setPhone(''),
                        setEmail(''),
                        setJoblinked('');
                      setReferencesModal(false), setNew(false);
                      setEmailerror('');
                      setPhoneerror('');
                    }}>
                    <Image source={Images.backarrow}></Image>
                    <Text style={CommonStyles.Backtext}>{I18n.t('Back')}</Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      CommonStyles.HeadingText12,
                      {
                        fontSize: fontsize.Large,
                        fontFamily: fonts.Bold,
                        alignSelf: 'center',
                        marginBottom: 15,
                      },
                    ]}>
                    {I18n.t('Addreference')}
                  </Text>
                  <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingBottom: isKeyboardVisible == true ? 400 : 60,
                    }}>
                    <View
                      style={{
                        marginBottom: 25,
                      }}>
                      <Text
                        style={[
                          styles.inputTitle,
                          CommonStyles.HeadingText3,
                          {marginHorizontal: 15, marginBottom: 10},
                        ]}>
                        {I18n.t('linked')}
                      </Text>
                      <TouchableOpacity
                        style={[styles.pickerview]}
                        disabled={messengerData31.length == 0}
                        onPress={() => handlePress31()}>
                        <Image
                          style={[
                            styles.downArrowimg,
                            {
                              opacity: messengerData31.length == 0 ? 0.3 : 1,
                            },
                          ]}
                          source={Images.downArrow}
                        />
                        <Text
                          editable={false}
                          pointerEvents="none"
                          style={[
                            styles.errorText12,
                            styles.Selectpasttext,
                            {
                            
                              opacity: messengerData31.length == 0 ? 0.3 : 1,
                              color: joblinked
                                ? 'rgb(0,0,0)'
                                : 'rgb(183,190,197)',
                            },
                          ]}>
                          {`${joblinked ? joblinked : I18n.t('Selectpast')}`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={[
                        styles.inputTitle,
                        CommonStyles.HeadingText3,
                        {marginHorizontal: width * (15 / 375)},
                      ]}>
                      {I18n.t('Name')}
                    </Text>
                    <TextBox
                      viewStyle={{width: '100%'}}
                      textStyle={{
                        color: 'rgb(0,0,0)',
                        opacity: joblinked ? 1 : 0.3,
                      }}
                      text={false}
                      editable={joblinked ? true : false}
                      isPlaceHolder={true}
                      placeholder={I18n.t('Namereference')}
                      onChangeText={prevState => {
                        setName(prevState);
                      }}
                      onSubmitEditing={Keyboard.dismiss}
                      value={name}
                    />
                    <Text
                      style={[
                        styles.inputTitle,
                        CommonStyles.HeadingText3,
                        {marginHorizontal: width * (15 / 375)},
                      ]}>
                      {I18n.t('Title')}
                    </Text>
                    <TextBox
                      viewStyle={{width: '100%'}}
                      textStyle={{
                        color: 'rgb(0,0,0)',
                        opacity: joblinked ? 1 : 0.3,
                      }}
                      text={false}
                      editable={joblinked ? true : false}
                      isPlaceHolder={true}
                      placeholder={I18n.t('positiontitle')}
                      onChangeText={prevState => {
                        setTitle(prevState);
                      }}
                      onSubmitEditing={Keyboard.dismiss}
                      maxLength={110}
                      value={title}
                    />

                    <Text
                      style={[
                        styles.inputTitle,
                        CommonStyles.HeadingText3,
                        {marginHorizontal: width * (15 / 375)},
                      ]}>
                      {I18n.t('phone')}
                    </Text>
                    <TextBox
                      viewStyle={{width: '100%'}}
                      textStyle={{
                        color: 'rgb(0,0,0)',
                        opacity: joblinked ? 1 : 0.3,
                      }}
                      text={false}
                      editable={joblinked ? true : false}
                      errorStyle={{marginHorizontal: width * (0 / 375)}}
                      error={phoneerror && I18n.t(phoneerror)}
                      keyboardType={'numeric'}
                      isPlaceHolder={true}
                      placeholder={I18n.t('hisherphone')}
                      onChangeText={prevState => {
                        setkeyboardvalue(true);
                        setPhone(prevState);
                      }}
                      onBlur={() => (phone ? numberInput(phone) : '')}
                      onFocus={() => {
                        phone
                          ? (setPhone(
                              phone
                                ?.replace(/-/g, '')
                                ?.replace(' ', '')
                                ?.replace('(', '')
                                ?.replace(')', ''),
                            ),
                            setMobilemax(10))
                          : setMobilemax(10);
                      }}
                      onSubmitEditing={Keyboard.dismiss}
                      value={phone}
                      maxLength={mobilemax}
                    />
                    <Text
                      style={[
                        styles.inputTitle,
                        CommonStyles.HeadingText3,
                        {marginHorizontal: width * (15 / 375)},
                      ]}>
                      {I18n.t('Email')}
                    </Text>
                    <TextBox
                      viewStyle={{width: '100%'}}
                      textStyle={{
                        color: 'rgb(0,0,0)',
                        opacity: joblinked ? 1 : 0.3,
                      }}
                      text={false}
                      editable={joblinked ? true : false}
                      error={emailerror && I18n.t(emailerror)}
                      errorStyle={{marginHorizontal: width * (0 / 375)}}
                      isPlaceHolder={true}
                      placeholder={I18n.t('hisheremail')}
                      onChangeText={prevState => {
                        setEmail(prevState);
                      }}
                      onSubmitEditing={Keyboard.dismiss}
                      value={email}
                      maxLength={110}
                    />

                    <View style={{alignItems: 'center', marginTop: 50}}>
                      <Button
                        buttonStyle={[styles.Confirmbutton,{
                         
                          backgroundColor:
                            buttonActive == true
                              ? colors.yellow
                              : colors.disblebutton,
                          borderWidth: buttonActive ? 0 : 0.5,
                          borderColor: buttonActive
                            ? colors.yellow
                            : colors.disablecolor,
                        
                        }]}
                        disabled={!buttonActive}
                        label={I18n.t('Confirm')}
                        onPress={() => {
                          AddReference();
                        }}
                        isLabel={true}
                        buttonTextStyle={[
                          CommonStyles.buttontext,
                          {
                            color:
                              buttonActive == true
                                ? colors.white
                                : colors.disablecolor,
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
        {newView2 == true ? (
          <View
            style={CommonStyles.modalbackview}
            onPress={() => setNew2(false)}></View>
        ) : null}
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ReferencepolicyModal}
        onRequestClose={() => setReferencepolicyModal(false)}>
        <View
          style={CommonStyles.endmodalmainview}>
          <View
            style={CommonStyles.endmodalinnerview}>
            <TouchableOpacity
              style={CommonStyles.backarrowview}
              onPress={() => {
                setNew(false), setReferencepolicyModal(false);
              }}>
              <Image source={Images.backarrow}></Image>
              <Text
                style={CommonStyles.Backtext}>
                {I18n.t('Back')}
              </Text>
            </TouchableOpacity>
            <View style={{}}>
              <Text
                style={styles.headingText}>
                {I18n.t('Rpolicy')}
              </Text>
              <Text style={{textAlign: 'center', fontFamily: fonts.Regular}}>
                {I18n.t('referenceprocess')}
              </Text>
              <Text
                style={styles.Detailstext}>
                {I18n.t('Details')}
              </Text>
              <View
                style={[
               styles.htmlmain
                ]}>
                <ScrollView
                  nestedScrollEnabled={true}
                  onScroll={({nativeEvent}) => {}}
                  style={{flex: 1}}>
                  <View style={{width: '95%'}}>
                    <HTML source={{html: content}} />
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Button
                buttonStyle={styles.Got_it5}
                label={I18n.t('Got_it5')}
                onPress={() => {
                  setReferencepolicyModal(false);
                  setReferencesModal(true);
                }}
                isLabel={true}
                buttonTextStyle={[CommonStyles.buttontext]}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={goodnewsModal}
        onRequestClose={() => {
          setGoodnewsModal(false), setNew(false);
        }}>
        <TouchableWithoutFeedback
          onPressOut={() => {
            setGoodnewsModal(false), setNew(false);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: colors.modelBackground,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setGoodnewsModal(true), setNew(true);
              }}>
              <View
                style={styles.goodnewsModalview}>
                <TouchableOpacity
                  style={styles.closeimg}
                  onPress={() => {
                    setGoodnewsModal(false), setNew(false), AddReference();
                  }}>
                  <Image source={Images.close}></Image>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text
                    style={styles.Goodnewstext}>
                    {I18n.t('Goodnews')}
                  </Text>
                  <Image
                    source={Images.GoodNews}
                    style={{
                      alignSelf: 'center',
                    }}></Image>

                  <Text
                    style={[
                    styles.willreferencestext
                    ]}>
                    {I18n.t('willreferences')}
                  </Text>
                  <Text style={[{alignSelf: 'center', color: 'black'}]}>
                    {I18n.t('willreached')}
                  </Text>
                  <View style={{alignItems: 'center', marginTop: 30}}>
                    <Button
                      buttonStyle={styles.got_it2}
                      label={I18n.t('got_it2')}
                      onPress={() => {
                        setGoodnewsModal(false), setNew(false);
                        AddReference();
                        // getReferencelist(1)
                      }}
                      isLabel={true}
                      buttonTextStyle={[
                        CommonStyles.buttontext,
                        {
                          fontsize: fontsize.Regular,
                          paddingTop: 5,
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
      {newView == true ? (
        <View
          style={CommonStyles.modalbackview}
          onPress={() => setNew(false)}></View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default References;
