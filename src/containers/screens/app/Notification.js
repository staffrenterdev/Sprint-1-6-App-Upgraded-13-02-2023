import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import NavBar from '../../components/NavBar';
import Images from '../../../constants/images';
import I18n from '../../../constants/i18n';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import colors from '../../../constants/colors';
import {width} from '../../../constants/ScreenSize';
import fontsize from '../../../constants/i18n/Fontsizes';
import styles from './styles/Notificationstyle';
import EmptyComponent from '../../components/EmptyComponent';

const Notification = props => {
  const [active, setActive] = useState(false);
  let dataArr = [
    {
      title: 'Contract confirmed',
      description: 'Client : Julien Leblanc Traiteur',
      date: 'Date : July 17, 2022',
      time: '8h00 AM to 5h00 PM',
      comingtime: '37min',
    },
    {
      title: 'Interview with recruiter',
      description: 'You have an interview scheduled with Staff Renter',
      date: 'July 12, 2022',
      time: '8h00 AM',
      comingtime: '1h',
    },
    {
      title: 'Contract confirmed',
      description: 'Client : Traiteur Brera',
      date: 'July 17, 2022',
      time: '8h00 AM to 10h00 PM',
      comingtime: '4h',
    },
  ];
  const _rendernotiLists = (item, index) => {
    return (
      <TouchableOpacity style={styles.itemView}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={styles.titleText}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: fontsize.Regular,
                alignSelf: 'flex-end',
                marginBottom: width * (15 / 375),
              }}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {item.comingtime}
            </Text>
          </View>
          <Text
            style={styles.NormalText}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {item.description}
          </Text>
          <Text
            style={styles.NormalText}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {I18n.t('Date')} : {item.date}
          </Text>
        </View>
        <Text style={styles.NormalText}>
          {I18n.t('Time')} : {item.time}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.drawer}
        rightText={I18n.t('Notifications')}
        navigation={() => props.navigation.openDrawer()}></NavBar>
      <ShowStatusBarWhite />
      <View
        style={styles.buttonalign}>
        <TouchableOpacity
          style={[styles.samebutton,{
           
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
            {I18n.t('All')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.samebutton,{
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
            {I18n.t('NotRead')}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataArr}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => _rendernotiLists(item, index)}
        keyExtractor={(item, index) => String(index)}
        ListEmptyComponent={<EmptyComponent />}
      />
    </View>
  );
};

export default Notification;
