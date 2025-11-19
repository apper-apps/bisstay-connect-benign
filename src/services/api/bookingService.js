import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

class BookingService {
  constructor() {
    this.tableName = 'booking_c';
  }

  async getAll(userContext = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return [];
      }

      const { userRole, ownerId, companyId } = userContext;
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "propertyId_c"}},
          {"field": {"Name": "companyId_c"}},
          {"field": {"Name": "startDate_c"}},
          {"field": {"Name": "endDate_c"}},
          {"field": {"Name": "guests_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "totalPrice_c"}},
          {"field": {"Name": "message_c"}},
          {"field": {"Name": "companyName_c"}},
          {"field": {"Name": "contactEmail_c"}},
          {"field": {"Name": "contactPhone_c"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}],
        pagingInfo: {"limit": 50, "offset": 0}
      };

      // Filter based on user role
      if (userRole === 'company' && companyId) {
        params.where = [{
          "FieldName": "companyId_c",
          "Operator": "EqualTo",
          "Values": [companyId.toString()],
          "Include": true
        }];
      } else if (userRole === 'owner' && ownerId) {
        // For owners, we need to get bookings for their properties
        // This requires a more complex query or separate property lookup
        params.where = [{
          "FieldName": "propertyId_c",
          "Operator": "HasValue",
          "Values": [],
          "Include": true
        }];
      }

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error('Failed to fetch bookings:', response);
        toast.error(response.message || 'Failed to fetch bookings');
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching bookings:', error?.response?.data?.message || error);
      toast.error('Error loading bookings');
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
          {"field": {"Name": "propertyId_c"}},
          {"field": {"Name": "companyId_c"}},
          {"field": {"Name": "startDate_c"}},
          {"field": {"Name": "endDate_c"}},
          {"field": {"Name": "guests_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "totalPrice_c"}},
          {"field": {"Name": "message_c"}},
          {"field": {"Name": "companyName_c"}},
          {"field": {"Name": "contactEmail_c"}},
          {"field": {"Name": "contactPhone_c"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, id, params);

      if (!response.success) {
        console.error(`Failed to fetch booking with Id: ${id}:`, response);
        toast.error(response.message || 'Failed to fetch booking');
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error?.response?.data?.message || error);
      toast.error('Error loading booking details');
      return null;
    }
  }

  async create(bookingData, userContext = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return null;
      }

      const { companyId } = userContext;
      
      const params = {
        records: [{
          propertyId_c: parseInt(bookingData.propertyId_c),
          companyId_c: companyId?.toString() || bookingData.companyId_c,
          startDate_c: bookingData.startDate_c,
          endDate_c: bookingData.endDate_c,
          guests_c: bookingData.guests_c,
          status_c: bookingData.status_c || 'pending',
          totalPrice_c: bookingData.totalPrice_c,
          message_c: bookingData.message_c,
          companyName_c: bookingData.companyName_c,
          contactEmail_c: bookingData.contactEmail_c,
          contactPhone_c: bookingData.contactPhone_c
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error('Failed to create booking:', response);
        toast.error(response.message || 'Failed to create booking');
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} bookings:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success('Booking created successfully');
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error('Error creating booking:', error?.response?.data?.message || error);
      toast.error('Error creating booking');
      return null;
    }
  }

  async update(id, bookingData, userContext = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return null;
      }

      const params = {
        records: [{
          Id: id,
          ...(bookingData.propertyId_c && { propertyId_c: parseInt(bookingData.propertyId_c) }),
          ...(bookingData.companyId_c && { companyId_c: bookingData.companyId_c }),
          ...(bookingData.startDate_c && { startDate_c: bookingData.startDate_c }),
          ...(bookingData.endDate_c && { endDate_c: bookingData.endDate_c }),
          ...(bookingData.guests_c && { guests_c: bookingData.guests_c }),
          ...(bookingData.status_c && { status_c: bookingData.status_c }),
          ...(bookingData.totalPrice_c && { totalPrice_c: bookingData.totalPrice_c }),
          ...(bookingData.message_c && { message_c: bookingData.message_c }),
          ...(bookingData.companyName_c && { companyName_c: bookingData.companyName_c }),
          ...(bookingData.contactEmail_c && { contactEmail_c: bookingData.contactEmail_c }),
          ...(bookingData.contactPhone_c && { contactPhone_c: bookingData.contactPhone_c })
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error('Failed to update booking:', response);
        toast.error(response.message || 'Failed to update booking');
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} bookings:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success('Booking updated successfully');
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error('Error updating booking:', error?.response?.data?.message || error);
      toast.error('Error updating booking');
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
        console.error('Failed to delete booking:', response);
        toast.error(response.message || 'Failed to delete booking');
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} bookings:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success('Booking deleted successfully');
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Error deleting booking:', error?.response?.data?.message || error);
      toast.error('Error deleting booking');
      return false;
    }
  }

  async getByStatus(status, userContext = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return [];
      }

      const { userRole, ownerId, companyId } = userContext;
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "propertyId_c"}},
          {"field": {"Name": "companyId_c"}},
          {"field": {"Name": "startDate_c"}},
          {"field": {"Name": "endDate_c"}},
          {"field": {"Name": "guests_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "totalPrice_c"}},
          {"field": {"Name": "message_c"}},
          {"field": {"Name": "companyName_c"}},
          {"field": {"Name": "contactEmail_c"}},
          {"field": {"Name": "contactPhone_c"}}
        ],
        where: [{
          "FieldName": "status_c",
          "Operator": "EqualTo",
          "Values": [status],
          "Include": true
        }],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}],
        pagingInfo: {"limit": 50, "offset": 0}
      };

      // Add user-specific filtering
      if (userRole === 'company' && companyId) {
        params.where.push({
          "FieldName": "companyId_c",
          "Operator": "EqualTo",
          "Values": [companyId.toString()],
          "Include": true
        });
      }

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error('Failed to fetch bookings by status:', response);
        toast.error(response.message || 'Failed to fetch bookings');
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching bookings by status:', error?.response?.data?.message || error);
      toast.error('Error loading bookings');
      return [];
    }
  }

  async updateStatus(id, status, userContext = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not available');
        return null;
      }

      const params = {
        records: [{
          Id: id,
          status_c: status
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error('Failed to update booking status:', response);
        toast.error(response.message || 'Failed to update booking status');
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} booking statuses:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success('Booking status updated successfully');
          return successful[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error('Error updating booking status:', error?.response?.data?.message || error);
      toast.error('Error updating booking status');
      return null;
    }
  }
}

export const bookingService = new BookingService();