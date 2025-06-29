import { motion } from 'framer-motion';
import PropertyCard from '@/components/molecules/PropertyCard';
import Empty from '@/components/ui/Empty';

const SavedProperties = ({ properties }) => {
  if (properties.length === 0) {
    return (
<Empty
        icon="Heart"
        title="Inga sparade fastigheter"
        description="Spara fastigheter du är intresserad av för att enkelt hitta dem senare."
        actionText="Bläddra fastigheter"
        onAction={() => window.location.href = '/browse'}
      />
    );
  }

  return (
    <div className="space-y-6">
<div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Sparade fastigheter</h2>
        <span className="text-sm text-gray-500">{properties.length} fastigheter sparade</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <motion.div
            key={property.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SavedProperties;