
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/sign-in' || 
                     location.pathname === '/sign-up' || 
                     location.pathname === '/partner' ||
                     location.pathname === '/guardian-nature';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
