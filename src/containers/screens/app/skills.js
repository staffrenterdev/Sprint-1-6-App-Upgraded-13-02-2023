import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import NavBar from '../../components/NavBar';
import { height, width } from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/skillsstyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import Picker from 'react-native-picker';
import { ShowStatusBarWhite } from '../../components/Statusbar';
import fonts from '../../../constants/fonts';
import fontsize from '../../../constants/i18n/Fontsizes';
import apiName from '../../../constants/apiName';
import { postService } from '../../../services/postServices';
import { getService } from '../../../services/getServices';
import { SwipeListView } from 'react-native-swipe-list-view';
import Loader from '../../components/loader';
var experincefieldlist12 = [];
const skills = props => {
  const [newView, setNew] = useState(false);
  const [newView2, setNew2] = useState(false);
  const [Name, setName] = useState('');
  const [Name2, setName2] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ExperienceModal, setExperienceModal] = useState(false);
  const [KeyboardVisible, setKeyboardVisible] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [listshow, setListshow] = useState(false);
  const [Year, setYear] = useState(0);
  const [Month, setMonth] = useState(0);
  const [expriencelist, setExpriencelist] = useState([]);
  const [editmode, setEditmode] = useState(false);
  const swipelistref = useRef();
  const [hiddenshow, setHiddenshow] = useState(false);
  const [editItemId, setEditItemId] = useState();
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [listloader, setListloader] = useState(false);
  const [tnc, setTnc] = useState(false);
  const [checkboxvalue2, setCheckboxvalue2] = useState();
  const [Industry, setIndustry] = useState('');
  const [Industry2, setIndustry2] = useState('');
  const [Industrylist, setIndustrylist] = useState([]);
  const [industryid, setIndustryid] = useState();
  const [Skill, setSkill] = useState('');
  const [Skill2, setSkill2] = useState('');
  const [skilllist, setSkilllist] = useState([]);
  const [skillid, setSkillid] = useState();
  const [experincefieldlist, setExperincefieldlist] = useState([]);
  const [Industrymainlist, setIndustrymainlist] = useState([]);
  const [skillmainlist, setSkillmainlist] = useState([]);
  const [experiencefieldmodal, setExperiencefieldmodal] = useState(false);
  const [dataOld, setDataOld] = useState();
  const [dataNew, setDataNew] = useState();
  const [dataLang1, setDataLang1] = useState([]);
  const [dataLang2, setDataLang2] = useState([]);
  const [dataId1, setDataId1] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      setLoading(true);
      getIndustrylist();
      getaddedSkilllist();
      getSkillList();
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
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});

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
  const Industry_picker = () => {
    setNew2(true);
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: Industrylist,

      selectedValue: [`${Industry ? Industry : Industrylist[0]}`],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: '',
      onPickerConfirm: data => {
        setIndustry(data[0]);
        setNew2(false);

        let value = Industrymainlist.filter(item => item.title == data[0]);
        setIndustryid(value[0].id);
        if (value[0].id != industryid) {
          searchindustryandskill(value[0].id, null);
        } else {
        }
      },
      onPickerCancel: data => {
        setNew2(false);
      },
      onPickerSelect: data => { },
    });
    Picker.show();
  };
  const Skill_picker = () => {
    setNew2(true);
    Keyboard.dismiss();
    const pickerStyle = PickerInputStyle();
    Picker.init({
      ...pickerStyle,
      pickerData: skilllist,

      selectedValue: [`${Skill ? Skill : skilllist[0]}`],
      pickerTextEllipsisLen: 25,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('P_confirm'),
      pickerTitleText: '',
      onPickerConfirm: data => {
        setSkill(data[0]);
        setNew2(false);
        let value = skillmainlist.filter(item => item.title == data[0]);
        setSkillid(value[0].id);
        if (value[0].id != skillid) {
          searchindustryandskill(null, value[0].id);
          setDataLang1([])
        } else {
          searchindustryandskill(industryid, value[0].id);
        }
        getExperiencefieldList(value[0].id);

      },
      onPickerCancel: data => {
        setNew2(false);
      },
      onPickerSelect: data => { },
    });
    Picker.show();
  };

  useEffect(() => {
    if (
      Industry == '' ||
      Skill == '' ||
      (Industry == Industry2 &&
        Skill == Skill2 &&
        JSON.stringify(dataLang1) === JSON.stringify(dataLang2))
    ) {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  });

  const getaddedSkilllist = () => {
    getService(apiName.getuserskill)
      .then(async res => {
        if (res.status == 200) {
          setListloader(false);
          setIndustry('');
          setSkill('');
          setDataLang1([]);
          getExperiencefieldList();
          if (res.data.response.length != 0) {
            setHiddenshow(false);
            setExpriencelist(res.data.response);
            setListshow(true);
          } else {
            setListshow(false);
            setLoadingFirst(false);
          }
        }
        setIndustryid();
        setSkillid();
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setNew(false);
        setLoadingFirst(false);
        setExperienceModal(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getaddedSkilllist  api =====================>>',
          error,
        );
      });
  };
  const getIndustrylist = () => {
    getService(apiName.getindustry)
      .then(async res => {
        if (res.status == 200) {
          let tempArr = res?.data?.response;
          setIndustrymainlist(res?.data?.response);
          var newArray = [];
          tempArr.map(i => {
            newArray.push(i.title);
          });
        }
        setIndustrylist(newArray);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getIndustrylist  api =====================>>',
          error,
        );
      });
  };
  const getSkillList = () => {
    getService(apiName.getskill)
      .then(async res => {
        if (res.status == 200) {
          let tempArr = res?.data?.response;
          setSkillmainlist(res?.data?.response);
          var newArray = [];
          tempArr.map(i => {
            newArray.push(i.title);
          });
        }
        setSkilllist(newArray);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getSkillList  api =====================>>',
          error,
        );
      });
  };

  const EditSkill = id => {
    let Body = new FormData();

    Body.append('id', id);
    postService(apiName.edituserskill, Body)
      .then(async res => {
        getExperiencefieldList(res.data.response.skill_id);
        setTimeout(() => {
          if (res.status == 200) {
            setEditmode(true);
            setEditItemId(res.data.response.id);
            setHiddenshow(false);
            setExperienceModal(true);
            setNew(true);
            setIndustry(res.data?.response?.industry?.title);
            setIndustry2(res.data.response?.industry?.title);
            setIndustryid(res.data?.response?.industry_id);
            setSkill(res.data?.response?.skill?.title);
            setSkill2(res.data?.response?.skill?.title);
            setSkillid(res.data?.response?.skill_id);
            var letTemp = [];
            var tempArr = experincefieldlist12;
            var letId = [];
            experincefieldlist12?.map((i, index) => {
              res.data.response.experiences_in_field?.map(i2 => {
                if (i2.id == i.id) {
                  letTemp.push(i2.experience);
                  setDataLength(dataLength + 1);
                  letId.push(i2.id);
                  tempArr[index].check = true;
                }
              });
            });
            setDataLang1(letTemp);
            setDataId1(letId);
            setDataLang2(JSON.parse(JSON.stringify(letTemp)));
            setDataOld(JSON.parse(JSON.stringify(tempArr)));
            setLoading(false);
          }
        }, 300);
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for EditSkill  api =====================>>',
          error,
        );
      });
  };
  useEffect(() => {
    if (endDate != new Date().toISOString().split('T')[0] && tnc == true) {
      setTnc(false);
    }
  }, [endDate, tnc]);

  const DeleteExperience = (id, index) => {
    setLoading(true);
    let Body = new FormData();

    Body.append('id', id);
    Body.append('model_name', '\\UserSkill');
    postService(apiName.userrecorddelete, Body)
      .then(async res => {
        if (res.status == 200) {
          expriencelist.splice(index, 1);
          setExpriencelist([...expriencelist]);
          getaddedSkilllist();
          if (expriencelist.length == 0) {
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

  const addSkill = () => {
    let Body = new FormData();
    {
      editItemId && Body.append('id', editItemId);
    }
    Body.append('industry_id', industryid);
    Body.append('skill_id', skillid);
    {
      dataId1.forEach(item => {
        Body.append('experiences_in_field[]', item);
      });
    }
    postService(apiName.userskill, Body)
      .then(async res => {
        if (res.status == 200) {
          getaddedSkilllist();
          getSkillList();
          experincefieldlist12 = [];
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error for addSkill  api =====================>>', error);
      });
  };
  const searchindustryandskill = (industry_id, skill_id) => {
    let Body = new FormData();
    {
      industry_id && Body.append('industry_id', industry_id);
    }
    {
      skill_id && Body.append('skill_id', skill_id);
    }

    postService(apiName.searchindustryandskill, Body)
      .then(async res => {
        if (res.status == 200) {
          let tempArr = res?.data?.response;

          if (industry_id && !skill_id) {
            var newArray = [];
            tempArr.map(i => {
              newArray.push(i.title);
            });
            setSkilllist(newArray);
            setSkill('');
            setSkill2('');
            setSkillid();
          } else if (!industry_id && skill_id) {
            setIndustry(res?.data?.response[0].industry.name);
            setIndustry2(res?.data?.response[0].industry.name);
            setIndustryid(res?.data?.response[0].industry.id);
          } else if (industry_id && skill_id) {
            if (industry_id != industryid) {
              var newArray = [];
              tempArr.map(i => {
                newArray.push(i.title);
              });
              setSkilllist(newArray);
              setSkill('');
              setSkill2('');
              setSkillid();
            } else if (skill_id != skillid) {
              setIndustry(res?.data?.response[0].industry.name);
              setIndustry2(res?.data?.response[0].industry.name);
              setIndustryid(res?.data?.response[0].industry.id);
            }
          }
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for searchindustryandskill  api =====================>>',
          error,
        );
      });
  };

  const _rendernotiLists = (item, index) => {
    return (
      <View
        onPress={() => { }}
        style={{
          backgroundColor: '#fff',
          borderBottomColor: 'gray',
          borderBottomWidth: 0.3,
          borderTopColor: 'gray',
          justifyContent: 'center',
          height: 100,
          borderTopWidth: index == 0 ? 0.3 : 0,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{ width: '17%', alignSelf: 'center', marginHorizontal: 20 }}>
            <Image
              source={{
                uri:
                  item.experiences == '< 1 month'
                    ? item.industry.without_xp_image
                    : item.industry.with_xp_image,
              }}
              style={{
                borderRadius: 55,
                height: width * (60 / 375),
                width: width * (60 / 375),
              }}></Image>
          </View>
          <View style={{ width: '66%', justifyContent: 'center' }}>
            <View>
              <Text style={{ fontFamily: fonts.Bold }}>
                {I18n.t('skill')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>
                  {item?.skill?.title}
                </Text>
              </Text>

              <Text
                style={{ marginVertical: 5, fontFamily: fonts.Bold }}
                numberOfLines={1}>
                {I18n.t('Experience')} :{' '}
                {item.user_skill_experiences.length == 0 ||
                  item.experiences == '' ? (
                  <Text style={[CommonStyles.SubHeadingText13]}>
                    {I18n.t('noExp')}
                  </Text>
                ) : (
                  <Text style={[CommonStyles.SubHeadingText13]}>
                    {item?.experiences}
                  </Text>
                )}
              </Text>
              {item.user_skill_experiences.length == 0 ? null : (
                <Text style={{ fontFamily: fonts.Bold }}>
                  {I18n.t('Linkedexperience')} :{' '}
                  <Text style={[CommonStyles.SubHeadingText13]}>
                    {item.user_skill_experiences.length}
                  </Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  const _rendernotiLists2 = (item, index) => {
    return (
      <View
        onPress={() => { }}
        style={{
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            fontFamily: fonts.Bold,
            marginHorizontal: 30,
            fontSize: fontsize.Medium,
            marginVertical: 10,
          }}>
          {item.Industryname}
        </Text>
        <SwipeListView
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 120 }}
          keyExtractor={item => {
            item.id;
          }}
          ref={swipelistref}
          data={item.data}
          renderItem={({ item, index }) => _rendernotiLists(item, index)}
          renderHiddenItem={hiddenshow == true ? null : renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          directionalDistanceChangeThreshold={true}
          disableRightSwipe={true}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
    );
  };

  const renderHiddenItem = (rowData, rowMap) => {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFF7EB',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            rowMap[rowData.item.key].closeRow();
            Picker.hide();
            setHiddenshow(true);
            EditSkill(rowData?.item?.id);
          }}
          style={{
            alignItems: 'center',
            bottom: 0,
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            width: 75,
            right: 75,
          }}>
          <Image source={Images.EditText} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Picker.hide();

            Alert.alert(
              I18n.t('deleteskill'),
              I18n.t('suredeleteskill'),
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
              { cancelable: false },
            );
          }}
          style={{
            alignItems: 'center',
            bottom: 0,
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            width: 75,
            right: 10,
          }}>
          <Image source={Images.Delete} />
        </TouchableOpacity>
      </View>
    );
  };
  const _renderexperinecelist = (item, index) => {
    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: colors.disablecolor,
        }}>
        <TouchableOpacity
          style={styles.onSelectDataview}
          onPress={() => {
            onSelectData(item, index);
          }}>
          <Text
            style={{
              color: item.check == true ? colors.black : colors.disablecolor,
            }}>
            {item.experience}
          </Text>
          {item.check == true ? (
            <Image source={Images.RoundCheck} />
          ) : (
            <Image source={Images.RoundUnCheck} />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  const onSelectData = (item, index) => {
    let tempArr1 = experincefieldlist;

    if (item.check == false || !item.check) {
      tempArr1[index].check = true;
      setDataLength(dataLength + 1);
    } else {
      tempArr1[index].check = false;

      if (dataLength >= 1) {
        setDataLength(dataLength - 1);
      }
    }
    setExperincefieldlist([...tempArr1]);
  };
  const onBackPressHandler = () => {
    setNew2(false);
    setDataLength(0);
    setExperiencefieldmodal(false),
      setExperincefieldlist(JSON.parse(JSON.stringify(dataOld)));
    JSON.parse(JSON.stringify(dataOld))?.map(i => {
      if (dataLang1.includes(i.experience) == true && i.check == false) {
        dataLang1.splice(indexOf(i.experience), 1);
        dataId1.splice(indexOf(i.id), 1);
        setDataLength(dataLength - 1);
      }
    });
  };
  const onCancelHandler = () => {
    setNew2(false);
    setDataLength(0);
    setExperiencefieldmodal(false);
    setExperincefieldlist(JSON.parse(JSON.stringify(dataOld)));
    JSON.parse(JSON.stringify(dataOld))?.map(i => {
      if (dataLang1.includes(i.experience) == true && i.check == false) {
        dataLang1.splice(indexOf(i.experience), 1);
        dataId1.splice(indexOf(i.id), 1);
        setDataLength(dataLength - 1);
      }
    });
  };

  const onConfirmHandler = () => {
    setNew2(false);
    setDataLength(0);

    setExperiencefieldmodal(false);
    setDataOld(JSON.parse(JSON.stringify(experincefieldlist)));
    JSON.parse(JSON.stringify(experincefieldlist))?.map(i => {
      if (dataLang1.includes(i.experience) == false && i.check == true) {
        dataLang1.push(i.experience);
        dataId1.push(i.id);
        setDataLength(dataLength + 1);
      } else if (dataLang1.includes(i.experience) == true && i.check == false) {
        dataLang1.splice(dataLang1.indexOf(i.experience), 1);
        dataId1.splice(dataId1.indexOf(i.id), 1);

        setDataLength(dataLength - 1);
      }
    });
  };
  const getExperiencefieldList = skill_id => {
    let Body = new FormData();

    Body.append('skill_id', skill_id);
    postService(apiName.getexperience, Body)
      .then(async res => {
        if (res.status == 200) {
          let tempArr = res?.data?.response;
          var newArray = [];
          tempArr.map(i => {
            newArray.push(i);
          });
        }
        setDataId1([]);
        setExperincefieldlist(newArray);
        experincefieldlist12 = newArray;
        setDataOld(JSON.parse(JSON.stringify(newArray)));
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for getExperiencefieldList  api =====================>>',
          error,
        );
      });
  };
  return (
    <View style={{ backgroundColor: colors.whitebackground, flex: 1 }}>
      <NavBar
        source={Images.backarrow}
        lefttext={I18n.t('Back')}
        navigation={() => {
          props.navigation.goBack();
        }}
        rightText={I18n.t('Skills')}></NavBar>
      <ShowStatusBarWhite />
      {loading == true ? <Loader loading={loading} /> : null}
      {loadingFirst == true ? (
        <Loader loading={loadingFirst} />
      ) : (
        <View style={{ flex: 1 }}>
          {listshow == true ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
              data={expriencelist}
              renderItem={({ item, index }) => _rendernotiLists2(item, index)}
            />
          ) : (
            <View>
              <Image
                source={Images.skilllogo}
                style={{
                  alignSelf: 'center',
                }}></Image>
              <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Text style={styles.timeskills}>{I18n.t('timeskills')}</Text>
                <Text style={styles.Skillsclosely}>
                  {I18n.t('Skillsclosely')}
                </Text>
                <Text style={styles.Skills}>
                  {I18n.t('Skills')}{' '}
                  <Text style={{ fontFamily: fonts.Bold }}>
                    {I18n.t('linked2')}{' '}
                  </Text>
                  {I18n.t('with')}{' '}
                  <Text style={{ fontFamily: fonts.Bold }}>
                    {I18n.t('concretework')}
                  </Text>{' '}
                  {I18n.t('accesscontracts')}
                </Text>
                <Text style={styles.Skillsclosely}>
                  {I18n.t('stillpossible')}
                </Text>
                <Text style={styles.Skillsclosely}>
                  {I18n.t('experienceskill')}
                </Text>
                <Text style={styles.Skillsclosely}>
                  {I18n.t('experiencesaccordingly')}
                </Text>
              </View>
            </View>
          )}
          {listloader == true && (
            <ActivityIndicator
              style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}
              size={'large'}
              color={colors.yellow}
            />
          )}
          <View style={styles.addskillbuttonview}>
            <Button
              buttonStyle={styles.Skillsbutton}
              label={I18n.t('addskill')}
              onPress={() => {
                setExperienceModal(true);
                setNew(true);
                setPosition('');
                setName('');
                setStartDate('');
                setEndDate('');
                setYear(0);
                setMonth(0);
                setEditItemId();
              }}
              isLabel={true}
              buttonTextStyle={[CommonStyles.buttontext]}
            />
          </View>
        </View>
      )}

      {/* modal for skills */}
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
            experincefieldlist12 = [];
            getSkillList();
            setIndustry('');
            setDataLang1([]);
            setSkill('');
            setIndustryid();
            setSkillid();
            getExperiencefieldList();
            setExperienceModal(false);
            setEditmode(false);
            setNew(false);
            setTnc(false);
            setEditItemId(), Picker.hide();
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            style={{ flex: 1 }}>
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
                    { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
                  ]}>
                  <TouchableOpacity
                    style={CommonStyles.backarrowview}
                    onPress={() => {
                      experincefieldlist12 = [];
                      setTnc(false);
                      getSkillList();
                      setIndustryid();
                      setSkillid();
                      getExperiencefieldList();
                      setDataLang1([]);
                      setExperienceModal(false), setIndustry('');
                      setSkill('');
                      setEditmode(false);
                      setNew(false),
                        setName(''),
                        setPosition(''),
                        setStartDate(''),
                        setEndDate(''),
                        Picker.hide(),
                        setEditItemId();
                    }}>
                    <Image source={Images.backarrow}></Image>
                    <Text style={CommonStyles.Backtext}>{I18n.t('Back')}</Text>
                  </TouchableOpacity>
                  <Text
                    style={[CommonStyles.HeadingText12, styles.addskilltext]}>
                    {I18n.t('addskill')}
                  </Text>
                  <View>
                    <View style={{ height: height / 2 }}>
                      <View style={{}}>
                        <Text
                          style={[
                            styles.inputTitle,
                            CommonStyles.HeadingText3,
                            { marginHorizontal: 15 },
                          ]}>
                          {I18n.t('Industry')}
                        </Text>
                        <TouchableOpacity
                          style={[styles.pickerview]}
                          onPress={() => Industry_picker()}>
                          <Image
                            style={styles.downArrowimg}
                            source={Images.downArrow}
                          />
                          <Text
                            editable={false}
                            pointerEvents="none"
                            style={[
                              styles.errorText12,
                              styles.Chooseindustrytext,
                              {
                                color: Industry
                                  ? 'rgb(0,0,0)'
                                  : 'rgb(183,190,197)',
                              },
                            ]}>
                            {`${Industry ? Industry : I18n.t('Chooseindustry')
                              }`}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.errrortext}>
                          {state.eWorkPositionError &&
                            I18n.t(state.eWorkPositionError)}
                        </Text>
                      </View>
                      <View style={{}}>
                        <Text
                          style={[
                            styles.inputTitle,
                            CommonStyles.HeadingText3,
                            { marginHorizontal: 15 },
                          ]}>
                          {I18n.t('skill')}
                        </Text>
                        <TouchableOpacity
                          style={[styles.pickerview]}
                          onPress={() => Skill_picker()}>
                          <Image
                            style={styles.downArrowimg}
                            source={Images.downArrow}
                          />
                          <Text
                            editable={false}
                            pointerEvents="none"
                            style={[
                              styles.errorText12,
                              styles.Chooseindustrytext,
                              {
                                color: Skill
                                  ? 'rgb(0,0,0)'
                                  : 'rgb(183,190,197)',
                              },
                            ]}>
                            {`${Skill ? Skill : I18n.t('Chooseskill')}`}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.errrortext}>
                          {state.eWorkPositionError &&
                            I18n.t(state.eWorkPositionError)}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.inputTitle,
                            CommonStyles.HeadingText3,
                            { marginHorizontal: 15 },
                          ]}>
                          {I18n.t('Experiencefield')}
                        </Text>
                        <TouchableOpacity
                          style={[
                            styles.pickerview,
                            {
                              marginTop: 20,
                            },
                          ]}
                          onPress={() => {
                            setExperiencefieldmodal(true),
                              setNew2(true),
                              setDataLength(dataLang1?.length);
                          }}>
                          <Image
                            style={styles.downArrowimg}
                            source={Images.downArrow}
                          />
                          {dataLang1.length == 0 || dataLang1.length == 1 ? (
                            <Text
                              editable={false}
                              pointerEvents="none"
                              style={[
                                styles.expfield,
                                {
                                  color:
                                    dataLang1.length != 0
                                      ? 'rgb(0,0,0)'
                                      : 'rgb(183,190,197)',
                                },
                              ]}>
                              {`${dataLang1.length == 0
                                  ? I18n.t('Chooseapplicable')
                                  : dataLang1
                                }`}
                            </Text>
                          ) : (
                            <Text
                              editable={false}
                              pointerEvents="none"
                              style={[
                                styles.expfield,
                                {
                                  color:
                                    dataLang1.length != 0
                                      ? 'rgb(0,0,0)'
                                      : 'rgb(183,190,197)',
                                },
                              ]}>
                              {`${I18n.t('Multipleexperiences')} (${dataLang1.length
                                }) `}
                            </Text>
                          )}
                        </TouchableOpacity>
                        <Text style={styles.errrortext}>
                          {state.eWorkPositionError &&
                            I18n.t(state.eWorkPositionError)}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.Confirmview,
                        {
                          position: KeyboardVisible ? 'absolute' : null,
                          bottom: KeyboardVisible ? 60 : null,
                        },
                      ]}>
                      <Button
                        buttonStyle={[
                          styles.buttonStyle1,
                          styles.Confirmbutton,
                          {
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
                          addSkill();
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

        {newView2 == true ? (
          <View
            style={CommonStyles.modalbackview}
            onPress={() => setNew2(false)}></View>
        ) : null}
        {/* modal for experiencefieldmodal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={experiencefieldmodal}
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
                  {experincefieldlist.length == 0 ? (
                    <View
                      style={styles.experiencefieldmodalview}>
                      <View
                        style={styles.cancelview}>
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
                      </View>
                      <Text
                        style={styles.availableexperiencetext}>
                        {I18n.t('availableexperience')}
                      </Text>
                      <Text
                        style={styles.pleaseupdatetext}>
                        {I18n.t('pleaseupdate')}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={styles.expfieldview}>
                      <View
                        style={styles.cancelview}>
                        <TouchableOpacity
                          onPress={() => {
                            onCancelHandler();
                          }}>
                          <Text
                            style={styles.canceltext}>
                            {I18n.t('cancel')}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={styles.canceltext}>
                          {I18n.t('Select')}({dataLength})
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            onConfirmHandler();
                          }}>
                          <Text
                            style={styles.canceltext}>
                            {I18n.t('Confirm')}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <Text
                        style={styles.Experiencestext}>
                        {I18n.t('Experiences')}
                      </Text>

                      <FlatList
                        style={{ marginBottom: 30 }}
                        data={experincefieldlist}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                          _renderexperinecelist(item, index)
                        }
                        keyExtractor={(item, index) => String(index)}
                      />
                    </View>
                  )}
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </Modal>
      {newView == true ? (
        <View
          style={CommonStyles.modalbackview}
          onPress={() => setNew(false)}></View>
      ) : null}
    </View>
  );
};
export default skills;
