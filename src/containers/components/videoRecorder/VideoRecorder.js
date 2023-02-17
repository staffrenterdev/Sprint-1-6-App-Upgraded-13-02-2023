import React, {Component} from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  InteractionManager,
  Image,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {RNCamera} from 'react-native-camera';
import RecordingButton from './recordingButton/RecordingButton';
import styles, {
  buttonClose,
  durationText,
  renderClose,
  renderDone,
  buttonSwitchCamera,
  renderSwitchCamera,
} from './styles.js';
import Images from '../../../constants/images';
import {width} from '../../../constants/ScreenSize';
import RNFS, {stat} from 'react-native-fs';
export default class VideoRecorder extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    runAfterInteractions: PropTypes.bool,
    cameraOptions: PropTypes.shape({}),
    recordOptions: PropTypes.shape({}),
    buttonCloseStyle: PropTypes.shape({}),
    buttonSwitchCameraStyle: PropTypes.shape({}),
    durationTextStyle: PropTypes.shape({}),
    renderClose: PropTypes.func,
    renderSwitchCamera: PropTypes.func,
    renderDone: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
    runAfterInteractions: true,
    cameraOptions: {},
    recordOptions: {},
    buttonCloseStyle: buttonClose,
    buttonSwitchCameraStyle: buttonSwitchCamera,
    durationTextStyle: durationText,
    renderClose,
    renderSwitchCamera: renderSwitchCamera,
    renderDone,
  };

  constructor(...props) {
    super(...props);
    this.state = {
      isOpen: this.props.isOpen,
      loading: true,
      time: 0,
      recorded: false,
      recordedData: null,
      cameraType: this.props.cameraOptions.type || RNCamera.Constants.Type.back,
    };
  }

  componentDidMount() {
    const doPostMount = () => this.setState({loading: false});
    if (this.props.runAfterInteractions) {
      InteractionManager.runAfterInteractions(doPostMount);
    } else {
      doPostMount();
    }
  }

  onSave = () => {
    if (this.callback) {
      this.callback(this.state.recordedData, this.state.time);
    }

    this.close();
  };

  switchCamera = () => {
    let type =
      this.state.cameraType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back;
    if (!this.state.isRecording) {
      this.setState({cameraType: type});
    }
  };
  renderClose = () => {};

  open = (options, callback) => {
    this.callback = callback;
    this.setState({
      maxLength: -1,
      ...options,
      isOpen: true,
      isRecording: false,
      time: 0,
      recorded: false,
      recordedData: null,
      converting: false,
    });
  };

  close = () => {
    this.setState({isOpen: false});
  };

  startCapture = () => {
    const options = {
      defaultVideoQuality: RNCamera.Constants.VideoQuality['288p'],
    };
    const shouldStartCapture = () => {
      console.log('this.camera', this.camera);
      if (this.camera) {
        this.camera
          .recordAsync(options)

          .then((data,time) => {
//             let fileName = 'VID_currentDate.mp4';
// RNFS.copyFile(data.uri, RNFS.CachesDirectoryPath + '/Camera/' + fileName).then((data) => {
//     console.log("Video copied locally!!");
//     console.log('dataafsfsfsfs',data)
// }, (error) => {
//     console.log("CopyFile fail for video: " + error);
// })

            console.log('video capture', data);
            console.log('video capture', time);
            this.setState({
              recorded: true,
              recordedData: data,
              // isRecording: true,
            });
          })
          .catch(err => console.error('error during camera recording = ', err));

        setTimeout(() => {
          this.startTimer();
          this.setState({
            isRecording: true,
            recorded: false,
            recordedData: null,
            time: 0,
          });
        });
      }
    };
    if (this.state.maxLength > 0 || this.state.maxLength < 0) {
      if (this.props.runAfterInteractions) {
        InteractionManager.runAfterInteractions(shouldStartCapture);
      } else {
        shouldStartCapture();
      }
    }
  };

  stopCapture = () => {
    const shouldStopCapture = () => {
      this.stopTimer();
      this.camera.stopRecording();
      this.setState({
        isRecording: false,
      });
    };
    if (this.props.runAfterInteractions) {
      InteractionManager.runAfterInteractions(shouldStopCapture);
    } else {
      shouldStopCapture();
    }
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      const time = this.state.time + 1;
      this.setState({time});
      if (this.state.maxLength > 0 && time >= this.state.maxLength) {
        this.stopCapture();
      }
    }, 1000);
  };

  stopTimer = () => {
    if (this.timer) clearInterval(this.timer);
  };

  convertTimeString = time => {
    return moment().startOf('day').seconds(time).format('mm:ss');
  };

  renderTimer() {
    const {isRecording, time, recorded} = this.state;
    return (
      <View>
        {(recorded || isRecording) && (
          <Text style={this.props.durationTextStyle}>
            <Text style={styles.dotText}>●</Text> {this.convertTimeString(time)}
          </Text>
        )}
      </View>
    );
  }

  renderContent() {
    const {isRecording, recorded} = this.state;
    return (
      <View style={styles.controlLayer}>
        {this.renderTimer()}
        <View style={[styles.controls]}>
          <RecordingButton
            style={[styles.recodingButton]}
            isRecording={isRecording}
            onStartPress={this.startCapture}
            onStopPress={this.stopCapture}
          />
          {recorded && (
            <TouchableOpacity onPress={this.onSave} style={styles.btnUse}>
              {this.props.renderDone()}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  renderCamera() {
    return (
      <RNCamera
        ref={cam => {
          this.camera = cam;
        }}
        style={styles.preview}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['288p']}
        {...this.props.cameraOptions}
        type={this.state.cameraType}
        captureAudio>
        {this.renderContent()}
      </RNCamera>
    );
  }

  render() {
    const {loading, isOpen} = this.state;
    if (loading) return <View />;
    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={this.close}>
        <View style={[styles.modal,{marginTop:Platform.OS == 'android' ?0: 50}]}>
          <View style={styles.container}></View>
          <View style={styles.content}>{this.renderCamera()}</View>

          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              // top: Platform.OS == 'android' ? 10 : 20,
              top: hasNotch
                ? width * (30 / 375)
                : Platform.OS == 'ios'
                ? width * (20 / 375)
                : width * (10 / 375),
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <TouchableOpacity onPress={this.close} style={{}}>
              <Image
                source={Images.close}
                style={{
                  width: width * (30 / 375),
                  height: width * (30 / 375),
                }}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.switchCamera} style={{}}>
              <Image
                source={Images.switchCamera}
                style={{
                  width: width * (30 / 375),
                  height: width * (30 / 375),
                }}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
