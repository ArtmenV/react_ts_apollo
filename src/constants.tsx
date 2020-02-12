export const PHOENIX_SOCKET_ENDPOINT =
  process.env.REACT_APP_PHOENIX_SOCKET_ENDPOINT;
export const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;
export const NODE_ENV = process.env.NODE_ENV;
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const SENTRY_KEY = process.env.SENTRY_KEY || '';

export const APP_NAME = 'MoodleNet';
export const INSTANCE_DESCRIPTION = 'This instance is currently invite-only.';
export const INVITE_ONLY_TEXT =
  'Please note, signups on this instance are currently invite-only.';

export const IS_DEV = NODE_ENV === 'development';

export const languages = {
  en_GB: 'English, British',
  en_US: 'English, USA',
  es_MX: 'Español, Méjico',
  es_ES: 'Español, España',
  fr_FR: 'Français, France',
  eu: 'Euskara',
  ar_SA: 'العربية, المملكة العربية السعودية'
};
export type LocaleKey = keyof typeof languages;
export const locales = Object.keys(languages) as LocaleKey[];

export const algoliaCreds = {
  appId: 'KVG4RFL0JJ',
  apiKey: '884f8371d98c8c9837cf76f85f4b5daa'
};

export const max_file_size = '10MB';

export const accepted_file_types =
  '.pdf, .rtf, .docx, .doc, .odt, .ott, .xls, .xlsx, .ods, .ots, .csv, .ppt, .pps, .pptx, .odp, .otp, .odg, .otg, .odc, .ogg, .mp3, .flac, .m4a, .wav, .mp4, .mkv, .flv, .avi, .gif, .jpg, .jpeg, .png, .svg, .webm, .eps, .tex, .mbz';

export const accepted_license_types = ['CC0', 'CC BY', 'CC BY-SA'];
export const accepted_license_versions = ['1.0', '2.0', '3.0', '4.0'];

/* log ENV if DEV */
IS_DEV &&
  console.log(`-environment-
${Object.keys(process.env)
    .map(key => `${key}=${process.env[key]}`)
    .join('\n')}
-------------
`);
/***/
