import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SwitchSelector from 'react-native-switch-selector';
import colors from '../../../constants/colors';
import fontsize from '../../../constants/i18n/Fontsizes';
import I18n from '../../../constants/i18n';
import {width} from '../../../constants/ScreenSize';
import * as Progress from 'react-native-progress';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import Images from '../../../constants/images';
import fonts from '../../../constants/fonts';
import SearchBar from '../../components/SearchBar';
import Map from './map';
import styles from '../../screens/app/styles/Contactsstyle';
const Contacts = props => {
  const [active, setActive] = useState(false);
  const [isprofilecomplete, setIsprofilecomplete] = useState(false);
  const options = [
    {label: I18n.t('Available'), value: 'Available'},
    {label: I18n.t('Confirmed'), value: 'Confirmed'},
  ];
  const options2 = [
    {imageIcon: Images.BookContact},
    {imageIcon: Images.CalnderContact},
  ];
  return (
    <View style={styles.container}>
      <ShowStatusBarWhite />
      <View style={styles.SwitchSelectorview}>
        <SwitchSelector
          options={options}
          style={styles.SwitchSelector}
          initial={0}
          textColor={colors.gray} //'#7a44cf'
          selectedColor={colors.white}
          fontSize={fontsize.Regular}
          buttonColor={colors.yellow}
          borderColor={colors.black}
          imageStyle={{
            resizeMode: 'center',
          }}
          selectedTextContainerStyle={{
            justifyContent: 'center',
          }}
        />
        <SwitchSelector
          options={options2}
          style={styles.SwitchSelector2}
          initial={0}
          textColor={colors.gray} //'#7a44cf'
          selectedColor={colors.white}
          buttonColor={colors.yellow}
          borderColor={colors.black}
          imageStyle={{
            resizeMode: 'center',
          }}
          selectedTextContainerStyle={{
            justifyContent: 'center',
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <SearchBar
          Rightimage={Images.BlackFilter}
          placeholdervalue={I18n.t('Currentlocation')}
          Viewstyle={styles.SearchBarview}
          inputstyle={{color: colors.black}}
          clicked={true}
        />
        {isprofilecomplete ? (
          <View>
            <Image
              source={Images.JobCompleteProfile}
              style={{
                alignSelf: 'center',
                marginVertical: width * (50 / 375),
              }}></Image>

            <Text style={styles.Beforebeingtext}>{I18n.t('Beforebeing')}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: width * (50 / 375),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{alignSelf: 'center', marginHorizontal: 10}}>
                  <Progress.Circle
                    textStyle={{
                      fontSize: fontsize.Regular,
                      fontFamily: fonts.Bold,
                    }}
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
                      style={{
                        fontSize: fontsize.Regular,
                        fontFamily: fonts.Bold,
                      }}>
                      {I18n.t('Complete_profile')}
                    </Text>
                  </View>
                  <Text style={styles.Complete_profiletext}>
                    {I18n.t('Complete_profile_text1')}
                  </Text>
                  <Text style={styles.Complete_profiletext}>
                    {I18n.t('Complete_profile_text2')}
                  </Text>
                  <Text style={styles.Complete_profiletext}>
                    {I18n.t('Complete_profile_text3')}
                  </Text>
                </View>
                <View style={{alignSelf: 'center', marginHorizontal: 10}}>
                  <TouchableOpacity
                    style={[
                      styles.completeProfiletouch,
                      {
                        borderWidth:
                          active == false
                            ? width * (1 / 375)
                            : width * (0 / 375),
                        backgroundColor:
                          active == false ? colors.white : colors.yellow,
                      },
                    ]}
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
          </View>
        ) : (
          <Map navigation={props.navigation} />
        )}
      </View>
    </View>
  );
};

export default Contacts;
