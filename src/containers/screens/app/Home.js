import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  SafeAreaView,
  Alert,
  Modal,
  ScrollView,
  Platform,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Images from '../../../constants/images';
import I18n from '../../../constants/i18n';
import CircularProgress from 'react-native-circular-progress-indicator';
import { connect } from 'react-redux';
import { ShowStatusBarYellow } from '../../components/Statusbar';
import colors from '../../../constants/colors';
import { width } from '../../../constants/ScreenSize';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
import { AuthContext } from '../../../containers/context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { SUCCESS, ERROR, LOADING } from '../../../redux/constants/reduxConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import homeA from '../../../redux/actions/homeA';
import { handleErrorTwo } from '../../components/ErrorComponent';
import styles from './styles/home';
import CommonStyles from '../../../assets/css/commonStyles';
import LogoutA from '../../../redux/actions/LogoutA';
const Home = props => {
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [exitApp, SETexitApp] = React.useState(false);
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState('');
  let dataArr = [
    {
      title: 'Profile verified',
      description:
        'When you provided an I.D. and made an official interview with a recruiter.',
      image: Images.award1,
    },
    {
      title: 'First 10 contracts',
      description: 'When you fully completed 10 different contracts.',
      image: Images.award2,
    },
    {
      title: 'Popular',
      description: 'When you worked more than 80 hours in the past 30 days.',
      image: Images.award3,
    },
    {
      title: 'G.O.A.T',
      description:
        'When you had 20 good recommendations in line without a bad one.',
      image: Images.award4,
    },
    {
      title: 'Fully vaccinated',
      description:
        'When you uploaded your vaccination passport in the documents section and it has been verified.',
      image: Images.award5,
    },
    {
      title: 'References checked',
      description:
        'When you have submitted at least 2 references that has been verified.',
      image: Images.award6,
    },
  ];
  const [profilepersentage, setprofilepersentage] = useState();

  const SignItOut = ({ navigator, agreeLogout = false }) => {
    const { logout } = React.useContext(AuthContext);

    const onSignOut = () => {
      if (agreeLogout) {
        logout();
      }
    };

    return <Text style={{ width: 0, height: 0 }} onPress={onSignOut()}></Text>;
  };
  React.useEffect(() => {
    AsyncStorage.getItem('user').then(lang => {
      var val = JSON.parse(lang);
      setImage(val?.profile_image);
      global.markerImage = val?.profile_image;
      global.userName = val?.name;
      setName(val.name);
    });
  });
  const [active, setActive] = useState(false);
  const [BadgeModal, setBadgeModal] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [UserName, setUserName] = useState('');
  const [JoinDate, setJoinDate] = useState('');
  const _rendernotiLists = (item, index) => {
    return (
      <View
        style={styles._rendernotiListsview}>
        <Image style={{ marginRight: 10 }} source={item.image} />
        <View style={{ width: '80%' }}>
          <Text
            style={styles._rendernotiListstitle}>
            {item.title}
          </Text>
          <Text>{item.description}</Text>
        </View>
      </View>
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (exitApp == false) {
          SETexitApp(true);
          Alert.alert(
            I18n.t('backHandler'),
            '',
            [
              {
                text: I18n.t('No'),
                onPress: () => {
                  SETexitApp(false);
                },
                style: 'cancel',
              },
              { text: I18n.t('yes'), onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false },
          );
          return true;
        } else if (exitApp == true) {
          BackHandler.exitApp();
        }

        setTimeout(() => {
          SETexitApp(false);
        }, 1500);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const logout = () => {
    Alert.alert(
      I18n.t('Logout'),
      I18n.t('aresure'),
      [
        {
          text: I18n.t('cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {
          text: I18n.t('OK'),
          onPress: () => {
            global.quiz_status = '';
            setAgreeLogout(true);
            let body = new FormData();
            body.append('token', global.apiToken);
            props.logoutRequest(body);
            props.logoutRequest(body);
            global.apiToken = '';
          },
        },
      ],
      { cancelable: false },
    );
  };
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      // Do something when the screen blurs
      setTimeout(() => {

        setprofilepersentage();
      }, 500);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      setTimeout(() => {
        props.homeRequest();
      }, 100);
    });
    return unsubscribeOnBlur;
  }, []);
  useEffect(() => {
    const homeRes = props.homeRes.homeR;
    if (homeRes.status == LOADING) {
      setLoading(true);
    } else if (homeRes.status == SUCCESS) {
      setProfileImage(homeRes.value.data.response.profile_image);
      setUserName(homeRes.value.data.response.name);
      console.log('homeeeeeeeee', homeRes)
      setJoinDate(homeRes.value.data.response.join_date);
      setLoading(false);
      setTimeout(() => {

        setprofilepersentage(homeRes.value.data.response.profile_complete);
      }, 2000);

      props.defaultRequest();
    } else if (homeRes.status == ERROR) {
      setLoading(false);
      setAgreeLogout(handleErrorTwo(homeRes));
      props.defaultRequest();
    }
  }, [props.homeRes]);
  console.log('profilepersentageprofilepersentage',profilepersentage)
  return (
    <View style={{ backgroundColor: colors.whitebackground, flex: 1 }}>
      {Platform.OS == 'android' && <ShowStatusBarYellow />}
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <ImageBackground
        source={Images.ProfileBackground}
        style={{ height: Platform.OS == 'ios' ? 230 : 170 }}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ProfileInformation');
              }}>
              <Image style={styles.profileImage} source={{ uri: profileImage }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Messenger');
              }}>
              <Image style={styles.ChatIcon} source={Images.ChatIcon} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text numberOfLines={1} style={styles.UserName}>{UserName}</Text>
            <TouchableOpacity
              onPress={() => {
                setBadgeModal(true);
              }}>
              <Image
                style={{ marginRight: width * (20 / 375) }}
                source={Images.profilebadge}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.Joined}>
            {I18n.t('Joined')} {JoinDate}
          </Text>
        </SafeAreaView>
      </ImageBackground>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{ flexDirection: 'row', marginBottom: 15, padding: 1 }}>
        <View style={styles.sameview}>
          <Text style={styles.sameviewtext}>0</Text>
          <View style={styles.imageview}>
            <Image style={styles.imagestyle} source={Images.RightIcon} />
            <Text style={styles.imagetext}>{I18n.t('Contracts_done')}</Text>
          </View>
        </View>
        <View style={styles.sameview}>
          <Text style={styles.sameviewtext}>0</Text>
          <View style={styles.imageview}>
            <Image style={styles.imagestyle} source={Images.LikeIcon} />
            <Text style={styles.imagetext}>{I18n.t('Recommendations')}</Text>
          </View>
        </View>
        <View style={styles.sameview}>
          <Text style={styles.sameviewtext}>$0.00</Text>
          <View style={styles.imageview}>
            <Image style={styles.imagestyle} source={Images.DollarIcon} />
            <Text style={styles.imagetext}>{I18n.t('Money_earned')}</Text>
          </View>
        </View>
        <View style={styles.sameview}>
          <Text style={styles.sameviewtext}>0</Text>
          <View style={styles.imageview}>
            <Image style={styles.imagestyle} source={Images.ClockIcon} />
            <Text style={styles.imagetext}>{I18n.t('Hoursdone')}</Text>
          </View>
        </View>
        <View style={styles.sameview}>
          <Text style={styles.sameviewtext}>0</Text>
          <View style={styles.imageview}>
            <Image style={styles.imagestyle} source={Images.Cancelicon} />
            <Text style={styles.imagetext}>{I18n.t('Cancellation22')}</Text>
          </View>
        </View>
      </ScrollView>
      <ScrollView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ marginVertical: width * (15 / 375) }}>
          <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('completeProfile');
          }}
            style={{
              flexDirection: 'row',
            }}>
            {
              profilepersentage ?
                <View style={{ alignSelf: 'center', marginHorizontal: 10 }}>
                  <CircularProgress
                    value={profilepersentage}
                    radius={30}
                    duration={0}
                    activeStrokeWidth={6}
                    inActiveStrokeWidth={6}
                    progressValueStyle={{ fontFamily: fonts.Bold, color: colors.yellow }}
                    maxValue={100}
                    valueSuffix={'%'}
                    titleColor={colors.yellow}
                    activeStrokeColor={colors.yellow}
                    inActiveStrokeColor={'#e0e0e0'}
                    titleStyle={{ fontFamily: fonts.Bold, fontSize: fontsize.Regular }}
                  />
                </View>
                : <View style={{ alignSelf: 'center', marginHorizontal: 17 }}>
                  <ActivityIndicator style={{ alignSelf: 'center', marginLeft: 10 }} size={'large'} color={colors.yellow}
                  />
                </View>
            }
            <View style={{ marginHorizontal: 20 }}>
              <View>
                <Text
                  style={{ fontSize: fontsize.Regular, fontFamily: fonts.Bold }}>
                  {I18n.t('Complete_profile')}
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: colors.gray }}>
                {I18n.t('Complete_profile_text1')}
              </Text>
              <Text style={{ fontSize: 12, color: colors.gray }}>
                {I18n.t('Complete_profile_text2')}
              </Text>
              <Text style={{ fontSize: 12, color: colors.gray }}>
                {I18n.t('Complete_profile_text3')}
              </Text>
            </View>
            <View style={{ alignSelf: 'center', marginHorizontal: 5 }}>
              <View
                style={{
                  borderRadius: width * (30 / 375),
                  height: width * (30 / 375),
                  borderColor: colors.yellow,
                  borderWidth:
                    active == false ? width * (1 / 375) : width * (0 / 375),
                  alignItems: 'center',

                  backgroundColor:
                    active == false ? colors.white : colors.yellow,
                  width: width * (80 / 375),
                  justifyContent: 'space-evenly',
                }}
                >
                <Text
                  style={{
                    color: active == true ? colors.white : colors.yellow,
                    fontSize: fontsize.Small,
                    fontFamily: fonts.Bold,
                  }}>
                  {I18n.t('complete')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* <View
            style={{
              height: '100%',
              width: 1,
              backgroundColor: colors.yellow,
              marginHorizontal: 5,
            }}></View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
            }}>
            <View style={{ alignSelf: 'center', marginHorizontal: 10 }}>
              <Image source={Images.VideoIcon} />
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <View>
                <Text
                  style={{ fontSize: fontsize.Regular, fontFamily: fonts.Bold }}>
                  {I18n.t('Interviewrecruiter')}
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: colors.gray }}>
                Date: March 21, 2022
              </Text>
              <Text style={{ fontSize: 12, color: colors.gray }}>
                Hour : 4:00 PM
              </Text>
            </View>
            <View style={{ alignSelf: 'center', marginHorizontal: 15 }}>
              <TouchableOpacity
                style={{
                  borderRadius: width * (30 / 375),
                  height: width * (30 / 375),
                  borderColor: colors.yellow,
                  borderWidth:
                    active == false ? width * (1 / 375) : width * (0 / 375),
                  alignItems: 'center',

                  backgroundColor:
                    active == false ? colors.white : colors.yellow,

                  width: width * (80 / 375),
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    color: active == true ? colors.white : colors.yellow,
                    fontSize: 14,
                  }}>
                  {I18n.t('start')}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity> */}
        </ScrollView>

        <View>
          <Text
            style={styles.Accounttext}>
            {I18n.t('Account')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ProfileInformation');
            }}
            style={styles.TouchableOpacityview}>
            <Text style={{ marginLeft: 50 }}>{I18n.t('MyInformation')}</Text>
            <Image
              style={{ marginRight: 30, resizeMode: 'contain' }}
              source={Images.LeftarrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('WorkExperience');
            }}
            style={styles.TouchableOpacityview}>
            <Text style={{ marginLeft: 50 }}>{I18n.t('Professionsection')}</Text>
            <Image
              style={{ marginRight: 30, resizeMode: 'contain' }}
              source={Images.LeftarrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Profile_settings');
            }}
            style={[styles.TouchableOpacityview, {
              borderBottomWidth: 1,
              borderBottomColor: '#ececec',

            }]}>
            <Text style={{ marginLeft: 50 }}>{I18n.t('Profilesettings')}</Text>
            <Image
              style={{ marginRight: 30, resizeMode: 'contain' }}
              source={Images.LeftarrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('InviteFriends');
            }}
            style={styles.TouchableOpacityview2}>
            <Text style={{ marginLeft: 50 }}>{I18n.t('Invite')}</Text>
            <Image
              style={{ marginRight: 30, resizeMode: 'contain' }}
              source={Images.LeftarrowIcon}
            />
          </TouchableOpacity>

          <Text
            style={styles.Accounttext}>
            {I18n.t('Support')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Help');
            }}
            style={[styles.TouchableOpacityview, {
              borderBottomWidth: 1,
              borderBottomColor: '#ececec',

            }]}>
            <Text style={{ marginLeft: 50 }}>{I18n.t('Help')}</Text>
            <Image
              style={{ marginRight: 30, resizeMode: 'contain' }}
              source={Images.LeftarrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('AboutUs');
            }}
            style={styles.TouchableOpacityview2}>
            <Text style={{ marginLeft: 50 }}>{I18n.t('Aboutus')}</Text>
            <Image
              style={{ marginRight: 30, resizeMode: 'contain' }}
              source={Images.LeftarrowIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: 'center', marginVertical: 20 }}
            onPress={() => {
              logout();
            }}>
            <Text
              style={{
                color: colors.yellow,
                fontSize: fontsize.Large,
              }}>
              {I18n.t('Logout')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={BadgeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: colors.modelBackground,
            marginBottom: 0,
          }}>
          <View
            style={{
              marginTop: 250,
              backgroundColor: colors.white,
              borderTopLeftRadius: width * (20 / 375),
              borderTopRightRadius: width * (20 / 375),
            }}>
            <TouchableOpacity
              style={CommonStyles.backarrowview}
              onPress={() => setBadgeModal(false)}>
              <Image source={Images.backarrow}></Image>
              <Text
                style={CommonStyles.Backtext}>
                {I18n.t('Back')}
              </Text>
            </TouchableOpacity>

            <View style={{}}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: fontsize.Large,
                  fontFamily: fonts.Medium,
                  marginBottom: 40,
                }}>
                {I18n.t('Badges')}
              </Text>

              <FlatList
                data={dataArr}
                contentContainerStyle={{ paddingBottom: 150 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => _rendernotiLists(item, index)}
                keyExtractor={(item, index) => String(index)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    logoutRes: state,
    homeRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutRequest: () => {
      dispatch(LogoutA());
    },
    homeRequest: () => {
      dispatch(homeA());
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
