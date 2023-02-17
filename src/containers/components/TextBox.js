import React, {useEffect, useState,useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CommonStyles from '../../assets/css/commonStyles';
import colors from '../../constants/colors';
import {height, width} from '../../constants/ScreenSize';
import fonts from '../../constants/fonts';
import fontsize from '../../constants/i18n/Fontsizes';
import I18n from '../../constants/i18n';
import Picker from 'react-native-picker';

export default function TextBox({
  onChangeText,
  secureTextEntry = false,
  placeholder = '',
  editable = true,
  value,
  keyboardType = 'default',
  maxLength = maxLength,
  multiline = false,
  autoCapitalize = 'sentences',
  rightImage = '',
  error = '',
  isheighterror,
  inputTitle,
  placeholderTextColor = 'rgb(183,190,197)',
  textStyle,
  errorviewstyle,
  mainContainerStyle,
  viewStyle,
  ishideimage,
  view1,
  text = true,
  error12 = true,
  errorStyle,
  contextMenuHidden = true,
  onBlur,
  onFocus,
  rightImage2
}) {
  const [showhide, setshowhide] = useState(true);
  useEffect(()=>{
    if(secureTextEntry == true) {
      setshowhide(true)
    }
  },[secureTextEntry])
  const placeHolderLengthLimit = useMemo(
    () => (36),
    [],
);

const placeholderString = useMemo(
    () =>
        placeholder
            ? Platform.OS === 'ios' ||
              placeholder?.length <= placeHolderLengthLimit
                ? placeholder
                : placeholder?.slice(0, placeHolderLengthLimit) + '...'
            : undefined,
    [placeHolderLengthLimit, placeholder],
);
  return (
    <View style={[mainContainerStyle,{marginHorizontal:15,alignSelf:'center'}]}>
      {text == true && (
        <Text style={[styles.inputTitle, view1, CommonStyles.HeadingText3,]}>
          {inputTitle}
        </Text>
      )}

      <View style={[styles.inputContainer, viewStyle,,{}]}>
        <TextInput
        selectionColor={colors.yellow}
          style={[styles.textInputBox, textStyle,
            
          ]}
          maxLength={maxLength}
          keyboardType={keyboardType}
          underlineColorAndroid="transparent"
          placeholder={placeholderString}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={ishideimage == true && showhide}
          multiline={multiline}
          ellipsizeMode="tail"
          numberOfLines={1}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          editable={editable}
          value={value}
          onChangeText={onChangeText}
          contextMenuHidden={contextMenuHidden}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {
          rightImage || rightImage2 || ishideimage ?
        <TouchableOpacity
        style={{justifyContent:'center',flexDirection:'row'}}
          onPress={() => {   Picker.hide()
            if(ishideimage == true) {

              setshowhide(!showhide);
            }
          }}>
          {ishideimage &&

          <View style={{justifyContent:'center'}}>
            {
              showhide == true ? 
              <Text style={{alignSelf:'center',marginRight:10,color:colors.yellow,opacity:0.5,}}>{I18n.t('Show')}</Text>:
              <Text style={{alignSelf:'center',marginRight:10,color:colors.yellow,opacity:0.5}}>{I18n.t('Hide')}</Text>
            }
          </View>
}
          <Image
            style={{
              alignSelf: 'center',
              width: 23,
              height: 23,
              marginRight: width * (15 / 375),
              resizeMode: 'contain',
            }}
            source={showhide == true ?rightImage:rightImage2}
          />
         
        </TouchableOpacity>
        :null
        }
      </View>
      {error12 == true && (
        <View
          style={[errorviewstyle,{
            width: '100%',
            height: isheighterror == true ? null:error.length < 40 ? width * (35 / 375) : width * (60 / 375),

            paddingTop: 5,
          }]}>
          {error != '' && (
            <Text style={[styles.error, errorStyle]}>{error}</Text>
          )}
        </View>
      )}
      {error12 == false && (
        <View style={{marginTop: width * (10 / 375)}}></View>
      )}
    </View>
  );
}

export function FieldHeading({
  inputTitle,
  styleCom,
  marginTop = width * (15 / 375),
  marginBottom = Platform.OS == 'ios'
    ? -width * (9 / 375)
    : -width * (15 / 375),
}) {
  return (
    <>
      <Text
        style={[
          styles.inputTitle,
          {marginTop: marginTop, marginBottom: marginBottom},
          styleCom,
        ]}>
        {inputTitle}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    marginVertical:5,
    fontSize: fontsize.Small,
    color: colors.red,
    marginHorizontal: width * (20 / 375),
  },
  inputTitle: {
    color: colors.inputTitle,
    paddingBottom: width * (10 / 375),
  },
  inputContainer: {
    flexDirection: 'row',
    height: 50,
    borderBottomColor: '#FDBF5A',
    borderBottomWidth: 1,
    width: '90%',
   
  },
  leftImage: {
    padding: 10,
    margin: 9,
    height: 33,
    width: 33,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  rightImage: {
    alignSelf: 'center',
    marginRight: 16,
    width: 20,
    height: 20,
  },
  textInputBox: {
    flex: 1,
    paddingHorizontal: width * (18 / 375),

    color: colors.textinputColor,

    fontSize: fontsize.Regular,
    fontFamily: fonts.Regular,
    height: 50,
    backgroundColor: colors.white,
    borderBottomColor: '#FDBF5A',
    borderBottomWidth: 1,
  },
});
