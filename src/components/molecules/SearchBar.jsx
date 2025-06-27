import { useState, useRef, useEffect } from 'react';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ searchFilters, onSearchChange, onSearch }) => {
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const guestRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setShowGuestSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    onSearchChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGuestChange = (increment) => {
    const newGuests = Math.max(1, searchFilters.guests + increment);
    handleInputChange('guests', newGuests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
<label className="block text-sm font-medium text-gray-700 mb-2">Plats</label>
          <div className="relative">
            <ApperIcon name="MapPin" className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
placeholder="Stad eller område"
              value={searchFilters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="relative">
<label className="block text-sm font-medium text-gray-700 mb-2">Incheckning</label>
          <div className="relative">
            <ApperIcon name="Calendar" className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={searchFilters.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="relative">
<label className="block text-sm font-medium text-gray-700 mb-2">Utcheckning</label>
          <div className="relative">
            <ApperIcon name="Calendar" className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={searchFilters.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative" ref={guestRef}>
<label className="block text-sm font-medium text-gray-700 mb-2">Arbetare</label>
          <button
            type="button"
            onClick={() => setShowGuestSelector(!showGuestSelector)}
            className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="Users" className="h-5 w-5 text-gray-400" />
<span className="text-gray-700">{searchFilters.guests} arbetare</span>
            </div>
            <ApperIcon name="ChevronDown" className="h-4 w-4 text-gray-400" />
          </button>

          {showGuestSelector && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
              <div className="flex items-center justify-between">
<span className="text-sm font-medium text-gray-700">Arbetare</span>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handleGuestChange(-1)}
                    disabled={searchFilters.guests <= 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ApperIcon name="Minus" className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{searchFilters.guests}</span>
                  <button
                    type="button"
                    onClick={() => handleGuestChange(1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <ApperIcon name="Plus" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="btn-primary flex items-center space-x-2 px-8 py-3"
        >
          <ApperIcon name="Search" className="h-5 w-5" />
<span>Sök fastigheter</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;