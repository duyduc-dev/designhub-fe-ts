export const AppColors = {
  arsenic: '#3C3C43',
  secondary: {
    25: '#ECEEFD',
    50: '#DBEBFD',
    100: '#BFDCFC',
    200: '#AED3FB',
    400: '#99C4F5',
    500: '#8ABFFA',
    600: '#599CE7',
    800: '#337AC9',
  },
  neutral: {
    0: '#ffffff',
    25: '#F9FAFB',
    50: '#F4F5F7',
    100: '#EEF0F2',
    200: '#DEE1E5',
    300: '#A7ADB2',
    400: '#9499A0',
    500: '#626576',
    600: '#4D5761',
    700: '#344054',
    800: '#1F2A37',
    900: '#111927',
  },
  orange: {
    25: '#FFF9F5',
    50: '#FFF4ED',
    100: '#FFE6D5',
    200: '#FFCEAE',
    300: '#FF8A66',
    400: '#F36D44',
    500: '#EF5020',
    600: '#E04516',
    700: '#B93B15',
    800: '#933519',
    900: '#772A17',
    ryb: '#F49F00',
  },
  wash: '#18191A',
  gray: {
    25: '#FCFCFD',
    50: '#F9FAFB',
    100: '#F2F4F7',
    200: '#EAECF0',
    300: '#D0D5DD',
    400: '#98A2B3',
    500: '#667085',
    600: '#475467',
    700: '#344054',
    800: '#1D2939',
    900: '#101828',
    950: '#7f7f7f',
    blue: {
      50: '#F8F9FC',
      400: '#717BBC',
    },
  },
  primary: {
    25: '#F5F8FF',
    50: '#EFF4FF',
    100: '#D1E0FF',
    200: '#B2CCFF',
    300: '#84ADFF',
    400: '#528BFF',
    500: '#2970FF',
    600: '#155EEF',
    700: '#004EEB',
    800: '#0040C1',
    900: '#00359E',
    1100: '#030A65',
  },
  error: {
    25: '#FFFBFA',
    50: '#FEF3F2',
    100: '#FEE4E2',
    200: '#FECDCA',
    300: '#FDA29B',
    400: '#F97066',
    500: '#F04438',
    600: '#D92D20',
    700: '#B42318',
    800: '#912018',
    900: '#7A271A',
  },
  warning: {
    25: '#FFFCF5',
    50: '#FFFAEB',
    100: '#FEF0C7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#7A2E0E',
  },
  yellow: {
    25: '#FFFBF1',
    50: '#FFF6DE',
    100: '#FFE396',
    200: '#FFDB78',
    300: '#FFD45E',
    400: '#FFC62C',
    500: '#FFBF0F',
    600: '#F6B400',
    700: '#F6A200',
    800: '#EB9B00',
    900: '#E29601',
    dark: {
      50: '#FFF4ED',
      200: '#FFD6AE',
      400: '#FF692E',
    },
  },
  success: {
    25: '#F6FEF9',
    50: '#ECFDF3',
    100: '#D1FADF',
    200: '#A6F4C5',
    300: '#6CE9A6',
    400: '#32D583',
    500: '#12B76A',
    600: '#039855',
    700: '#027A48',
    800: '#05603A',
    900: '#054F31',
  },
  blue: {
    500: '#00359E',
    900: '#00075B',
  },
  toArray: function () {
    return flattenColors(this);
  },
};

function flattenColors(colors: object): string[] {
  const result: string[] = [];
  for (const key in colors) {
    // @ts-ignore
    if (typeof colors[key] === 'function') {
      continue;
    }
    // @ts-ignore
    if (typeof colors[key] === 'object') {
      // Recursively flatten nested objects
      // @ts-ignore
      result.push(...flattenColors(colors[key] as object));
    } else {
      // @ts-ignore
      result.push((colors[key] as string).toUpperCase()); // Add color value
    }
  }
  return result;
}