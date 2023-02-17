import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/quizDescriptionstyle';
import {connect} from 'react-redux';
import quizDescriptionA from '../../../redux/actions/quizDescriptionA';
import {handleErrorTwo} from '../../components/ErrorComponent';
import HTML from 'react-native-render-html';
import {SUCCESS, ERROR, LOADING} from '../../../redux/constants/reduxConstant';
import SignItOut from '../../components/SignItOut';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import moment from 'moment';
import Loader from '../../components/loader';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import CommonStyles from '../../../assets/css/commonStyles';
import fonts from '../../../constants/fonts';
const quizDescription = props => {
  const [state, setState] = useState({
    email: '',
    content: '',
    loading: true,
    checkStatus: true,
  });
  const [date, setDate] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      terms_condition();
    });
    return unsubscribeOnBlur;
  }, []);
  const terms_condition = () => {
    let body = new FormData();
    body.append('slug', 'quiz_guide');
    setTimeout(() => {
      props.quizRequest(body);
    }, 500);
  };
  React.useEffect(() => {
    setDate(moment(new Date()).format('dddd MMMM '));
    setDate2(moment(new Date()).format('DD'));
    setDate1(moment(new Date()).format(' YYYY'));
    if (date2 == 1) {
      setDate3('st');
    } else if (date2 == 2) {
      setDate3('nd');
    } else if (date2 == 3) {
      setDate3('rd');
    } else setDate3('th');

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

  useEffect(() => {
    const quizDescription = props.quizDescriptionRes.quizDescriptionR;

    if (quizDescription.status == LOADING) {
      state.loading = true;
    } else if (quizDescription.status == SUCCESS) {
      state.loading = false;
      setState({
        ...state,
        content: quizDescription.value.data.response.description,
      });
      props.defaultRequest();
    } else if (quizDescription.status == ERROR) {
      state.loading = false;
      setAgreeLogout(handleErrorTwo(quizDescription));
      props.defaultRequest();
    }
  }, [props.quizDescriptionRes]);
  return (
    <Container style={styles.container}>
      <TouchableOpacity
        style={styles.backarroview}
        onPress={() => props.navigation.goBack()}>
        <Image source={Images.backarrow}></Image>
        <Text
          style={CommonStyles.Backtext}>
          {I18n.t('Back')}
        </Text>
      </TouchableOpacity>

      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={state.loading} />
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={styles.Guidetext}>
          {I18n.t('Guide')}
        </Text>
        <View
          style={styles.Guideview}>
          <Text
            style={styles.MUSTtext}>
            {I18n.t('You')}{' '}
            <Text style={{fontFamily: fonts.Bold}}>{I18n.t('MUST')}</Text>{' '}
            {I18n.t('Get')} <Text style={{fontFamily: fonts.Bold}}>100%</Text>{' '}
            {I18n.t('approveduse')}
          </Text>
          <Text
            style={[styles.Pleasereadcarefullytext,{fontFamily: fonts.Bold,}]}>
            {I18n.t('Pleasereadcarefully')}
          </Text>
          <Text
            style={[styles.Pleasereadcarefullytext,]}>
            {I18n.t('informationafterward')}
          </Text>
        </View>
        <ScrollView
          style={{paddingHorizontal: 15}}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              setState({...state, checkStatus: false});
            }
          }}
          scrollEventThrottle={400}>
          <View style={{}}>
            <HTML source={{html: state.content}} />
          </View>
        </ScrollView>
      </View>

      <Button
        disabled={state.checkStatus}
        buttonStyle={[styles.takeQuizbutton,{
          backgroundColor: state.checkStatus ? '#f5f5f5' : colors.yellow,
          borderColor: state.checkStatus ? '#e6e6e6' : colors.yellow,
          borderWidth: state.checkStatus ? 1 : 0,
          
        }]}
        label={I18n.t('takeQuiz')}
        onPress={() => props.navigation.navigate('Game')}
        isLabel={true}
        buttonTextStyle={[
          styles.buttonTextStyle,
          {
            fontFamily: fonts.Bold,
            color: state.checkStatus ? '#cccccc' : colors.white,
          },
        ]}
      />
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    quizDescriptionRes: state,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    quizRequest: body => {
      dispatch(quizDescriptionA(body));
    },

    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(quizDescription);
