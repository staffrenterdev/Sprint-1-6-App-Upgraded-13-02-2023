import I18n from '../../constants/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
var type = 'en';
AsyncStorage.getItem('appLanguage').then(lang => {
  var val = JSON.parse(lang);

  global.language = val;
});

const commonRegex = /^[a-z A-Z 0-9.,;\s ?]*$/;

const commonFormat = {
  pattern: commonRegex,
  message: 'Please enter valid data',
};

const validation = {
  school_name: {
    presence: {
      message: 'sName1',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9.,;:@!-‘’']{0,200}$/,
      message: 'sNameError',
    },
    length: {
      minimum: 3,
      message: 'sLength',
    },
  },
  initials_Req: {
    presence: {
      message: 'initials_Req',
    },
  },

  selectDiploma: {
    presence: {
      message: 'selectDiploma',
    },
  },
  selectSkill: {
    presence: {
      message: 'selectSkill',
    },
  },

  dateContract: {
    presence: {
      message: 'dateContract',
    },
  },
  noteReview: {
    presence: {
      message: 'noteReview',
    },
  },
  name21: {
    presence: {
      message: 'rName',
    },
    format: {
      // pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,200}$/,
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9.,;:@!-‘’']{0,200}$/,
      message: 'rNameError',
    },
    length: {
      minimum: 3,
      message: 'rLength',
    },
  },
  EName21: {
    presence: {
      message: 'EName',
    },
    format: {
      // pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,200}$/,
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9.,;:@!-‘’']{0,200}$/,
      message: 'ENameError',
    },
    length: {
      minimum: 3,
      message: 'ELength',
    },
  },
  title: {
    presence: {
      message: 'rTitle',
    },
    format: {
      // pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,200}$/,
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9.,;:@!-‘’']{0,200}$/,
      message: 'rNameError1',
    },
    length: {
      minimum: 3,
      message: 'rLength1',
    },
  },
  jobLinked: {
    presence: {
      message: 'rJob',
    },
  },
  Note1: {
    presence: {
      message: 'note',
    },

    length: {
      minimum: 3,
      message: 'nLength',
    },
  },
  diploma_name: {
    presence: {
      message: 'dName1',
    },
    format: {
      // pattern: /^(?!\s*$|\s).[a-z A-Z 0-9.,;:@!'-]{0,200}$/,
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9.,;:@!-‘’']{0,200}$/,
      message: 'dNameError',
    },
    length: {
      minimum: 3,
      message: 'dLength',
    },
  },
  diplomaType: {
    presence: {
      message: 'dName12',
    },
  },
  schoolType: {
    presence: {
      message: 'sName12',
    },
  },
  dateSelect: {
    presence: {
      message: 'dateSelect',
    },
  },
  email: {
    presence: {
      message: 'email1',
    },
    format: {
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
      message: 'emailError',
    },
  },
  certificateType: {
    presence: {
      message: 'c_type',
    },
  },
  work_position: {
    presence: {
      message: 'EPosition',
    },
  },
  url: {
    presence: {
      message: '',
    },
    format: {
      pattern:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|([\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      message: 'url',
    },
  },
  url1: {
    presence: {
      message: '',
    },
    format: {
      pattern:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|([\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      message: 'url1',
    },
  },
  url2: {
    presence: {
      message: '',
    },
    format: {
      pattern:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|([\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      message: 'url2',
    },
  },
  url3: {
    presence: {
      message: '',
    },
    format: {
      pattern:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|([\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      message: 'url3',
    },
  },
  image: {
    presence: {
      message: 'profileImage',
    },
  },
  document: {
    presence: {
      message: 'documentError',
    },
  },

  TimeError: {
    presence: {
      message: 'Available_Select',
    },
  },
  profile_Contact: {
    presence: {
      message: 'phnWarn',
    },
    format: {
      pattern: /(?:\(?\+\d{2}\)?\s*)?\d+(?:[ -]*\d+)*$/,
      message: 'phnWarn',
    },
  },
  offence_type: {
    presence: {
      message: 'offenceType',
    },
  },
  upload: {
    presence: {
      message: 'uploadError',
    },
  },

  date_select: {
    presence: {
      message: 'date_select',
    },
  },
  confirm_email: {
    presence: {
      message: 'confirmEmail',
    },
    length: {
      minimum: 1,
      message: '',
    },
    match: {
      message: 'confirmEmailError',
    },
  },
  first_name: {
    presence: {
      message: 'fname1',
    },
    format: {
      // pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,200}$/,
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9.,;:@!-‘’']{0,200}$/,
      message: 'fnameError',
    },
    length: {
      minimum: 3,
      message: 'fLength',
    },
  },
  last_name: {
    presence: {
      message: 'Lname1',
    },
    format: {
      // pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,200}$/,
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9.,;:@!-‘’']{0,200}$/,
      message: 'LnameError',
    },
    length: {
      minimum: 3,
      message: 'lLength',
    },
  },
  confirm_password: {
    presence: {
      message: 'confirmpassword1',
    },
    length: {
      minimum: 6,
      message: 'cpError',
    },
    match: {
      message: 'confirmpasswordError',
    },
  },
  Login_password: {
    presence: {
      message: 'enterPassword',
    },
    // format: {
    //   pattern:
    //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
    //   message: '',
    // },
    length: {
      minimum: 6,
      maximum: 20,
      message: 'passwordError1',
    },
  },
  startDate: {
    presence: {
      message: 'startDate',
    },
  },
  endDate: {
    presence: {
      message: 'endDate',
    },
  },
  password: {
    presence: {
      message: 'enterPassword',
    },
    // format: {
    //   pattern:
    //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
    //   message: 'passwordError',
    // },
    length: {
      minimum: 6,
      // maximum: 20,
      message: 'passwordError1',
    },
  },
  password1: {
    presence: {
      message: 'enterPassword',
    },
    format: {
      pattern:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
      message: 'passwordError',
    },
    length: {
      minimum: 8,
      maximum: 20,
      message: 'passwordError1',
    },
  },
  old_password: {
    presence: {
      message: 'Please enter a old password',
    },
  },

  new_password: {
    presence: {
      message: 'Please enter new password',
    },
    format: {
      pattern: /^\S*$/,
      message: 'Spaces are not allowed',
    },
    length: {
      minimum: 8,
      maximum: 12,
      message: 'Your password must be between 8 and 12 characters',
    },
  },
  month: {
    presence: {
      message: 'Please select month',
    },
  },
  year: {
    presence: {
      message: 'Please select year',
    },
  },
  yearSearch: {
    presence: {
      message: '',
    },
  },
  otp: {
    presence: {
      message: 'otp',
    },
    format: {
      pattern: /^[0-9]{4,4}$/,
      message: 'validOtp',
    },
    length: {
      minimum: 4,
      message: 'validOtp',
    },
  },
  mobile: {
    presence: {
      message: 'phoneNumber',
    },
    format: {
      pattern: /^[0-9]{10}$/,
      message: 'validNumber',
    },
    length: {
      // minimum: 10,
      maximum: 10,
      message: 'validNumber1',
    },
  },
  mobile12: {
    presence: {
      message: 'rPhone',
    },
    format: {
      pattern: /^[0-9]{10}$/,
      message: 'validNumber',
    },
  },
  sin: {
    presence: {
      message: 'sinNumber',
    },
    format: {
      pattern: /^[0-9]{9}$/,
      message: 'validSinNumber',
    },
  },
  km: {
    presence: {
      message: 'Please enter kilometers',
    },
    format: {
      pattern: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
      message: 'Kilometers must be a number with 2 digits after decimal',
    },
  },
  kmSearch: {
    presence: {
      message: '',
    },
    format: {
      pattern: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
      message: 'Kilometers must be a number with 2 digits after decimal',
    },
  },
  bodyCon: {
    presence: {
      message: 'Please select condtion',
    },
  },
  mechaCon: {
    presence: {
      message: 'Please select mechanical condtion',
    },
  },
  trim: {
    presence: {
      message: 'Please select trim',
    },
  },

  reportReason: {
    presence: {
      message: 'Please enter reason for report spam',
    },
    format: commonFormat,
    length: {
      minimum: 3,
      message: 'At least 3 characters required',
    },
  },
  keyword: {
    presence: {
      message: '',
    },
    format: commonFormat,
  },
  bodyType: {
    presence: {
      message: 'Please select body type',
    },
  },
  doors: {
    presence: {
      message: 'Please select doors',
    },
  },
  warranty: {
    presence: {
      message: 'Please select warranty',
    },
  },
  fuelType: {
    presence: {
      message: 'Please select fuel type',
    },
  },
  cylinder: {
    presence: {
      message: 'Please select no of cylinders',
    },
  },
  transType: {
    presence: {
      message: 'Please select transmission type',
    },
  },
  usage: {
    presence: {
      message: 'Please provide usages information',
    },
    format: commonFormat,
    length: {
      minimum: 3,
      message: 'At least 3 characters required',
    },
  },
  usageSearch: {
    presence: {
      message: '',
    },
    format: commonFormat,
  },
  size: {
    presence: {
      message: 'Please provide size',
    },
    format: commonFormat,
    length: {
      minimum: 3,
      message: 'At least 3 characters required',
    },
  },
  sizeSearch: {
    presence: {
      message: '',
    },
    format: commonFormat,
  },
  age: {
    presence: {
      message: 'Please enter age',
    },
    format: {
      pattern: /^\d{1,2}$/,
      message: 'Please enter valid age.',
    },
  },
  ageSearch: {
    presence: {
      message: '',
    },
    format: {
      pattern: /^\d{1,2}$/,
      message: 'Please enter valid age.',
    },
  },
  owner_name: {
    presence: {
      message: 'Please enter your owner name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,19}$/,
      message: 'Owner name should not be more than 20 characters.',
    },
  },
  name: {
    presence: {
      message: 'Please enter your name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,19}$/,
      message: 'Name should not be more than 20 characters.',
    },
  },
  blankPass: {
    presence: {
      message: 'Please provide password',
    },
  },
  description: {
    presence: {
      message: 'Please provide product description',
    },
    format: commonFormat,
    length: {
      minimum: 3,
      message: 'At least 3 characters required',
    },
  },
  productName: {
    presence: {
      message: 'Please provide product name',
    },
    format: commonFormat,
    length: {
      minimum: 3,
      message: 'At least 3 characters required',
    },
  },
  specification: {
    presence: {
      message: 'Please provide product specification',
    },
    format: commonFormat,
    length: {
      minimum: 3,
      message: 'At least 3 characters required',
    },
  },
  productCat: {
    presence: {
      message: 'Please select product category from drop down',
    },
  },
  subCat: {
    presence: {
      message: 'Please select sub category',
    },
  },
  location: {
    presence: {
      message: 'Please enter your location',
    },
  },
  suburb: {
    presence: {
      message: 'Please enter your suburb',
    },
    format: {
      pattern: /^(?!\s*$|\s).*$/,
      message: 'Please enter a valid suburb',
    },
  },
  state: {
    presence: {
      message: 'Please enter your state',
    },
    format: {
      pattern: /^(?!\s*$|\s).*$/,
      message: 'Please enter a valid state',
    },
  },
  zipcode: {
    presence: {
      message: 'Please enter your zipcode',
    },
    format: {
      pattern: /^[a-zA-Z0-9]{4,8}$/,
      message: 'Your zipcode must be between 4-8 character',
    },
  },
  dob: {
    presence: {
      message: 'yearError',
    },
  },
  month: {
    presence: {
      message: 'monthError',
    },
  },
  lang: {
    presence: {
      message: 'langError',
    },
  },
  day: {
    presence: {
      message: 'dayError',
    },
  },
  regSpecs: {
    presence: {
      message: 'Please select regional specs',
    },
  },
  license_no: {
    presence: {
      message: 'Please enter your license number for parking space',
    },
    format: {
      pattern: /^[a-zA-Z0-9]{4,20}$/,
      message: 'License number length must be between 4 to 20',
    },
  },

  qr_code: {
    presence: {
      message: 'Please enter qr code',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{5,5}$/,
      message: 'Please enter a valid qr code',
    },
  },
  // image: {
  //   presence: {
  //     message: 'Please upload a profile picture',
  //   },
  // },
  login_password: {
    presence: {
      message: 'Please enter a password',
    },
  },
  old_password: {
    presence: {
      message: 'Please enter old password',
    },
  },

  cardNumber: {
    presence: {
      message: 'Please enter card number',
    },
    format: {
      pattern: /^[0-9]{16,16}$/,
      message: 'Please enter a valid card number',
    },
  },
  cardName: {
    presence: {
      message: 'Please enter name on card',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z]{0,29}$/,
      message: 'Name should not be more than 30 characters.',
    },
  },
  cvv: {
    presence: {
      message: 'Please enter cvv',
    },
    format: {
      pattern: /^[0-9]{3,4}$/,
      message: 'Please enter a valid cvv',
    },
    length: {
      minimum: 3,
      message: 'Your cvv must be at least 3 digits',
    },
  },

  accountNumber: {
    presence: {
      message: 'Please enter your account number',
    },
    format: {
      pattern: /^[0-9]{6,12}$/,
      message: 'Your account number must be between 6 and 12 digits',
    },
    length: {
      minimum: 6,
      maximum: 12,
      message: 'Your account number must be between 6 and 12 digits',
    },
  },
  bsb: {
    presence: {
      message: 'Please enter bsb',
    },
    format: {
      pattern: /^[0-9]{6,6}$/,
      message: 'Your bsb must be of 6 digits',
    },
    length: {
      minimum: 6,
      maximum: 6,
      message: 'Your bsb must be of 6 digits',
    },
  },

  bankName: {
    presence: {
      message: 'Please enter your bank name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z]{0,29}$/,
      message: 'Name should not be more than 30 characters. ',
    },
  },
  accountHolderName: {
    presence: {
      message: 'Please enter account holder name',
    },
    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z]{0,39}$/,
      message: 'Account holder name should not be more than 40 characters.',
    },
  },
  license_number: {
    presence: {
      message: 'Please enter license number',
    },
    format: {
      pattern: /^[a-zA-Z0-9]{4,20}$/,
      message: 'License number length must be between 4 to 20',
    },
  },
  vehicle_model: {
    presence: {
      message: 'Please enter vechicle model',
    },
  },
  vehicle_number: {
    presence: {
      message: 'Please enter vechicle number',
    },
  },
  start_date: {
    presence: {
      message: 'Please select start date',
    },
  },
  start_time: {
    presence: {
      message: 'Please select start time',
    },
  },
  end_time: {
    presence: {
      message: 'Please select end time',
    },
  },
  total_price: {
    presence: {
      message: 'Please enter total price',
    },
  },
  bed: {
    presence: {
      message: 'Please select number of bedrooms',
    },
  },
  bath: {
    presence: {
      message: 'Please select number of bathrooms',
    },
  },
  bedSearch: {
    presence: {
      message: '',
    },
  },
  bathSearch: {
    presence: {
      message: '',
    },
  },
  price: {
    presence: {
      message: 'Please enter price',
    },
    format: {
      pattern: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
      message: 'Price must be a number with 2 digits after decimal',
    },
  },
  closingFee: {
    presence: {
      message: 'Please enter closing fee',
    },
    format: {
      pattern: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
      message: 'Closing fee must be a number with 2 digits after decimal',
    },
  },
  address: {
    presence: {
      message: 'Please enter address ',
    },
  },
  lat: {
    presence: {
      message: 'Please select address from drop down suggestions',
    },
  },
  owner_name: {
    presence: {
      message: 'Please enter owner name',
    },
  },
  landmark: {
    presence: {
      message: 'Please enter landmark',
    },
    format: commonFormat,
  },
  building: {
    presence: {
      message: 'Please enter building name',
    },
    format: commonFormat,
  },
  country: {
    presence: {
      message: 'Please select country name',
    },
    format: commonFormat,
  },
  city: {
    presence: {
      message: 'Please select city name',
    },
    format: commonFormat,
  },
};

export default validation;
