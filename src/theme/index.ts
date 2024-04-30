import { extendTheme, theme as base } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';
import styles from './styles';

import Container from './components/container';
import Button from './components/button';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  components: {
    Container,
    Button,
  },
  config,
  styles,
  fonts: {
    body: `"Golos", "Raleway", ${base.fonts?.body}`,
    heading: `"Golos", "Raleway", ${base.fonts?.heading}`,
    mono: `"Golos", "Raleway", ${base.fonts?.mono}`,
  },
});

export default theme;
