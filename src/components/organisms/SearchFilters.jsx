import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const SearchFilters = ({ filters, onFiltersChange, onClose }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const propertyTypes = [
    { id: 'house', name: 'House', icon: 'Home' },
    { id: 'apartment', name: 'Apartment', icon: 'Building' },
    { id: 'dormitory', name: 'Dormitory', icon: 'Building2' },
    { id: 'trailer', name: 'Trailer', icon: 'Truck' },
  ];

  const amenities = [
    { id: 'wifi', name: 'WiFi', icon: 'Wifi' },
    { id: 'parking', name: 'Parking', icon: 'Car' },
    { id: 'kitchen', name: 'Kitchen', icon: 'ChefHat' },
    { id: 'laundry', name: 'Laundry', icon: 'Shirt' },
    { id: 'ac', name: 'Air Conditioning', icon: 'Snowflake' },
    { id: 'heating', name: 'Heating', icon: 'Flame' },
    { id: 'furnished', name: 'Furnished', icon: 'Armchair' },
    { id: 'utilities', name: 'Utilities Included', icon: 'Zap' },
  ];

  const handlePriceChange = (value, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    onFiltersChange(prev => ({ ...prev, priceRange: newRange }));
  };

  const handlePropertyTypeToggle = (typeId) => {
    const newTypes = filters.propertyTypes.includes(typeId)
      ? filters.propertyTypes.filter(id => id !== typeId)
      : [...filters.propertyTypes, typeId];
    
    onFiltersChange(prev => ({ ...prev, propertyTypes: newTypes }));
  };

  const handleAmenityToggle = (amenityId) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    
    onFiltersChange(prev => ({ ...prev, amenities: newAmenities }));
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: [0, 5000],
      propertyTypes: [],
      amenities: [],
      capacity: 1
    };
    setPriceRange([0, 5000]);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range (per night)</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e.target.value, 0)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="$0"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e.target.value, 1)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="$5000"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>
        </div>

        {/* Property Types */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Property Type</h4>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handlePropertyTypeToggle(type.id)}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  filters.propertyTypes.includes(type.id)
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ApperIcon name={type.icon} className="h-4 w-4" />
                <span className="text-sm font-medium">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Amenities</h4>
          <div className="grid grid-cols-1 gap-2">
            {amenities.map((amenity) => (
              <label
                key={amenity.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity.id)}
                  onChange={() => handleAmenityToggle(amenity.id)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <ApperIcon name={amenity.icon} className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{amenity.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Capacity */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Minimum Capacity</h4>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onFiltersChange(prev => ({ ...prev, capacity: Math.max(1, prev.capacity - 1) }))}
              disabled={filters.capacity <= 1}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ApperIcon name="Minus" className="h-4 w-4" />
            </button>
            <span className="w-16 text-center font-medium">{filters.capacity} worker{filters.capacity > 1 ? 's' : ''}</span>
            <button
              onClick={() => onFiltersChange(prev => ({ ...prev, capacity: prev.capacity + 1 }))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;