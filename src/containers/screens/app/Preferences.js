import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import NavBar from '../../components/NavBar';
import Images from '../../../constants/images';
import I18n from '../../../constants/i18n';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import colors from '../../../constants/colors';
import {width} from '../../../constants/ScreenSize';
import fontsize from '../../../constants/i18n/Fontsizes';
import styles from './styles/Preferencesstyle';
import SearchBar from '../../components/SearchBar';
import fonts from '../../../constants/fonts';

const Preferences = props => {
  const [active, setActive] = useState(false);
  const dataArr = [
    {
      id: 1,
      key: 'cook',
      title: 'Foiegwa restaurant',
      image: Images.flatlist1,
      discription: '15 contracts available',
    },
    {
      id: 2,
      key: 'cook',
      title: 'Barroco restaurant',
      image: Images.flatlist2,
      discription: '4 contracts available',
    },
    {
      id: 3,
      key: 'cook',
      title: 'Ambiance Ile des Soeurs',
      image: Images.flatlist1,
      discription: '0 contract available',
    },
  ];
  const _rendernotiLists = (item, index) => {
    return (
      <View onPress={() => {}} style={[styles.rowFront, {}]}>
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
              <Text style={styles._rendernotiListstitle}>
                {item.title}
              </Text>
              <Text style={styles._rendernotiListstitle}>
                {item.discription}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              right: width * (30 / 375),
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderRadius: width * (30 / 375),
                height: width * (30 / 375),
                borderColor: active == true ? colors.red : colors.yellow,
                borderWidth: width * (1 / 375),

                alignItems: 'center',

                backgroundColor: colors.white,

                width: width * (80 / 375),
                justifyContent: 'space-evenly',
              }}>
              {active == false ? (
                <Text
                  style={[styles.Removetext,{
                    color: colors.yellow,
                   
                  }]}>
                  {I18n.t('Remove')}
                </Text>
              ) : (
                <Text
                style={[styles.Removetext,{
                    color: colors.red,
                  }]}>
                  {I18n.t('Blocked')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <NavBar
        source={Images.backarrow}
        lefttext={I18n.t('Back')}
        rightText={I18n.t('Preferences')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />
      <View
        style={styles.buttonalign}>
        <TouchableOpacity
          style={[
            styles.samebutton,
            {
              borderColor: active == true ? colors.yellow : colors.white,
              borderWidth:
                active == false ? width * (0 / 375) : width * (1 / 375),
              backgroundColor: active == false ? colors.yellow : colors.white,
            },
          ]}
          onPress={() => {
            setActive(false);
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={active == true ? Images.heartIcon : Images.heartIcon1}
          />
          <Text
            style={{
              color: active == true ? colors.yellow : colors.white,
              fontSize: fontsize.Regular,
            }}>
            {I18n.t('Favorites')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.samebutton,
            {
              borderColor:colors.yellow,
            borderWidth:
              active == false ? width * (1 / 375) : width * (0 / 375),
            marginLeft: width * (10 / 375),
            backgroundColor: active == true ? colors.yellow : colors.white,
          }]}
          onPress={() => {
            setActive(true);
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={active == true ? Images.Blocked1 : Images.Blocked}
          />
          <Text
            style={{
              color: active == true ? colors.white : colors.yellow,
              fontSize: fontsize.Regular,
            }}>
            {I18n.t('Blocked')}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <SearchBar clicked={true} />
        {active && (
          <View
            style={styles.Notetext}>
            <Text style={{fontSize: 9}}>
              <Text style={{fontFamily: fonts.Bold, fontSize: 12}}>Note:</Text>{' '}
              By unblocking a company you will be able to see their offering
              again.
            </Text>
          </View>
        )}
        <FlatList
          data={dataArr}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => _rendernotiLists(item, index)}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    </View>
  );
};

export default Preferences;
