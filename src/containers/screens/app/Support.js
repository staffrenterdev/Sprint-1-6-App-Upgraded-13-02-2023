import React from 'react';
import {Text, View, Image, Keyboard} from 'react-native';
import NavBar from '../../components/NavBar';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import defaultA from '../../../redux/actions/defaultA';
import SignItOut from '../../components/SignItOut';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import styles from '../../screens/app/styles/Supportstyle';

const Help = props => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [agreeLogout, setAgreeLogout] = React.useState(false);

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

  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Support')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <View style={{flex: 1}}>
        <Image source={Images.Support} style={styles.Supportimage}></Image>
        <Text style={styles.supportregardingtext}>
          {I18n.t('supportregarding')}
        </Text>
        <Text style={styles.agenttext}>{I18n.t('agent')}</Text>
        <View style={styles.buttonview}>
          <Button
            buttonStyle={styles.Contactsupportbutton}
            label={I18n.t('Contactsupport')}
            onPress={() => {}}
            isLabel={true}
            buttonTextStyle={[
              CommonStyles.buttontext,
              {
                fontSize: fontsize.Large,
              },
            ]}
          />
        </View>
      </View>
    </Container>
  );
};
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Help);
