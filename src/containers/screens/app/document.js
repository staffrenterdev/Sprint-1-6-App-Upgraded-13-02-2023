import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import NavBar from '../../components/NavBar';
import {height, width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import styles from '../../screens/app/styles/experience';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import SignItOut from '../../components/SignItOut';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import Loader from '../../components/loader';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
import {SwipeListView} from 'react-native-swipe-list-view';
import moment from 'moment';

const document = props => {
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const swipelistref = useRef();
  const [hiddenshow, setHiddenshow] = useState(false);
  let dataNew = ['nff', 'ddd', 'bbb', 'ssss'];
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
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {});

    return unsubscribeOnBlur;
  }, []);
  const expand = (id, index) => {
    var faqsArr = PrivacyPolicyData;
    faqsArr.map(i => {
      if (i.id == id && i.expand == true) {
        i.expand = !i.expand;

        ref.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      } else if (i.id == id) {
        i.expand = !i.expand;
        if (index == 0) {
          ref.scrollTo({
            x: 0,
            y: 0,
            animated: true,
          });
        } else {
          var newlet = index * 60;
          var newlng = index * 25;
          setTimeout(() => {
            ref.scrollTo({
              x: 0,
              y: newlet + newlng,
              animated: true,
            });
          }, 100);
        }
      } else {
        i.expand = false;
      }
    });
    setPrivacyPolicyData(faqsArr => [...faqsArr]);
  };
  const _renderDocumentList = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            expand(item.id, index);
          }}
          style={{
            borderTopWidth: 0.5,
            borderTopColor: colors.disablecolor,
            width: '100%',
          }}>
          <View
            style={{
              marginBottom: 0,
              justifyContent: 'space-evenly',
              height: 70,
              marginHorizontal: 15,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={[styles.viewstyle3, {alignItems: 'flex-start'}]}>
              <Text
                style={[
                  CommonStyles.HeadingText3,
                  {fontFamily: fonts.Bold, fontSize: fontsize.Regular},
                ]}>
                {I18n.t('Curriculum')}
              </Text>
            </View>
            <View style={[styles.viewstyle1, {}]}>
              <Image source={Images.downArrow}></Image>
            </View>
          </View>
        </TouchableOpacity>
        {/* {item.expand && ( */}
        <SwipeListView
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{paddingBottom: 120}}
          keyExtractor={item => {
            item.id;
          }}
          ref={swipelistref}
          data={dataArr}
          renderItem={({item, index}) => _rendernotiLists(item, index)}
          renderHiddenItem={hiddenshow == true ? null : renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          directionalDistanceChangeThreshold={true}
          disableRightSwipe={true}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
        {/* )} */}
      </View>
    );
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
                {I18n.t('Title')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>{item.name}</Text>
              </Text>

              <Text style={{fontFamily: fonts.Bold}}>
                {I18n.t('Uploadeddate')} :{' '}
                <Text style={[CommonStyles.SubHeadingText13]}>
                  {moment(item.from_date).format('MMMM YYYY')}
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
            setHiddenshow(true);
            EditExperience(rowData?.item?.id);
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
  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}
        rightText={I18n.t('Document')}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={loading} />
      <FlatList
        data={dataNew}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => _renderDocumentList(item, index)}
        keyExtractor={(item, index) => String(index)}
      />
    </Container>
  );
};

export default document;
