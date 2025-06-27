import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";

function DashboardStats({ stats, type }) {
  // Early return if stats is not provided
  if (!stats) {
    stats = {};
  }

  const ownerStats = [
    {
      title: 'Total Properties',
      value: stats?.totalProperties ?? 0,
      icon: 'Home',
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Active Listings',
      value: stats?.activeListings ?? 0,
      icon: 'Eye', 
      color: 'bg-emerald-500',
      change: `${stats?.totalProperties > 0 ? Math.round(((stats?.activeListings ?? 0) / stats.totalProperties) * 100) : 0}% of total`
    },
    {
      title: 'Pending Requests',
      value: stats?.pendingRequests ?? 0,
      icon: 'Clock',
      color: 'bg-amber-500',
      change: 'Needs attention'
    },
    {
      title: 'Monthly Revenue', 
      value: `$${(stats?.monthlyRevenue ?? 0).toLocaleString()}`, 
      icon: 'DollarSign', 
      color: 'bg-primary-500',
      change: '+12% from last month'
    },
  ]

  const companyStats = [
    {
      title: 'Active Bookings',
      value: stats?.activeBookings ?? 0,
      icon: 'Calendar',
      color: 'bg-blue-500',
      change: `${stats?.activeBookings ?? 0} workers housed`
    },
    {
      title: 'Total Workers',
      value: stats?.totalWorkers ?? 0,
      icon: 'Users',
      color: 'bg-emerald-500', 
      change: 'Currently housed'
    },
    {
      title: 'Saved Properties',
      value: stats?.savedProperties ?? 0,
      icon: 'Heart',
      color: 'bg-amber-500',
      change: 'In your favorites'
    },
    {
      title: 'Monthly Spend', 
      value: `$${(stats?.monthlySpend ?? 0).toLocaleString()}`, 
      icon: 'DollarSign', 
      color: 'bg-primary-500',
      change: '+8% from last month'
    },
  ]

  const statsToShow = type === 'owner' ? ownerStats : companyStats

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsToShow.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color} p-3 rounded-lg`}>
              <ApperIcon name={stat.icon} size={24} className="text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default DashboardStats