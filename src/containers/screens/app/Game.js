import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/gamestyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import quizA from '../../../redux/actions/quizA';
import {handleErrorTwo} from '../../components/ErrorComponent';
import ResultA from '../../../redux/actions/ResultA';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SUCCESS,
  ERROR,
  LOADING,
} from '../../../redux/constants/reduxConstant';
import SignItOut from '../../components/SignItOut';
import Loader from '../../components/loader';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fonts from '../../../constants/fonts';
import fontsize from '../../../constants/i18n/Fontsizes';
import {getService} from '../../../services/getServices';
import apiName from '../../../constants/apiName';
const Game = props => {
  const scrollViewRef = useRef();
  const [state, setState] = useState({
    email: '',
    data: [],
    activeQue: 0,
    index: 0,
    content: [],
    total: 0,
    loading: false,
  });
  const [Sdoc, setSdoc] = useState(0);
  const [modelVisible1, setModelVisible1] = useState(false);
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [right, setRight] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [checkstate, setCheckstate] = useState();
  const [backpress, setBackpress] = useState(false);
  const [correctanswer, setCorrectanswer] = useState(0);

  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      setSdoc(0);

      setCorrectanswer(0);
      setActive(false);
      setActive1(false);
      setState({
        ...state,
        data: [],
        activeQue: 0,
        index: 0,
        content: [],
        total: 0,
        moreInfo: '',
      });
      setTimeout(() => {
        newValue();
      }, 100);

      terms_condition();
    });
    return unsubscribeOnBlur;
  }, []);
  React.useEffect(() => {
    AsyncStorage.getItem('user').then(lang => {
      var val = JSON.parse(lang);
      global.quiz_status = val.quiz_status;
    });
  });

  const newValue = () => {
    getService(apiName.quizQuestions)
      .then(async res => {
        setState({...state, loading: true});
        console.log('res quizQuestions ', res);
        if (res.status == 200) {
          state.content = res.data.response;
          setState({...state, content: res.data.response, loading: false});
          state.loading = false;
          state.loading = false;
        }
      })
      .catch(error => {
        setState({...state, loading: false});
        state.loading = false;
      });
  };
  console.log('state.content', state.content);
  useEffect(() => {
    const Result = props.ResultRes.ResultR;
    if (Result.status == LOADING) {
    } else if (Result.status == SUCCESS) {
      AsyncStorage.setItem('user', JSON.stringify(Result.value.data.response));
      props.defaultRequest();
    } else if (Result.status == ERROR) {
      setAgreeLogout(handleErrorTwo(Result));
      props.defaultRequest();
    }
  }, [props.ResultRes]);
  console.log('state.total', state.total);
  useEffect(() => {
    const quiz = props.quizRes.quizR;
    if (quiz.status == LOADING) {
      setLoading(true);
    } else if (quiz.status == SUCCESS) {
      setLoading(false);
      setState({
        ...state,
        moreInfo: quiz.value.data.response.content,
      });
      props.defaultRequest();
    } else if (quiz.status == ERROR) {
      setLoading(false);
      setAgreeLogout(handleErrorTwo(quiz));
      props.defaultRequest();
    }
  }, [props.quizRes]);

  const terms_condition = () => {
    let body = new FormData();
    body.append('slug', 'more-information');
    props.quizRequest(body);
  };
  const touchable2 = (item, id) => {
    setActive(true);
    setActive1(true);

    if (state.content[Sdoc].correct_answer == id) {
      setCorrectanswer(1);
    } else {
      setCorrectanswer(2);
    }

    let tempArr = state.content[Sdoc]?.option_array;

    tempArr.map(i => {
      if (item.id == i.id) {
        i.check = true;

        setCheckstate(i);
      } else {
        i.check = false;

        setCheckstate(i);
      }
    });
  };
  const [showgotbutton, setShowgotbutton] = useState(false);

  const renderBranches = (item, index) => {
    return (
      <View>
        {console.log('itemitem', item.option)}
        {item.option != null && item.option != '' && (
          <TouchableOpacity
            style={[
              styles.selectedoptionview,
              {
                backgroundColor:
                  item.check == true &&
                  state.content[Sdoc]?.remember &&
                  item.answer == false
                    ? colors.lightRedbackground
                    : item.check == true ||
                      (item.check == true &&
                        state.content[Sdoc]?.remember &&
                        item.answer == true)
                    ? colors.lightGreenbackground
                    : colors.white,
                borderColor:
                  item.check == true &&
                  state.content[Sdoc]?.remember &&
                  item.answer == false
                    ? colors.red
                    : item.check == true &&
                      state.content[Sdoc]?.remember &&
                      item.answer == true
                    ? colors.green
                    : item.check == false && state.content[Sdoc]?.remember
                    ? '#cccccc'
                    : colors.black,
              },
            ]}
            disabled={
              active1 == true || state.content[Sdoc]?.remember ? true : false
            }
            onPress={() => {
              touchable2(item, item.id);
              let t = state.content;
              t[Sdoc].remember = true;

              t[Sdoc].selectedindex = index == 1 ? 0 : 1;

              t[Sdoc].selectanswer =
                item.check == true ? item?.answer : item?.answer;
              t[Sdoc].isCorect = item?.answer;
              t[Sdoc].isDetail = item?.details;

              setState({...state, content: t});
              if (item?.answer == true) {
                setState({...state, total: state.total + 1});
              } else {
              }
            }}>
            {console.log('item.option', item.option)}
            <Text
              style={[
                CommonStyles.HeadingText3,
                {
                  alignSelf: 'center',
                  color:
                    item.check == true &&
                    state.content[Sdoc]?.remember &&
                    item.answer == false
                      ? colors.red
                      : item.check == true &&
                        state.content[Sdoc]?.remember &&
                        item.answer == true
                      ? colors.green
                      : item.check == false && state.content[Sdoc]?.remember
                      ? '#cccccc'
                      : colors.black,

                  fontSize: fontsize.Medium,
                },
              ]}>
              {item.option}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <Container style={[styles.container]}>
      <TouchableOpacity
        style={styles.backarrowview}
        onPress={() => {
          setBackpress(true);

          if (state.activeQue != 0) {
            state.activeQue = state.activeQue - 1;
            setSdoc(state.activeQue);
            setActive(false);

            setActive1(false);
          } else {
            props.navigation.goBack();
          }
        }}>
        <Image source={Images.backarrow}></Image>
        <Text style={CommonStyles.Backtext}>{I18n.t('Back')}</Text>
      </TouchableOpacity>

      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={state.loading} />
      <Text style={[CommonStyles.Heading_text, styles.quiztext]}>
        {I18n.t('quiz')}
      </Text>
      <View style={styles.titletextview}>
        <Text style={styles.titletext}>
          {I18n.t('gameText1')}
          <Text style={{fontFamily: fonts.Bold}}>
            {' '}
            {I18n.t('gameText2')}
          </Text>{' '}
          {I18n.t('gameText3')}
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        <View style={styles.Questionview}>
          <Text style={styles.Questionviewtext}>
            {I18n.t('Question')} {state.activeQue + 1} / {state.content?.length}
          </Text>
          <Text style={[styles.questiontext]}>
            {state.content[Sdoc]?.question}
          </Text>
          <FlatList
            style={{}}
            data={state.content[Sdoc]?.option_array}
            renderItem={({item, index}) => renderBranches(item, index)}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
        {state.content[Sdoc]?.remember && (
          <View
            style={{
              marginBottom: width * (10 / 375),
            }}>
            <Text
              style={[
                styles.ansvalue,
                {
                  color:
                    state.content[Sdoc]?.isCorect == false ? 'red' : '#009840',
                },
              ]}>
              {state.content[Sdoc]?.isCorect == false
                ? I18n.t('WrongAns')
                : I18n.t('GoodAns')}
            </Text>
          </View>
        )}

        {state.content[Sdoc]?.remember ? (
          <Text style={[CommonStyles.HeadingText31, styles.anstext]}>
            {state.content[Sdoc]?.isDetail}
          </Text>
        ) : null}
      </ScrollView>
      <View>
        {state.content.length - 1 > Sdoc && right != 0 ? (
          <Button
            buttonStyle={[
              styles.Next_qbutton,
              {
                marginTop: right == 0 ? width * (50 / 375) : width * (20 / 375),
              },
            ]}
            label={I18n.t('Next_q')}
            onPress={() => {
              state.activeQue = state.activeQue + 1;
              setSdoc(state.activeQue);
              setActive(false);

              setActive1(false);
            }}
            isLabel={true}
            buttonTextStyle={[styles.buttonTextStyle, {fontFamily: fonts.Bold}]}
          />
        ) : state.content[Sdoc]?.remember &&
          state.content.length - 1 == Sdoc ? (
          <Button
            buttonStyle={styles.Submitbutton}
            label={I18n.t('Submit')}
            onPress={() => {
              if (state.total == state.content.length) {
                setModelVisible1(true);
                setShowgotbutton(true);
              } else {
                setShowgotbutton(false);
                setModelVisible1(true);
              }
            }}
            isLabel={true}
            buttonTextStyle={[styles.buttonTextStyle, {fontFamily: fonts.Bold}]}
          />
        ) : state.content[Sdoc]?.remember ? (
          <Button
            buttonStyle={[
              styles.Next_qbutton,
              {
                marginTop: right == 0 ? width * (20 / 375) : width * (20 / 375),
              },
            ]}
            label={I18n.t('Next_q')}
            onPress={() => {
              state.activeQue = state.activeQue + 1;
              setSdoc(state.activeQue);
              setActive(false);

              setActive1(false);
            }}
            isLabel={true}
            buttonTextStyle={[styles.buttonTextStyle, {fontFamily: fonts.Bold}]}
          />
        ) : (
          <Button
            buttonStyle={styles.Next_qbutton2}
            label={I18n.t('Next_q')}
            onPress={() => {
              state.activeQue = state.activeQue + 1;
              setSdoc(state.activeQue);
              setActive(false);

              setActive1(false);
            }}
            isLabel={true}
            buttonTextStyle={[
              styles.buttonTextStyle,
              {color: '#d3d3d3', fontFamily: fonts.Bold},
            ]}
            disabled={active == true ? false : true}
          />
        )}
      </View>

      <Modal animationType="fade" transparent={true} visible={modelVisible1}>
        <View style={{flex: 1, backgroundColor: colors.modelBackground}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                flex: 1,
              }}>
              {state.total != state.content.length || !showgotbutton ? (
                <Image
                  source={Images.Result}
                  style={{
                    alignSelf: 'center',
                    marginTop: width * (50 / 375),
                  }}></Image>
              ) : (
                <Image
                  source={Images.Result2}
                  style={{
                    width: width * (230 / 375),
                    height: width * (230 / 375),
                    alignSelf: 'center',
                    marginTop: width * (80 / 375),
                  }}></Image>
              )}
              {state.total != state.content.length || !showgotbutton ? (
                <Text
                  style={[
                    CommonStyles.HeadingText31,
                    styles.ResultText1,
                  ]}>
                  {I18n.t('ResultText1')}
                </Text>
              ) : (
                <Text
                  style={[
                    CommonStyles.HeadingText31,
                    styles.ResultText1,
                  ]}>
                  {I18n.t('ResultTextone')}{' '}
                  <Text style={{fontFamily: fonts.Bold}}>
                    {I18n.t('ResultTexttwo')}
                  </Text>{' '}
                  {I18n.t('ResultTextthree')}
                </Text>
              )}
              {state.total != state.content.length || !showgotbutton ? (
                <Text
                  style={[
                    CommonStyles.HeadingText31,
                   styles.ResultText2
                  ]}>
                  {I18n.t('ResultText2')}
                </Text>
              ) : (
                <Text
                  style={[
                    CommonStyles.HeadingText31,
                   styles.ResultText4
                  ]}>
                  {I18n.t('ResultText4')}
                </Text>
              )}
              {state.total != state.content.length || !showgotbutton ? (
                <Text
                  style={[
                    CommonStyles.HeadingText31,
                    styles.ResultText4
                  ]}>
                  {I18n.t('You_can')}
                  <Text style={{color: colors.yellow}}>
                    {' '}
                    {I18n.t('make_it')}
                  </Text>
                </Text>
              ) : (
                <Text
                  style={[
                    CommonStyles.HeadingText31,
                    styles.ResultText4
                  ]}>
                  {I18n.t('ResultText5')}
                </Text>
              )}
              <View
                style={[
                 styles.viewbig
                ]}></View>
              {showgotbutton == true ? (
                <Button
                  buttonStyle={styles.Buttongotit}
                  label={I18n.t('Ok_got')}
                  onPress={() => {
                    props.navigation.navigate('Home');
                    setModelVisible1(false), props.ResultRequest();
                  }}
                  isLabel={true}
                  buttonTextStyle={[
                    styles.buttonTextStyle,
                    {fontFamily: fonts.Bold},
                  ]}
                />
              ) : state.total != state.content.length ? (
                <Button
                  buttonStyle={styles.Buttongotit}
                  label={I18n.t('Retake')}
                  onPress={() => {
                    props.navigation.navigate('quizDescription');
                    setModelVisible1(false);
                  }}
                  isLabel={true}
                  buttonTextStyle={[
                    styles.buttonTextStyle,
                    {fontFamily: fonts.Bold},
                  ]}
                />
              ) : (
                <Button
                  buttonStyle={styles.Buttongotit}
                  label={I18n.t('Ok_got')}
                  onPress={() => {
                    props.navigation.navigate('Home');
                    setModelVisible1(false), props.ResultRequest();
                  }}
                  isLabel={true}
                  buttonTextStyle={[
                    styles.buttonTextStyle,
                    {fontFamily: fonts.Bold},
                  ]}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    gameRes: state,
    ResultRes: state,
    quizRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ResultRequest: body => {
      dispatch(ResultA(body));
    },
    quizRequest: body => {
      dispatch(quizA(body));
    },

    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
