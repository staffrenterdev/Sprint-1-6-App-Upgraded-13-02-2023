import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/experience';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import TextBox from '../../components/TextBox';
import Picker from 'react-native-picker';
import moment from 'moment';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fonts from '../../../constants/fonts';
import fontsize from '../../../constants/i18n/Fontsizes';
import {DatePicker} from 'react-native-common-date-picker';
import apiName from '../../../constants/apiName';
import {postService} from '../../../services/postServices';
import {getService} from '../../../services/getServices';
import {SwipeListView} from 'react-native-swipe-list-view';
import Loader from '../../components/loader';
const experience = props => {
  const [newView, setNew] = useState(false);
  const [newView2, setNew2] = useState(false);
  const [Name, setName] = useState('');
  const [Name2, setName2] = useState('');
  const [position, setPosition] = useState('');
  const [position2, setPosition2] = useState('');
  const [position_id, setPosition_id] = useState();
  const [position_id2, setPosition_id2] = useState();
  const [startDate, setStartDate] = useState('');
  const [startDate2, setStartDate2] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endDate2, setEndDate2] = useState('');
  const [messenger31, setMessenger31] = useState();
  const [messengerData31, setMessengerData31] = useState([]);
  const [ExperienceModal, setExperienceModal] = useState(false);
  const [StartDateModal, setStartDateModal] = useState(false);
  const [EndDateModal, setEndDateModal] = useState(false);
  const [KeyboardVisible, setKeyboardVisible] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [listshow, setListshow] = useState(false);
  const [Year, setYears] = useState(0);
  const [Month, setMonths] = useState(0);
  const [expriencelist, setExpriencelist] = useState([]);
  const [CurrentDate, setCurrentDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear())),
  );
  const [exptime, setexptime] = useState('');
  const [editmode, setEditmode] = useState(false);
  const swipelistref = useRef();
  const [hiddenshow, setHiddenshow] = useState(false);
  const [positionlist, setPositionlist] = useState([]);
  const [editItemId, setEditItemId] = useState();
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [lastpage, setlastpage] = useState();
  const [currentpage, setCurrentpage] = useState();
  const [listloader, setListloader] = useState(false);
  const [tnc, setTnc] = useState(false);
  const [checkboxvalue, setCheckboxvalue] = useState();
  const [checkboxvalue2, setCheckboxvalue2] = useState();
  const [days, setDays] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      setLoading(true);
      getPositionlist();
      getExperiencelist(1);
    });
    return unsubscribeOnBlur;
  }, []);
  useEffect(() => {
    if (tnc == true) {
      setCheckboxvalue2(1);
    } else {
      setCheckboxvalue2(0);
    }
  }, [tnc]);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  const _keyboardDidShow = e => {
    setKeyboardVisible(true);
    Picker.hide();
  };

  const _keyboardDidHide = () => {
    setKeyboardVisible(false);
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
      pickerTitleText: I18n.t('position'),
      onPickerConfirm: data => {
        setMessenger31(data[0]);
        setNew2(false);
        setPosition(data[0]);

        let value = positionlist.filter(item => item.position == data[0]);
        setPosition_id(value[0].id);
      },
      onPickerCancel: data => {
        setNew2(false);
      },
      onPickerSelect: data => {},
    });
    Picker.show();
  };
  useEffect(() => {
    if (
      Name == '' ||
      position == '' ||
      position == undefined ||
      position == null ||
      startDate == '' ||
      (startDate != new Date().toISOString().split('T')[0] && endDate == '') ||
      (startDate == new Date().toISOString().split('T')[0] && tnc == false) ||
      (Name == Name2 &&
        position == position2 &&
        startDate == startDate2 &&
        endDate == endDate2 &&
        checkboxvalue == checkboxvalue2)
    ) {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  });

  useEffect(() => {
    if (startDate == new Date().toISOString().split('T')[0] && endDate == '')
      setTnc(true);
  }, [startDate]);
  const [listrefresh, setListrefresh] = useState(false);
  useEffect(() => {
    if (listrefresh == true) {
      const array = expriencelist;
      const key = 'id';

      const arrayUniqueByKey = [
        ...new Map(array.map(item => [item[key], item])).values(),
      ];

      setExpriencelist(arrayUniqueByKey);
    }
    return setListrefresh(false);
  }, [listrefresh]);
  const getExperiencelist = (pagenumber, x) => {
    let Body = new FormData();
    Body.append('model_name', '\\UserExperience');
    {
      pagenumber && Body.append('page', pagenumber);
    }
    postService(apiName.getuserrecord, Body)
      .then(async res => {
        if (res.status == 200) {
          setListloader(false);
          if (res.data.response.data.length != 0) {
            setlastpage(res.data.response.last_page);
            setCurrentpage(res.data.response.current_page);
            setHiddenshow(false);
            setExpriencelist(res.data.response.data);
            setListshow(true);

            if (x == true) {
              setListrefresh(true);
            } else {
              setListrefresh(false);
            }
          } else {
            setListshow(false);
            setLoadingFirst(false);
          }
        }
        setEditItemId();
        setPosition('');
        setName('');
        setStartDate('');
        setEndDate('');
        setexptime('');
        setYears(0);
        setMonths(0);
        setLoadingFirst(false);
        setExperienceModal(false);
        setEditmode(false);
        setLoading(false);
        setNew(false);
        setTnc(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getExperiencelist  api =====================>>',
          error,
        );
      });
  };

  const getPositionlist = () => {
    getService(apiName.getexperiencespositions)
      .then(async res => {
        if (res.status == 200) {
          let tempArr = res?.data?.response;
          setPositionlist(res?.data?.response);
          var newArray = [];
          tempArr.map(i => {
            newArray.push(i.position);
          });
        }
        setMessengerData31(newArray);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getPositionlist  api =====================>>',
          error,
        );
      });
  };

  const getyearsmonths = (fromdate, todate) => {
    let Body = new FormData();

    Body.append('from_date', fromdate);
    Body.append(
      'to_date',
      todate == 'null' || todate == null || todate == ''
        ? new Date().toISOString().split('T')[0]
        : todate,
    );
    postService(apiName.totalexperience, Body)
      .then(async res => {
        if (res.status == 200) {
          setexptime(res.data.response.experiences);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getyearsmonths  api =====================>>',
          error,
        );
      });
  };
  const EditExperience = id => {
    let Body = new FormData();

    Body.append('id', id);
    Body.append('model_name', '\\UserExperience');
    postService(apiName.getedituserrecord, Body)
      .then(async res => {
        if (res.status == 200) {
          setEditmode(true);
          setEditItemId(res.data.response.id);
          setHiddenshow(false);
          setExperienceModal(true);
          setNew(true);
          setName(res.data.response.name);
          setName2(res.data.response.name);
          setPosition(res.data.response?.experience_position?.position);
          setPosition2(res.data.response?.experience_position?.position);
          setPosition_id(res.data.response?.position_id);
          setPosition_id2(res.data.response?.position_id);
          setStartDate(res.data.response?.from_date);
          setStartDate2(res.data.response?.from_date);
          setEndDate(res.data.response?.to_date);
          setEndDate2(res.data.response?.to_date);
          setCheckboxvalue(res.data.response.is_currently_working);
          if (res.data.response.is_currently_working == 1) {
            setTnc(true);
          }
        }
        getyearsmonths(
          res.data.response?.from_date,
          res.data.response?.to_date,
        );
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
    if (
      (endDate != 'null' &&
        endDate &&
        endDate != new Date().toISOString().split('T')[0] &&
        tnc == true) ||
      (!endDate &&
        startDate != new Date().toISOString().split('T')[0] &&
        tnc == true)
    ) {
      setTnc(false);
    }
  }, [endDate, tnc, startDate]);

  const DeleteExperience = (id, index) => {
    setLoading(true);
    let Body = new FormData();

    Body.append('id', id);
    Body.append('model_name', '\\UserExperience');
    postService(apiName.userrecorddelete, Body)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          expriencelist.splice(index, 1);
          setExpriencelist([...expriencelist]);
          if (expriencelist.length == 0 && currentpage == 1) {
            setListshow(false);
          }
          setHiddenshow(false);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for DeleteExperience  api =====================>>',
          error,
        );
      });
  };

  const AddExperience = () => {
    let Body = new FormData();
    {
      editItemId && Body.append('id', editItemId);
    }
    Body.append('name', Name);
    Body.append('is_currently_working', tnc == true ? 1 : 0);
    Body.append('position_id', position_id);
    Body.append('from_date', startDate);
    Body.append('duration_years', Year);
    Body.append('duration_months', Month);
    Body.append('duration_days', days);
    Body.append(
      'to_date',
      endDate == 'null' || endDate == null || endDate == '' ? '' : endDate,
    );
    postService(apiName.userexperience, Body)
      .then(async res => {
        if (res.status == 200) {
          let x = true;
          getExperiencelist(1, x);
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

  const _rendernotiLists = (item, index) => {
    return (
      <View
        onPress={() => {}}
        style={{
          backgroundColor: '#fff',
          borderBottomColor: 'gray',
          borderBottomWidth: 0.3,
          borderTopColor: 'gray',
          borderTopWidth: index == 0 ? 0.3 : 0,
          justifyContent: 'center',
          height: 100,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{width: '17%', alignSelf: 'center', marginHorizontal: 20}}>
            <Image
              source={Images.ExperinceImage}
              style={{
                height: width * (60 / 375),
                width: width * (60 / 375),
              }}></Image>
          </View>
          <View style={{width: '66%'}}>
            <View>
              <Text style={{fontFamily: fonts.Bold}}>
                {I18n.t('Enterprise')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>{item.name}</Text>
              </Text>
              <Text
                style={{marginVertical: 5, fontFamily: fonts.Bold}}
                numberOfLines={1}>
                {I18n.t('workposition')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>
                  {item?.experience_position?.position}
                </Text>
              </Text>
              {item.is_currently_working == 1 ? (
                <Text style={{fontFamily: fonts.Bold}}>
                  {I18n.t('Duration')} :{' '}
                  <Text style={[CommonStyles.SubHeadingText13]}>
                    {moment(item.from_date).format('MMMM YYYY')}{' '}
                    {I18n.t('untilnow')}
                  </Text>
                </Text>
              ) : (
                <Text style={{fontFamily: fonts.Bold}}>
                  {I18n.t('Duration')} :{' '}
                  <Text style={[CommonStyles.SubHeadingText13]}>
                    {moment(item.from_date).format('MMMM YYYY')} {I18n.t('to')}{' '}
                    {moment(item.to_date).format('MMMM YYYY')}
                  </Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (rowData, rowMap) => {
    return (
      <View
        style={CommonStyles.renderHiddenItemview}>
        <TouchableOpacity
          onPress={() => {
            rowMap[rowData.item.key].closeRow();
            Picker.hide();
            setHiddenshow(true);
            EditExperience(rowData?.item?.id);
          }}
          style={CommonStyles.Editimage}>
          <Image source={Images.EditText} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Picker.hide();

            Alert.alert(
              I18n.t('deleteexperience'),
              I18n.t('suredeleteexperience'),
              [
                {
                  text: I18n.t(['cancel']),
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },

                {
                  text: I18n.t('OK'),
                  onPress: () => {
                    DeleteExperience(rowData?.item?.id, rowData?.index);
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
  return (
    <View style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        lefttext={I18n.t('Back')}
        navigation={() => {
          props.navigation.goBack();
        }}
        rightText={I18n.t('Experience')}></NavBar>
      <ShowStatusBarWhite />
      {loading == true ? <Loader loading={loading} /> : null}
      {loadingFirst == true ? (
        <Loader loading={loadingFirst} />
      ) : (
        <View style={{flex: 1}}>
          {listshow == true ? (
            <SwipeListView
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              contentContainerStyle={{paddingBottom: 120}}
              keyExtractor={item => {
                item.id;
              }}
              ref={swipelistref}
              data={expriencelist}
              renderItem={({item, index}) => _rendernotiLists(item, index)}
              renderHiddenItem={hiddenshow == true ? null : renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-150}
              directionalDistanceChangeThreshold={true}
              disableRightSwipe={true}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
          ) : (
            <View>
              <Image
                source={Images.Experienceintro}
                style={{
                  alignSelf: 'center',
                  marginTop: 50,
                }}></Image>
              <View style={{marginHorizontal: 10, marginTop: 10}}>
                <Text
                  style={styles.previousexperiences}>
                  {I18n.t('buildyour')}
                </Text>
                <Text
                  style={[styles.previousexperiences,{
                 
                    marginVertical: width * (20 / 375),
                  }]}>
                  {I18n.t('previousexperiences')}
                </Text>
                <Text
                  style={styles.previousexperiences}>
                  {I18n.t('duringinterview')}
                </Text>
                <Text
                  style={[styles.previousexperiences,{
                   
                    marginVertical: width * (20 / 375),
                  }]}>
                  {I18n.t('skillsafterward')}
                </Text>
              </View>
            </View>
          )}
          {listloader == true && (
            <ActivityIndicator
              style={{position: 'absolute', bottom: 100, alignSelf: 'center'}}
              size={'large'}
              color={colors.yellow}
            />
          )}
          <View
            style={[styles.Addexperiencebuttonview]}>
            <Button
              buttonStyle={styles.Addexperiencebutton}
              label={I18n.t('Addexperience')}
              onPress={() => {
                setExperienceModal(true);
                setNew(true);
                setPosition('');
                setName('');
                setStartDate('');
                setEndDate('');
                setYears(0);
                setMonths(0);
                setEditItemId();
              }}
              isLabel={true}
              buttonTextStyle={[CommonStyles.buttontext]}
            />
          </View>
        </View>
      )}

      {/* modal for experience */}
      <Modal
        animationType="Slide"
        transparent={true}
        visible={ExperienceModal}
        onRequestClose={() => {
          setExperienceModal(false), setNew(false);
          setEditmode(false);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setExperienceModal(false);
            setEditmode(false);
            setNew(false);
            setexptime('');
            setTnc(false);
            setEditItemId(), Picker.hide();
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginTop: 250,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setExperienceModal(true), Picker.hide();
                }}>
                <View
                  style={[
                    styles.style15,
                    {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                  ]}>
                  <TouchableOpacity
                    style={CommonStyles.backarrowview}
                    onPress={() => {
                      setTnc(false);
                      setExperienceModal(false), setEditmode(false);
                      setNew(false),
                        setName(''),
                        setPosition(''),
                        setexptime('');
                      setStartDate(''),
                        setEndDate(''),
                        Picker.hide(),
                        setEditItemId();
                    }}>
                    <Image source={Images.backarrow}></Image>
                    <Text
                      style={CommonStyles.Backtext}>
                      {I18n.t('Back')}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      CommonStyles.HeadingText12,
                     styles.addexpheading
                    ]}>
                    {I18n.t('Addexperience')}
                  </Text>
                  <View>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        paddingBottom: KeyboardVisible == true ? 100 : 0,
                      }}
                      nestedScrollEnabled={true}>
                      <Text
                        style={[
                          styles.inputTitle,
                          CommonStyles.HeadingText3,
                          {marginHorizontal: 15},
                        ]}>
                        {I18n.t('Enterprise')}
                      </Text>
                      <TextBox
                        onFocus={() => {
                          Picker.hide();
                        }}
                        viewStyle={{width: '100%'}}
                        textStyle={{
                          color: 'rgb(0,0,0)',
                          paddingTop: 10,
                          fontFamily: fonts.Regular,
                        }}
                        text={false}
                        isPlaceHolder={true}
                        placeholder={I18n.t('Nameenterprise')}
                        onChangeText={prevState => {
                          setName(prevState);
                        }}
                        onSubmitEditing={Keyboard.dismiss}
                        value={Name}
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
                          {I18n.t('Position')}
                        </Text>
                        <TouchableOpacity
                          style={[
                           styles.pickerview
                          ]}
                          onPress={() => handlePress31()}>
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
                                marginTop: 5,
                                marginLeft: 20,
                                color: position
                                  ? 'rgb(0,0,0)'
                                  : 'rgb(183,190,197)',
                                fontFamily: fonts.Regular,
                              },
                            ]}>
                            {`${position ? position : I18n.t('position')}`}
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
                      <View
                        style={styles.TPositionview}>
                        <Text
                          style={[
                            styles.inputTitle,
                            CommonStyles.HeadingText3,
                          ]}>
                          {I18n.t('TPosition')}
                        </Text>
                        {startDate == new Date().toISOString().split('T')[0] &&
                        (endDate == 'null' || !endDate || endDate == null) ? (
                          <Text
                            style={[
                              styles.inputTitle,
                              {
                                fontFamily: fonts.Regular,
                                color: colors.yellow,
                              },
                            ]}>
                            {'< 1 month'}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              styles.inputTitle,
                              {
                                fontFamily: fonts.Regular,
                                color: exptime
                                  ? colors.yellow
                                  : colors.disablecolor,
                              },
                            ]}>
                            {exptime ? exptime : '0 year 0 month'}
                          </Text>
                        )}
                      </View>

                      <View
                        style={{
                          marginBottom: width * (60 / 375),
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setStartDateModal(true);
                            setNew2(true);
                            Picker.hide();
                          }}
                          style={styles.Fromview}>
                          <View style={{paddingLeft: 10, paddingBottom: 15}}>
                            <Text>{I18n.t('From')}</Text>
                          </View>
                          <Text
                            style={{
                              fontFamily: fonts.Regular,
                              color:
                                startDate == ''
                                  ? 'rgb(183,190,197)'
                                  : colors.black,
                              marginRight: 15,
                            }}>
                            {startDate == ''
                              ? I18n.t('date_select')
                              : moment(startDate).format('MMMM DD, YYYY')}
                          </Text>
                          <TouchableOpacity
                            style={{
                              paddingRight: 20,
                              position: 'relative',
                              top: 8,
                            }}
                            onPress={() => {
                              setStartDateModal(true);
                              setNew2(true);
                              Picker.hide();
                            }}>
                            <Image source={Images.downArrow}></Image>
                          </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setEndDateModal(true);
                            setNew2(true);
                            Picker.hide();
                          }}
                          disabled={
                            startDate == '' ||
                            startDate == new Date().toISOString().split('T')[0]
                          }
                          style={styles.Fromview}>
                          <View
                            style={{
                              paddingLeft: 10,
                              paddingBottom: 15,
                              opacity:
                                startDate == '' ||
                                startDate ==
                                  new Date().toISOString().split('T')[0]
                                  ? 0.3
                                  : 1,
                            }}>
                            <Text>{I18n.t('To')}</Text>
                          </View>
                          <Text
                            style={{
                              justifyContent: 'flex-start',
                              fontFamily: fonts.Regular,
                              color:
                                endDate == ''
                                  ? 'rgb(183,190,197)'
                                  : colors.black,
                              marginLeft: 5,
                              opacity:
                                startDate == '' ||
                                startDate ==
                                  new Date().toISOString().split('T')[0]
                                  ? 0.3
                                  : 1,
                            }}>
                            {endDate == '' ||
                            endDate == 'null' ||
                            endDate == null
                              ? I18n.t('date_select')
                              : moment(endDate).format('MMMM DD, YYYY')}
                          </Text>
                          <TouchableOpacity
                            style={{
                              paddingRight: 20,
                              position: 'relative',
                              top: 8,
                            }}
                            onPress={() => {
                              setEndDateModal(true);
                            }}
                            disabled={endDate != '' ? false : true}>
                            <Image
                              style={{
                                opacity:
                                  startDate == '' ||
                                  startDate ==
                                    new Date().toISOString().split('T')[0]
                                    ? 0.3
                                    : 1,
                              }}
                              source={Images.downArrow}></Image>
                          </TouchableOpacity>
                        </TouchableOpacity>
                        {endDate == new Date().toISOString().split('T')[0] ||
                        startDate == new Date().toISOString().split('T')[0] ? (
                          <TouchableOpacity
                            disabled={
                              startDate ==
                              new Date().toISOString().split('T')[0]
                            }
                            onPress={() => {
                              setTnc(!tnc);
                            }}
                            style={styles.Rememberview}>
                            <View
                              style={[
                                tnc == true
                                  ? styles.remember1
                                  : styles.remember,
                                {
                                  borderWidth: tnc == true ? 0 : 2,
                                  borderRadius: 2,
                                  borderColor: colors.disablecolor,
                                  height: width * (18 / 375),
                                  width: width * (18 / 375),
                                  marginLeft: width * (10 / 375),
                                },
                              ]}>
                              {tnc == true && (
                                <Image
                                  source={Images.Remember}
                                  style={{height: '100%', width: '100%'}}
                                />
                              )}
                            </View>
                            <Text
                              style={{
                                marginLeft: width * (10 / 375),
                                fontFamily: fonts.Bold,
                                color: tnc == true ? colors.black : colors.gray,
                              }}>
                              {I18n.t('currentlyworking')}
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </ScrollView>
                    <View
                      style={{
                        alignItems: 'center',
                        height: 80,
                        backgroundColor: colors.white,
                        width: '100%',
                        position: KeyboardVisible ? 'absolute' : null,
                        bottom: KeyboardVisible ? 60 : null,
                      }}>
                      <Button
                        buttonStyle={[
                          styles.buttonStyle1,
                          {
                            position: 'absolute',
                            bottom: 10,
                            marginTop: width * (18 / 375),
                            width: '100%',
                            alignSelf: 'center',
                            marginBottom: 30,
                            backgroundColor: buttonActive
                              ? colors.yellow
                              : colors.disblebutton,
                            borderWidth: buttonActive ? 0 : 0.5,
                            borderColor: buttonActive
                              ? colors.yellow
                              : colors.disablecolor,
                          },
                        ]}
                        label={I18n.t('Confirm')}
                        disabled={!buttonActive}
                        onPress={() => {
                          AddExperience();
                        }}
                        isLabel={true}
                        buttonTextStyle={[
                          styles.buttonTextStyle,
                          {
                            color: buttonActive
                              ? colors.white
                              : colors.disablecolor,
                            fontFamily: fonts.Bold,
                            fontSize: fontsize.Large,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          transparent={true}
          visible={StartDateModal}
          onRequestClose={() => {
            setStartDateModal(false), setNew2(false);
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
                defaultDate={startDate ? startDate : CurrentDate}
                minDate={new Date('1950-01-01')}
                maxDate={new Date()}
                confirm={selectedDate => {
                  setStartDateModal(false);
                  setNew2(false);
                  setStartDate(selectedDate);
                  setYears(0);
                  setMonths(0);
                  setexptime('');
                  setEndDate('');
                }}
                cancel={() => {
                  setNew2(false);
                  setStartDateModal(false);
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
                onValueChange={selectedDate => {
                  setEndDate('');
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={EndDateModal}
          onRequestClose={() => {
            setEndDateModal(false), setNew2(false);
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
                defaultDate={
                  endDate
                    ? endDate
                    : moment(startDate).add(1, 'day').format('YYYY-MM-DD')
                }
                minDate={moment(startDate).add(1, 'day').format('YYYY-MM-DD')}
                maxDate={new Date()}
                confirm={selectedDate => {
                  setEndDate(selectedDate);
                  setEndDateModal(false);
                  setNew2(false);
                  getyearsmonths(startDate, selectedDate);
                }}
                cancel={() => {
                  setNew2(false);
                  setEndDateModal(false);
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
export default experience;
