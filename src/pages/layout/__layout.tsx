import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './__footer';
import Header from './__header';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
