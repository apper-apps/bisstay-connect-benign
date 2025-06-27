import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import DashboardStats from '@/components/molecules/DashboardStats';
import PropertyManagement from '@/components/organisms/PropertyManagement';
import BookingRequests from '@/components/organisms/BookingRequests';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { propertyService } from '@/services/api/propertyService';
import { bookingService } from '@/services/api/bookingService';

const OwnerDashboardPage = () => {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [propertiesData, bookingsData] = await Promise.all([
        propertyService.getAll(),
        bookingService.getAll()
      ]);
      setProperties(propertiesData);
      setBookings(bookingsData);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBookingStatusUpdate = async (bookingId, status) => {
    try {
      await bookingService.update(bookingId, { status });
      setBookings(prev => prev.map(booking => 
        booking.Id === bookingId ? { ...booking, status } : booking
      ));
      toast.success(`Booking ${status} successfully!`);
    } catch (err) {
      toast.error('Failed to update booking status.');
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    try {
      await propertyService.delete(propertyId);
      setProperties(prev => prev.filter(property => property.Id !== propertyId));
      toast.success('Property deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete property.');
    }
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const stats = {
    totalProperties: properties.length,
    activeListings: properties.filter(p => p.status === 'active').length,
    totalBookings: bookings.length,
    pendingRequests: bookings.filter(b => b.status === 'pending').length,
    monthlyRevenue: bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.totalPrice, 0),
    occupancyRate: properties.length > 0 ? Math.round((bookings.filter(b => b.status === 'confirmed').length / properties.length) * 100) : 0
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'properties', name: 'My Properties', icon: 'Home' },
    { id: 'bookings', name: 'Booking Requests', icon: 'Calendar' },
  ];

return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900">Property Owner Dashboard</h1>
            <p className="text-neutral-600 mt-2 text-sm">Manage your properties and bookings</p>
          </div>
          <Link
            to="/create-listing"
            className="btn-primary flex items-center space-x-2 mt-6 sm:mt-0"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>Add New Property</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ApperIcon name={tab.icon} className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <DashboardStats stats={stats} type="owner" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                  {bookings.slice(0, 5).map((booking) => {
                    const property = properties.find(p => p.Id === booking.propertyId);
                    return (
                      <div key={booking.Id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <div className="font-medium text-gray-900">{property?.title || 'Unknown Property'}</div>
                          <div className="text-sm text-gray-500">{booking.companyId}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">${booking.totalPrice}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
<div className="bg-white rounded-xl p-6 shadow-card border border-neutral-200">
                  <h3 className="text-lg font-medium text-neutral-900 mb-6">Top Performing Properties</h3>
                  {properties.slice(0, 5).map((property) => (
                    <div key={property.Id} className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-neutral-900 text-sm">{property.title}</div>
                          <div className="text-xs text-neutral-500">${property.price}/night</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-neutral-900">
                          {bookings.filter(b => b.propertyId === property.Id).length} bookings
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <PropertyManagement
              properties={properties}
              onDelete={handleDeleteProperty}
            />
          )}

          {activeTab === 'bookings' && (
            <BookingRequests
              bookings={bookings}
              properties={properties}
              onStatusUpdate={handleBookingStatusUpdate}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OwnerDashboardPage;