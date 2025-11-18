import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-accent-50">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-4">
          <ApperIcon name="AlertTriangle" size={64} className="mx-auto text-accent-500" />
          <h1 className="text-4xl font-bold text-neutral-900">Page Not Found</h1>
          <p className="text-lg text-neutral-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 btn-primary"
          >
            <ApperIcon name="Home" size={16} />
            Go Home
          </Link>
          
          <div className="text-sm text-neutral-500">
            <Link to="/browse" className="text-accent-600 hover:text-accent-700 underline">
              Browse Properties
            </Link>
            {' or '}
            <Link to="/how-it-works" className="text-accent-600 hover:text-accent-700 underline">
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;