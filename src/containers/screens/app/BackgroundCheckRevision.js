import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {width} from '../../../constants/ScreenSize';
import colors from '../../../constants/colors';
import Images from '../../../constants/images';
import I18n from '../../../constants/i18n';
import CommonStyles from '../../../assets/css/commonStyles';
import Button from '../../components/Button';
import styles from './styles/BackgroundCheckRevisionstyle';
import NavBar from '../../components/NavBar';
import fonts from '../../../constants/fonts';
import apiName from '../../../constants/apiName';
import {postService} from '../../../services/postServices';
import {showToast} from '../../components/ToastMessage';
import {ShowStatusBarWhite} from '../../components/Statusbar';
const BackgroundCheckStatusRevision = props => {
  const [text, setText] = useState('');
  const [MBottom, setMBottom] = useState(500);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  const _keyboardDidShow = e => {
    setMBottom(e.endCoordinates.height);

    setKeyboardVisible(true);
  };

  const _keyboardDidHide = () => {
    setMBottom('100%');
    setKeyboardVisible(false);
  };
  const submit = () => {
    let body = new FormData();
    body.append('slug', 'ask_for_revision');
    body.append('reason_for_revison', text);
    postService(apiName.addsign, body)
      .then(async res => {
        if (res.status == 200) {
          props.navigation.navigate('Home');
          setTimeout(() => {
            showToast(res.data.response.message);
          }, 200);
        }
      })
      .catch(error => {
        console.log(
          'error for ask revision  api =====================>>',
          error,
        );
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : ''}
      style={{flex: 1, backgroundColor: colors.white}}>
      <ShowStatusBarWhite />
      <NavBar
        lefttext={I18n.t('Back')}
        source={Images.backarrow}
        navigation={() => props.navigation.goBack()}
        rightText={I18n.t('Backgroundrevision')}></NavBar>
      <ScrollView>
        <View style={{marginHorizontal: width * (20 / 375)}}>
          <Text style={styles.Commontext}>{I18n.t('severalreasons')}</Text>
          <Text style={styles.Commontext}>{I18n.t('absolutelyperform')}</Text>
          <Text style={styles.Commontext}>
            {I18n.t('representativereactivating')}
          </Text>
        </View>
        <Text
          style={[
            styles.titleText,
            {marginLeft: width * (25 / 375), fontFamily: fonts.Bold},
          ]}>
          {I18n.t('Reasonrevision')}
        </Text>
        <View style={{marginHorizontal: 20, marginVertical: 20}}>
          <TextInput
            selectionColor={colors.yellow}
            style={styles.TextInput}
            onChangeText={text => {
              setText(text);
            }}
            value={text}
            multiline={true}
            placeholder={I18n.t('Givesomedetails')}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: 40,
            width: '100%',
          }}>
          <Button
            buttonStyle={[styles.submitbutton,{
              backgroundColor: text == '' ? colors.disblebutton : colors.yellow,
              borderWidth: text == '' ? 0.5 : 0,
             
            }]}
            onPress={() => {
              submit();
            }}
            disabled={text == ''}
            label={I18n.t('ask')}
            isLabel={true}
            buttonTextStyle={[
              CommonStyles.buttontext,
              {color: text == '' ? colors.disablecolor : colors.white},
            ]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BackgroundCheckStatusRevision;
