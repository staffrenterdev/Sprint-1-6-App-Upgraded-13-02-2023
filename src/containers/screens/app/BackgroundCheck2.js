import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import NavBar from '../../components/NavBar';
import HTML from 'react-native-render-html';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/BackgroundCheck2style';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container} from 'native-base';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import Loader from '../../components/loader';
import fontsize from '../../../constants/i18n/Fontsizes';
import fonts from '../../../constants/fonts';
const BackgroundCheck = props => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [mBottom, setMBottom] = React.useState(500);
  const [convict, setConvict] = useState(false);
  const [convict1, setConvict1] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const source = {
    html: `
    <p><strong>What do we mean by &ldquo;vulnerable people&rdquo;?</strong>
<br /><br />
According to the definition of the Criminal Records Act, &quot;vulnerable persons&quot; are a category of persons who, because of their age, a handicap or other circumstances, temporary or permanent, find themselves in a situation of dependence vis-&agrave;-vis - vis-&agrave;-vis other people or being in a more risky situation than the general population, to be attacked by people in a position of authority or trust in relation to them. Children, as defined in the Criminal Records Act, are under the age of 18.</p>

This background check is the responsibility of the company due to its due diligence.
<br />
<br />
 <strong>What do we mean by &quot;due diligence&quot;? </strong></p>
Due diligence is a legal principle that determines our company&#39;s obligation to take reasonable measures to ensure the safe delivery of care to our clients and to protect them according to the relevant standards in force.
<br /><br />
<strong>List of Inconsistent Offenses and Misconducts</strong>
<br />
<br />
For your information, here is the list of offenses incompatible with any establishment offering accommodation to a vulnerable clientele.</p>
<ul>
	<li>SEX: Any conduct or offense of a sexual nature such as sexual assault, indecent acts, solicitation or incitement to prostitution, etc.</li>
	<li>VIOLENCE: Any behavior or criminal offense for which any form of violence was used such as homicide, robbery, assault, kidnapping, forcible confinement, threats, intimidation, harassment, etc. .</li>
	<li>THEFT - FRAUD: Any conduct or offense the very nature of which amounts to theft or fraud such as burglary, larceny, taking a motor vehicle without consent, fraud, corruption, assumption of person, etc.</li>
	<li>DRIVING: Any conduct or criminal offense relating to the operation of road vehicles such as impaired driving, hit and run, dangerous driving, etc.</li>
	<li>DRUG - NARCOTICS: Any conduct or offense relating to narcotics, food and drugs such as possession, trafficking, importation culture, etc.</li>
	<li>OTHER: Any behavior or offense that raises fears for the safety of vulnerable people such as arson, gangsterism, mischief, etc.</li>
</ul>

    `,
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const isCloseToBottom2 = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const [checkstatus, setCheckstatus] = useState(false);
  const [scrollend, setScrollend] = useState(false);
  return (
    <Container style={styles.container}>
      <NavBar
        lefttext={I18n.t('Back')}
        source={Images.backarrow}
        navigation={() => props.navigation.goBack()}
        rightText={I18n.t('background')}></NavBar>
      <ShowStatusBarWhite />
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={loading} />

      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setScrollend(true);
          }
        }}
        nestedScrollEnabled={true}
        style={{paddingHorizontal: width * (5 / 375)}}>
        <View style={styles.VerifyTextView}>
          <Image source={Images.backgroundAlert} style={{}} />
          <Text style={[CommonStyles.SubHeadingText4, styles.VerifyText]}>
            {I18n.t('VerifyText')}
          </Text>
        </View>
        <Text
          style={[CommonStyles.HeadingText_medium, styles.JUDICIAL_HISTORY]}>
          {I18n.t('JUDICIAL_HISTORY')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <ImageBackground
            source={Images.EllipseYellow}
            style={styles.ImageBackgroundview}>
            <Text style={{alignSelf: 'center', color: colors.white}}>1</Text>
          </ImageBackground>
          <Image source={Images.line}></Image>
          <ImageBackground
            source={Images.Ellipse}
            style={styles.ImageBackgroundview}>
            <Text style={{alignSelf: 'center'}}>2</Text>
          </ImageBackground>
          <Image source={Images.line}></Image>
          <ImageBackground
            source={Images.Ellipse}
            style={styles.ImageBackgroundview}>
            <Text style={{alignSelf: 'center'}}>3</Text>
          </ImageBackground>
        </View>

        <Text
          style={[
            CommonStyles.SubHeadingText13,
            {
              marginVertical: width * (35 / 375),
              marginHorizontal: width * (15 / 375),
              textAlign: 'center',
              fontSize: null,
              fontFamily: fonts.Regular,
            },
          ]}>
          {I18n.t('contracts')}
          <Text style={{fontFamily: fonts.Bold}}>{I18n.t('contracts2')}</Text>
        </Text>
        <View style={styles.HTMLview}>
          <ScrollView
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom2(nativeEvent)) {
                setCheckstatus(true);
              }
            }}
            scrollEnabled={scrollend}
            nestedScrollEnabled={true}
            style={{padding: 15, paddingTop: 5, marginVertical: 10}}
            scrollEventThrottle={400}>
            <View style={{paddingBottom: 20}}>
              <HTML source={source} />
            </View>
          </ScrollView>
        </View>

        <Text style={[CommonStyles.HeadingText_medium, styles.guiltText]}>
          {I18n.t('guilt')}
        </Text>
        <Text style={[CommonStyles.HeadingText_medium, styles.convictionText]}>
          {I18n.t('conviction')}
        </Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: width * (10 / 375),
          }}>
          <Button
            buttonStyle={[
              styles.Smallbutton,
              {
                backgroundColor:
                  convict == false ? colors.white : colors.yellow,
                borderWidth: convict == false ? width * (1 / 375) : 0,
                borderColor:
                  convict == false ? colors.grayborder : colors.white,
              },
            ]}
            label={I18n.t('Yes')}
            onPress={() => {
              setConvict(true);
              setConvict1(false);
            }}
            disabled={checkstatus == false}
            isLabel={true}
            buttonTextStyle={{
              fontSize: fontsize.Large,
              color: convict == false ? colors.grayborder : colors.white,
              fontFamily: fonts.Bold,
            }}
          />
          <Button
            buttonStyle={[
              styles.Smallbutton,
              {
                backgroundColor:
                  convict1 == false ? colors.white : colors.yellow,
                borderWidth: convict1 == false ? width * (1 / 375) : 0,
                borderColor:
                  convict1 == false ? colors.grayborder : colors.white,
              },
            ]}
            label={I18n.t('No')}
            disabled={checkstatus == false}
            onPress={() => {
              setConvict1(true);
              setConvict(false);
            }}
            isLabel={true}
            buttonTextStyle={{
              fontSize: fontsize.Large,
              color: convict1 == false ? colors.grayborder : colors.white,
              fontFamily: fonts.Bold,
            }}
          />
        </View>
      </ScrollView>
      <View style={{}}>
        <Button
          buttonStyle={[styles.Nextbutton,{
           
            backgroundColor: !convict && !convict1 ? '#f5f5f5' : colors.yellow,
            borderWidth: !convict && !convict1 ? width * (1 / 375) : 0,
            borderColor: !convict && !convict1 ? '#ededed' : colors.white,
          }]}
          disabled={!convict && !convict1}
          label={I18n.t('Next')}
          onPress={() => {
            convict1 == true && convict == false
              ? props.navigation.navigate('BackgroundCheckNo')
              : convict1 == false && convict == true
              ? props.navigation.navigate('BackgroundCheckYes')
              : null;
          }}
          isLabel={true}
          buttonTextStyle={{
            fontFamily: fonts.Bold,
            fontSize: fontsize.Large,
            color: !convict && !convict1 ? colors.grayborder : colors.white,
          }}
        />
      </View>
    </Container>
  );
};
export default BackgroundCheck;
