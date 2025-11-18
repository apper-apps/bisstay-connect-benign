import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";
import ApperIcon from "@/components/ApperIcon";

const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const { t } = useLanguage();
  
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
      case 'available': return t('propertyCard.available');
      case 'booked': return t('propertyCard.booked');
      case 'pending': return t('propertyCard.pending');
      default: return status;
    }
  };

  if (viewMode === 'list') {
    return (
<motion.div
        whileHover={{ scale: 1.02 }}
        className="card overflow-hidden group"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm ${getStatusColor('available')}`}>
                {getStatusText('available')}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <div className="p-1 bg-gray-100 rounded-md mr-2">
                    <ApperIcon name="MapPin" className="h-3.5 w-3.5 text-gray-600" />
                  </div>
                  <span className="text-sm">{property.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="p-1 bg-gray-100 rounded-md mr-2">
                    <ApperIcon name="Bed" className="h-3.5 w-3.5 text-gray-600" />
                  </div>
<span className="text-sm">{t('common.upTo')} {property.capacity} {t('common.workers')}</span>
                </div>
              </div>
              
              <div className="text-right ml-4">
<div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">{property.price} kr</div>
                <div className="text-sm text-gray-500 font-medium">{t('common.perNight')}</div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{property.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-5">
              <div className="flex items-center px-2 py-1.5 bg-accent-50 text-accent-700 text-xs rounded-full border border-accent-200">
                <ApperIcon name="Wifi" className="h-3 w-3 mr-1" />
                <span>WiFi</span>
              </div>
{property.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200">
                  +{property.amenities.length - 3} {t('common.more')}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="p-1 bg-gray-100 rounded-md mr-2">
                    <ApperIcon name="Building2" className="h-3.5 w-3.5 text-gray-600" />
                  </div>
                  <span className="font-medium">{property.propertyType}</span>
                </div>
              </div>
              
              <Link
                to={`/property/${property.Id}`}
                className="btn-primary transform hover:scale-105 transition-transform"
>
                {t('common.viewDetails')}
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
      className="card overflow-hidden group"
    >
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm ${getStatusColor('available')}`}>
            {getStatusText('available')}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
            <ApperIcon name="Heart" className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4 group-hover:text-primary-700 transition-colors">{property.title}</h3>
          <div className="text-right">
<div className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">{property.price_c || property.price} kr</div>
            <div className="text-xs text-gray-500 font-medium">{t('common.perNight')}</div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <div className="p-1 bg-gray-100 rounded-md mr-2">
            <ApperIcon name="MapPin" className="h-3.5 w-3.5 text-gray-600" />
          </div>
          <span className="text-sm">{property.address}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <div className="p-1 bg-gray-100 rounded-md mr-2">
            <ApperIcon name="Bed" className="h-3.5 w-3.5 text-gray-600" />
          </div>
<span className="text-sm">{t('common.upTo')} {property.capacity} {t('common.workers')}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          <div className="flex items-center px-2 py-1 bg-accent-50 text-accent-700 text-xs rounded-full border border-accent-200">
            <ApperIcon name="Wifi" className="h-3 w-3 mr-1" />
            <span>WiFi</span>
          </div>
          {property.amenities.slice(0, 2).map((amenity, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 2 && (
            <span className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200">
              +{property.amenities.length - 2}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <div className="p-1 bg-gray-100 rounded-md mr-2">
              <ApperIcon name="Building2" className="h-3.5 w-3.5 text-gray-600" />
            </div>
            <span className="font-medium">{property.propertyType}</span>
          </div>
          
          <Link
            to={`/property/${property.Id}`}
            className="btn-primary text-sm px-4 py-2 transform hover:scale-105 transition-transform"
>
            {t('common.viewDetails')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;