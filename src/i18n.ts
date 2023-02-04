import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import backEnd from 'i18next-http-backend';

const backEndOptions = {
	loadPath: '/locales/{{lng}}/{{ns}}.json',
	requestOptions: {
		// used for fetch, can also be a function (payload) => ({ method: 'GET' })
		mode: 'cors',
		credentials: 'same-origin',
		cache: 'default',
	},
};

i18n
	.use(detector)
	.use(backEnd)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		lng: 'en',
		fallbackLng: 'en', // use en if detected lng is not available

		ns: ['common'],

		backend: backEndOptions,

		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
