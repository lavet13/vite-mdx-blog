import { extendTheme, theme as base } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';
import styles from './styles';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles,
  fonts: {
    body: `"Golos", "Raleway", ${base.fonts?.body}`,
    heading: `"Golos", "Raleway", ${base.fonts?.heading}`,
    mono: `"Golos", "Raleway", ${base.fonts?.mono}`,
  },
});

export default theme;
