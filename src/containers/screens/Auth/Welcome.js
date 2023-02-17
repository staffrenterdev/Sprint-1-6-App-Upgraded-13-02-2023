import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  BackHandler,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import colors from '../../../constants/colors';
import Images from '../../../constants/images';

import styles from './style/welcomeStyle';
import Button from '../../components/Button';
import I18n from '../../../constants/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonStyles from '../../../assets/css/commonStyles';

import {ShowStatusBarWhite} from '../../components/Statusbar';
import {useFocusEffect} from '@react-navigation/native';
import {width} from '../../../constants/ScreenSize';
import fonts from '../../../constants/fonts';
import AuthLoadingScreen from '../../../navigations/AuthLoadingScreen';
import fontsize from '../../../constants/i18n/Fontsizes';

const slides = [
  {
    key: 'k1',
    title: 'Get',
    title2: 'started!',
    text: 'Create your profile and tell us who you are, what’s your experience and what are your skills.',
    text2: 'We want to know you !',
    image: Images.pagination1,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
  },
  {
    key: 'k2',
    title: 'Choose what',
    title1: ' Choose what',
    title2: 'interests you',
    text: 'Navigate between on-demand contracts and permanent job offers.',
    text2: 'You are master of your choices !',
    image: Images.pagination2,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
  },
  {
    key: 'k3',
    title: 'Find the perfect',
    title2: 'Opportunity',
    text: 'Find your ideal dream job, or several one-off contracts that suit you.',
    text2: 'Get paid for doing what you like !',
    image: Images.pagination3,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
  },
];
const slide2 = [
  {
    key: 'k1',
    title: 'Obtenir',
    title2: 'a débuté!',
    text: 'Créez votre profil et dites-nous qui vous êtes, quelle est votre expérience et quelles sont vos compétences.',
    text2: 'Nous voulons vous connaître!',
    image: Images.pagination1,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
  },
  {
    key: 'k2',
    title: 'Choisissez quoi',
    title1: 'Choisissez quoi',
    title2: 'Vous intéresse',
    text: "Naviguer entre les contrats à la demande et les offres d'emploi permanentes.",
    text2: 'Vous êtes maître de vos choix!',
    image: Images.pagination2,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
  },
  {
    key: 'k3',
    title: 'Trouvez le parfait',
    title2: 'Occasion',
    text: 'Trouvez votre emploi de rêve idéal ou plusieurs contrats uniques qui vous conviennent.',
    text2: 'Soyez payé pour faire ce que vous aimez!',
    image: Images.pagination3,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
  },
];

const Welcome = props => {
  const slideref = useRef();
  const [loadershow, setLoadershow] = useState(true);
  const [lang, setLang] = useState('en');
  const [state, setState] = useState({
    show_Main_App: false,
  });
  const [exitApp, SETexitApp] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('appLanguage').then(lang => {
      var val = JSON.parse(lang);
      if (val) {
        global.appLang = true;
        global.language = val;
      }

      if (val == 'en' || val == null) {
        setLang('en');
      } else {
        setLang('fr');
      }
    });

    setTimeout(() => {
      setLoadershow(false);
    }, 3000);
  }, [loadershow]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (exitApp == false) {
          SETexitApp(true);
          Alert.alert(
            I18n.t('backHandler'),
            '',
            [
              {
                text: I18n.t('No'),
                onPress: () => {
                  SETexitApp(false);
                },
                style: 'cancel',
              },
              {text: I18n.t('yes'), onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false},
          );
          return true;
        } else if (exitApp == true) {
          BackHandler.exitApp();
        }

        setTimeout(() => {
          SETexitApp(false);
        }, 1500);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const on_Done_all_slides = () => {
    setState({show_Main_App: true});
  };

  //introduction screens show
  const _renderItem = ({item}) => {
    return (
      <View style={[styles.MainContainer]}>
        <Image source={item.image} style={styles.image} />
        <View
          style={[
            styles.titleView,
            {
              justifyContent: 'flex-start',
              paddingLeft: width * (35 / 375),
              paddingRight: width * (35 / 375),
            },
          ]}>
          <Text
            style={[
              CommonStyles.SubHeadingText3,
              styles.title,
              {fontFamily: fonts.Bold},
            ]}>
            {item.title}
          </Text>
          <Text
            style={[
              CommonStyles.SubHeadingTextnew3,
              styles.title2,
              {fontFamily: fonts.Bold},
            ]}>
            {item.title2}
          </Text>
        </View>
        <View
          style={{width: '100%', marginTop: Platform.OS == 'android' && 10}}>
          <Text
            style={[
              styles.text,
              {textAlign: 'left', marginRight: item.key == 'k2' ? 20 : 0},
            ]}>
            {item.text} <Text style={[styles.text2, {}]}>{item.text2}</Text>
          </Text>
        </View>
      </View>
    );
  };

  // change app language to english
  const english = async () => {
    setLang('en');

    await AsyncStorage.setItem('appLanguage', JSON.stringify('en'));
  };
  // change app language to French
  const french = async () => {
    setLang('fr');

    await AsyncStorage.setItem('appLanguage', JSON.stringify('fr'));
  };

  // introduction screen next button
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image resizeMode="cover" source={Images.right} />
      </View>
    );
  };

  // introduction screen previous button
  const _renderPrevButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('login');
        }}
        style={styles.buttonCircle}>
        <Image resizeMode="cover" source={Images.right} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      {loadershow == true && Platform.OS == 'android' ? (
        <AuthLoadingScreen />
      ) : (
        <View style={styles.safearea}>
          <ShowStatusBarWhite />
          <View
            style={{
              flex: 1,
            }}>
            <AppIntroSlider
              ref={slideref}
              data={lang == 'fr' ? slide2 : slides}
              showDoneButton={true}
              onDone={on_Done_all_slides}
              renderDoneButton={_renderPrevButton}
              renderItem={_renderItem}
              renderNextButton={_renderNextButton}
              activeDotStyle={styles.Activepagination}
              dotStyle={styles.Inactivepagination}
            />

            <View style={[styles.view12]}>
              <View style={styles.view_style}>
                <Button
                  buttonStyle={styles.buttonStyle}
                  label={I18n.t('Login')}
                  onPress={() => props.navigation.navigate('login')}
                  isLabel={true}
                  buttonTextStyle={[
                    CommonStyles.SubHeadingText,
                    {fontFamily: fonts.Bold},
                  ]}
                />
                <Button
                  buttonStyle={styles.buttonStyle1}
                  label={I18n.t('Register')}
                  onPress={() => props.navigation.navigate('SignUp')}
                  isLabel={true}
                  buttonTextStyle={
                    (CommonStyles.SubHeadingText,
                    {
                      color: colors.yellow,
                      fontFamily: fonts.Bold,
                      fontSize: fontsize.Large,
                    })
                  }
                />
              </View>
            </View>
          </View>

          {lang == 'en' ? (
            <TouchableOpacity
              onPress={() => {
                setLang('fr'), (I18n.locale = 'fr'), french();
              }}
              style={styles.langTextView}>
              <Text
                style={[
                  CommonStyles.SubHeadingText2,
                  styles.langText,
                  {color: colors.yellow, fontFamily: fonts.Bold},
                ]}>
                {'Français'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setLang('en'), (I18n.locale = 'en'), english();
              }}
              style={styles.langTextView}>
              <Text
                style={[
                  CommonStyles.SubHeadingText2,
                  styles.langText,
                  {color: colors.yellow, fontFamily: fonts.Bold},
                ]}>
                {'English'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Welcome;
