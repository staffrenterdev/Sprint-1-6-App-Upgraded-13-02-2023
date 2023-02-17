import React from "react";
import { StyleSheet, TextInput, View,Image, Platform } from "react-native";
import  AntDesign from "react-native-vector-icons/AntDesign";
import fontsize from "../../constants/i18n/Fontsizes";
import I18n from "../../constants/i18n";

const SearchBar = ({clicked,containerStyle, searchPhrase, setSearchPhrase, setCLicked,placeholdervalue = I18n.t('Search'),inputstyle,Viewstyle,Rightimage,placeholderTextColor,}) => {
  return (
    <View style={[styles.container,containerStyle]}>
      <View
        style={[
          styles.searchBar__clicked,Viewstyle
        ]}
      >
        <View style={{flexDirection:'row'}}>


        <AntDesign
          name="search1"
          size={20}
          color="#828282"
        style={{alignSelf:'center',marginLeft:Platform.OS == 'android'?15:5}}
        />
       
        <TextInput
          style={[styles.input,inputstyle,]}
          placeholder={placeholdervalue}
          placeholderTextColor= {placeholderTextColor}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
        </View>
       
       <Image style={{ marginRight: 40 }} source={Rightimage} />
      </View>
     
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    alignSelf:'center',
    marginTop:15,
    width: "90%",

  },
  searchBar__unclicked: {
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: Platform.OS == 'android'?0:10,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: Platform.OS == 'ios'?20:30,
    alignItems: "center",
    justifyContent: 'space-between',
  },
  input: {
    fontSize: fontsize.Regular,
    marginLeft: 5,
    width: "85%",
  },
});
