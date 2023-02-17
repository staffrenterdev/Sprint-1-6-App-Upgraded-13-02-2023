import React from 'react';
import LocationView from 'react-native-location-view';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Container} from 'native-base';
import Images from '../../constants/images';
import {width} from '../../constants/ScreenSize';
import colors from '../../constants/colors';
import I18n from '../../constants/i18n';
import {mapApiKey} from '../../constants/apiName';

export default class LocationPicker extends React.Component {
  state = {};

  goBack(address) {
    let name =
      this.props.route.params && this.props.route.params.screenName
        ? this.props.route.params.screenName
        : 'Home';

    this.props.navigation.navigate(name, {
      selectedAddress: address,
      screenFrom: 'LocationPicker',
    });
  }

  selectedLocation = address => {
    this.goBack(address);
  };

  render() {
    return (
      <Container style={{flex: 1, backgroundColor: '#ffffff'}}>
     
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            marginTop: width * (50 / 375),
            marginBottom: width * (100 / 375),
            marginLeft: width * (10 / 375),
          }}>
          <Image style={{resizeMode: 'contain'}} source={Images.close}></Image>
         
        </TouchableOpacity>

        <View style={{flex: 0.5}}>
          <LocationView
            apiKey={mapApiKey}
            initialLocation={{
              latitude:
                this.props.route.params && this.props.route.params.currentLat
                  ? this.props.route.params.currentLat
                  : global.lat,
              longitude:
                this.props.route.params && this.props.route.params.currentLong
                  ? this.props.route.params.currentLong
                  : global.lng,
            }}
            markerColor={colors.black}
            onLocationSelect={address => this.selectedLocation(address)}
            actionText={I18n.t('Set')}
            actionButtonStyle={{backgroundColor: colors.yellow}}
          />
        </View>
      </Container>
    );
  }
}
