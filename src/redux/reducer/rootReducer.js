import {combineReducers} from 'redux';
import loginR from './loginR';
import signupR from './SignupR';
import ForgotPasswordR from './ForgotPasswordR';
import VerificationR from './VerificationR';
import ResetPasswordR from './ResetPasswordR';
import ChangePasswordR from './ChangePasswordR';
import profileSettingR from './profileSettingR';
import GetProfileR from './GetProfileR';
import PrivacyPolicyR from './privacyPolicyR';
import ResendOtpR from './ResendOtpR';
import cmsR from './cmsR';
import AboutusR from './AboutusR';
import passcodeR from './passcodeR';
import quizR from './quizR';
import quizDescriptionR from './quizDescriptionR';
import gameR from './gameR';
import checkDataR from './checkDataR';
import homeR from './homeR';
import cmsLoginR from './cmsLoginR';
import ResultR from './ResultR';
import DashBoardR from './DashBoardR';
import completeProfileR from './completeProfileR';
import editProfileR from './editProfileR';
import editContactR from './editContactR';
import drawerR from './drawerR';
import experienceR from './experienceR';
import editVideoR from './editVideoR';
import addEducationR from './addEducationR';
import addCertificationR from './addCertificationR';
import addExperienceR from './addExperienceR';
import addReferenceR from './addReferenceR';
import deleteExperienceR from './deleteExperienceR';
import addAddressR from './addAddressR';
import backGroundCheckR from './backGroundCheckR';
import backCheckR from './backCheckR';
import deleteAddressR from './deleteAddressR';
import addOffenceR from './addOffenceR';
import add_docsR from './add_docsR';
import addSignR from './addSignR';
import backGroundSuccessR from './backGroundSuccessR';
import onDemandListR from './onDemandListR';
import mapR from './mapR';
import onDemandFilterR from './onDemandFilterR';
import onDemandDetailR from './onDemandDetailR';
import onDemandApplyR from './onDemandApplyR';
import myContractFilterR from './myContractFilterR';
import myContractListR from './myContractListR';
import myContractCancelR from './myContractCancelR';
import myContractDetailR from './myContractDetailR';
import documentR from './documentR';
import skillR from './skillR';
import skillDetailR from './skillDetailR';
import skillExperienceR from './skillExperienceR';
import skillAddExperienceR from './skillAddExperienceR';
import getSubSkillR from './getSubSkillR';
import addSkillR from './addSkillR';
import deleteSkillR from './deleteSkillR';
import experienceSkillR from './experienceSkillR';
import addCVR from './addCVR';
import FAQR from './FAQR';
import HelpcontentR from './HelpcontentR';
import Term_conditionsR from './Term_conditionsR';
import checkpasswordR from './checkpasswordR';
import SendOtpR from './SendOtpR';
import UpdateEmailR from './UpdateEmailR';

const rootReducer = combineReducers({
  loginR,
  signupR,
  ForgotPasswordR,
  VerificationR,
  ResetPasswordR,
  ChangePasswordR,
  profileSettingR,
  GetProfileR,
  AboutusR,
  PrivacyPolicyR,
  ResendOtpR,
  cmsR,
  passcodeR,
  quizR,
  quizDescriptionR,
  gameR,
  checkDataR,
  homeR,
  cmsLoginR,
  ResultR,
  completeProfileR,
  DashBoardR,
  editProfileR,
  editContactR,
  drawerR,
  experienceR,
  editVideoR,
  addEducationR,
  addCertificationR,
  addExperienceR,
  addReferenceR,
  deleteExperienceR,
  addAddressR,
  backGroundCheckR,
  backCheckR,
  deleteAddressR,
  addOffenceR,
  add_docsR,
  addSignR,
  backGroundSuccessR,
  onDemandListR,
  mapR,
  onDemandFilterR,
  onDemandDetailR,
  onDemandApplyR,
  myContractFilterR,
  myContractListR,
  myContractDetailR,
  myContractCancelR,
  documentR,
  skillR,
  skillDetailR,
  skillExperienceR,
  skillAddExperienceR,
  addSkillR,
  getSubSkillR,
  deleteSkillR,
  experienceSkillR,
  addCVR,
  FAQR,
  HelpcontentR,
  Term_conditionsR,
  checkpasswordR,
  SendOtpR,
  UpdateEmailR
});

export default rootReducer;
