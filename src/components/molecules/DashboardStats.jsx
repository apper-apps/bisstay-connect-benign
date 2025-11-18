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
      icon: 'Building2',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      change: '+2 this month'
    },
    {
      title: 'Active Listings',
      value: stats?.activeListings ?? 0,
      icon: 'Eye', 
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      change: `${stats?.totalProperties > 0 ? Math.round(((stats?.activeListings ?? 0) / stats.totalProperties) * 100) : 0}% of total`
    },
    {
      title: 'Pending Requests',
      value: stats?.pendingRequests ?? 0,
      icon: 'Clock',
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      change: 'Needs attention'
    },
    {
      title: 'Monthly Revenue', 
      value: `$${(stats?.monthlyRevenue ?? 0).toLocaleString()}`, 
      icon: 'TrendingUp', 
      color: 'bg-gradient-to-br from-primary-500 to-primary-600',
      change: '+12% from last month'
    },
  ]

const companyStats = [
    {
      title: 'Active Bookings',
      value: stats?.activeBookings ?? 0,
      icon: 'Calendar',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      change: `${stats?.activeBookings ?? 0} workers housed`
    },
    {
      title: 'Total Workers',
      value: stats?.totalWorkers ?? 0,
      icon: 'UserCheck',
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600', 
      change: 'Currently housed'
    },
    {
      title: 'Saved Properties',
      value: stats?.savedProperties ?? 0,
      icon: 'Bookmark',
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      change: 'In your favorites'
    },
    {
      title: 'Monthly Spend', 
      value: `$${(stats?.monthlySpend ?? 0).toLocaleString()}`, 
      icon: 'CreditCard', 
      color: 'bg-gradient-to-br from-primary-500 to-primary-600',
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
          className="bg-white rounded-xl p-6 shadow-subtle hover:shadow-card transition-all duration-300 border border-gray-100 group"
        >
          <div className="flex items-center justify-between mb-5">
            <div className={`${stat.color} p-3.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <ApperIcon name={stat.icon} size={24} className="text-white drop-shadow-sm" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">{stat.value}</h3>
            <p className="text-sm font-semibold text-gray-700">{stat.title}</p>
            <p className="text-xs text-gray-500 font-medium">{stat.change}</p>
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-transparent rounded-full -translate-y-6 translate-x-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
      ))}
    </div>
  )
}

export default DashboardStats