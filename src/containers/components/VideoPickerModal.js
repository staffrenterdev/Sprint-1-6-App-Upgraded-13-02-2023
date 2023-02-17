import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../../constants/colors';
import { width} from '../../constants/ScreenSize';
import I18n from '../../constants/i18n';
import Images from '../../constants/images';
import fontsize from '../../constants/i18n/Fontsizes';
import fonts from '../../constants/fonts';
import CommonStyles from '../../assets/css/commonStyles';

export default function VideoPickerModal({
  showModal,
  onPress,
  onPressCamera,
  onPressGallery,
  onPressPdf,
  isPdf=false
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.OuterView}>
          <TouchableWithoutFeedback>
            <View style={{ width: '100%',
    height: isPdf==true ? width * (250 / 375) : width * (200 / 375),

    backgroundColor: colors.white,

    borderRadius: 10,}}>
            <TouchableOpacity
    style={{
      flexDirection: 'row',
      height: width * (40 / 375),

      alignItems: 'center',
      width: width * (50 / 375),
      justifyContent: 'space-between',
     
      marginHorizontal: '3%',
    }}
    onPress={onPress}>
    <Image source={Images.backarrow}></Image>
    <Text
                      style={CommonStyles.backbuttonText}>
                      {I18n.t('Back')}
                    </Text>
  </TouchableOpacity>
              <View style={styles.subInnerView}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.navOptionCons,{backgroundColor:colors.white}]}
                  onPress={onPressGallery}>
                     <Image style={{marginRight:10}} source={Images.Gallery} />
                  <Text style={[styles.navOptionTxt,{color:colors.yellow}]}>{I18n.t('UploadVideo')}</Text>
                </TouchableOpacity>

                {isPdf==false?<TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.navOptionCons}
                  onPress={onPressCamera}>
                    <Image style={{marginRight:10}} source={Images.Camera} />
                  <Text style={styles.navOptionTxt}>{I18n.t('RecordVideo')}</Text>
                </TouchableOpacity>: <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.navOptionCons,{backgroundColor:colors.white}]}
                  onPress={onPressCamera}>
                    <Image style={{marginRight:10}} source={Images.cameraYellow} />
                    <Text style={[styles.navOptionTxt,{color:colors.yellow}]}>{I18n.t('Takepicture')}</Text>
                </TouchableOpacity>}

              {isPdf==true&&  <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.navOptionCons,{backgroundColor:colors.white}]}
                  onPress={onPressPdf}>
                     <Image style={{marginRight:10}} source={Images.File_dock_yellow} />
                  <Text style={[styles.navOptionTxt,{color:colors.yellow}]}>{I18n.t('upload_doc')}</Text>
                </TouchableOpacity>}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    justifyContent: 'flex-start',
  },
  OuterView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  InnerView: {
    width: '100%',
    height:  width * (200 / 375),

    backgroundColor: colors.white,

    borderRadius: 10,
  },
  subInnerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeadingStyle: {
    textAlign: 'left',
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 10,
  },
  navOptionCons: {
    
    backgroundColor: colors.yellow,
    borderWidth:1,
    borderColor: colors.yellow,

    flexDirection: 'row',
    width: '90%',
    height: width * (50 / 375),
    marginVertical: width * (5 / 375),

    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navOptionTxt: {
    fontSize: fontsize.Regular,
    fontFamily:fonts.Bold,
    color: colors.white,
  },
});
