import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: _ => ({
    html: { fontSize: { base: 'lg', sm: 'xl' } },
    '*::-webkit-scrollbar': {
      bg: 'scrollbar-bg',
    },
    '::-webkit-scrollbar-button': {
      display: 'none',
    },
    '::-webkit-scrollbar-track': {
      display: 'none',
    },

    '::-webkit-scrollbar-track-piece': {
      display: 'none',
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'scrollbar-thumb-bg',
      transition: `background 0.9s`,
    },
    '::-webkit-scrollbar-thumb:hover': {
      bg: 'scrollbar-thumb-hover-bg',
    },
    '::-webkit-scrollbar-corner': {
      display: 'none',
    },
    '::-webkit-resizer': {
      display: 'none',
    },
  }),
};

export default styles;

