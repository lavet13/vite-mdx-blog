import { Box, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './__footer';
import Header from './__header';

const Layout: FC = () => {
  return (
    <VStack justifyContent={'space-between'} minH={'100vh'} spacing={0}>
      <Header />
      <Box display='flex' flexDirection='column' flex='1 1' alignSelf='stretch'>
        <Outlet />
      </Box>
      <Footer />
    </VStack>
  );
};

export default Layout;
