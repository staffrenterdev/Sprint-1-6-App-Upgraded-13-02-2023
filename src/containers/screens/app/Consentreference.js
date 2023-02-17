import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import NavBar from '../../components/NavBar';
import HTML from 'react-native-render-html';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import I18n from '../../../constants/i18n';
import SignItOut from '../../components/SignItOut';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import Loader from '../../components/loader';
import fonts from '../../../constants/fonts';
import CommonStyles from '../../../assets/css/commonStyles';
import styles from '../../screens/app/styles/Consentreferencestyle';
import Button from '../../components/Button';
import fontsize from '../../../constants/i18n/Fontsizes';
import {postService} from '../../../services/postServices';
import apiName from '../../../constants/apiName';

const Consentreference = props => {
  const [refusalmodal, setRefusalmodal] = useState(false);
  const [changefocus, setchangefocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newView, setNew] = useState(false);
  const [remember, setRemember] = useState(false);
  const [agreeLogout, setAgreeLogout] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [text, setText] = useState('');
  const scrollref = useRef();
  const [content, setContent] = useState('');
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      getcmsData();
    });
    return unsubscribeOnBlur;
  }, []);
  const getcmsData = () => {
    let Body = new FormData();
    Body.append('slug', 'consent_for_reference_taking');

    postService(apiName.getlegalcontent, Body)
      .then(async res => {
        if (res.status == 200) {
          setContent(res.data.response.description);
        }
      })
      .catch(error => {
        console.log(
          'error for userConviction  api =====================>>',
          error,
        );
      });
  };
  const submit = () => {
    let body = new FormData();
    body.append('reason_for_refusal', text);
    postService(apiName.reason_for_refusal, body)
      .then(async res => {
        if (res.status == 200) {
          props.navigation.navigate('References');
        }
      })
      .catch(error => {
        console.log(
          'error for ask revision  api =====================>>',
          error,
        );
      });
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  useEffect(() => {
    if (changefocus == true) {
      scrollref?.current?.scrollTo({
        x: 0,
        y: 130,
        animated: true,
      });
    }
  }, [changefocus, refusalmodal]);
  return (
    <KeyboardAvoidingView
      style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <Loader loading={loading} />
      <NavBar
        source={Images.backarrow}
        lefttext={I18n.t('Back')}
        bigText={true}
        navigation={() => {
          props.navigation.navigate('References', {
            values: props.route.params,
            modaltrue: true,
          });
        }}
        rightText={I18n.t('Consentreference')}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />

      <View nestedScrollEnabled={true}>
        <View style={{alignItems: 'center', marginHorizontal: 20}}>
          <Image source={Images.ConsentreferenceLogo} />
          <Text
            style={styles.referencetakingText}>
            {I18n.t('referencetaking')}
          </Text>
          <Text
           style={styles.referencetakingText}>
            {I18n.t('signingthis')}
          </Text>
          <Text
           style={styles.referencetakingText}>
            {I18n.t('Pleaseread')}
          </Text>
        </View>
        <Text
          style={styles.Detailstext}>
          {I18n.t('Details')}
        </Text>
        <View
          style={[
            styles.HTMLview
          
          ]}>
          <ScrollView
            one
            nestedScrollEnabled={true}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                setCheckbox(true);
              }
            }}
            style={{marginRight: -20}}>
            <View style={{width: '95%'}}>
              <HTML source={{html: content}} />
            </View>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        disabled={checkbox == false}
        onPress={() => setRemember(!remember)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: width * (20 / 375),
        }}>
        <TouchableOpacity
          disabled={checkbox == false}
          style={[styles.checkboxview,{
          
            borderWidth: remember == true ? 0 : 1,
          }]}
          onPress={() => setRemember(!remember)}>
          {remember == true && (
            <Image
              source={Images.Remember}
              style={{height: '100%', width: '100%'}}
            />
          )}
        </TouchableOpacity>

        <Text
          style={[
            CommonStyles.SubHeadingText2,
            {
              fontSize: fontsize.Small,
              color: remember == false ? colors.gray : 'black',
              fontFamily: remember == false ? fonts.Regular : fonts.Bold,
            },
          ]}>
          {I18n.t('clickinghere')}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: width * (20 / 375),
          marginBottom: 40,
        }}>
        <Button
          buttonStyle={[styles.Smallbutton,{
            backgroundColor: colors.lightRedbackground,
            borderWidth: width * (0.5 / 375),
            borderColor: colors.red,
          }]}
          label={I18n.t('Decline')}
          onPress={() => {
            setRefusalmodal(true), setNew(true);
          }}
          isLabel={true}
          buttonTextStyle={{
            fontSize: fontsize.Medium,
            color: colors.red,
            fontFamily: fonts.Bold,
          }}
        />
        <Button
          buttonStyle={[styles.Smallbutton,{
            backgroundColor:
              remember == false ? colors.disblebutton : colors.yellow,
              borderWidth: remember == false ? 0.5 : 0,
              borderColor:
                remember == false ? colors.disablecolor : colors.yellow,
           
          }]}
          label={I18n.t('signit')}
          onPress={() => {
            props.navigation.navigate('ConsentSignature', {
              values: props.route.params,
            });
          }}
          disabled={!remember}
          isLabel={true}
          buttonTextStyle={{
            fontSize: fontsize.Medium,
            color: remember == false ? colors.disablecolor : colors.white,
            fontFamily: fonts.Bold,
          }}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={refusalmodal}>
        <TouchableWithoutFeedback
          onPress={() => {
            setNew(false), setRefusalmodal(false), setText('');
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'android' ? '' : 'padding'}
            style={CommonStyles.endmodalmainview}>
            <TouchableWithoutFeedback
              onPress={() => {
                setNew(true), setRefusalmodal(true);
              }}>
              <View
                style={styles.modalinnerview}>
                <TouchableOpacity
                  style={CommonStyles.backarrowview}
                  onPress={() => {
                    setRefusalmodal(false), setNew(false), setText('');
                  }}>
                  <Image source={Images.backarrow}></Image>
                  <Text
                    style={CommonStyles.Backtext}>
                    {I18n.t('Back')}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={styles.Refusal}>
                  {I18n.t('Refusal')}
                </Text>
                <ScrollView ref={e => (scrollref.current = e)}>
                  <View>
                    <Text
                      style={styles.sendingrefusal}>
                      {I18n.t('sendingrefusal')}
                    </Text>
                    <Text
                      style={styles.sendingrefusal}>
                      {I18n.t('understandalways')}
                    </Text>
                  </View>
                  <Text
                    style={[
                      {
                        marginLeft: width * (25 / 375),
                        fontFamily: fonts.Bold,
                        fontSize: fontsize.Medium,
                        color: '#383838',
                      },
                    ]}>
                    {I18n.t('Reasonrefusal')}
                  </Text>
                  <View style={{marginHorizontal: 10, marginVertical: 20}}>
                    <TextInput
                      onFocus={() => {
                        setchangefocus(true);
                      }}
                      onBlur={() => {
                        setchangefocus(false);
                      }}
                      selectionColor={colors.yellow}
                      style={{
                        width: '100%',
                        backgroundColor: '#f2f2f2',
                        height: 200,
                        borderRadius: 20,
                        fontSize: 13,
                        textAlignVertical: 'top',
                        padding: 15,
                        borderColor: '#f2f2f2',
                        borderWidth: 0.3,
                        paddingTop: 20,
                      }}
                      onChangeText={text => {
                        setText(text);
                      }}
                      value={text}
                      multiline={true}
                      placeholder={I18n.t('someprofessional')}
                    />
                  </View>
                </ScrollView>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 20,
                    width: '100%',
                  }}>
                  <Button
                    buttonStyle={{
                      backgroundColor:
                        text == '' ? colors.disblebutton : colors.yellow,
                      borderColor: colors.disablecolor,
                      borderWidth: text == '' ? 0.5 : 0,
                      borderRadius: 30,
                      width: '95%',
                      height: width * (50 / 375),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: width * (20 / 375),
                    }}
                    onPress={() => {
                      submit();
                    }}
                    disabled={text == ''}
                    label={I18n.t('SendRefusal')}
                    isLabel={true}
                    buttonTextStyle={[
                      CommonStyles.buttontext,
                      {color: text == '' ? colors.disablecolor : colors.white},
                    ]}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
      {newView == true ? (
        <View
          style={CommonStyles.modalbackview}
          onPress={() => setNew(false)}></View>
      ) : null}
    </KeyboardAvoidingView>
  );
};
export default Consentreference;
