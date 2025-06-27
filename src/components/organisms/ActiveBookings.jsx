import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';

const ActiveBookings = ({ bookings, properties }) => {
  if (bookings.length === 0) {
    return (
<Empty
        icon="Calendar"
        title="Inga bokningar än"
        description="Börja med att bläddra bland tillgängliga fastigheter och gör din första bokningsförfrågan."
        actionText="Bläddra fastigheter"
        onAction={() => window.location.href = '/browse'}
      />
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'confirmed': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {bookings.map((booking, index) => {
        const property = properties.find(p => p.Id === booking.propertyId);
        
        return (
          <motion.div
            key={booking.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                {property && (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {property?.title || 'Unknown Property'}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                      <ApperIcon name={getStatusIcon(booking.status)} className="h-3 w-3 inline mr-1" />
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
<div>
                        <div className="font-medium">Incheckning</div>
                        <div>{booking.startDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
<div>
                        <div className="font-medium">Utcheckning</div>
                        <div>{booking.endDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Users" className="h-4 w-4 mr-2" />
<div>
                        <div className="font-medium">Arbetare</div>
                        <div>{booking.guests}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="DollarSign" className="h-4 w-4 mr-2" />
<div>
                        <div className="font-medium">Totalt</div>
                        <div>{booking.totalPrice} kr</div>
                      </div>
                    </div>
                  </div>
                  
                  {booking.message && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{booking.message}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Link
                  to={`/property/${property?.Id}`}
className="btn-outline text-sm px-4 py-2 text-center"
                >
                  Visa fastighet
                </Link>
                
                {booking.status === 'confirmed' && (
<button className="btn-primary text-sm px-4 py-2">
                    Kontakta ägare
                  </button>
                )}
                
                {booking.status === 'pending' && (
<div className="text-center text-sm text-amber-600 font-medium">
                    Väntar på svar
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ActiveBookings;