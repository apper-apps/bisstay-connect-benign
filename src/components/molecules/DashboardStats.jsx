import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const DashboardStats = ({ stats, type }) => {
  const ownerStats = [
    { 
      title: 'Total Properties', 
      value: stats.totalProperties, 
      icon: 'Home', 
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    { 
      title: 'Active Listings', 
      value: stats.activeListings, 
      icon: 'Eye', 
      color: 'bg-emerald-500',
      change: `${stats.activeListings} of ${stats.totalProperties}`
    },
    { 
      title: 'Pending Requests', 
      value: stats.pendingRequests, 
      icon: 'Clock', 
      color: 'bg-amber-500',
      change: 'Needs attention'
    },
    { 
      title: 'Monthly Revenue', 
      value: `$${stats.monthlyRevenue.toLocaleString()}`, 
      icon: 'DollarSign', 
      color: 'bg-primary-500',
      change: '+12% from last month'
    },
  ];

  const companyStats = [
    { 
      title: 'Active Bookings', 
      value: stats.activeBookings, 
      icon: 'Calendar', 
      color: 'bg-blue-500',
      change: `${stats.upcomingBookings} upcoming`
    },
    { 
      title: 'Total Workers', 
      value: stats.totalWorkers, 
      icon: 'Users', 
      color: 'bg-emerald-500',
      change: 'Currently housed'
    },
    { 
      title: 'Saved Properties', 
      value: stats.savedProperties, 
      icon: 'Heart', 
      color: 'bg-amber-500',
      change: 'In your favorites'
    },
    { 
      title: 'Monthly Spend', 
      value: `$${stats.monthlySpend.toLocaleString()}`, 
      icon: 'DollarSign', 
      color: 'bg-primary-500',
      change: '+8% from last month'
    },
  ];

  const statsToShow = type === 'owner' ? ownerStats : companyStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsToShow.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <ApperIcon name={stat.icon} className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">{stat.change}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;