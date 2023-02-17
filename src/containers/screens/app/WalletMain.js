import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles/WalletMainstyle';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import Images from '../../../constants/images';
import I18n from '../../../constants/i18n';
import CommonStyles from '../../../assets/css/commonStyles';
import fontsize from '../../../constants/i18n/Fontsizes';
import {width} from '../../../constants/ScreenSize';
import colors from '../../../constants/colors';
import NavBar from '../../components/NavBar';
import EmptyComponent from '../../components/EmptyComponent';
import {SwipeListView} from 'react-native-swipe-list-view';
import Button from '../../components/Button';

export default function WalletMain(props) {
  const [active, setActive] = useState(false);
  const [remember, setRemember] = useState(false);

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

  //invoice history  screen render
  const _rendernotiLists2 = (item, index) => {
    return (
      <View onPress={() => {}} style={styles.rowFront}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{width: '56%'}}>
            <View>
              <Text style={styles.renderbuttonview}>
                Invoice # : {item.Invoice}
              </Text>
              <Text
                style={styles.renderbuttonview2}>
                Date : {item.date}
              </Text>
              <Text
                style={styles.renderbuttonview2}>
                Status : {item.Status}
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
              style={styles.amountview}>
              <Text
                style={styles.amounttext}>
                {item.amount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  //ready to invoice screen render
  const _rendernotiLists = (item, index) => {
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
              <Text style={styles.renderbuttonview}>
                {item.title}
              </Text>
              <Text
                style={styles.renderbuttonview2}>
                {item.date}
              </Text>
              <Text
                style={styles.renderbuttonview2}>
                {item.time}
              </Text>
            </View>
            <Text style={styles.renderbuttonview2}>
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
              style={styles.amountview}>
              <Text
                style={styles.amounttext}>
                {item.amount}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                remember == true ? styles.remember1 : styles.remember,
                {alignSelf: 'center', marginLeft: width * (10 / 375)},
              ]}
              onPress={() => setRemember(!remember)}>
              {remember == true && (
                <Image source={Images.Check} style={styles.remember_img} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Image source={Images.messagelisticon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Image source={Images.qustionmarkicon} />
      </TouchableOpacity>
    </View>
  );
  const renderHiddenItem2 = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Image source={Images.Import} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          props.navigation.navigate('InviteFriends');
        }}>
        <Image source={Images.share} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ShowStatusBarWhite />
      <NavBar
        source={Images.Settingicon}
        rightText={I18n.t('Wallet')}
        navigation={() => {
          props.navigation.navigate('Invoicesettings');
        }}></NavBar>
      <View
        style={styles.readybutton}>
        <TouchableOpacity
          style={[styles.commonbutton,{
            
            borderColor: active == true ? colors.yellow : colors.white,
            borderWidth:
              active == false ? width * (0 / 375) : width * (1 / 375),
            backgroundColor: active == false ? colors.yellow : colors.white,
          }]}
          onPress={() => {
            setActive(false);
          }}>
          <Text
            style={{
              color: active == true ? colors.yellow : colors.white,
              fontSize: fontsize.Regular,
            }}>
            {I18n.t('Readyinvoice')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.commonbutton,{
            
            borderColor: colors.yellow,
            borderWidth:
              active == false ? width * (1 / 375) : width * (0 / 375),
            backgroundColor: active == true ? colors.yellow : colors.white,
          }]}
          onPress={() => {
            setActive(true);
          }}>
          <Text
            style={{
              color: active == true ? colors.white : colors.yellow,
              fontSize: fontsize.Regular,
            }}>
            {I18n.t('Invoicehistory')}
          </Text>
        </TouchableOpacity>
      </View>
      {active == false ? (
        <View style={{flex: 1}}>
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
          <View style={{alignItems: 'center'}}>
            <Button
              buttonStyle={styles.Createinvoicebutton}
              label={I18n.t('Createinvoice')}
              onPress={() => {
                props.navigation.navigate('InvoiceCreation');
              }}
              isLabel={true}
              buttonTextStyle={[CommonStyles.buttontext]}
            />
          </View>
        </View>
      ) : (
        <SwipeListView
          data={dataArr}
          renderItem={({item, index}) => _rendernotiLists2(item, index)}
          renderHiddenItem={renderHiddenItem2}
          ListEmptyComponent={() => <EmptyComponent />}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          disableRightSwipe={true}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      )}
    </View>
  );
}
