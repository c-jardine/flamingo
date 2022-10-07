export const Color = {
  primary: 'rgb(230, 21, 92)',
  base: 'rgb(16, 14, 34)',

  accent: {
    50: 'rgba(255, 255, 255, 0.05)',
    100: 'rgba(255, 255, 255, 0.10)',
    200: 'rgba(255, 255, 255, 0.20)',
    300: 'rgba(255, 255, 255, 0.30)',
    400: 'rgba(255, 255, 255, 0.40)',
    500: 'rgba(255, 255, 255, 0.50)',
    600: 'rgba(255, 255, 255, 0.60)',
    700: 'rgba(255, 255, 255, 0.70)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.90)',
  },

  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  transparent: 'transparent',

  text: {
    primary: 'rgba(244, 245, 251, 0.8)',
    body: 'rgba(244, 245, 251, 0.3)',
  },

  success: 'rgb(56, 220, 56)',
  error: 'rgb(235, 40, 57)',
  warning: 'rgb(244, 196, 82)',
};

export const withOpacity = (color: string, opacity: number) => {
  return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
};
