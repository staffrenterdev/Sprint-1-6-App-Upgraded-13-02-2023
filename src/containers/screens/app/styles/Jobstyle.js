import {StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';
import fontsize from '../../../../constants/i18n/Fontsizes';
import {height, width} from '../../../../constants/ScreenSize';

const styles = StyleSheet.create({
  Activepagination: {
    width: width * (30 / 375),
    marginLeft: 5,
    height: width * (12 / 375),
    borderRadius: width * (8 / 375),
    backgroundColor: colors.yellow,
    marginTop: width * (-15 / 375),
  },
  Inactivepagination: {
    width: width * (8 / 375),
    height: width * (8 / 375),
    marginTop: width * (-15 / 375),
    backgroundColor: '#e5e5e5',
  },
  textboxView: {
    marginHorizontal: width * (20 / 375),
  },
  textboxView1: {
    marginHorizontal: width * (20 / 375),
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#fff',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    justifyContent: 'center',
  },

  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  backRightBtnLeft: {
    right: 50,
  },
  backRightBtnRight: {},
  rowBack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7EB',
    flex: 1,

    paddingLeft: 15,
  },
  myContracts: {marginBottom: 20, marginHorizontal: width * (15 / 375)},
  ChatIcon: {
    marginVertical: width * (10 / 375),
    marginRight: width * (20 / 375),
  },
  UserName: {
    fontSize: 20,
    marginHorizontal: width * (20 / 375),
    fontFamily: fonts.Bold,
  },
  Joined: {
    marginHorizontal: width * (20 / 375),
    color: colors.gray,
    bottom: 7,
    fontSize: 12,
  },

  bottomView: {
    marginHorizontal: width * (15 / 375),
    paddingVertical: width * (20 / 375),
    backgroundColor: colors.whitebackground,
    borderRadius: width * (15 / 375),
    marginTop: width * (18 / 375),
  },

  permanentJobs: {
    marginTop: width * (-8 / 375),
    backgroundColor: colors.yellow,
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: width * (20 / 375),
    right: 0,
    width: width * (20 / 375),
    borderRadius: width * (20 / 375),
    alignItems: 'center',
    justifyContent: 'center',
  },

  permanentJobsText: {flex: 0.7, lineHeight: width * (18 / 375)},

  permanentJobsNo: {color: colors.yellow, flex: 0.3},

  Touch1: {
    backgroundColor: colors.whitebackground,
    flexDirection: 'row',
    padding: width * (18 / 375),
    alignItems: 'center',
    borderRadius: width * (10 / 375),
    flex: 1,
  },

  view1: {flexDirection: 'row', justifyContent: 'space-between'},
  TouchableOpacityview: {
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  TouchableOpacityview2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 20,
    shadowColor: '#8a8787',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    elevation: 5,
    shadowRadius: 3,
  },
  Accounttext: {
    fontSize: fontsize.Large,
    fontFamily: fonts.Bold,
    marginVertical: 20,
    marginLeft: 20,
  },
  imagetext: {marginHorizontal: 5, fontSize: 12, color: colors.gray},
  imageview: {flexDirection: 'row', alignItems: 'center', padding: 5},
  imagestyle: {alignSelf: 'center', resizeMode: 'contain'},

  sameview: {margin: width * (10 / 375), marginTop: 0},

  sameviewtext: {
    fontSize: fontsize.Regular,
    alignSelf: 'center',
    marginVertical: 5,
    fontFamily: fonts.Bold,
  },

  view12: {
    marginHorizontal: width * (15 / 375),
    paddingHorizontal: width * (15 / 375),
    paddingVertical: width * (20 / 375),
    backgroundColor: colors.whitebackground,
    borderRadius: width * (15 / 375),
    marginTop: width * (18 / 375),
  },

  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text2: {textAlign: 'right'},

  _rendernotiListsview: {
    width: '85%',
    flexDirection: 'row',
    marginVertical: 15,
    alignSelf: 'center',
  },
  _rendernotiListstitle: {
    fontSize: fontsize.Large,
    color: colors.yellow,
    fontWeight: '600',
  },

  text3: {textAlign: 'right', color: colors.yellow},

  _rendernotiLists1title: {fontSize: fontsize.Regular, marginVertical: 2},
  _rendernotiLists1title2: {
    fontSize: 15,
    color: colors.gray,
    marginVertical: 2,
  },
  jobstatuslable: {
    width: 60,
    height: 60,
    position: 'relative',
    bottom: width * (20 / 375),
    right: width * (10 / 375),
  },
  _rendernotiLists1amount: {
    borderRadius: width * (30 / 375),
    height: width * (30 / 375),
    borderColor: colors.yellow,
    borderWidth: width * (1 / 375),
    alignItems: 'center',
    backgroundColor: colors.white,
    width: width * (80 / 375),
    justifyContent: 'space-evenly',
  },
  _rendernotiLists1amounttext: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
  },

  completeProfilebutton: {
    borderRadius: width * (30 / 375),
    height: width * (30 / 375),
    borderColor: colors.yellow,
    alignItems: 'center',
    width: width * (80 / 375),
    justifyContent: 'space-evenly',
  },

  Complete_profile: {
    fontSize: fontsize.Regular,
    fontFamily: fonts.Bold,
  },
  Complete_profile_text1: {fontSize: 12, color: colors.gray},

  Beforebeingtext: {
    fontSize: fontsize.Regular,
    textAlign: 'center',
    fontWeight: '500',
  },

  container: {
    backgroundColor: colors.whitebackground,
    flex: 1,
  },
  Jobslistview: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 30,
    width: '60%',
    justifyContent: 'space-around',
    marginLeft: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderWidth: 0.4,
    borderColor: '#171717',
  },
  Jobslistview2: {
    borderRadius: 30,
    padding: 10,
    width: '40%',
    margin: 2,
  },
  Jobslistview3: {
    borderRadius: 30,
    padding: 10,
    width: '60%',
    margin: 2,
  },
});

export default styles;
