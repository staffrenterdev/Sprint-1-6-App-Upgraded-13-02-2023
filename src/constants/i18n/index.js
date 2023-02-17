import I18n, {getLanguages} from 'react-native-i18n';

import fr from './fr';
import en from './en';

I18n.fallbacks = true;

I18n.translations = {
  fr,
  en,
};

export default I18n;
