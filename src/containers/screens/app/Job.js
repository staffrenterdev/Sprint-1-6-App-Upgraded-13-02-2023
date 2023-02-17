import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import NavBar from '../../components/NavBar';
import Images from '../../../constants/images';
import styles from './styles/Jobstyle';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import colors from '../../../constants/colors';
import fontsize from '../../../constants/i18n/Fontsizes';
import SearchBar from '../../components/SearchBar';
import { width} from '../../../constants/ScreenSize';
import * as Progress from 'react-native-progress';
import EmptyComponent from '../../components/EmptyComponent';
import fonts from '../../../constants/fonts';
import {SwipeListView} from 'react-native-swipe-list-view';
const Job = props => {
  const [active, setActive] = useState(false);
  const [isprofilecomplete, setIsprofilecomplete] = useState(false);
  const dataArr = [
    {
      id: 1,
      key: 'cook',
      title: 'Restaurant Busboy',
      text: 'Restaurant X',
      image: Images.joblistimage,
      discription: 'Confidential client untill you applied',
      amount: '$14.00/hr',
      esr: '$30k/year',

      city: 'Montreal',
    },
    {
      id: 2,
      key: 'Waiter',
      title: 'General manager',
      text: 'Restaurant X',
      image: Images.joblistimage,
      discription: 'Confidential client untill you applied',
      amount: '$36.00/hr',
      esr: '$75k/year',

      city: 'Montreal',
    },
    {
      id: 3,
      key: 'P.S.a',
      title: 'Line cook - Breakfast',
      text: 'Restaurant X',
      discription: 'Confidential client untill you applied',
      image: Images.joblistimage,
      amount: '$21.00/hr',
      esr: '$48k/year',

      city: 'Montreal',
    },
    {
      id: 4,
      key: 'dishwasher',
      title: 'Receptionist - lawyer cabinet',
      discription: 'Confidential client untill you applied',
      image: Images.joblistimage,
      amount: '$36.00/hr',
      esr: '$75k/year',
      city: 'Montreal',
    },
  ];
  const dataArr1 = [
    {
      id: 1,
      key: 'cook',
      title: 'Restaurant Busboy',
      Status: 'Pending',
      text: 'Restaurant X',
      image: Images.flatlist1,
      discription: 'Confidential client untill you applied',
      amount: '$14.00/hr',
      esr: '$30k/year',
      date: 'Jan 23, 2022',
      time: '09:00AM - 05:00PM',
      Invoice: '20210302-01',
      city: 'Montreal',
    },
    {
      id: 2,
      key: 'Waiter',
      title: 'General manager',
      text: 'Restaurant X',
      image: Images.flatlist1,
      discription: 'Confidential client untill you applied',
      amount: '$36.00/hr',
      esr: '$75k/year',
      Invoice: '20210302-01',
      date: 'Jan 23, 2022',
      time: '09:00AM - 05:00PM',
      Status: 'Success',
      city: 'Montreal',
    },
    {
      id: 3,
      key: 'Waiter',
      title: 'General manager',
      text: 'Restaurant X',
      image: Images.flatlist1,
      discription: 'Confidential client untill you applied',
      amount: '$36.00/hr',
      esr: '$75k/year',
      Invoice: '20210302-01',
      date: 'Jan 23, 2022',
      time: '09:00AM - 05:00PM',
      Status: 'Success',
      city: 'Montreal',
    },
    {
      id: 4,
      key: 'Waiter',
      title: 'General manager',
      text: 'Restaurant X',
      image: Images.flatlist1,
      discription: 'Confidential client untill you applied',
      amount: '$36.00/hr',
      esr: '$75k/year',
      Invoice: '20210302-01',
      date: 'Jan 23, 2022',
      time: '09:00AM - 05:00PM',
      Status: 'Success',
      city: 'Montreal',
    },
  ];
  const _rendernotiLists1 = (item, index) => {
    return (
      <View onPress={() => {}} style={styles.rowFront}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '17%', alignSelf: 'center', marginRight: 9}}>
            <Image
              source={item.image}
              style={{
                height: width * (60 / 375),
                width: width * (60 / 375),
              }}></Image>
          </View>
          <View style={{width: '56%'}}>
            <View>
              <Text style={styles._rendernotiLists1title}>
                {item.title}
              </Text>
              <Text
                style={styles._rendernotiLists1title2}>
                {item.date}
              </Text>
              <Text
                style={styles._rendernotiLists1title2}>
                {item.time}
              </Text>
            </View>
            <Text style={styles._rendernotiLists1title2}>
              {I18n.t('ID')} : {item.id}
            </Text>
          </View>

          <View
            style={{
              alignSelf: 'center',
              right: width * (30 / 375),
              flexDirection: 'row',
            }}>
            <View
              style={styles._rendernotiLists1amount}>
              <Text
                style={styles._rendernotiLists1amounttext}>
                {item.amount}
              </Text>
            </View>
            {active == true ? (
              <Image
                source={Images.jobstatuslable}
                style={styles.jobstatuslable}></Image>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('FollowUp');
        }}
        style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Image source={Images.qustionmarkicon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.backRightBtn,
          styles.backRightBtnRight,
        ]}></TouchableOpacity>
    </View>
  );
  const _rendernotiLists = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Jobdetails');
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderBottomWidth: 0.2,
          padding: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '17%', alignSelf: 'center', marginRight: 9}}>
            <Image
              source={item.image}
              style={{
                height: width * (60 / 375),
                width: width * (60 / 375),
              }}></Image>
          </View>
          <View style={{width: '56%'}}>
            <View>
              <Text
                style={{fontSize: 15, color: colors.gray, marginVertical: 2}}>
                {item.discription}
              </Text>
              <Text style={{fontSize: fontsize.Regular, marginVertical: 2}}>
                {item.title}
              </Text>
            </View>
            <Text style={{fontSize: 15, color: colors.gray, marginVertical: 2}}>
              {I18n.t('City')} : {item.city}
            </Text>
          </View>

          <View style={{alignSelf: 'center', marginTop: width * (30 / 375)}}>
            <TouchableOpacity
              style={{
                borderRadius: width * (30 / 375),
                height: width * (30 / 375),
                borderColor: colors.yellow,
                borderWidth: width * (1 / 375),

                alignItems: 'center',

                backgroundColor: colors.white,
                width: width * (80 / 375),
                justifyContent: 'space-evenly',
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                {item.amount}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: width * (10 / 375),
              }}>
              <Image source={Images.Dollar} style={{}}></Image>
              <Text>{item.esr}</Text>
            </View>
          </View>
        </View>
        {active == true ? (
          <Image
            source={Images.jobstatuslable}
            style={{
              width: 60,
              height: 60,
              position: 'relative',
              bottom: width * (17 / 375),
            }}></Image>
        ) : null}
      </TouchableOpacity>
    );
  };
  return (
    <Container style={styles.container}>
      <NavBar rightText={I18n.t('Job_Portal')}></NavBar>
      <ShowStatusBarWhite />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={styles.Jobslistview}>
          <TouchableOpacity
            onPress={() => {
              setActive(false);
            }}
            style={[styles.Jobslistview2,{
              
              backgroundColor: active == false ? colors.yellow : colors.white,
            }]}>
            <Text
              style={{
                color: active == false ? colors.white : colors.gray,
                fontSize: fontsize.Regular,
              }}>
              {I18n.t('Jobslist')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActive(true);
            }}
            style={[styles.Jobslistview3,{
             
              backgroundColor: active == true ? colors.yellow : colors.white,
            }]}>
            <Text
              style={{
                color: active == true ? colors.white : colors.gray,
                fontSize: fontsize.Regular,
              }}>
              {I18n.t('Myapplications')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Jobfilter', {backcheck: true});
          }}>
          <Image
            style={{marginRight: 30, marginTop: 10}}
            source={Images.filter}></Image>
        </TouchableOpacity>
      </View>
      <SearchBar
        placeholdervalue={I18n.t('Search')}
        placeholderTextColor={colors.gray}
        inputstyle={{color: colors.black}}
        clicked={true}
      />
      {isprofilecomplete ? (
        <View style={{flex: 1}}>
          <Image
            source={Images.JobCompleteProfile}
            style={{
              alignSelf: 'center',
              marginTop: width * (50 / 375),
            }}></Image>

          <Text
            style={styles.Beforebeingtext}>
            {I18n.t('Beforebeing')}
          </Text>

          <View
            style={{
              marginTop: width * (40 / 375),
              flexDirection: 'row',
            }}>
            <View style={{alignSelf: 'center', marginHorizontal: 10}}>
              <Progress.Circle
                textStyle={{fontSize: fontsize.Regular, fontFamily: fonts.Bold}}
                size={60}
                showsText={true}
                thickness={5}
                progress={25 / 100}
                unfilledColor={'#E0E0E0'}
                color={'rgba(253, 191, 90, 1)'}
                borderWidth={0}
              />
            </View>
            <View style={{marginHorizontal: 20}}>
              <View>
                <Text
                  style={styles.Complete_profile}>
                  {I18n.t('Complete_profile')}
                </Text>
              </View>
              <Text style={styles.Complete_profile_text1}>
                {I18n.t('Complete_profile_text1')}
              </Text>
              <Text style={styles.Complete_profile_text1}>
                {I18n.t('Complete_profile_text2')}
              </Text>
              <Text style={styles.Complete_profile_text1}>
                {I18n.t('Complete_profile_text3')}
              </Text>
            </View>
            <View style={{alignSelf: 'center', marginHorizontal: 10}}>
              <TouchableOpacity
                style={[styles.completeProfilebutton,{
                

                  borderWidth:
                    active == false ? width * (1 / 375) : width * (0 / 375),
                  backgroundColor:
                    active == false ? colors.white : colors.yellow,
                }]}
                onPress={() => {
                  props.navigation.navigate('completeProfile');
                }}>
                <Text
                  style={{
                    color: active == true ? colors.white : colors.yellow,
                    fontSize: 14,
                  }}>
                  {I18n.t('complete')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : active == false ? (
        <FlatList
          data={dataArr}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyComponent />}
          renderItem={({item, index}) => _rendernotiLists(item, index)}
          keyExtractor={(item, index) => String(index)}
        />
      ) : (
        <View style={{flex: 1}}>
          <SwipeListView
            data={dataArr1}
            renderItem={({item, index}) => _rendernotiLists1(item, index)}
            renderHiddenItem={renderHiddenItem}
            ListEmptyComponent={() => <EmptyComponent />}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewRowKey={'0'}
            disableRightSwipe={true}
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        </View>
      )}

    
    </Container>
  );
};

export default Job;
