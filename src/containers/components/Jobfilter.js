import React, {useEffect, useState} from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  Text,
  Image,
  Modal,
} from 'react-native';
import NavBar from '../components/NavBar';
import {width} from '../../constants/ScreenSize';
import Images from '../../constants/images';
import colors from '../../constants/colors';
import I18n from '../../constants/i18n';
import Loader from '../components/loader';
import {Container, Content} from 'native-base';
import {ShowStatusBarWhite} from '../components/Statusbar';
import Button from '../components/Button';
import CommonStyles from '../../assets/css/commonStyles';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import RangeSlider from 'rn-range-slider';
import Thumb from '../components/Thumb';
import Rail from '../components/Rail';
import RailSelected from '../components/RailSelected';
import Picker from 'react-native-picker';
import SignItOut from '../components/SignItOut';
import fontsize from '../../constants/i18n/Fontsizes';
var minDate = new Date();
var maxDate = new Date().setFullYear(new Date().getFullYear() + 30);
var onMonthChange;
let yearArr = [];
for (
  let index = new Date().getFullYear() + 20;
  index >= new Date().getFullYear();
  index--
) {
  yearArr.push(index);
}

const Jobfilter = props => {
  const [state, setState] = useState({
    experienceStartDate: '',
    experienceEndDate: '',
    experienceStartDate1: moment(new Date()).format('YYYY-MM-DD'),
    experienceEndDate1: moment(new Date()).format('YYYY-MM-DD'),
    keyword: '',
    experienceToDate: '',
    cityId: 0,
    clientId: 0,
    positionId: 0,
    address: '',
    lat: 0,
    lng: 0,
    radius1: 0,
    statusIndex: 10,
    low12: 0,
    high12: 0,

    date21: '',
    date22: moment(new Date()).format('YYYY-MM-DD'),
    date31: '',
    date32: moment(new Date()).format('YYYY-MM-DD'),
    low21: 0,
    high21: 0,
    keyword1: '',
    positionId1: 0,
    clientId1: 0,
    statusIndex1: 10,
  });
  const [city1, setCity1] = React.useState('');
  const [city12, setCity12] = React.useState('');
  
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [status1, setStatus1] = React.useState('');
  const [status12, setStatus12] = React.useState('');
  const [messenger4, setMessenger4] = React.useState('');
  const [messenger14, setMessenger14] = React.useState('');
  const [city, setCity] = useState([]);
  const [clients, setClients] = useState([]);
  const [clients1, setClients1] = useState('');
  const [clients12, setClients12] = useState('');
  const [position, setPosition] = useState([]);
  const [position1, setPosition1] = useState('');
  const [position12, setPosition12] = useState('');
  const [educationData1, setEducationData1] = React.useState([]);
  const [messenger, setMessenger] = React.useState('');
  const [messenger1, setMessenger1] = React.useState('');
  const [experienceStart, setExperienceStart] = useState(false);
  const [experienceStart1, setExperienceStart1] = useState(false);
  const [messenger2, setMessenger2] = React.useState('');
  const [messenger3, setMessenger3] = React.useState('');
  const [educationData, setEducationData] = React.useState([]);
  const renderThumb = React.useCallback(() => <Thumb />, []);
  const [loading, setLoading] = useState(false);
  const [monthData1, setMonthData1] = React.useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);
  const [month1, setMonth1] = useState('');
  const renderRail = React.useCallback(
    () => <Rail text={colors.lightGray} />,
    [],
  );
  const renderRailSelected = React.useCallback(
    () => <RailSelected text={colors.yellow} />,
    [],
  );
  const handleValueChange = React.useCallback((low, high) => {
    setLow(low);
    setHigh(high);
    state.low12 = low;
    state.high12 = high;
  }, []);
  const [low, setLow] = useState();
  const [high, setHigh] = useState();
  const [low1, setLow1] = useState();
  const [high1, setHigh1] = useState();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [yearData, setYearData] = React.useState(yearArr);
  const [yearData1, setYearData1] = React.useState([]);
  const [calYear, setCalYear] = React.useState('');

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('blur', () => {
      Picker.hide();
    });
    return unsubscribeOnBlur;
  }, []);

  const PickerInputStyle = () => ({
    pickerConfirmBtnColor: [255, 255, 255, 1],
    pickerBg: [255, 255, 255, 1],
    pickerToolBarBg: [253, 191, 90, 1],
    pickerTitleColor: [255, 255, 255, 1],
    pickerCancelBtnColor: [255, 255, 255, 1],
  });

  const handlePress = () => {
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: position,

      selectedValue: [`${position1 ? position1 : position[0]}`],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('select_position'),
      onPickerConfirm: data => {
        setPosition1(data[0]);
        let treatArr = educationData;
        let treatData = treatArr.filter(item => {
          if (item?.title == data[0]) {
            return item;
          }
        });
        setState({...state, positionId: treatData[0]['id']});
      },
      onPickerCancel: data => {},
      onPickerSelect: data => {},
    });
    Picker.show();
  };
  const handlePress1 = () => {
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: city,

      selectedValue: [`${city1 ? city1 : city[0]}`],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('select_city'),
      onPickerConfirm: data => {
        setCity1(data[0]);
      },
      onPickerCancel: data => {},
      onPickerSelect: data => {},
    });
    Picker.show();
  };
  const handlePress3 = () => {
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: clients,

      selectedValue: [`${clients1 ? clients1 : clients[0]}`],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('select_client'),
      onPickerConfirm: data => {
        setClients1(data[0]);

        let treatArr = educationData1;
        let treatData = treatArr.filter(item => {
          if (item?.name == data[0]) {
            return item;
          }
        });
        setState({...state, clientId: treatData[0]['user_id']});
      },

      onPickerCancel: data => {},
      onPickerSelect: data => {},
    });
    Picker.show();
  };
 
  const reset = () => {
    setMessenger('');
    setMessenger1('');
    setMessenger2('');
    setMessenger3('');
    setMessenger4('');
    setCity1('');
    setClients1('');
    setPosition1('');
    setStatus1('');
    state.keyword = '';
    state.experienceStartDate = '';
    state.experienceEndDate = '';
    state.statusIndex = 10;
    state.clientId = 0;
    state.positionId = '';
    state.low12 = 0;
    state.high12 = 0;
    state.positionId = 0;
    setLow(min);
    setHigh(max);

    global.experienceStartDate1 = '';
    global.experienceEndDate1 = '';
    global.low12 = min;
    global.high12 = max;
    global.keyword = '';
    global.positionId = 0;
    global.clientId = 0;
    global.city1 = '';
    global.position1 = '';
    global.status1 = '';
    global.clients1 = '';
    global.statusIndex = 10;
    global.lat = 0;
    global.lng = 0;
    global.radius = 0;
    global.hours = 0;
    global.no_hours = '';

    state.date21 = '';

    state.date31 = '';

    state.low21 = min;
    state.high21 = max;
    state.keyword1 = '';
    state.positionId1 = 0;
    state.clientId1 = 0;
    state.statusIndex1 = 10;
    setLow1(min);
    setHigh1(max);
    setCity12('');
    setPosition12('');
    setMessenger14('');
    setStatus12('');
    setClients12('');
  };
  const filter = () => {
    props.navigation.navigate('onDemand', {
      screenFrom: 'filter',
      experienceStartDate1: state.experienceStartDate,
      experienceEndDate1: state.experienceEndDate,
      low1: state.low12,
      high1: state.high12,
      keyword1: state.keyword,
      positionId1: state.positionId,
      clientId1: state.clientId,
      city1: city1,
      statusIndex1: state.statusIndex,
      position1: position1,
      status1: status1,
      clients1: clients1,
      hours1: messenger4,
      data12: educationData,
      data21: city,
      data22: educationData1,
      minRange: min,
      maxRange: max,
      dateLow: yearData,
      dateHigh: yearData1,
    });
  };

  const handleCalender = props => {
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    let alpha = moment(props?.month[0]).format('YYYY');
    Picker.init({
      ...pickerStyle,
      pickerData: yearData,

      selectedValue: [`${calYear ? alpha : alpha}`],

      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('yearSelect'),
      onPickerConfirm: data => {
        setCalYear(data[0]);

        let Date22 = moment(props.month[0]).format('YYYY-MM');
        let Date24 = moment(data[0], 'YYYY').format('YYYY');
        let Date23 = moment(props.month[0]).format('MM');

        let date41 = Date24 + '-' + Date23;
        let startTime1 = moment(date41, 'YYYY-MM');

        let endTime = moment(Date22, 'YYYY-MM');

        let duration = moment.duration(endTime.diff(startTime1));

        let set123 = duration.asMonths();
        let data1 = Math.round(set123);

        if (data1 <= 0) {
          let sub = Math.abs(data1);
          props.addMonth(sub);
        } else {
          let num = data1;
          props.addMonth(-num);
        }

        setState({
          ...state,
          currentDate1: moment(data[0]).format('YYYY-MM-DD'),
        });
      },
      onPickerCancel: data => {},
      onPickerSelect: data => {},
    });
    Picker.show();
  };
  const handleMonth1 = props => {
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    let alpha = moment(props?.month[0]).format('MMMM');
    Picker.init({
      ...pickerStyle,
      pickerData: monthData1,

      selectedValue: [`${month1 ? alpha : alpha}`],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('month_Select'),
      onPickerConfirm: data => {
        setMonth1(data[0]);
        let Date21 = moment(data[0], 'MMMM').format('MMMM');
        let Date22 = moment(props.month[0]).format('MMMM');
        let startTime = moment(Date21, 'MMMM');
        let endTime = moment(Date22, 'MMMM');
        let duration = moment.duration(endTime.diff(startTime));
        let set123 = duration.asMonths();
        let data1 = Math.round(set123);
        if (data1 <= 0) {
          let sub = Math.abs(data1);
          props.addMonth(sub);
        } else {
          let num = data1;
          props.addMonth(-num);
        }
      },
      onPickerCancel: data => {},
      onPickerSelect: data => {},
    });
    Picker.show();
  };

  const handleCalender1 = props => {
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    let alpha = moment(props?.month[0]).format('YYYY');
    Picker.init({
      ...pickerStyle,
      pickerData: yearData1,

      selectedValue: [`${calYear ? alpha : alpha}`],

      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: I18n.t('yearSelect'),
      onPickerConfirm: data => {
        setCalYear(data[0]);

        let Date22 = moment(props.month[0]).format('YYYY-MM');
        let Date24 = moment(data[0], 'YYYY').format('YYYY');
        let Date23 = moment(props.month[0]).format('MM');

        let date41 = Date24 + '-' + Date23;
        let startTime1 = moment(date41, 'YYYY-MM');

        let endTime = moment(Date22, 'YYYY-MM');

        let duration = moment.duration(endTime.diff(startTime1));
        let set123 = duration.asMonths();
        let data1 = Math.round(set123);
        if (data1 <= 0) {
          let sub = Math.abs(data1);
          props.addMonth(sub);
        } else {
          let num = data1;
          props.addMonth(-num);
        }

        setState({
          ...state,
          currentDate1: moment(data[0]).format('YYYY-MM-DD'),
        });
      },
      onPickerCancel: data => {},
      onPickerSelect: data => {},
    });
    Picker.show();
  };
  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <Loader loading={loading} />
      <NavBar
        source={Images.close}
        rightText={I18n.t('Filter')}
        navigation={() => {
          props.navigation.goBack()
          Picker.hide();
        }}></NavBar>
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <ShowStatusBarWhite />
      <Content style={{paddingHorizontal: width * (15 / 375)}}>
        <View
          style={{
            backgroundColor: colors.whitebackground,
            

            alignItems: 'center',
          }}>
          
          <Text
            style={{
              alignSelf: 'flex-start',
              marginTop: width * (20 / 375),
              fontWeight:'700',
              marginBottom: width * (10 / 375),
            }}>
            {I18n.t('Salary')}
          </Text>
          <RangeSlider
            style={{
              width: width - width * (30 / 375),
            }}
            selectionColor="red"
            blankColor="red"
            thumbRadius={50}
            thumbBorderWidth={1}
            min={min}
            max={max}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            onValueChanged={handleValueChange}
            low={low}
            high={high}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={CommonStyles.NormalText}> min $ {low}</Text>
            <Text style={CommonStyles.NormalText}> max $ {high}</Text>
          </View>

          <View
            style={{
              width: '100%',
            }}>
            <View
              style={{
                height: width * (80 / 375),
              }}>
                    <Text
            style={{
              alignSelf: 'flex-start',
              fontWeight:'700',
              marginTop: width * (20 / 375),
              marginBottom: width * (10 / 375),
            }}>
            {I18n.t('Position')}
          </Text>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    paddingHorizontal: width * (15 / 375),
                    fontSize: fontsize.Regular,
                    color: colors.textinputColor,
                    backgroundColor: colors.white,
                    borderRadius: 30,
                    width: '99%',
                    borderBottomColor:colors.yellow,
                    borderBottomWidth:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}
                onPress={() => handlePress()}>
                <Text
                  editable={false}
                  pointerEvents="none"
                  numberOfLines={1}
                  style={[
                    {
                      color: position1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      fontSize: fontsize.Regular,
                    },
                  ]}>
                  {`${position1 ? position1 : I18n.t('Selectposition')}`}
                </Text>
                <Image style={{marginRight:20}} source={Images.downArrow} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: width * (80 / 375),
              }}>
                  <Text
            style={{
              alignSelf: 'flex-start',
              fontWeight:'700',
              marginTop: width * (20 / 375),
              marginBottom: width * (10 / 375),
            }}>
            {I18n.t('Preferences')}
          </Text>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    paddingHorizontal: width * (15 / 375),
                    fontSize: fontsize.Regular,
                    color: colors.textinputColor,
                    backgroundColor: colors.white,
                    borderRadius: 30,
                    width: '99%',
                    borderBottomColor:colors.yellow,
                    borderBottomWidth:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}
                >
                <Text
                  editable={false}
                  pointerEvents="none"
                  numberOfLines={1}
                  style={[
                    {
                      color: clients1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      fontSize: fontsize.Regular,
                    },
                  ]}>
                  {I18n.t('Selectpreferences')}
                </Text>
                <Image style={{marginRight:20}} source={Images.downArrow} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: width * (80 / 375),
              }}>
                  <Text
            style={{
              alignSelf: 'flex-start',
              fontWeight:'700',
              marginTop: width * (20 / 375),
              marginBottom: width * (10 / 375),
            }}>
            {I18n.t('Jobtype')}
          </Text>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    paddingHorizontal: width * (15 / 375),
                    fontSize: fontsize.Regular,
                    color: colors.textinputColor,
                    backgroundColor: colors.white,
                    borderRadius: 30,
                    width: '99%',
                    borderBottomColor:colors.yellow,
                    borderBottomWidth:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}
                onPress={() => handlePress3()}>
                <Text
                  editable={false}
                  pointerEvents="none"
                  numberOfLines={1}
                  style={[
                    {
                      color: clients1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      fontSize: fontsize.Regular,
                    },
                  ]}>
                  {`${clients1 ? clients1 : I18n.t('Selecttype')}`}
                </Text>
                <Image style={{marginRight:20}} source={Images.downArrow} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: width * (80 / 375),
              }}>
                    <Text
            style={{
              alignSelf: 'flex-start',
              fontWeight:'700',
              marginTop: width * (20 / 375),
              marginBottom: width * (10 / 375),
            }}>
            {I18n.t('Education')}
          </Text>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    paddingHorizontal: width * (15 / 375),
                    fontSize: fontsize.Regular,
                    color: colors.textinputColor,
                    backgroundColor: colors.white,
                    borderRadius: 30,
                    width: '99%',
                    borderBottomColor:colors.yellow,
                    borderBottomWidth:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}
                >
                <Text
                  editable={false}
                  pointerEvents="none"
                  numberOfLines={1}
                  style={[
                    {
                        color: city1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                        fontSize: fontsize.Regular,
                    },
                  ]}>
                  {I18n.t('Selectclient')}
                </Text>
                <Image style={{marginRight:20}} source={Images.downArrow} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '100%',
            }}>
            <View
              style={{
                height: width * (80 / 375),

              }}>
                    <Text
            style={{
              alignSelf: 'flex-start',
              fontWeight:'700',
              marginTop: width * (20 / 375),
              marginBottom: width * (10 / 375),
            }}>
            {I18n.t('Experience')}
          </Text>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    paddingHorizontal: width * (15 / 375),
                    fontSize: fontsize.Regular,
                    color: colors.textinputColor,
                    backgroundColor: colors.white,
                    borderRadius: 30,
                    width: '99%',
                    borderBottomColor:colors.yellow,
                    borderBottomWidth:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}
              >
                <Text
                  editable={false}
                  pointerEvents="none"
                  numberOfLines={1}
                  style={[
                    {
                      color: status1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      fontSize: fontsize.Regular,
                    },
                  ]}>
                  {`${status1 ? status1 : I18n.t('Selectexperience')}`}
                </Text>
                <Image style={{marginRight:20}} source={Images.downArrow} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: width * (80 / 375),
              }}>
                  <Text
            style={{
              alignSelf: 'flex-start',
              marginTop: width * (20 / 375),
              fontWeight:'700',
              marginBottom: width * (10 / 375),
            }}>
            {I18n.t('City')}
          </Text>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    paddingHorizontal: width * (15 / 375),
                    fontSize: fontsize.Regular,
                    color: colors.textinputColor,
                    backgroundColor: colors.white,
                    borderRadius: 30,
                    width: '99%',
                    borderBottomColor:colors.yellow,
                    borderBottomWidth:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}
                onPress={() => handlePress1()}>
                <Text
                  editable={false}
                  pointerEvents="none"
                  numberOfLines={1}
                  style={[
                    {
                      color: clients1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      fontSize: fontsize.Regular,
                    },
                  ]}>
                  {`${city1 ? city1 : I18n.t('Selectcity')}`}
                </Text>
                <Image style={{marginRight:20}} source={Images.downArrow} />
              </TouchableOpacity>
            </View>
          </View>
        
          {state.offenceDateError != '' && (
            <Text
              style={{
                marginTop: width * (-10 / 375),
                color: colors.red,
                fontSize: fontsize.Small,
                marginBottom: width * (10 / 375),
              }}>
              {state.offenceDateError && I18n.t(state.offenceDateError)}
            </Text>
          )}

         
<View style={{flexDirection:'row'}}>
<Button
            buttonStyle={{
              backgroundColor: colors.white,
              height: width * (45 / 375),
              width: width * (150 / 375),
              borderRadius: 25,
            borderWidth:1,
            borderColor:colors.yellow,
            marginRight:10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: width * (20 / 375),
            }}
            label={I18n.t('Reset')}
            onPress={() => reset()}
            isLabel={true}
            buttonTextStyle={{
              fontSize: 16,
              color: colors.yellow,
            }}
          />
            <Button
            buttonStyle={{
              backgroundColor: colors.yellow,
              height: width * (45 / 375),
              width: width * (150 / 375),
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: width * (20 / 375),
            }}
            label={I18n.t('Apply')}
            onPress={() => filter()}
            isLabel={true}
            buttonTextStyle={{
              fontSize: 16,
              color: colors.white,
            }}
          />
</View>
        
        </View>
      </Content>
      <Modal
        animationType="slide"
        transparent={true}
        visible={experienceStart}
        onRequestClose={() => setExperienceStart(false)}>
        <View style={{flex: 1, backgroundColor: colors.modelBackground}}>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255)',

              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: width * (15 / 375),
            }}>
            <TouchableOpacity
              style={{
                height: width * (30 / 375),
                width: width * (30 / 375),
                alignSelf: 'flex-end',
                marginBottom: width * (10 / 375),
              }}
              onPress={() => {
                setExperienceStart(false);
                Picker.hide();
              }}>
              <Image
                source={Images.close}
                style={{
                  height: width * (30 / 375),
                  width: width * (30 / 375),
                }}></Image>
            </TouchableOpacity>

            <Calendar
              style={{
                borderRadius: width * (8 / 375),
                borderColor: '#FDBF5A',
                borderWidth: 2,
              }}
              current={state.experienceStartDate1}
              minDate={moment(minDate).format('YYYY-MM-DD')}
              maxDate={moment(maxDate).format('YYYY-MM-DD')}
              onDayPress={day => {
                setState({
                  ...state,
                  experienceStartDate: day.dateString,

                  experienceStartDate1: day.dateString,
                  experienceToDate: day.dateString,
                  dateSelect: false,
                  experienceEndDate: '',
                });
                setExperienceStart(false);
                indexYear = moment(day.dateString).format('YYYY');
                Picker.hide();

                for (
                  let index = new Date().getFullYear() + 20;
                  index >= moment(day.dateString).format('YYYY');
                  index--
                ) {
                  yearData1.push(index);
                }
              }}
              onDayLongPress={day => {
                setState({
                  ...state,
                  experienceStartDate: day.dateString,
                  experienceStartDate1: day.dateString,
                  experienceToDate: day.dateString,
                  dateSelect: false,
                  experienceEndDate: '',
                });
                setExperienceStart(false);
                indexYear = moment(day.dateString).format('YYYY');
                Picker.hide();
                for (
                  let index = new Date().getFullYear() + 20;
                  index >= moment(day.dateString).format('YYYY');
                  index--
                ) {
                  yearData1.push(index);
                }
              }}
              onMonthChange={onMonthChange}
              hideArrows={false}
              renderArrow={direction =>
                direction === 'left' ? (
                  <Image
                    source={Images.right}
                    style={{
                      transform: [{rotate: '180deg'}],
                    }}
                  />
                ) : (
                  <Image source={Images.right} />
                )
              }
              hideExtraDays={true}
              disableMonthChange={false}
              hideDayNames={false}
              showWeekNumbers={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableArrowLeft={true}
              disableArrowRight={true}
              disableAllTouchEventsForDisabledDays={true}
              customHeader={props => {
                return (
                  <View
                    style={{
                      backgroundColor: colors.yellow,
                      borderRadius: width * (5 / 375),
                      marginTop: width * (3 / 375),
                      height: width * (80 / 375),
                      justifyContent: 'space-evenly',
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.yellow,
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        paddingHorizontal: width * (10 / 375),

                        marginTop: width * (3 / 375),
                        
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => props.addMonth(-1)}>
                        <Image source={Images.calenderIcon}></Image>
                      </TouchableOpacity>
                      
                      <Text
                        style={CommonStyles.HeadingText1}
                        onPress={() => handleMonth1(props)}>
                        {moment(props.month[0]).format('MMMM ')}
                        <Text
                          onPress={() => {
                            handleCalender(props);
                          }}>
                          {moment(props.month[0]).format('YYYY')}
                        </Text>
                      </Text>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => props.addMonth(1)}>
                        <Image
                          source={Images.calenderIcon}
                          style={{
                            transform: [{rotate: '180deg'}],
                          }}></Image>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                      }}>
                      <Text>Mo</Text>
                      <Text>Tu</Text>
                      <Text>We</Text>
                      <Text>Th</Text>
                      <Text>Fr</Text>
                      <Text>St</Text>
                      <Text>Su</Text>
                    </View>
                  </View>
                );
              }}
              enableSwipeMonths={false}
              markingType={'custom'}
              markedDates={{
                [moment(state.experienceStartDate1).format('YYYY-MM-DD')]: {
                  selected: true,
                  customStyles: {
                    container: {
                      backgroundColor: colors.yellow,
                      borderRadius: 20,
                    },
                    text: {
                      color: '#F6F6F4',
                      fontWeight: 'bold',
                    },
                  },
                },
                '2012-05-17': {marked: true},
              }}
              theme={{
                'stylesheet.calendar.header': {
                  week: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  Header: {
                    backgroundColor: '#FDBF5A',
                  },
                },
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={experienceStart1}
        onRequestClose={() => setExperienceStart1(false)}>
        <View style={{flex: 1, backgroundColor: colors.modelBackground}}>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255)',

              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: width * (15 / 375),
            }}>
            <TouchableOpacity
              style={{
                height: width * (30 / 375),
                width: width * (30 / 375),
                alignSelf: 'flex-end',
                marginBottom: width * (10 / 375),
              }}
              onPress={() => {
                setExperienceStart1(false);
                Picker.hide();
              }}>
              <Image
                source={Images.close}
                style={{
                  height: width * (30 / 375),
                  width: width * (30 / 375),
                }}></Image>
            </TouchableOpacity>

            <Calendar
              style={{
                borderRadius: width * (8 / 375),
                borderColor: '#FDBF5A',
                borderWidth: 2,
              }}
              current={state.experienceToDate}
              minDate={moment(state.experienceToDate).format('YYYY-MM-DD')}
              maxDate={moment(maxDate).format('YYYY-MM-DD')}
              onDayPress={day => {

                state.experienceEndDate = day.dateString;
                state.experienceEndDate1 = day.dateString;
                setExperienceStart1(false);
                Picker.hide();
              }}
              onDayLongPress={day => {
                state.experienceEndDate = day.dateString;
                state.experienceEndDate1 = day.dateString;
                setExperienceStart1(false);
                Picker.hide();
              }}
              onMonthChange={onMonthChange}
              hideArrows={false}
              renderArrow={direction =>
                direction === 'left' ? (
                  <Image
                    source={Images.right}
                    style={{
                      transform: [{rotate: '180deg'}],
                    }}
                  />
                ) : (
                  <Image source={Images.right} />
                )
              }
              hideExtraDays={true}
              disableMonthChange={false}
              hideDayNames={false}
              showWeekNumbers={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableArrowLeft={true}
              disableArrowRight={true}
              disableAllTouchEventsForDisabledDays={true}
              customHeader={props => {
                return (
                  <View
                    style={{
                      backgroundColor: colors.yellow,
                      borderRadius: width * (5 / 375),
                      marginTop: width * (3 / 375),
                      height: width * (80 / 375),
                      justifyContent: 'space-evenly',
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.yellow,
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        paddingHorizontal: width * (10 / 375),

                        marginTop: width * (3 / 375),
                        
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => props.addMonth(-1)}>
                        <Image source={Images.calenderIcon}></Image>
                      </TouchableOpacity>
                      
                      <Text
                        style={CommonStyles.HeadingText1}
                        onPress={() => handleMonth1(props)}>
                        {moment(props.month[0]).format('MMMM ')}
                        <Text
                          onPress={() => {
                            handleCalender1(props);
                          }}>
                          {moment(props.month[0]).format('YYYY')}
                        </Text>
                      </Text>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => props.addMonth(1)}>
                        <Image
                          source={Images.calenderIcon}
                          style={{
                            transform: [{rotate: '180deg'}],
                          }}></Image>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                      }}>
                      <Text>Mo</Text>
                      <Text>Tu</Text>
                      <Text>We</Text>
                      <Text>Th</Text>
                      <Text>Fr</Text>
                      <Text>St</Text>
                      <Text>Su</Text>
                    </View>
                  </View>
                );
              }}
              enableSwipeMonths={false}
              markingType={'custom'}
              markedDates={{
                [moment(state.experienceToDate).format('YYYY-MM-DD')]: {
                  selected: true,
                  customStyles: {
                    container: {
                      backgroundColor: colors.yellow,
                      borderRadius: 20,
                    },
                    text: {
                      color: '#F6F6F4',
                      fontWeight: 'bold',
                    },
                  },
                },
                '2012-05-17': {marked: true},
              }}
              theme={{
                'stylesheet.calendar.header': {
                  week: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  Header: {
                    backgroundColor: '#FDBF5A',
                  },
                },
              }}
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
};
export default Jobfilter;
