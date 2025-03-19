
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/sign-in' || 
                     location.pathname === '/sign-up' || 
                     location.pathname === '/partner' ||
                     location.pathname === '/guardian-nature';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Decorative elements for the utopian design */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Top right decorative circle */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        
        {/* Bottom left decorative circle */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen relative z-10"
      >
        {!isAuthPage && <Navbar />}
        <main className="flex-grow">
          <Outlet />
        </main>
        {!isAuthPage && <Footer />}
      </motion.div>
    </div>
  );
};

export default Layout;
