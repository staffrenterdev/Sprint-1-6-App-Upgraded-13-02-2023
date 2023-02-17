import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {height, width} from '../../constants/ScreenSize';
import Images from '../../constants/images';
import I18n from '../../constants/i18n';
import fontsize from '../../constants/i18n/Fontsizes';
import colors from '../../constants/colors';
import CommonStyles from '../../assets/css/commonStyles';
import Button from '../components/Button';
import HTML from 'react-native-render-html';
import fonts from '../../constants/fonts';

const BottomModal = () => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: colors.modelBackground,
          marginBottom: 0,
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderTopLeftRadius: width * (20 / 375),
            borderTopRightRadius: width * (20 / 375),
            paddingHorizontal: width * (25 / 375),
            paddingTop: width * (25 / 375),
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
            onPress={() => props.navigation.goBack()}>
            <Image source={Images.backarrow}></Image>
            <Text
              style={{
                color: colors.yellow,
                fontSize: fontsize.Regular,
                marginLeft: 2,
              }}>
              {I18n.t('Back')}
            </Text>
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
              Send
            </Text>
            <Image
              source={Images.Result}
              style={{
                alignSelf: 'center',
                marginTop: width * (50 / 375),
              }}></Image>
            <ScrollView
              style={{padding: 15}}
              scrollEventThrottle={400}>
              <View style={{paddingBottom: 20}}>
                <HTML
                  source={{
                    html: 'Collaborating with Staff Renter means having access to various temporary employment contracts in various fields and being informed of permanent job openings with our multiple clientsCollaborating with Staff Renter means having access to various temporary employment contracts in various fields and being informed of permanent job openings with our multiple clientsCollaborating with Staff Renter means having access to various temporary employment contracts in various fields and being informed of permanent job openings with our multiple clientsCollaborating with Staff Renter means having access to various temporary employment contracts in various fields and being informed of permanent job openings with our multiple clients',
                  }}
                />
              </View>
            </ScrollView>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              buttonStyle={{
                backgroundColor: colors.yellow,
                borderRadius: 30,
                height: width * (40 / 375),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: width * (20 / 375),
                marginBottom: '7%',
                width: '80%',
              }}
              onPress={() => {
             
              }}
              isLabel={true}
              buttonTextStyle={[
                CommonStyles.buttontext,
              ]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
