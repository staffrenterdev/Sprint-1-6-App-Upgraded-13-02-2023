import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import NavBar from '../../components/NavBar';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import styles from '../../screens/app/styles/FAQstyle';
import {
  SUCCESS,
  ERROR,
  LOADING,
  NONE,
} from '../../../redux/constants/reduxConstant';
import defaultA from '../../../redux/actions/defaultA';
import SignItOut from '../../components/SignItOut';
import Loader from '../../components/loader';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import fontsize from '../../../constants/i18n/Fontsizes';
import FAQA from '../../../redux/actions/FAQA';
import HTML from 'react-native-render-html';
var newData = '';
const FAQ = props => {
  const [FaqData, setFaqData] = useState();
  const [loading, setLoading] = useState(false);
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const [state, setState] = useState({
    isSearch: '',
  });
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (state.isSearch == '') {
      setLoading(true);
      props.FAQRequest();
    } else {
      const MyTime = setTimeout(() => {
        let Body = new FormData();

        Body.append('question', newData);
        props.FAQRequest(Body);
      }, 200);

      return () => {
        clearTimeout(MyTime);
      };
    }
  }, [state.isSearch]);

  useEffect(() => {
    const FAQRequest = props.FAQRes.FAQR;

    if (FAQRequest.status == LOADING) {
    } else if (FAQRequest.status == SUCCESS) {
      setLoading(false);
      setFaqData(FAQRequest.value.data.response);
      props.defaultRequest();
    } else if (FAQRequest.status == ERROR) {
      setLoading(false);
      props.defaultRequest();
    }
  }, [props.FAQRes]);

  const expand = (id, index) => {
    var faqsArr = FaqData;
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
    setFaqData(faqsArr => [...faqsArr]);
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

          <View style={{}}>
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
          <View style={{marginHorizontal: 25, marginTop: 7}}>
            <HTML source={{html: item?.answer}} />
          </View>
        )}
      </View>
    );
  };
  const apiCalling = () => {
    let Body = new FormData();
    if (state.isSearch == '') {
      setLoading(true);
      props.FAQRequest();
    } else {
      Body.append('question', newData);
      props.FAQRequest(Body);
    }
  };

  return (
    <Container style={{backgroundColor: colors.whitebackground, flex: 1}}>
      <NavBar
        source={Images.backarrow}
        rightText={I18n.t('Frequently')}
        lefttext={I18n.t('Back')}
        navigation={() => props.navigation.goBack()}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={loading} />
      <Image
        source={Images.FAQlogo}
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
            },
          ]}>
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
              style={{fontSize: fontsize.Regular, marginLeft: 5, width: '85%'}}
              placeholder={I18n.t('SearchFAQs')}
              value={state.isSearch}
              onChangeText={text => changeText(text)}
              onSubmitEditing={() => {
                apiCalling();
              }}
              onEndEditing={() => {
                apiCalling();
              }}
              onBlur={() => {
                apiCalling();
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
          data={FaqData}
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
    FAQRes: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FAQRequest: Body => {
      dispatch(FAQA(Body));
    },
    defaultRequest: () => {
      dispatch(defaultA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
