import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

class PropertyService {
  constructor() {
    this.tableName = 'property_c';
  }

  async getAll(userContext = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return [];
      }

      const { userRole, ownerId } = userContext;
      
      // Build query based on user role
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
          {"field": {"Name": "ownerId_c"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}],
        pagingInfo: {"limit": 50, "offset": 0}
      };

      // Filter by owner if user is property owner
      if (userRole === 'owner' && ownerId) {
        params.where = [{
          "FieldName": "ownerId_c",
          "Operator": "EqualTo",
          "Values": [ownerId.toString()],
          "Include": true
        }];
      }

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error('Failed to fetch properties:', response);
        toast.error(response.message || 'Failed to fetch properties');
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching properties:', error?.response?.data?.message || error);
      toast.error('Error loading properties');
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return null;
      }

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
          {"field": {"Name": "ownerId_c"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, id, params);

      if (!response.success) {
        console.error(`Failed to fetch property with Id: ${id}:`, response);
        toast.error(response.message || 'Failed to fetch property');
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error?.response?.data?.message || error);
      toast.error('Error loading property details');
      return null;
    }
  }

  async create(propertyData, userContext = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return null;
      }

      const { ownerId } = userContext;
      
      // Ensure owner ID is set
      const params = {
        records: [{
          title_c: propertyData.title_c,
          description_c: propertyData.description_c,
          address_c: propertyData.address_c,
          coordinates_c: propertyData.coordinates_c,
          price_c: propertyData.price_c,
          capacity_c: propertyData.capacity_c,
          amenities_c: propertyData.amenities_c,
          images_c: propertyData.images_c,
          availability_c: propertyData.availability_c,
          propertyType_c: propertyData.propertyType_c,
          status_c: propertyData.status_c || 'active',
          ownerId_c: ownerId?.toString() || propertyData.ownerId_c
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error('Failed to create property:', response);
        toast.error(response.message || 'Failed to create property');
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} properties:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success('Property created successfully');
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error('Error creating property:', error?.response?.data?.message || error);
      toast.error('Error creating property');
      return null;
    }
  }

  async update(id, propertyData, userContext = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return null;
      }

      const params = {
        records: [{
          Id: id,
          ...(propertyData.title_c && { title_c: propertyData.title_c }),
          ...(propertyData.description_c && { description_c: propertyData.description_c }),
          ...(propertyData.address_c && { address_c: propertyData.address_c }),
          ...(propertyData.coordinates_c && { coordinates_c: propertyData.coordinates_c }),
          ...(propertyData.price_c && { price_c: propertyData.price_c }),
          ...(propertyData.capacity_c && { capacity_c: propertyData.capacity_c }),
          ...(propertyData.amenities_c && { amenities_c: propertyData.amenities_c }),
          ...(propertyData.images_c && { images_c: propertyData.images_c }),
          ...(propertyData.availability_c && { availability_c: propertyData.availability_c }),
          ...(propertyData.propertyType_c && { propertyType_c: propertyData.propertyType_c }),
          ...(propertyData.status_c && { status_c: propertyData.status_c })
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error('Failed to update property:', response);
        toast.error(response.message || 'Failed to update property');
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} properties:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success('Property updated successfully');
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error('Error updating property:', error?.response?.data?.message || error);
      toast.error('Error updating property');
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return false;
      }

      const params = { 
        RecordIds: [id] 
      };

      const response = await apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error('Failed to delete property:', response);
        toast.error(response.message || 'Failed to delete property');
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} properties:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success('Property deleted successfully');
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Error deleting property:', error?.response?.data?.message || error);
      toast.error('Error deleting property');
      return false;
    }
  }

  async search(query, filters = {}, userContext = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return [];
      }

      const { userRole, ownerId } = userContext;
      
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
          {"field": {"Name": "ownerId_c"}}
        ],
        where: [],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}],
        pagingInfo: {"limit": 50, "offset": 0}
      };

      // Add search query if provided
      if (query) {
        params.where.push({
          "FieldName": "title_c",
          "Operator": "Contains",
          "Values": [query],
          "Include": true
        });
      }

      // Add filters
      if (filters.propertyType) {
        params.where.push({
          "FieldName": "propertyType_c",
          "Operator": "EqualTo",
          "Values": [filters.propertyType],
          "Include": true
        });
      }

      if (filters.minPrice || filters.maxPrice) {
        if (filters.minPrice) {
          params.where.push({
            "FieldName": "price_c",
            "Operator": "GreaterThanOrEqualTo",
            "Values": [filters.minPrice],
            "Include": true
          });
        }
        if (filters.maxPrice) {
          params.where.push({
            "FieldName": "price_c",
            "Operator": "LessThanOrEqualTo",
            "Values": [filters.maxPrice],
            "Include": true
          });
        }
      }

      // Filter by owner if user is property owner
      if (userRole === 'owner' && ownerId) {
        params.where.push({
          "FieldName": "ownerId_c",
          "Operator": "EqualTo",
          "Values": [ownerId.toString()],
          "Include": true
        });
      }

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error('Failed to search properties:', response);
        toast.error(response.message || 'Failed to search properties');
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error('Error searching properties:', error?.response?.data?.message || error);
      toast.error('Error searching properties');
      return [];
    }
  }
}

export const propertyService = new PropertyService();