import { useState, useRef, useEffect } from 'react';
import ApperIcon from '@/components/ApperIcon';

const RoleSelector = ({ currentRole, onRoleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const roles = [
    { id: 'company', name: 'Construction Company', icon: 'Building2' },
    { id: 'owner', name: 'Property Owner', icon: 'Home' },
  ];

  const currentRoleData = roles.find(role => role.id === currentRole);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <ApperIcon name={currentRoleData.icon} className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{currentRoleData.name}</span>
        <ApperIcon name="ChevronDown" className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                onRoleChange(role.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                currentRole === role.id ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
              }`}
            >
              <ApperIcon name={role.icon} className="h-5 w-5" />
              <span className="font-medium">{role.name}</span>
              {currentRole === role.id && (
                <ApperIcon name="Check" className="h-4 w-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleSelector;