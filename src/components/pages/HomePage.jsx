import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchFilters.location) params.append('location', searchFilters.location);
    if (searchFilters.checkIn) params.append('checkIn', searchFilters.checkIn);
    if (searchFilters.checkOut) params.append('checkOut', searchFilters.checkOut);
    if (searchFilters.guests > 1) params.append('guests', searchFilters.guests);
    
    navigate(`/browse?${params.toString()}`);
  };

  const features = [
    {
      icon: 'Search',
      title: 'Find Perfect Housing',
      description: 'Search and filter properties by location, capacity, amenities, and budget to find ideal worker accommodations.'
    },
    {
      icon: 'Shield',
      title: 'Verified Properties',
      description: 'All properties are verified and meet safety standards for construction worker housing requirements.'
    },
    {
      icon: 'Calendar',
      title: 'Flexible Booking',
      description: 'Book for short-term projects or long-term contracts with easy date management and availability tracking.'
    },
    {
      icon: 'MessageCircle',
      title: 'Direct Communication',
      description: 'Connect directly with property owners to discuss specific needs, group bookings, and special arrangements.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Choose Your Role',
      description: 'Select whether you\'re a construction company looking for housing or a property owner wanting to list your space.',
      icon: 'UserCheck'
    },
    {
      step: '02',
      title: 'Search or List',
      description: 'Companies can search for suitable properties while owners can create detailed listings with photos and amenities.',
      icon: 'Search'
    },
    {
      step: '03',
      title: 'Connect & Book',
      description: 'Send booking requests, communicate directly, and finalize arrangements that work for both parties.',
      icon: 'Handshake'
    }
  ];

  return (
    <div className="min-h-screen">
{/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-amber-50 pt-20 pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f1f5f9%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Construction Worker Housing
              <span className="block gradient-text">Made Simple</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Connect property owners with construction companies. Find quality temporary housing 
              for your workforce or list your properties for reliable rental income.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <SearchBar
              searchFilters={searchFilters}
              onSearchChange={setSearchFilters}
              onSearch={handleSearch}
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Link to="/browse" className="btn-primary flex items-center space-x-2">
              <ApperIcon name="Search" className="h-5 w-5" />
              <span>Browse Properties</span>
            </Link>
            <Link to="/create-listing" className="btn-secondary flex items-center space-x-2">
              <ApperIcon name="Plus" className="h-5 w-5" />
              <span>List Your Property</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BizStay Connect?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamlined platform designed specifically for construction industry housing needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={feature.icon} className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="card p-8 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name={step.icon} className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold gradient-text mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ApperIcon name="ArrowRight" className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of construction companies and property owners already using BizStay Connect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/browse" 
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Find Housing Now
              </Link>
              <Link 
                to="/create-listing" 
                className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
              >
                List Your Property
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;