import React, {useState, useRef} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {height} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import Loader from '../../components/loader';
import moment from 'moment';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import SignItOut from '../../components/SignItOut';
import styles from './styles/mapstyle';
const map = props => {
  const [state, setState] = useState({
    email: '',
    password: '',
    emailReq: '',
    passwordError: '',
    loading: false,
    data: '',
    otp: '',
    otpError: '',
    showImgOption: '',
    profileImage: '',
    experienceStartDate: '',
    experienceEndDate: '',
    experienceStartDate1: moment(new Date()).format('YYYY-MM-DD'),
    experienceEndDate1: moment(new Date()).format('YYYY-MM-DD'),

    lat1: 45.48049,
    lng1: -73.5665,
    showFlatList: false,
  });
  const [agreeLogout, setAgreeLogout] = React.useState(false);
  const myRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messengerData, setMessengerData] = React.useState([]);

  const [messengerData21, setMessengerData21] = React.useState([]);

  return (
    <View>
      <SignItOut navigator={props.navigation} agreeLogout={agreeLogout} />
      <Loader loading={loading} />

      <ScrollView ref={e => (myRef.current = e)}>
        <View
          style={[
            styles.mainview
          ]}>
          <MapView
            style={{height: height - height * (260 / 375), borderRadius: 10}}
            clusterColor={'#000'}
            minZoom={1}
            maxZoom={messengerData.length + messengerData21.length}
            initialRegion={{
              latitude: parseFloat(state.lat1),
              longitude: parseFloat(state.lng1),
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}>
            <Marker coordinate={{latitude: state.lat1, longitude: state.lng1}}>
              <Image
                source={Images.Maplocation}
                style={styles.Maplocation}
              />
            </Marker>
          </MapView>
        </View>
      </ScrollView>
    </View>
  );
};

export default map;
