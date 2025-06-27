import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const MobileNav = ({ isOpen, onClose }) => {
  const location = useLocation();

const navItems = [
    { name: 'Bläddra fastigheter', path: '/browse', icon: 'Search' },
    { name: 'Ägare instrumentpanel', path: '/owner-dashboard', icon: 'Home' },
    { name: 'Företag instrumentpanel', path: '/company-dashboard', icon: 'Building2' },
    { name: 'Meddelanden', path: '/messages', icon: 'MessageCircle' },
    { name: 'Så fungerar det', path: '/how-it-works', icon: 'HelpCircle' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
<h2 className="text-lg font-semibold text-gray-900">Navigering</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <ApperIcon name="X" className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-6 py-4 transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <ApperIcon name={item.icon} className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              <div className="px-6 py-4 border-t border-gray-200 mt-4">
                <Link
                  to="/create-listing"
                  onClick={onClose}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Plus" className="h-4 w-4" />
<span>Lista fastighet</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;