import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import NavBar from '../../components/NavBar';
import Images from '../../../constants/images';
import styles from './styles/home';
import I18n from '../../../constants/i18n';
import {Container, Content} from 'native-base';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import colors from '../../../constants/colors';
import fontsize from '../../../constants/i18n/Fontsizes';
import SearchBar from '../../components/SearchBar';
import {width} from '../../../constants/ScreenSize';
import EmptyComponent from '../../components/EmptyComponent';
import {SwipeListView} from 'react-native-swipe-list-view';
const Messenger = props => {
  const dataArr = [
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
  const _rendernotiLists = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Chat');
        }}
        style={[styles.rowFront, {}]}>
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
              <Text style={{fontSize: fontsize.Regular, marginVertical: 2}}>
                {item.title}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              right: width * (30 / 375),
              flexDirection: 'row',
            }}>
            <View
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
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft, {right: 20}]}>
        <Image source={Images.Delete} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight, {right: 80}]}>
        <Image source={Images.Messangericon} />
      </TouchableOpacity>
    </View>
  );
  return (
    <Container style={styles.container}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Messenger')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />
      <View style={{flexDirection: 'row'}}>
        <SearchBar
          Viewstyle={{width: '90%', marginLeft: 15}}
          containerStyle={{width: '87%'}}
          placeholdervalue={I18n.t('Search')}
          placeholderTextColor={colors.gray}
          inputstyle={{color: colors.black}}
          clicked={true}
        />
        <TouchableOpacity style={{alignSelf: 'center', marginTop: 15}}>
          <Image style={{alignSelf: 'center'}} source={Images.Plus} />
        </TouchableOpacity>
      </View>
      <Content>
        <SwipeListView
          data={dataArr}
          renderItem={({item, index}) => _rendernotiLists(item, index)}
          renderHiddenItem={renderHiddenItem}
          ListEmptyComponent={() => <EmptyComponent />}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          disableRightSwipe={true}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </Content>
    </Container>
  );
};

export default Messenger;
