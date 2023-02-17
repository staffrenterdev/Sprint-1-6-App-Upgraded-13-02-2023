import React, {useRef, } from 'react';
import {
  View,
  StyleSheet,
  Platform,
} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {mapApiKey} from '../../constants/apiName';
import  AntDesign from "react-native-vector-icons/AntDesign";
export default function GoogleAutoComplete({
  shouldClear,
  placeName,
  newLocation,placeholder="Location"
}) {
  const ref = useRef();


 
  shouldClear && ref.current?.setAddressText('');

  newLocation && ref.current?.setAddressText(newLocation);


  return (
    <View style={{marginVertical: 20, flex:1,   }}>
      <GooglePlacesAutocomplete
        ref={ref}
        currentLocation={true}
        currentLocationLabel='helo'
        placeholder={placeholder}
        query={{
          key: mapApiKey,
          language: 'en', // language of the results
        }}
        onPress={(data, details) => {placeName(data, details)}}
        onFail={error => console.error(error)}
        enablePoweredByContainer={false}
        fetchDetails={true}
        
        styles={{
          textInputContainer: [
            styles.mapView,{
             
    
            }
            
          ],
          textInput: [styles.mapText,{alignSelf:'center',marginTop:4}],
        }}
        nearbyPlacesAPI="GoogleReverseGeocoding"
        renderDescription={row => row.description || row.formatted_address || row.name}
        renderLeftButton={()  => <AntDesign
          name="search1"
          size={20}
          color="#828282"
        style={{alignSelf:'center',marginLeft:Platform.OS == 'android'?15:5,marginLeft:15}}
        />}
        keepResultsAfterBlur={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  mapView: {
  marginHorizontal:15,
    backgroundColor:'#f2f2f2',
    borderRadius:30
  },
  mapText: {
    backgroundColor:'#f2f2f2',
    borderRadius:30,
    height:35,
    justifyContent:'center'
    
  },
});
