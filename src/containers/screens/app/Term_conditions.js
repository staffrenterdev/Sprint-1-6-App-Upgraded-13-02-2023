import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {SUCCESS, ERROR, LOADING} from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import Loader from '../../components/loader';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import styles from '../../screens/app/styles/FAQstyle';
import Term_conditionsA from '../../../redux/actions/Term_conditionsA';
import HTML from 'react-native-render-html';
var newData = '';
const Term_conditions = props => {
  const [Term_conditionsData, setTerm_conditionsData] = useState();
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState(null);

  const [state, setState] = useState({
    isSearch: '',
  });

  useEffect(() => {
    if (state.isSearch == '') {
      setLoading(true);
      props.Term_conditionsRequest();
    } else {
      const MyTime = setTimeout(() => {
        let Body = new FormData();

        Body.append('question', newData);
        props.Term_conditionsRequest(Body);
      }, 200);

      return () => {
        clearTimeout(MyTime);
      };
    }
  }, [state.isSearch]);

  useEffect(() => {
    const Term_conditionsRequest = props.Term_conditionsRes.Term_conditionsR;

    if (Term_conditionsRequest.status == LOADING) {
    } else if (Term_conditionsRequest.status == SUCCESS) {
      setLoading(false);

      setTerm_conditionsData(Term_conditionsRequest.value.data.response);
      props.defaultRequest();
    } else if (Term_conditionsRequest.status == ERROR) {
      setLoading(false);
      props.defaultRequest();
    }
  }, [props.Term_conditionsRes]);

  const expand = (id, index) => {
    var faqsArr = Term_conditionsData;
    faqsArr.map(i => {
      if (i.id == id && i.expand == true) {
        i.expand = !i.expand;

        ref.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      } else if (i.id == id) {
        i.expand = !i.expand;
        if (index == 0) {
          ref.scrollTo({
            x: 0,
            y: 0,
            animated: true,
          });
        } else {
          var newlet = index * 60;
          var newlng = index * 25;
          setTimeout(() => {
            ref.scrollTo({
              x: 0,
              y: newlet + newlng,
              animated: true,
            });
          }, 100);
        }
      } else {
        i.expand = false;
      }
    });
    setTerm_conditionsData(faqsArr => [...faqsArr]);
  };
  const changeText = text => {
    if (text == '') {
      setState({...state, isSearch: ''});
      state.isSearch = '';
    } else {
      setState({...state, isSearch: text}), (state.isSearch = text);
    }
    newData = text;
  };
  const _rendernotiLists = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            expand(item.id, index);
          }}
          style={styles._rendernotiListsview}>
          <View style={{width: '80%'}}>
            <Text style={styles.question}>
              {item.question}
            </Text>
          </View>

          <View style={{justifyContent: 'center'}}>
            <Image source={item.expand ? Images.upArrow : Images.downArrow} />
          </View>
        </TouchableOpacity>
        {item.expand && (
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#d9dbda',
            }}></View>
        )}
        {item.expand && (
          <View style={{marginHorizontal: 25, marginTop: 10}}>
            <HTML source={{html: item?.answer}} />
          </View>
        )}
      </View>
    );
  };
  const apiCalling = val => {
    let Body = new FormData();
    if (state.isSearch == '') {
      setLoading(true);
      props.Term_conditionsRequest();
    } else {
      Body.append('question', newData);
      props.Term_conditionsRequest(Body);
    }
  };
  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Generalterms')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />
      <Loader loading={loading} />
      <Image
        source={Images.TermsLogo}
        style={{
          alignSelf: 'center',
          marginTop: width * (15 / 375),
        }}></Image>
      <View style={styles.mainview}>
        <View
          style={[ styles.searchview,
            {
            padding: Platform.OS == 'android' ? 0 : 10,
            borderRadius: Platform.OS == 'ios' ? 20 : 30,
          }]}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              name="search1"
              size={20}
              color="#828282"
              style={{
                alignSelf: 'center',
                marginLeft: Platform.OS == 'android' ? 15 : 5,
              }}
            />

            <TextInput
              style={{
                fontSize: fontsize.Regular,
                marginLeft: 5,
                width: '85%',
              }}
              placeholder={I18n.t('SearchGTC')}
              value={state.isSearch}
              onChangeText={text => changeText(text)}
              onSubmitEditing={() => {
                apiCalling(1);
              }}
              onEndEditing={() => {
                apiCalling(2);
              }}
              onBlur={() => {
                apiCalling(3);
              }}
            />
          </View>
        </View>
      </View>
      <ScrollView
        ref={ref => {
          setRef(ref);
        }}>
        <FlatList
          data={Term_conditionsData}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => _rendernotiLists(item, index)}
          keyExtractor={(item, index) => String(index)}
        />
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    Term_conditionsRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Term_conditionsRequest: Body => {
      dispatch(Term_conditionsA(Body));
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Term_conditions);
