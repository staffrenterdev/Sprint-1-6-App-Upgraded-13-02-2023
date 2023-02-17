import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SUCCESS, ERROR, LOADING} from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import Loader from '../../components/loader';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import I18n from '../../../constants/i18n';
import privacyPolicyA from '../../../redux/actions/privacyPolicyA';
import fonts from '../../../constants/fonts';
import HTML from 'react-native-render-html';
import styles from '../../screens/app/styles/FAQstyle';
var newData = '';
const PrivacyPolicy = props => {
  const [PrivacyPolicyData, setPrivacyPolicyData] = useState();
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState(null);
  const [state, setState] = useState({
    isSearch: '',
  });
  useEffect(() => {
    if (state.isSearch == '') {
      setLoading(true);
      props.privacyPolicyRequest();
    } else {
      const MyTime = setTimeout(() => {
        let Body = new FormData();

        Body.append('question', newData);
        props.privacyPolicyRequest(Body);
      }, 200);

      return () => {
        clearTimeout(MyTime);
      };
    }
  }, [state.isSearch]);

  useEffect(() => {
    const FAQRequest = props.privacyPolicyRes.PrivacyPolicyR;

    if (FAQRequest.status == LOADING) {
    } else if (FAQRequest.status == SUCCESS) {
      setLoading(false);
      setPrivacyPolicyData(FAQRequest.value.data.response);
      props.defaultRequest();
    } else if (FAQRequest.status == ERROR) {
      setLoading(false);
      props.defaultRequest();
    }
  }, [props.privacyPolicyRes]);

  const expand = (id, index) => {
    var faqsArr = PrivacyPolicyData;
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
    setPrivacyPolicyData(faqsArr => [...faqsArr]);
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
      props.privacyPolicyRequest();
    } else {
      Body.append('question', newData);
      props.privacyPolicyRequest(Body);
    }
  };
  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Privacy_policy')}
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
           style={[
            styles.searchview,
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
              placeholder={I18n.t('Searchpolicy')}
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
          data={PrivacyPolicyData}
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
    privacyPolicyRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    privacyPolicyRequest: Body => {
      dispatch(privacyPolicyA(Body));
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
