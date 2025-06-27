import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import ImageCarousel from '@/components/molecules/ImageCarousel';
import BookingWidget from '@/components/molecules/BookingWidget';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { propertyService } from '@/services/api/propertyService';
import { bookingService } from '@/services/api/bookingService';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getById(parseInt(id));
      setProperty(data);
    } catch (err) {
      setError('Failed to load property details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperty();
  }, [id]);

  const handleBookingRequest = async (bookingData) => {
    try {
      setBookingLoading(true);
      await bookingService.create({
        ...bookingData,
        propertyId: property.Id,
        status: 'pending'
      });
      toast.success('Booking request sent successfully! The property owner will contact you soon.');
    } catch (err) {
      toast.error('Failed to send booking request. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProperty} />;
  if (!property) return <Error message="Property not found" />;

  const amenityIcons = {
    'wifi': 'Wifi',
    'parking': 'Car',
    'kitchen': 'ChefHat',
    'laundry': 'Shirt',
    'ac': 'Snowflake',
    'heating': 'Flame',
    'furnished': 'Armchair',
    'utilities': 'Zap',
    'gym': 'Dumbbell',
    'pool': 'Waves',
    'security': 'Shield',
    'cleaning': 'Sparkles'
  };

  const getAmenityIcon = (amenity) => {
    const key = amenity.toLowerCase().replace(/\s+/g, '');
    return amenityIcons[key] || 'Check';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
<h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <ApperIcon name="MapPin" className="h-5 w-5 mr-2" />
                  <span>{property.address}</span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
<ApperIcon name="Users" className="h-4 w-4 mr-1" />
                    <span>Upp till {property.capacity} arbetare</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Home" className="h-4 w-4 mr-1" />
                    <span>{property.propertyType}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
<div className="text-3xl font-bold text-primary-600">{property.price} kr</div>
                <div className="text-gray-500">per natt</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Carousel */}
              <ImageCarousel images={property.images} />

              {/* Description */}
              <div>
<h2 className="text-2xl font-semibold text-gray-900 mb-4">Om denna fastighet</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
<h2 className="text-2xl font-semibold text-gray-900 mb-6">Bekvämligheter</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <ApperIcon name={getAmenityIcon(amenity)} className="h-4 w-4 text-primary-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
<h2 className="text-2xl font-semibold text-gray-900 mb-4">Plats</h2>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <ApperIcon name="MapPin" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
<p className="text-gray-600">Interaktiv karta kommer snart</p>
                  <p className="text-sm text-gray-500 mt-2">{property.address}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingWidget
                  property={property}
                  onBookingRequest={handleBookingRequest}
                  loading={bookingLoading}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;