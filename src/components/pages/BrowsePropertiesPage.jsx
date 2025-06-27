import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import PropertyCard from '@/components/molecules/PropertyCard';
import SearchFilters from '@/components/organisms/SearchFilters';
import SearchBar from '@/components/molecules/SearchBar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { propertyService } from '@/services/api/propertyService';

const BrowsePropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  const [searchFilters, setSearchFilters] = useState({
    location: searchParams.get('location') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: parseInt(searchParams.get('guests')) || 1
  });

  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    propertyTypes: [],
    amenities: [],
    capacity: 1
  });

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAll();
      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      setError('Failed to load properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, searchFilters, filters]);

  const applyFilters = () => {
    let filtered = properties.filter(property => {
      // Location filter
      if (searchFilters.location && !property.address.toLowerCase().includes(searchFilters.location.toLowerCase())) {
        return false;
      }

      // Price filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Property type filter
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.propertyType)) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Capacity filter
      if (property.capacity < searchFilters.guests) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchFilters.location) params.append('location', searchFilters.location);
    if (searchFilters.checkIn) params.append('checkIn', searchFilters.checkIn);
    if (searchFilters.checkOut) params.append('checkOut', searchFilters.checkOut);
    if (searchFilters.guests > 1) params.append('guests', searchFilters.guests);
    
    setSearchParams(params);
    applyFilters();
  };

  if (loading) return <Loading type="properties" />;
  if (error) return <Error message={error} onRetry={loadProperties} />;

return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="mb-12">
          <SearchBar
            searchFilters={searchFilters}
            onSearchChange={setSearchFilters}
            onSearch={handleSearch}
          />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-6 sm:mb-0">
<h1 className="text-3xl font-semibold text-neutral-900 mb-2">
              Tillgängliga fastigheter
            </h1>
            <p className="text-neutral-600 text-sm">
              {filteredProperties.length} fastighet{filteredProperties.length !== 1 ? 'er' : ''} hittade
            </p>
          </div>

<div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
            >
<ApperIcon name="Filter" className="h-4 w-4" />
              <span>Filter</span>
            </button>

            <div className="flex items-center bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}`}
              >
                <ApperIcon name="Grid3X3" className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}`}
              >
                <ApperIcon name="List" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>

          {/* Properties Grid/List */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <Empty
icon="Home"
                title="Inga fastigheter hittades"
                description="Försök justera dina sökkriterier eller filter för att hitta fler fastigheter."
actionText="Rensa filter"
                onAction={() => {
                  setFilters({
                    priceRange: [0, 5000],
                    propertyTypes: [],
                    amenities: [],
                    capacity: 1
                  });
                  setSearchFilters({
                    location: '',
                    checkIn: '',
                    checkOut: '',
                    guests: 1
                  });
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PropertyCard 
                      property={property} 
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePropertiesPage;