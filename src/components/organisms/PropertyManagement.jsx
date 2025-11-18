import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';

const PropertyManagement = ({ properties, onDelete }) => {
  if (properties.length === 0) {
    return (
<Empty
        icon="Home"
        title="Inga fastigheter listade"
        description="Börja tjäna genom att lista din första fastighet för byggarbetare."
        actionText="Skapa första listning"
        onAction={() => window.location.href = '/create-listing'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <motion.div
            key={property.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
<span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                  Tillgänglig
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="flex space-x-2">
                  <Link
                    to={`/property/${property.Id}`}
                    className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <ApperIcon name="Eye" className="h-4 w-4 text-gray-600" />
                  </Link>
                  <button
                    onClick={() => onDelete(property.Id)}
                    className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors text-red-600"
                  >
                    <ApperIcon name="Trash2" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
<div className="text-right">
                  <div className="text-xl font-bold text-primary-600">{property.price} kr</div>
                  <div className="text-xs text-gray-500">per natt</div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <ApperIcon name="MapPin" className="h-4 w-4 mr-1" />
                <span className="text-sm line-clamp-1">{property.address}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
<ApperIcon name="Users" className="h-4 w-4 mr-1" />
                <span className="text-sm">Upp till {property.capacity} arbetare</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
<ApperIcon name="Eye" className="h-4 w-4 mr-1" />
                    <span>12 visningar</span>
                  </div>
                  <div className="flex items-center">
<ApperIcon name="Heart" className="h-4 w-4 mr-1" />
                    <span>3 sparade</span>
                  </div>
                </div>
                
<button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Redigera listning
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PropertyManagement;