import { View, Text,Image } from 'react-native'
import React from 'react'
import Images from '../../constants/images'
import { width } from '../../constants/ScreenSize'
import I18n from '../../constants/i18n';
import fontsize from '../../constants/i18n/Fontsizes';

const EmptyComponent = () => {
  return (
    <View style={{height:600,justifyContent:'center',alignItems:'center',}}>
        <Image
          source={Images.EmptyImage}
          style={{
            
          }}></Image>
      <Text style={{color:'black',fontSize:fontsize.Large,width:width*(160/375),textAlign:'center',opacity:0.5}}>{I18n.t('nothingShow')}</Text>
    </View>
  )
}

export default EmptyComponent