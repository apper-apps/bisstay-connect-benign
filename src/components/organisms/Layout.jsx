import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import MobileNav from '@/components/molecules/MobileNav';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white">
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <MobileNav 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      
      <main className={`${isHomePage ? '' : 'pt-16'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;