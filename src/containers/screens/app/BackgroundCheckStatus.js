import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {width, height} from '../../../constants/ScreenSize';
import colors from '../../../constants/colors';
import Images from '../../../constants/images';
import I18n from '../../../constants/i18n';
import CommonStyles from '../../../assets/css/commonStyles';
import Button from '../../components/Button';
import Orientation from 'react-native-orientation';
import styles from './styles/BackgroundCheckStatusstyle';
import NavBar from '../../components/NavBar';
import fonts from '../../../constants/fonts';
import fontsize from '../../../constants/i18n/Fontsizes';
import {Container} from 'native-base';
import apiName from '../../../constants/apiName';
import {getService} from '../../../services/getServices';
const BackgroundCheckStatus = props => {
  const [Visible, setVisible] = useState(false);
  const [date, setDate] = useState();
  const [backgroundstatus, setBackgroundstatus] = useState();
  useEffect(() => {
    setVisible(true);
  }, []);
  const getStatus = () => {
    getService(apiName.backgroundcheckstatus)
      .then(async res => {
        if (res.status == 200) {
          setDate(res.data.response.signature_date);
          setBackgroundstatus(res.data.response.status);
        }
      })
      .catch(error => {
        console.log(
          'error for BackgroundCheckStatus  api =====================>>',
          error.response,
        );
      });
  };

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      getStatus();
      const initial = Orientation.getInitialOrientation();
      Orientation.lockToPortrait();
    });
    return unsubscribeOnBlur;
  }, []);
  return (
    <Container
      style={styles.container}>
      <NavBar
        lefttext={I18n.t('Back')}
        source={Images.backarrow}
        navigation={() => {props.navigation.goBack(),setVisible(false)}}
        rightText={I18n.t('background')}></NavBar>
      <View
        style={styles.mainview}>
        <View
          style={{
            marginTop: 10,
            height: height / 2 + 50,
          }}>
          <Image
            source={Images.backGroundCheckStatus}
            style={{
              alignSelf: 'center',
            }}></Image>
          {backgroundstatus == 0 || backgroundstatus == undefined ? (
            <Text
              style={[
                styles.titleText,
                styles.Pendingapproval
              ]}>
              {I18n.t('Pendingapproval')}
            </Text>
          ) : (
            <Text
              style={[
                styles.NormalText,styles.submitttedText,
                {
                  color: colors.green,
                
                },
              ]}>
              {I18n.t('Accessgranted')}
            </Text>
          )}
          <Text
            style={[
              styles.NormalText,styles.submitttedText,
              {
                color: 'black',
               
              },
            ]}>
            {I18n.t('submittted')}
          </Text>
          <Text
            style={[
              styles.NormalText,
              {
                marginTop: width * (40 / 375),
                color: 'black',
                fontFamily: fonts.Bold,
              },
            ]}>
            {I18n.t('Date')}
          </Text>
          <View
            style={styles.dateview}>
            <Text
              style={[
                styles.NormalText,
               styles.dateText
              ]}>
              {date}
            </Text>
          </View>
        </View>
        <View style={styles.askbuttonview}>
          <Button
            buttonStyle={styles.askbutton}
            label={I18n.t('ask')}
            onPress={() => {
            }}
            disabled={true}
            isLabel={true}
            buttonTextStyle={[
              CommonStyles.buttontext,
              {color: colors.disablecolor},
            ]}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={Visible}
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback
          onPressOut={() => {
            setVisible(false);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: colors.modelBackground,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setVisible(true);
              }}>
              <View style={styles.modalview}>
                <TouchableOpacity
                  style={styles.closeimg}
                  onPress={() => setVisible(false)}>
                  <Image source={Images.close}></Image>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text style={styles.ThankyouText}>{I18n.t('Thankyou')}</Text>
                  <Image
                    source={Images.BackgrondCheckStatusModal}
                    style={{
                      alignSelf: 'center',
                    }}></Image>

                  <Text style={[styles.titleText, styles.duediligencetext]}>
                    {I18n.t('duediligence')}
                  </Text>
                  <Text style={[styles.NormalText, styles.keeppostedText]}>
                    {I18n.t('keepposted')}
                  </Text>
                  <View style={{alignItems: 'center'}}>
                    <Button
                      buttonStyle={styles.modalbutton}
                      label={I18n.t('got_it2')}
                      onPress={() => {
                        setVisible(false);
                      }}
                      isLabel={true}
                      buttonTextStyle={[
                        CommonStyles.buttontext,
                        {
                          fontsize: fontsize.Regular,
                          paddingTop: 5,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
};

export default BackgroundCheckStatus;
