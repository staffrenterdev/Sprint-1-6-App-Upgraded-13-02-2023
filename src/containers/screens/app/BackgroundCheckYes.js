import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Keyboard,
  Modal,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/BackgroundCheckYesstyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import Picker from 'react-native-picker';
import moment from 'moment';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import Loader from '../../components/loader';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
import {DatePicker} from 'react-native-common-date-picker';
import apiName from '../../../constants/apiName';
import {getService} from '../../../services/getServices';
import {ScrollView} from 'react-native-gesture-handler';
import {postService} from '../../../services/postServices';
import {SwipeListView} from 'react-native-swipe-list-view';
import {showDangerToast} from '../../components/ToastMessage';

const BackgroundCheckYes = props => {
  const scrollRef = useRef();

  const [state, setState] = useState({
    calenderDate: new Date(),

    email: '',
    experienceStartDate1: moment(new Date()).format('YYYY-MM-DD'),
    experienceEndDate1: moment(new Date()).format('YYYY-MM-DD'),
    onFocus: false,
    AutocompleteId: 0,
    AutocompleteTitle: '',
    component: '',
    experienceEndDate: '',
    offenceDateError: '',
    offenceTypeError: '',
    currentDate1: moment(new Date()).format('YYYY-MM-DD'),
  });
  const [Dob, setDob] = useState();
  const [showfull, setShowfull] = useState(false);
  const [offensetype, setOffensetype] = useState([]);
  const [offensevalue, setOffensevalue] = useState('');
  const [convictiontype, setConvictiontype] = React.useState([]);
  const [convictionvalue, setConvictionvalue] = useState();
  const [CalenderModal, setCalenderModal] = useState(false);
  const [newView, setNew] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [convict, setConvict] = useState(false);
  const [convict1, setConvict1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [allSelection, setAllSelection] = useState([]);
  const [editItemId, setEditItemId] = useState();
  const swipelistref = useRef();
  const autocompleteRef = useRef();
  const [alllist, setAlllist] = useState();
  const dropdownController = useRef(null);
  const [cursor, setCursor] = useState(true);
  const [scrollviewHeight, setScrollviewHeight] = useState();
  const [showline, setShowline] = useState(false);
  const [hiddenshow, setHiddenshow] = useState(false);
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      getConviction();
      getUserConviction();
    });
    return unsubscribeOnBlur;
  }, []);
  const getConviction = () => {
    setLoading(true);
    getService(apiName.getconviction)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          let tempArr = res?.data?.response?.convictions;
          var newArray = [];
          tempArr.map(i => {
            newArray.push(i.title);
          });
          setConvictiontype(newArray);
          setOffensetype(res.data.response.offences);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getConviction  api =====================>>',
          error,
        );
      });
  };
  const getUserConviction = () => {
    setLoading(true);
    getService(apiName.getuserconviction)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          setShowfull(false);
          setAllSelection(res.data.response);
          setAlllist(res.data.response);
        }
      })
      .catch(error => {
        setShowfull(false);
        setLoading(false);
        console.log(
          'error for getUserConviction  api =====================>>',
          error,
        );
      });
  };

  const userConviction = () => {
    Picker.hide();
    setLoading(true);
    let Body = new FormData();
    {
      editItemId && Body.append('id', editItemId);
    }
    Body.append('conviction', convictionvalue);
    Body.append('offense_type', offensevalue);
    Body.append('date', Dob);
    postService(apiName.userconviction, Body)
      .then(async res => {
        if (res.status == 200) {
          setShowfull(true);

          setConvictionvalue('');
          setOffensevalue('');
          setHiddenshow(false);
          setDob('');
          setEditItemId();
          dropdownController.current.setInputText('');
          setLoading(false);
          getUserConviction();
        }
      })
      .catch(error => {
        setLoading(false);
        showDangerToast(error.response.data.message);
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };
  const edituserconviction = id => {
    setLoading(true);
    let Body = new FormData();
    Body.append('id', id);

    postService(apiName.getedituserconviction, Body)
      .then(async res => {
        if (res.status == 200) {
          setHiddenshow(false);
          dropdownController.current.setInputText(
            res.data.response.offense_type,
          );
          setConvictionvalue(res.data.response.conviction);

          setOffensevalue(res.data.response.offense_type);
          setDob(res.data.response.date);
          setEditItemId(res.data.response.id);
          setLoading(false);

          setAlllist(prev => {
            return allSelection.filter(item => item.id != id);
          });
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

  const userconvictiondelete = id => {
    setLoading(true);
    let Body = new FormData();
    Body.append('id', id);
    postService(apiName.userconvictiondelete, Body)
      .then(async res => {
        if (res.status == 200) {
          setConvictionvalue('');
          setOffensevalue('');
          setDob('');
          dropdownController.current.setInputText('');
          setLoading(false);
          setHiddenshow(false);
          getUserConviction();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for userconvictiondelete  api =====================>>',
          error,
        );
      });
  };
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
  };

  const _keyboardDidHide = () => {
    setMBottom('100%');
    setKeyboardVisible(false);
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
          <View style={{width: '17%', alignSelf: 'center', marginRight: 9}}>
            <Image
              source={Images.maplawyer}
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
                  {item.conviction}
                </Text>
              </Text>
              <Text
                style={{marginVertical: 5, fontFamily: fonts.Bold}}
                numberOfLines={1}>
                {I18n.t('Offense')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>
                  {item.offense_type}
                </Text>
              </Text>
              <Text style={{fontFamily: fonts.Bold}}>
                {I18n.t('Date')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>
                  {moment(item.date).format('DD-MM-YYYY')}
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
      <View style={styles.renderHiddenItemview}>
        <TouchableOpacity
          onPress={() => {
            rowMap[rowData.item.key].closeRow();
            scrollRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
            Picker.hide();
            setHiddenshow(true);
            edituserconviction(rowData?.item?.id);
          }}
          style={styles.Editimage}>
          <Image source={Images.EditText} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Picker.hide();

            Alert.alert(
              I18n.t('deletestatement'),
              I18n.t('suredeletestatement'),
              [
                {
                  text: I18n.t(['cancel']),
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },

                {
                  text: I18n.t('OK'),
                  onPress: () => {
                    userconvictiondelete(rowData?.item?.id);
                    setHiddenshow(true);
                  },
                },
              ],
              {cancelable: false},
            );
          }}
          style={styles.Deleteimage}>
          <Image source={Images.Delete} />
        </TouchableOpacity>
      </View>
    );
  };

  const PickerInputStyle = () => ({
    pickerConfirmBtnColor: [255, 255, 255, 1],
    pickerBg: [255, 255, 255, 1],
    pickerToolBarBg: [253, 191, 90, 1],
    pickerTitleColor: [255, 255, 255, 1],
    pickerCancelBtnColor: [255, 255, 255, 1],
  });
  const handlePress31 = () => {
    setNew(true)
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: convictiontype,

      selectedValue: [
        `${convictionvalue ? convictionvalue : convictiontype[0]}`,
      ],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: '',
      onPickerConfirm: data => {
        setNew(false)
        setConvictionvalue(data[0]);
      },
      onPickerCancel: data => {setNew(false)},
      onPickerSelect: data => {},
    });
    Picker.show();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : ''}
      style={styles.container}>
      <NavBar
        lefttext={I18n.t('Back')}
        source={Images.backarrow}
        navigation={() => {
          props.navigation.goBack(), Picker.hide(), setEditItemId();
        }}
        rightText={I18n.t('background')}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={loading} />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{paddingBottom: 50}}
        style={{paddingHorizontal: width * (5 / 375)}}>
        <View
          style={{flex: 1}}
          onLayout={e => {
            const height = e.nativeEvent.layout;
            setScrollviewHeight(height);
          }}>
          <View style={styles.VerifyTextView}>
            <Image source={Images.backgroundAlert} style={{}} />
            <Text style={[CommonStyles.SubHeadingText4, styles.VerifyText]}>
              {I18n.t('VerifyText')}
            </Text>
          </View>
          <Text
            style={[CommonStyles.HeadingText_medium, styles.JUDICIAL_HISTORY]}>
            {I18n.t('JUDICIAL_HISTORY')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <ImageBackground
              source={Images.Ellipse}
              style={styles.ImageBackgroundview}>
              <Text style={{alignSelf: 'center'}}>1</Text>
            </ImageBackground>
            <Image source={Images.line}></Image>
            <ImageBackground
              source={Images.EllipseYellow}
              style={styles.ImageBackgroundview}>
              <Text style={{alignSelf: 'center', color: colors.white}}>2</Text>
            </ImageBackground>
            <Image source={Images.line}></Image>
            <ImageBackground
              source={Images.Ellipse}
              style={styles.ImageBackgroundview}>
              <Text style={{alignSelf: 'center'}}>3</Text>
            </ImageBackground>
          </View>

          <View
            style={{
              paddingVertical: width * (20 / 375),
              marginTop: width * (15 / 375),
            }}>
            <View style={{marginTop: 10, marginHorizontal: width * (5 / 375)}}>
              <Text style={[CommonStyles.HeadingText3, styles.Convictiontext]}>
                {I18n.t('Conviction')}
              </Text>

              <View style={styles.pickerview}>
                <TouchableOpacity
                  onPress={() => {
                    handlePress31();
                  }}
                  style={styles.TouchableOpacityview}>
                  <Text
                    editable={false}
                    pointerEvents="none"
                    style={[
                      styles.Selecttypetext,
                      {
                        color: convictionvalue
                          ? 'rgb(0,0,0)'
                          : 'rgb(183,190,197)',
                      },
                    ]}>
                    {`${
                      convictionvalue ? convictionvalue : I18n.t('Selecttype')
                    }`}
                  </Text>

                  <Image
                    style={styles.downArrowimg}
                    source={Images.downArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[CommonStyles.HeadingText3, styles.Offensetype]}>
              {I18n.t('Offensetype')}
            </Text>
            {showfull == true ? (
              <View style={styles.pickerview}>
                <TouchableOpacity
                  onPress={() => {
                    handlePress31();
                  }}
                  style={styles.TouchableOpacityview}>
                  <Text
                    editable={false}
                    pointerEvents="none"
                    style={[
                      styles.Selecttypetext,
                      {
                        color: convictionvalue
                          ? 'rgb(0,0,0)'
                          : 'rgb(183,190,197)',
                      },
                    ]}>
                    {`${
                      convictionvalue
                        ? convictionvalue
                        : I18n.t('Selectcomplete')
                    }`}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <AutocompleteDropdown
                numberOfLines={1}
                ref={autocompleteRef}
                controller={controller => {
                  dropdownController.current = controller;
                }}
                inputContainerStyle={{
                  backgroundColor: colors.white,
                  borderRadius: 25,
                }}
                suggestionsListContainerStyle={{
                  opacity: offensevalue == '' ? 0 : 1,
                  backgroundColor: colors.white,
                  width: '100%',
                }}
                suggestionsListTextStyle={{
                  fontFamily: fonts.Bold,
                  fontSize: fontsize.Regular,
                }}
                containerStyle={{
                  backgroundColor: colors.white,
                  borderBottomWidth:
                    isKeyboardVisible == true && offensevalue != '' ? 0 : 0.7,
                  borderBottomColor: colors.yellow,
                  width: '87%',
                  alignSelf: 'center',
                }}
                onFocus={() => {
                  if (Platform.OS == 'android') {
                    setCursor(true);
                  }

                  Picker.hide();
                }}
                onBlur={() => {
                  setShowline(true);
                  if (Platform.OS == 'android') {
                    setCursor(false);
                  }
                }}
                clearOnFocus={false}
                showClear={false}
                showChevron={false}
                direction={'down'}
                onSelectItem={item => {
                  setShowline(false);
                  item && setOffensevalue(item?.title);
                }}
                onChangeText={prevState => {
                  setShowline(false);
                  setOffensevalue(prevState);
                  scrollRef.current.scrollTo({x: 0, y: 350, animated: true});
                }}
                textInputProps={{
                  selection:
                    Platform.OS == 'android'
                      ? cursor == true
                        ? {end: 0}
                        : {start: 0}
                      : null,
                  selectionColor: colors.yellow,
                  placeholder: I18n.t('Selectcomplete'),
                  autoCorrect: false,
                  autoCapitalize: 'none',
                }}
                initialValue={{id: '2'}}
                suggestionsListMaxHeight={offensevalue == '' ? 0 : 155}
                position={offensevalue == '' ? 'absolute' : 'relative'}
                closeOnSubmit={false}
                dataSet={offensetype}
              />
            )}
            <View
              style={{
                marginBottom: 25,
                marginHorizontal: width * (5 / 375),
                marginTop: width * (25 / 375),
              }}>
              <Text style={[CommonStyles.HeadingText3, styles.datetext]}>
                {I18n.t('Date')}
              </Text>

              <View style={styles.pickerview}>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    setCalenderModal(true), setNew(true), Picker.hide();
                  }}
                  style={styles.TouchableOpacityview}>
                  <Text
                    editable={false}
                    pointerEvents="none"
                    style={[
                      styles.Selecttypetext,
                      {
                        color: Dob ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      },
                    ]}>
                    {`${
                      Dob
                        ? moment(Dob).format('DD-MM-YYYY')
                        : I18n.t('Choosedate')
                    }`}
                  </Text>

                  <Image
                    style={styles.downArrowimg}
                    source={Images.downArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Button
              buttonStyle={[styles.Addselectionbutton,{
                backgroundColor:
                  Dob == '' ||
                  Dob == undefined ||
                  convictionvalue == '' ||
                  offensevalue == '' ||
                  convictionvalue == undefined
                    ? colors.disblebutton
                    : colors.yellow,
                    borderWidth:
                      Dob == '' ||
                      Dob == undefined ||
                      convictionvalue == '' ||
                      offensevalue == '' ||
                      convictionvalue == undefined
                        ? 1
                        : 0,
                    borderColor:
                      Dob == '' ||
                      Dob == undefined ||
                      convictionvalue == '' ||
                      offensevalue == '' ||
                      convictionvalue == undefined
                        ? colors.disablecolor
                        : colors.yellow,
                
              }]}
              disabled={
                Dob == '' ||
                Dob == undefined ||
                convictionvalue == '' ||
                offensevalue == '' ||
                convictionvalue == undefined
              }
              label={I18n.t('Addselection')}
              onPress={() => userConviction()}
              isLabel={true}
              buttonTextStyle={{
                color:
                  Dob == '' ||
                  Dob == undefined ||
                  convictionvalue == '' ||
                  offensevalue == '' ||
                  convictionvalue == undefined
                    ? colors.disablecolor
                    : colors.white,
                fontSize: fontsize.Medium,
                fontFamily: fonts.Bold,
              }}
            />
          </View>
          {allSelection?.length != 0 && (
            <Text
              style={[
                CommonStyles.HeadingText_medium,
                styles.statementtext
              ]}>
              {I18n.t('statement')}
            </Text>
          )}

          <View>
            <SwipeListView
              scrollEnabled={false}
              keyExtractor={item => {
                item.id;
              }}
              ref={swipelistref}
              data={alllist}
              renderItem={({item, index}) => _rendernotiLists(item, index)}
              renderHiddenItem={hiddenshow == true ? null : renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-150}
              directionalDistanceChangeThreshold={true}
              // previewRowKey={'0'}
              disableRightSwipe={true}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={[styles.ButtonView,{
         
          marginBottom:
            Platform.OS == 'android' ? width * (30 / 375) : width * (50 / 375),
        }]}>
        <Button
          buttonStyle={[styles.Smallbutton,{
          
            backgroundColor:
              convict == false ? colors.white : colors.grayborder,
            borderWidth: convict == false ? width * (1 / 375) : 0,
            borderColor: convict == false ? colors.yellow : colors.white,
          }]}
          label={I18n.t('Previous')}
          onPress={() => {
            Picker.hide();
            setConvict(true);
            setConvict1(false);
            setEditItemId();
            props.navigation.goBack();
          }}
          isLabel={true}
          buttonTextStyle={{
            fontSize: fontsize.Large,
            fontFamily: fonts.Bold,
            color: convict == false ? colors.yellow : colors.white,
          }}
        />
        <Button
          buttonStyle={[styles.Smallbutton,{
            backgroundColor:
              allSelection?.length != 0 ? colors.yellow : colors.disblebutton,
            borderWidth: allSelection?.length != 0 ? 0 : width * (1 / 375),
            borderColor:
              allSelection?.length != 0 ? colors.yellow : colors.disablecolor,
          }]}
          label={I18n.t('Next')}
          onPress={() => {
            Picker.hide();
            setConvict1(true);
            setConvictionvalue('');
            setOffensevalue('');
            setDob('');
            setEditItemId();
            dropdownController.current.setInputText('');
            setConvict(false);
            props.navigation.navigate('BackgroundCheckFinal');
          }}
          disabled={allSelection?.length == 0}
          isLabel={true}
          buttonTextStyle={{
            fontSize: fontsize.Large,
            fontFamily: fonts.Bold,
            color:
              allSelection?.length != 0 ? colors.white : colors.disablecolor,
          }}
        />
      </View>
      {/* modal for calander */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={CalenderModal}
        onRequestClose={() => {
          setCalenderModal(false), setNew(false);
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255)',
              justifyContent: 'flex-end',
            }}>
            <DatePicker
              monthDisplayMode={'en-long'}
              type="MM-DD-YYYY"
              defaultDate={Dob?Dob:state.calenderDate}
              maxDate={new Date()}
              minDate={'1950-01-01'}
              confirm={selectedDate => {
                setCalenderModal(false);
                setNew(false);
                setDob(moment(selectedDate).format('YYYY-MM-DD'));
              }}
              cancel={() => {
                setNew(false);
                setCalenderModal(false);
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
               
              }}
            />
          </View>
        </View>
      </Modal>
      {newView == true ? (
        <View
          style={CommonStyles.modalbackview}
          onPress={() => setNew(false)}></View>
      ) : null}
    </KeyboardAvoidingView>
  );
};
export default BackgroundCheckYes;
