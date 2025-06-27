import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import RoleSelector from '@/components/molecules/RoleSelector';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState('company');

const navItems = [
    { name: 'Bläddra fastigheter', path: '/browse', icon: 'Search' },
    { name: 'Min instrumentpanel', path: currentRole === 'owner' ? '/owner-dashboard' : '/company-dashboard', icon: 'LayoutDashboard' },
    { name: 'Meddelanden', path: '/messages', icon: 'MessageCircle' },
    { name: 'Så fungerar det', path: '/how-it-works', icon: 'HelpCircle' },
  ];

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    if (location.pathname.includes('dashboard')) {
      navigate(role === 'owner' ? '/owner-dashboard' : '/company-dashboard');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-amber-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Building2" className="h-6 w-6 text-white" />
            </div>
<span className="text-xl font-bold gradient-text">Stay on Site</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
                }`}
              >
                <ApperIcon name={item.icon} className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Role Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <RoleSelector currentRole={currentRole} onRoleChange={handleRoleChange} />
            <Link
              to="/create-listing"
              className="btn-primary flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
<span>Lista fastighet</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;