import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';

const BookingRequests = ({ bookings, properties, onStatusUpdate }) => {
  if (bookings.length === 0) {
    return (
      <Empty
        icon="Calendar"
        title="No Booking Requests"
        description="When companies request to book your properties, they'll appear here."
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
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {property?.title || 'Unknown Property'}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <ApperIcon name="Building2" className="h-4 w-4 mr-2" />
                      <span>{booking.companyId}</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                      <span>{booking.startDate} - {booking.endDate}</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Users" className="h-4 w-4 mr-2" />
                      <span>{booking.guests} workers</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="DollarSign" className="h-4 w-4 mr-2" />
                      <span className="font-medium">${booking.totalPrice} total</span>
                    </div>
                  </div>
                  
                  {booking.message && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Message:</span> {booking.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {booking.status === 'pending' && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => onStatusUpdate(booking.Id, 'rejected')}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => onStatusUpdate(booking.Id, 'confirmed')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Accept
                  </button>
                </div>
              )}
              
              {booking.status === 'confirmed' && (
                <div className="flex items-center space-x-2 text-emerald-600">
                  <ApperIcon name="CheckCircle" className="h-5 w-5" />
                  <span className="font-medium">Confirmed</span>
                </div>
              )}
              
              {booking.status === 'rejected' && (
                <div className="flex items-center space-x-2 text-red-600">
                  <ApperIcon name="XCircle" className="h-5 w-5" />
                  <span className="font-medium">Declined</span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BookingRequests;