import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import NavBar from '../../components/NavBar';
import Images from '../../../constants/images';
import styles from './styles/InvoiceSettingstyle';
import I18n from '../../../constants/i18n';
import HTML from 'react-native-render-html';
import {Container} from 'native-base';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import {width, height} from '../../../constants/ScreenSize';
import CommonStyles from '../../../assets/css/commonStyles';
import Button from '../../components/Button';
const Invoicesettings = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [showModal, setShowModal] = useState(false);
  const [position1, setPosition1] = useState();
  return (
    <Container style={styles.container}>
      <NavBar
        source={Images.backarrow}
        lefttext={I18n.t('Back')}
        rightText={I18n.t('Invoicesettings')}
        navigation={() => {
          props.navigation.goBack();
        }}></NavBar>
      <ShowStatusBarWhite />
      <View style={{flex: 1}}>
        <Text style={styles.Depositpreference}>
          {I18n.t('Depositpreference')}
        </Text>
        <Text style={styles.Foralltext}>{I18n.t('Forall')}</Text>
        <Button
          buttonStyle={styles.Configurebutton}
          label={I18n.t('Configure')}
          onPress={() => {}}
          isLabel={true}
          buttonTextStyle={[CommonStyles.buttontext]}
        />

        <View style={styles.GSTHSTview}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.GSTHSTtext}>{I18n.t('GSTHST')}</Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}>
              <Image
                style={styles.qustionmarkicon}
                source={Images.qustionmarkicon}
              />
            </TouchableOpacity>
          </View>
          <Switch
            style={{marginRight: width * (20 / 375)}}
            trackColor={{false: '#CCCCCC', true: '#FDBF5A'}}
            thumbColor={isEnabled ? '#f4f3f4' : 'white'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {isEnabled ? (
          <View>
            <View
              style={{
                height: width * (80 / 375),
              }}>
              <Text
                style={styles.sametext}>
                {I18n.t('Province')}
              </Text>
              <TouchableOpacity
                style={[
                  styles.touchview
                ]}>
                <Text
                  editable={false}
                  pointerEvents="none"
                  numberOfLines={1}
                  style={[
                    {
                      color: position1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      fontSize: fontsize.Regular,
                    },
                  ]}>
                  {I18n.t('Selectprovince')}
                </Text>
                <Image style={{marginRight: 20}} source={Images.downArrow} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: width * (80 / 375),
              }}>
              <Text
                style={styles.sametext}>
                {I18n.t('GSTnumber')}
              </Text>
              <TouchableOpacity
                style={[
                  styles.touchview
                ]}>
                <Text
                  editable={false}
                  pointerEvents="none"
                  numberOfLines={1}
                  style={[
                    {
                      color: position1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      fontSize: fontsize.Regular,
                    },
                  ]}>
                  {I18n.t('Writenumber')}
                </Text>
                <Image style={{marginRight: 20}} source={Images.downArrow} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: width * (80 / 375),
              }}>
              <Text
                 style={styles.sametext}>
                {I18n.t('PSTnumber')}
              </Text>
              <TouchableOpacity
                style={[
                  styles.touchview
                ]}>
                <Text
                  editable={false}
                  pointerEvents="none"
                  numberOfLines={1}
                  style={[
                    {
                      color: position1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                      fontSize: fontsize.Regular,
                    },
                  ]}>
                  {I18n.t('Writenumber')}
                </Text>
                <Image style={{marginRight: 20}} source={Images.downArrow} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View
          style={{
            height: width * (80 / 375),
          }}>
          <Text
           style={styles.sametext}>
            {I18n.t('Invoicingaddress')}
          </Text>
          <TouchableOpacity
            style={[
              styles.touchview
            ]}>
            <Text
              editable={false}
              pointerEvents="none"
              numberOfLines={1}
              style={[
                {
                  color: position1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                  fontSize: fontsize.Regular,
                },
              ]}>
              {I18n.t('Invoicemain')}
            </Text>
            <Image style={{marginRight: 20}} source={Images.downArrow} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: width * (80 / 375),
          }}>
          <Text
             style={styles.sametext}>
            {I18n.t('Invoicingissuer')}
          </Text>
          <TouchableOpacity
            style={[
              styles.touchview
            ]}>
            <Text
              editable={false}
              pointerEvents="none"
              numberOfLines={1}
              style={[
                {
                  color: position1 ? 'rgb(0,0,0)' : 'rgb(183,190,197)',
                  fontSize: fontsize.Regular,
                },
              ]}>
              {I18n.t('Invoiceunder')}
            </Text>
            <Image style={{marginRight: 20}} source={Images.downArrow} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View
          style={CommonStyles.endmodalmainview}>
          <View
            style={CommonStyles.endmodalinnerview}>
            <TouchableOpacity
              style={CommonStyles.backarrowview}
              onPress={() => setShowModal(false)}>
              <Image source={Images.backarrow}></Image>
              <Text
                style={CommonStyles.Backtext}>
                {I18n.t('Back')}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                height: height / 2 + 50,
              }}>
              <Text
                style={styles.GSTHSTtext2}>
                {I18n.t('GSTHST')}
              </Text>
              <Image
                source={Images.GSTModal}
                style={{
                  alignSelf: 'center',
                  marginTop: width * (20 / 375),
                }}></Image>
              <ScrollView style={{padding: 15}} scrollEventThrottle={400}>
                <View style={{paddingBottom: 20}}>
                  <HTML
                    source={{
                      html: "If you're self-employed and your total revenue from the sale of taxable goods and services is over $30,000 ($50,000 for public service bodies) in a calendar quarter or in any four previous calendar quarters, you must register for a GST/HST number. Registering for a GST/HST number is easy; in fact, you can apply for one online, over the phone, or by mailIf you're a small supplier (your total revenues in a calendar quarter or in any four previous calendar quarters are less than $30,000) and you're engaged in a commercial activity in Canada, you can choose to voluntarily register for a GST/HST ",
                    }}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={{alignItems: 'center'}}></View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Invoicesettings;
