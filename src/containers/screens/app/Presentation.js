import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import NavBar from '../../components/NavBar';
import Video from 'react-native-video';
import {width} from '../../../constants/ScreenSize';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import Button from '../../components/Button';
import styles from '../../screens/app/styles/Presentationstyle';
import CommonStyles from '../../../assets/css/commonStyles';
import I18n from '../../../constants/i18n';
import {Container, Content} from 'native-base';
import moment from 'moment';
import VideoRecorder from '../../components/videoRecorder/VideoRecorder';
import {launchImageLibrary} from 'react-native-image-picker';
import {ShowStatusBarWhite} from '../../components/Statusbar';
import apiName from '../../../constants/apiName';
import {showDangerToast} from '../../components/ToastMessage';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import {dirPicutures} from '../../components/dirStorage';
import RNVideoHelper from 'react-native-video-helper';
import fontsize from '../../../constants/i18n/Fontsizes';
import ImagePicker from 'react-native-image-crop-picker';
import {
  checkStoragePermission,
  checkStoragePermissionAndroid,
  StorageAndroid,
  checkPhotoPermission
} from '../../components/imagePicker';
import VideoPickerModal from '../../components/VideoPickerModal';
import {postService} from '../../../services/postServices';
import {getService} from '../../../services/getServices';
import Loader from '../../components/loader';
const Presentation = props => {
  const videoref = useRef();
  const [videoduration, setVideoduration] = useState();
  const [newView, setNew] = useState(false);
  const [videouploadyes, setVideouploadyes] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [videoloading, setVideoloading] = useState(true);
  const [loadingfirst, setLoadingfirst] = useState(true);
  const [backpause, setbackpause] = useState(false);
  const videoRecorder = React.useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showVideoData, setShowVideoData] = useState(true);
  const [showData, setShowData] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [loading2, setLoading2] = useState(false);
  const [state, setState] = useState({
    videoName: '',
    videoObj: {},
    videoDuration: '',
    videoNameError: '',
    videoSize: '',
    videoFileName: '',
  });
  useEffect(() => {
    const unsubscribeOnBlur = props.navigation.addListener('focus', () => {
      getVideoPath();
    });
    return unsubscribeOnBlur;
  }, []);

  useEffect(() => {
    if (videoUrl == '' || videoUrl == null || videoUrl == undefined) {
      setVideouploadyes(false);
    } else {
      setTimeout(() => {
        setLoading(false);
        setVideouploadyes(true);
      }, 1000);
    }
  }, [videoUrl]);

  const getVideoPath = () => {
    setLoading(true);
    getService(apiName.getuserdetails)
      .then(async res => {
        if (res.status == 200) {
          setVideoloading(true);
          setVideoUrl(res.data?.response?.video);
          setThumbnailImage(res.data?.response?.thumbnail_image);
          setTimeout(() => {
            setLoadingfirst(false);
            setLoading(false);
          }, 1000);
        }
      })
      .catch(error => {
        setVideoloading(false);
        setLoading(false);
        console.log(
          'error for getuserdetails  api =====================>>',
          error,
        );
      });
  };
  const imageUpdate = () => {
    Alert.alert(
      I18n.t('Removevideo'),
      I18n.t('sureyouremove'),
      [
        {
          text: I18n.t(['cancel']),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {
          text: I18n.t('OK'),
          onPress: () => {
            deleteVideo();
          },
        },
      ],
      {cancelable: false},
    );
  };
  const deleteVideo = () => {
    const body = new FormData();
    postService(apiName.deleteuservideo)
      .then(async res => {
        if (res.status == 200) {
          setLoading(false);
          getVideoPath();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for deleteVideo  api =====================>>',
          error,
        );
      });
  };
  const moveAttachment = async (filePath, newFilepath, time) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      RNFS.mkdir(dirPicutures)
        .then(() => {
          RNFS.moveFile(filePath, newFilepath)
            .then(() => {
              RNFetchBlob.fs
                .stat(newFilepath)
                .then(stats => {
                  state.videoSize = stats.size;
                  state.videoName = 'file://' + stats.path;
                  let sec = time;
                  state.videoComponents = stats;
                  state.videoNameError = '';
                  state.videoDuration = sec;
                  state.videoFileName = stats.filename;

                  uploadVideoRecord(state.videoName);
                })
                .catch(err => {});

              resolve(true);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  const uploadVideo = compressedUri => {
    console.log('uploadVideouploadVideo')
    let video = {
      name: 'blob',
      type: 'video/mp4',
      uri: compressedUri,
    };

    const body = new FormData();

    body.append('video', video);
    postService(apiName.uploadvideointerview, body)
      .then(async res => {
        if (res.status == 200) {
          console.log('getVideoPathgetVideoPath')
          getVideoPath();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for uploadVideo  api =====================>>',
          error,
        );
      });
  };
  const uploadVideoRecord = VideoPath => {
    let video = {
      name: 'blob',
      type: 'video/mp4',
      uri: VideoPath,
    };

    const body = new FormData();

    body.append('video', video);
    postService(apiName.uploadvideointerview, body)
      .then(async res => {
        setLoading(false);
        if (res.status == 200) {
          setLoading(false);
          getVideoPath();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(
          'error for uploadVideoRecord  api =====================>>',
          error,
        );
      });
  };

  const trim1 = (data, time) => {
    if (Platform.OS == 'android') {
      setLoading(true);
    }
    let hello = '';

    RNFetchBlob.fs.stat(data).then(stats => {});

    RNVideoHelper.compress(data, {
      startTime: 0, // optional, in seconds, defaults to 0
      endTime: 120, //  optional, in seconds, defaults to video duration
      quality: 'medium', // default low, can be medium or high
      defaultOrientation: 0, // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
    })

      .progress(value => {})
      .then(compressedUri => {
        hello = compressedUri;
        if (Platform.OS == 'ios') {
          RNFS.mkdir(dirPicutures);
          const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.mp4`;
          const newFilepath = `${dirPicutures}/${newImageName}`;
          const imageMoved = moveAttachment(compressedUri, newFilepath, time);
        } else {
          RNFetchBlob.fs
            .stat(compressedUri)
            .then(stats => {
              state.videoSize = stats.size;
              state.videoName = stats.path;
              const uriComponents = 'file://' + stats.path;
              state.videoComponents = stats;
              state.videoNameError = '';
              state.videoFileName = stats.filename;

              uploadVideoRecord(uriComponents);
            })
            .catch(err => {
              console.log('Error fetching recording size = ', err);
            });
        }
      });
  };

  const trim2 = (data, time) => {
    console.log('trim2trim2trim2')
    RNFetchBlob.fs.stat(data).then(stats => {});

    RNVideoHelper.compress(data, {
      startTime: 0, // optional, in seconds, defaults to 0
      endTime: 120, //  optional, in seconds, defaults to video duration
      quality: 'medium', // default low, can be medium or high
      defaultOrientation: 0, // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
    })

      .progress(value => {})
      .then(compressedUri => {
        hello = compressedUri;
        if (Platform.OS == 'android') {
          uploadVideo('file://' + compressedUri);
        } else {
          console.log('compressedUri',compressedUri)
          uploadVideo(compressedUri);
        }
      });
  };
  function startRecorder() {
    if (videoRecorder && videoRecorder.current) {
      videoRecorder.current.open({maxLength: 120}, (data, time) => {
        var minutes = Math.floor(time / 60000);

        if (minutes < 3) {
          state.videoData = data.uri;

          trim1(data.uri, time);
        } else {
          setLoading(false);
          showDangerToast('Video duration should be less than 2 mins.');
        }
      });
    }
  }

  const launchImageLibraryIos = async () => {

    console.log('ffbbbbb')
    var options = {
      mediaType: 'video',
    };
    await launchImageLibrary(options, assets => {
      setLoading(true)
      console.log('meeeeeeeee')
      {
        assets.didCancel === true
          ? null
          : RNFS.stat(assets?.assets[0].uri)
              .then(stats => {
                state.videoObj = stats.path;
                state.videoSize = stats.size;
                state.videoName = assets?.assets[0].uri;
                state.videoComponents = stats;
                state.videoNameError = '';
                state.videoDuration = assets?.assets[0].duration;
                const duration = assets?.assets[0].duration;

                const uriComponents = assets?.assets[0]?.uri.split('/');
                const uri = assets?.assets[0]?.uri;
                const fileNameAndExtension =
                  uriComponents[uriComponents.length - 1];
                state.videoFileName = fileNameAndExtension;
                if (assets?.assets[0].duration < 120) {
                  setLoading(true)
                  trim2(uri);
                } else {
                  showDangerToast('Video duration should be less than 2 mins.');
                }
              })
              .catch(err => {
                setLoading(false);
              });
      }
    });
  };
  const pickVideoHandler = () => {
    StorageAndroid.getStoragePermission()
      .then(responsee => {
        ImagePicker.openPicker({
          mediaType: 'video',
        })
          .then(video => {
            setShowVideoModal(false);
            setNew(false);

            var minutes = Math.floor(video.duration / 60000);
            if (minutes < 2) {
              setLoading(true)
              trim2(video.path);
            } else {
              setLoading(false);
              showDangerToast('Video duration should be less than 2 mins.');
            }
          })
          .catch(error => {
            setLoading(false);
          });
      })
      .catch(e => {
        console.log('e = ', e);
      });
  };
  const pickVideoHandler2 = () => {
    // checkStoragePermission()
    //   .then(responsee => {
        ImagePicker.openPicker({
          mediaType: 'video',
        })
          .then(video => {
            console.log('vkvvkkcvkckvkckvkckvkcv',video)
            setShowVideoModal(false);
            setNew(false);

            var minutes = Math.floor(video.duration / 60000);
            if (minutes < 2) {
              setLoading(true)
              trim2(video.path);
            } else {
              setLoading(false);
              showDangerToast('Video duration should be less than 2 mins.');
            }
          })
          .catch(error => {
            setLoading(false);
          });
      // })
      // .catch(e => {
      //   console.log('e = ', e);
      // });
  };

  const videoMedium = () => {
    console.log('checkStoragePermissioncheckStoragePermission',checkStoragePermission())
    Platform.OS == 'ios'
      ? checkStoragePermission()
        ? pickVideoHandler2()
        : null
      : checkStoragePermissionAndroid()
      ? pickVideoHandler()
      : null;
  };

  useEffect(() => {
    if (loading == true) {
      setLoading2(true);
    } else {
      setLoading2(false);
    }
  }, [loading]);

  return (
    <Container style={styles.container}>
      <NavBar
        source={Images.backarrow}
        lefttext={I18n.t('Back')}
        rightText={I18n.t('Presentation') + ' '}
        navigation={() => {
          if (Platform.OS == 'android') {
            setShowVideoData(false);
            setbackpause(false);
            setLoading2(true);
            setVideoloading(false);
            setTimeout(() => {
              props.navigation.goBack();
              setLoading2(false);
            }, 1500);
          } else if (Platform.OS == 'ios') {
            props.navigation.goBack();
          }
        }}></NavBar>
      <ShowStatusBarWhite />

      {loading2 == true && loadingfirst == false ? (
        <Loader loading={loading2} />
      ) : null}
      {loadingfirst == true ? (
        <Loader loading={loading2} />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.buttonmain}>
            <TouchableOpacity
              style={[
                styles.buttonstyle,
                {
                  borderColor: active == true ? colors.yellow : colors.white,
                  borderWidth:
                    active == false ? width * (0 / 375) : width * (1 / 375),
                  backgroundColor:
                    active == false ? colors.yellow : colors.white,
                },
              ]}
              onPress={() => {
                setActive(false);
                setVideoloading(true);
              }}>
              <Text
                style={{
                  color: active == true ? colors.yellow : colors.white,
                  fontSize: fontsize.Regular,
                }}>
                {I18n.t('Videoselfie')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonstyle2,
                {
                  borderWidth:
                    active == false ? width * (1 / 375) : width * (0 / 375),
                  backgroundColor:
                    active == true ? colors.yellow : colors.white,
                },
              ]}
              onPress={() => {
                setActive(true);
              }}>
              <Text
                style={{
                  color: active == true ? colors.white : colors.yellow,
                  fontSize: fontsize.Regular,
                }}>
                {I18n.t('Interview')}
              </Text>
            </TouchableOpacity>
          </View>
          {active == false && videouploadyes == true ? (
            <View style={{flex: 1, marginTop: 10}}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    imageUpdate();
                  }}
                  style={styles.RemoveVideo}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={Images.RemoveVideo}
                  />
                </TouchableOpacity>
                {videoloading == true && Platform.OS == 'ios' ? (
                  <ImageBackground
                    source={{uri: thumbnailImage}}
                    style={styles.thumbnailImage}>
                    <View style={styles.thumbnailImageview}>
                      <ActivityIndicator
                        size="large"
                        animating={videoloading}
                        color={colors.yellow}
                      />
                    </View>
                  </ImageBackground>
                ) : (
                  <View style={styles.thumbnailImageview}>
                    <ActivityIndicator
                      size="large"
                      animating={videoloading}
                      color={colors.yellow}
                    />
                  </View>
                )}

                {showVideoData == true ? (
                  <Video
                    resizeMode="cover"
                    focusable={true}
                    onLoad={val => {
                      setbackpause(true);
                      setVideoloading(false);
                      setVideoduration(val?.duration);
                    }}
                    ref={videoref}
                    source={{uri: videoUrl}}
                    controls={true}
                    paused={true}
                    disableDisconnectError={true}
                    fullscreen={false}
                    poster={Platform.OS == 'android' ? thumbnailImage : null}
                    posterResizeMode={'cover'}
                    disableFocus={true}
                    style={{height: 250, width: '100%', borderRadius: 20}}
                  />
                ) : (
                  <Image
                    style={{height: 250, width: '100%', borderRadius: 20}}
                    source={{uri: thumbnailImage}}></Image>
                )}
              </View>
              <View style={{marginHorizontal: 10, marginTop: 50}}>
                <Text style={styles.commmontext}>
                  {I18n.t('additionpresentation')}
                </Text>
                <Text style={styles.commmontext}>{I18n.t('Seeothertab')}</Text>
                <Text style={styles.commmontext}>
                  {I18n.t('Lookingforward')}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{flex: 1}}>
              {active == false ? (
                <Content>
                  <Image
                    source={Images.Presentationintro}
                    style={{
                      marginVertical: 10,
                      alignSelf: 'center',
                    }}></Image>

                  <View style={{marginHorizontal: 15}}>
                    <Text style={styles.timefor}>{I18n.t('timefor')}</Text>
                    <Text style={styles.objective}>{I18n.t('objective')}</Text>
                    <Text style={styles.objective}>{I18n.t('Notethat')}</Text>
                    <Text style={styles.objective}>
                      {I18n.t('additionpresentation')}
                    </Text>
                    <Text style={styles.objective}>
                      {I18n.t('Lookingforward')}
                    </Text>
                  </View>
                </Content>
              ) : (
                <Content>
                  <Image
                    source={Images.InterViewIntro}
                    style={{
                      alignSelf: 'center',
                      marginVertical: 10,
                    }}></Image>

                  <View style={{marginHorizontal: 10}}>
                    <Text
                     style={styles.timefor}>
                      {I18n.t('Interviewrecruiter')}
                    </Text>
                    <Text
                      style={styles.appointmentwith}>
                      {I18n.t('appointmentwith')}
                    </Text>
                    <Text
                    style={styles.appointmentwith}>
                      {I18n.t('Followinginterview')}
                    </Text>
                    <Text
                     style={styles.appointmentwith}>
                      {I18n.t('Lookingforward')}
                    </Text>
                  </View>
                </Content>
              )}
              {active == false ? (
                <View style={{alignItems: 'center'}}>
                  <Button
                    isleftImagepath={Images.Cameraicon}
                    isleftImageStyle={{
                      marginRight: 20,
                      left: width * (55 / 375),
                    }}
                    isleftImage={true}
                    buttonStyle={styles.presentationbutton}
                    label={I18n.t('presentation')}
                    onPress={() => {
                      setShowVideoModal(true);
                      setNew(true);
                    }}
                    isLabel={true}
                    buttonTextStyle={[
                      CommonStyles.buttontext,
                      {alignSelf: 'center', paddingTop: 4},
                    ]}
                  />
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Button
                    isleftImagepath={Images.Calendarwhite}
                    isleftImageStyle={{
                      marginRight: 20,
                      left:
                        global.language == 'en'
                          ? width * (55 / 375)
                          : width * (45 / 375),
                    }}
                    isleftImage={true}
                    buttonStyle={styles.presentationbutton}
                    label={I18n.t('Bookinterview')}
                    onPress={() => {}}
                    isLabel={true}
                    buttonTextStyle={[
                      CommonStyles.buttontext,
                      {alignSelf: 'center', paddingTop: 4},
                    ]}
                  />
                </View>
              )}
              <View></View>
              <VideoPickerModal
                title={I18n.t('uploadVideoNew')}
                showModal={showVideoModal}
                onPress={() => {
                  setShowData(false);
                  setShowVideoModal(false);
                  setNew(false);
                }}
                onPressCamera={() => {
                  setShowVideoModal(false);
                  setNew(false);
                  setTimeout(() => {
                    startRecorder();
                  }, 1000);
                }}
                onPressGallery={() => {
                  console.log('onPressGallery');
                  setTimeout(() => {
                    
                    videoMedium();
                  }, 1000);
                 
                  setNew(false);
                  setShowVideoModal(false);
                }}
              />
              <VideoRecorder ref={videoRecorder} compressQuality={'medium'} />
            </View>
          )}
        </View>
      )}
      {newView == true ? (
        <View
          style={CommonStyles.modalbackview}
          onPress={() => setNew(false)}></View>
      ) : null}
    </Container>
  );
};

export default Presentation;
