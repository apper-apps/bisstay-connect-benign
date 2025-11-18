import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import MobileNav from '@/components/molecules/MobileNav';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const outletContext = {
    mobileMenuOpen,
    setMobileMenuOpen
  };
return (
<div className="min-h-screen bg-white antialiased">
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <MobileNav 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      
      <main className={`${isHomePage ? '' : 'pt-16'}`}>
        <Outlet context={outletContext} />
      </main>
    </div>
  );
};

export default Layout;