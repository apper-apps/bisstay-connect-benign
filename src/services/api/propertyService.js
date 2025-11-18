import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

export const propertyService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "coordinates_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "capacity_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "availability_c"}},
          {"field": {"Name": "propertyType_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "ownerId_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{
          "FieldName": "status_c",
          "Operator": "EqualTo",
          "Values": ["active"]
        }],
        orderBy: [{
          "fieldName": "CreatedOn",
          "sorttype": "DESC"
        }]
      };

      const response = await apperClient.fetchRecords('property_c', params);
      
      if (!response.success) {
        console.error('Failed to fetch properties:', response);
        return [];
      }

      // Transform database fields to match UI expectations
// Helper function to safely parse JSON with fallback
      const safeJsonParse = (jsonString, fallback) => {
        if (!jsonString || typeof jsonString !== 'string') return fallback;
        try {
          return JSON.parse(jsonString);
        } catch (error) {
          console.warn('Failed to parse JSON:', jsonString, error.message);
          return fallback;
        }
      };

      return response.data.map(property => ({
        Id: property.Id,
        ownerId: property.ownerId_c || 'unknown',
        title: property.title_c || property.Name || 'Untitled Property',
        description: property.description_c || '',
        address: property.address_c || '',
        coordinates: safeJsonParse(property.coordinates_c, { lat: 59.3293, lng: 18.0686 }),
        price: property.price_c || 0,
        capacity: property.capacity_c || 1,
        amenities: property.amenities_c ? property.amenities_c.split(',') : [],
        images: safeJsonParse(property.images_c, [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
        ]),
        availability: safeJsonParse(property.availability_c, []),
        propertyType: property.propertyType_c || 'hus',
        createdAt: property.CreatedOn,
        status: property.status_c || 'active'
      }));
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "coordinates_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "capacity_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "availability_c"}},
          {"field": {"Name": "propertyType_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "ownerId_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      };

      const response = await apperClient.getRecordById('property_c', id, params);
      
      if (!response.success) {
        console.error(`Failed to fetch property with Id: ${id}:`, response);
        throw new Error('Property not found');
      }

      if (!response.data) {
        throw new Error('Property not found');
      }

      // Transform database fields to match UI expectations
// Helper function to safely parse JSON with fallback
      const safeJsonParse = (jsonString, fallback) => {
        if (!jsonString || typeof jsonString !== 'string') return fallback;
        try {
          return JSON.parse(jsonString);
        } catch (error) {
          console.warn('Failed to parse JSON:', jsonString, error.message);
          return fallback;
        }
      };

      const property = response.data;
      return {
        Id: property.Id,
        ownerId: property.ownerId_c || 'unknown',
        title: property.title_c || property.Name || 'Untitled Property',
        description: property.description_c || '',
        address: property.address_c || '',
        coordinates: safeJsonParse(property.coordinates_c, { lat: 59.3293, lng: 18.0686 }),
        price: property.price_c || 0,
        capacity: property.capacity_c || 1,
        amenities: property.amenities_c ? property.amenities_c.split(',') : [],
        images: safeJsonParse(property.images_c, [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
        ]),
        availability: safeJsonParse(property.availability_c, []),
        propertyType: property.propertyType_c || 'hus',
        createdAt: property.CreatedOn,
        status: property.status_c || 'active'
      };
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error;
    }
  },

  async create(propertyData) {
    try {
      const apperClient = getApperClient();
      
      // Transform UI data to database field names - only updateable fields
      const dbRecord = {
        Name: propertyData.title || 'New Property',
        title_c: propertyData.title || '',
        description_c: propertyData.description || '',
        address_c: propertyData.address || '',
        coordinates_c: JSON.stringify(propertyData.coordinates || { lat: 59.3293, lng: 18.0686 }),
        price_c: parseFloat(propertyData.price) || 0,
        capacity_c: parseInt(propertyData.capacity) || 1,
        amenities_c: Array.isArray(propertyData.amenities) ? propertyData.amenities.join(',') : '',
        images_c: JSON.stringify(propertyData.images || [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
        ]),
        availability_c: JSON.stringify(propertyData.availability || ['2024-01-01', '2024-12-31']),
        propertyType_c: propertyData.propertyType || 'hus',
        status_c: 'active',
        ownerId_c: propertyData.ownerId || 'current_user'
      };

      const params = {
        records: [dbRecord]
      };

      const response = await apperClient.createRecord('property_c', params);
      
      if (!response.success) {
        console.error('Failed to create property:', response);
        throw new Error(response.message || 'Failed to create property');
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} property:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          return successful[0].data;
        }
      }

      throw new Error('No successful property creation');
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      
      // Transform UI updates to database field names - only updateable fields
      const dbUpdates = {
        Id: id
      };

      if (updates.title !== undefined) dbUpdates.title_c = updates.title;
      if (updates.description !== undefined) dbUpdates.description_c = updates.description;
      if (updates.address !== undefined) dbUpdates.address_c = updates.address;
      if (updates.coordinates !== undefined) dbUpdates.coordinates_c = JSON.stringify(updates.coordinates);
      if (updates.price !== undefined) dbUpdates.price_c = parseFloat(updates.price);
      if (updates.capacity !== undefined) dbUpdates.capacity_c = parseInt(updates.capacity);
      if (updates.amenities !== undefined) dbUpdates.amenities_c = Array.isArray(updates.amenities) ? updates.amenities.join(',') : updates.amenities;
      if (updates.images !== undefined) dbUpdates.images_c = JSON.stringify(updates.images);
      if (updates.availability !== undefined) dbUpdates.availability_c = JSON.stringify(updates.availability);
      if (updates.propertyType !== undefined) dbUpdates.propertyType_c = updates.propertyType;
      if (updates.status !== undefined) dbUpdates.status_c = updates.status;
      if (updates.ownerId !== undefined) dbUpdates.ownerId_c = updates.ownerId;

      const params = {
        records: [dbUpdates]
      };

      const response = await apperClient.updateRecord('property_c', params);
      
      if (!response.success) {
        console.error('Failed to update property:', response);
        throw new Error(response.message || 'Failed to update property');
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} property:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          return successful[0].data;
        }
      }

      throw new Error('No successful property update');
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = { 
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('property_c', params);
      
      if (!response.success) {
        console.error('Failed to delete property:', response);
        throw new Error(response.message || 'Failed to delete property');
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} property:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return true;
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  },

  // Calculate distance between two coordinates using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  async searchNearby(latitude, longitude, radiusKm = 50, filters = {}) {
    try {
      const properties = await this.getAll();
      
      // Filter by distance
      let nearbyProperties = properties.filter(property => {
        const distance = this.calculateDistance(
          latitude, 
          longitude, 
          property.coordinates.lat, 
          property.coordinates.lng
        );
        return distance <= radiusKm;
      });

      // Apply additional filters
      if (filters.priceRange) {
        nearbyProperties = nearbyProperties.filter(p => 
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );
      }

      if (filters.propertyTypes && filters.propertyTypes.length > 0) {
        nearbyProperties = nearbyProperties.filter(p => 
          filters.propertyTypes.includes(p.propertyType)
        );
      }

      if (filters.minCapacity) {
        nearbyProperties = nearbyProperties.filter(p => 
          p.capacity >= filters.minCapacity
        );
      }

      if (filters.amenities && filters.amenities.length > 0) {
        nearbyProperties = nearbyProperties.filter(p => 
          filters.amenities.every(amenity => p.amenities.includes(amenity))
        );
      }

      return nearbyProperties;
    } catch (error) {
      console.error('Error searching nearby properties:', error);
      return [];
    }
  },

  // Geocoding simulation for Swedish cities
  async geocodeLocation(locationName) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const swedishCities = {
      'stockholm': { lat: 59.3293, lng: 18.0686, name: 'Stockholm' },
      'göteborg': { lat: 57.7089, lng: 11.9746, name: 'Göteborg' },
      'malmö': { lat: 55.6050, lng: 13.0038, name: 'Malmö' },
      'uppsala': { lat: 59.8586, lng: 17.6389, name: 'Uppsala' },
      'västerås': { lat: 59.6162, lng: 16.5528, name: 'Västerås' },
      'örebro': { lat: 59.2741, lng: 15.2066, name: 'Örebro' },
      'linköping': { lat: 58.4108, lng: 15.6214, name: 'Linköping' },
      'helsingborg': { lat: 56.0465, lng: 12.6945, name: 'Helsingborg' },
      'jönköping': { lat: 57.7826, lng: 14.1618, name: 'Jönköping' },
      'norrköping': { lat: 58.5877, lng: 16.1924, name: 'Norrköping' }
    };

    const normalizedLocation = locationName.toLowerCase().trim();
    
    // Direct match
    if (swedishCities[normalizedLocation]) {
      return swedishCities[normalizedLocation];
    }

    // Partial match
    for (const [key, value] of Object.entries(swedishCities)) {
      if (key.includes(normalizedLocation) || normalizedLocation.includes(key)) {
        return value;
      }
    }

    throw new Error('Location not found');
  }
};