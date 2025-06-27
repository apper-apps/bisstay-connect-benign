import { motion } from 'framer-motion';

const Loading = ({ type = 'default' }) => {
  if (type === 'properties') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 shimmer"></div>
            <div className="p-6">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3 shimmer"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 shimmer"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-4 shimmer"></div>
              <div className="flex justify-between items-center">
                <div className="h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'dashboard') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4 shimmer"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 shimmer"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 shimmer"></div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 w-1/3 shimmer"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shimmer"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 shimmer"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 shimmer"></div>
                </div>
                <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full mb-4"
      />
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  );
};

export default Loading;