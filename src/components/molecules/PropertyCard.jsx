import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'booked': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
switch (status) {
      case 'available': return 'Tillgänglig';
      case 'booked': return 'Bokad';
      case 'pending': return 'Väntande';
      default: return status;
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="card overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-48 md:h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor('available')}`}>
                {getStatusText('available')}
              </span>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <ApperIcon name="MapPin" className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
<ApperIcon name="Users" className="h-4 w-4 mr-1" />
                  <span className="text-sm">Upp till {property.capacity} arbetare</span>
                </div>
              </div>
              
              <div className="text-right">
<div className="text-2xl font-bold text-primary-600">{property.price} kr</div>
                <div className="text-sm text-gray-500">per natt</div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {property.amenities.slice(0, 4).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <ApperIcon name="Home" className="h-4 w-4 mr-1" />
                  <span>{property.propertyType}</span>
                </div>
              </div>
              
              <Link
to={`/property/${property.Id}`}
className="btn-primary"
              >
                Visa detaljer
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="card overflow-hidden"
    >
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor('available')}`}>
            {getStatusText('available')}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
            <ApperIcon name="Heart" className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
          <div className="text-right">
<div className="text-xl font-bold text-primary-600">{property.price} kr</div>
            <div className="text-xs text-gray-500">per natt</div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <ApperIcon name="MapPin" className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.address}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
<ApperIcon name="Users" className="h-4 w-4 mr-1" />
          <span className="text-sm">Upp till {property.capacity} arbetare</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{property.amenities.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Home" className="h-4 w-4 mr-1" />
            <span>{property.propertyType}</span>
          </div>
          
          <Link
to={`/property/${property.Id}`}
className="btn-primary text-sm px-4 py-2"
          >
            Visa detaljer
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;