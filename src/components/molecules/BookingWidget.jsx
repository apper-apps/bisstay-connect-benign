import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const BookingWidget = ({ property, onBookingRequest, loading }) => {
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    guests: 1,
    message: '',
    companyName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotal = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;
    
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return nights > 0 ? nights * property.price : 0;
  };

  const nights = (() => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  })();

  const total = calculateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.startDate || !bookingData.endDate || !bookingData.companyName || !bookingData.contactEmail) {
      return;
    }
    
    onBookingRequest({
      ...bookingData,
      totalPrice: total
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg"
    >
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-primary-600">${property.price}</div>
        <div className="text-gray-500">per night</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
            <input
              type="date"
              value={bookingData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <input
              type="date"
              value={bookingData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>  
        </div>

        {/* Workers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Workers</label>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handleInputChange('guests', Math.max(1, bookingData.guests - 1))}
              disabled={bookingData.guests <= 1}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
            >
              <ApperIcon name="Minus" className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium">{bookingData.guests}</span>
            <button
              type="button"
              onClick={() => handleInputChange('guests', Math.min(property.capacity, bookingData.guests + 1))}
              disabled={bookingData.guests >= property.capacity}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Maximum {property.capacity} workers
          </div>
        </div>

        {/* Company Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            value={bookingData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Your construction company"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
          <input
            type="email"
            value={bookingData.contactEmail}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="contact@company.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            value={bookingData.contactPhone}
            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
          <textarea
            value={bookingData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Tell the owner about your project and any special requirements..."
          />
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
<span>{property.price_c || property.price} kr × {nights} natt{nights > 1 ? 'er' : ''}</span>
              <span>{total} kr</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span className="text-primary-600">{total} kr</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !bookingData.startDate || !bookingData.endDate || !bookingData.companyName || !bookingData.contactEmail}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending Request...</span>
            </>
          ) : (
            <>
              <ApperIcon name="Send" className="h-4 w-4" />
              <span>Request Booking</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-gray-500">
        You won't be charged yet. The property owner will contact you to confirm.
      </div>
    </motion.div>
  );
};

export default BookingWidget;