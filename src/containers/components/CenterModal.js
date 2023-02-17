import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {height, width} from '../../constants/ScreenSize';
import Images from '../../constants/images';
import I18n from '../../constants/i18n';
import fontsize from '../../constants/i18n/Fontsizes';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import CommonStyles from '../../assets/css/commonStyles';
import Button from '../components/Button';
import styles from '../screens/app/styles/backGround';

const CenterModal = ({Visible, title, imageurl}) => {
  const [visiblemodal, setVisiblemodal] = useState(false);
  useEffect(() => {
    setVisiblemodal(true);
    if (Visible == true) {
      setVisiblemodal(true);
    }
  }, []);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visiblemodal}
      onRequestClose={() => setVisiblemodal(false)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: colors.modelBackground,
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: width * (20 / 375),
            paddingHorizontal: width * (25 / 375),
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: width * (40 / 375),

              alignItems: 'center',
              width: width * (50 / 375),
              justifyContent: 'space-between',
              marginVertical: '3%',
              marginHorizontal: '3%',
            }}
            onPress={() => setVisiblemodal(false)}>
            <Image source={Images.close}></Image>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 10,
              height: height / 2 + 50,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: fontsize.Regular,
                fontFamily: fonts.Medium,
              }}>
              {title}
            </Text>
            <Image
              source={imageurl}
              style={{
                alignSelf: 'center',
              }}></Image>

            <Text
              style={[
                styles.titleText,
                {alignSelf: 'center', marginVertical: 20},
              ]}>
              We will do our due diligence!
            </Text>
            <Text
              style={[
                styles.NormalText,
                {alignSelf: 'center', color: 'black', marginVertical: 20},
              ]}>
              We will keep you posted!{' '}
            </Text>
            <View style={{alignItems: 'center'}}>
              <Button
                buttonStyle={{
                  backgroundColor: colors.yellow,
                  borderRadius: 30,
                  height: width * (40 / 375),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: width * (60 / 375),
                  marginBottom: '7%',
                  width: '80%',
                }}
                label={I18n.t('got_it')}
                onPress={() => {}}
                isLabel={true}
                buttonTextStyle={[
                  CommonStyles.buttontext,
                  {
                    fontsize: fontsize.Regular,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CenterModal;
