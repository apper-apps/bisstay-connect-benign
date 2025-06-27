import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import DashboardStats from '@/components/molecules/DashboardStats';
import ActiveBookings from '@/components/organisms/ActiveBookings';
import SavedProperties from '@/components/organisms/SavedProperties';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { bookingService } from '@/services/api/bookingService';
import { propertyService } from '@/services/api/propertyService';

const CompanyDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [bookingsData, propertiesData] = await Promise.all([
        bookingService.getAll(),
        propertyService.getAll()
      ]);
      setBookings(bookingsData);
      setProperties(propertiesData);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const stats = {
    activeBookings: bookings.filter(b => b.status === 'confirmed').length,
    upcomingBookings: bookings.filter(b => b.status === 'pending').length,
    totalWorkers: bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.guests, 0),
    savedProperties: Math.floor(Math.random() * 12) + 3, // Mock saved properties
    monthlySpend: bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.totalPrice, 0)
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'bookings', name: 'My Bookings', icon: 'Calendar' },
    { id: 'saved', name: 'Saved Properties', icon: 'Heart' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your worker accommodations</p>
          </div>
          <Link
            to="/browse"
            className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
          >
            <ApperIcon name="Search" className="h-4 w-4" />
            <span>Find Housing</span>
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
              <DashboardStats stats={stats} type="company" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                  {bookings.slice(0, 5).map((booking) => {
                    const property = properties.find(p => p.Id === booking.propertyId);
                    return (
                      <div key={booking.Id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          {property && (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{property?.title || 'Unknown Property'}</div>
                            <div className="text-sm text-gray-500">{booking.startDate} - {booking.endDate}</div>
                          </div>
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

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Check-ins</h3>
                  {bookings.filter(b => b.status === 'confirmed').slice(0, 5).map((booking) => {
                    const property = properties.find(p => p.Id === booking.propertyId);
                    return (
                      <div key={booking.Id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <ApperIcon name="Calendar" className="h-6 w-6 text-primary-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{property?.title || 'Unknown Property'}</div>
                            <div className="text-sm text-gray-500">{booking.guests} workers</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{booking.startDate}</div>
                          <div className="text-xs text-gray-500">Check-in</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <ActiveBookings bookings={bookings} properties={properties} />
          )}

          {activeTab === 'saved' && (
            <SavedProperties properties={properties.slice(0, 6)} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyDashboardPage;