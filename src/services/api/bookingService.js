import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

export const bookingService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "propertyId_c"}},
          {"field": {"Name": "companyId_c"}},
          {"field": {"Name": "companyName_c"}},
          {"field": {"Name": "startDate_c"}},
          {"field": {"Name": "endDate_c"}},
          {"field": {"Name": "guests_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "totalPrice_c"}},
          {"field": {"Name": "message_c"}},
          {"field": {"Name": "contactEmail_c"}},
          {"field": {"Name": "contactPhone_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{
          "fieldName": "CreatedOn",
          "sorttype": "DESC"
        }]
      };

      const response = await apperClient.fetchRecords('booking_c', params);
      
      if (!response.success) {
        console.error('Failed to fetch bookings:', response);
        return [];
      }

      // Transform database fields to match UI expectations
      return response.data.map(booking => ({
        Id: booking.Id,
        propertyId: booking.propertyId_c?.Id || booking.propertyId_c || null,
        companyId: booking.companyId_c || 'unknown',
        companyName: booking.companyName_c || '',
        startDate: booking.startDate_c || '',
        endDate: booking.endDate_c || '',
        guests: booking.guests_c || 1,
        status: booking.status_c || 'pending',
        totalPrice: booking.totalPrice_c || 0,
        message: booking.message_c || '',
        contactEmail: booking.contactEmail_c || '',
        contactPhone: booking.contactPhone_c || '',
        createdAt: booking.CreatedOn
      }));
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "propertyId_c"}},
          {"field": {"Name": "companyId_c"}},
          {"field": {"Name": "companyName_c"}},
          {"field": {"Name": "startDate_c"}},
          {"field": {"Name": "endDate_c"}},
          {"field": {"Name": "guests_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "totalPrice_c"}},
          {"field": {"Name": "message_c"}},
          {"field": {"Name": "contactEmail_c"}},
          {"field": {"Name": "contactPhone_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      };

      const response = await apperClient.getRecordById('booking_c', id, params);
      
      if (!response.success) {
        console.error(`Failed to fetch booking with Id: ${id}:`, response);
        throw new Error('Booking not found');
      }

      if (!response.data) {
        throw new Error('Booking not found');
      }

      // Transform database fields to match UI expectations
      const booking = response.data;
      return {
        Id: booking.Id,
        propertyId: booking.propertyId_c?.Id || booking.propertyId_c || null,
        companyId: booking.companyId_c || 'unknown',
        companyName: booking.companyName_c || '',
        startDate: booking.startDate_c || '',
        endDate: booking.endDate_c || '',
        guests: booking.guests_c || 1,
        status: booking.status_c || 'pending',
        totalPrice: booking.totalPrice_c || 0,
        message: booking.message_c || '',
        contactEmail: booking.contactEmail_c || '',
        contactPhone: booking.contactPhone_c || '',
        createdAt: booking.CreatedOn
      };
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error);
      throw error;
    }
  },

  async create(bookingData) {
    try {
      const apperClient = getApperClient();
      
      // Transform UI data to database field names - only updateable fields
      const dbRecord = {
        Name: `Booking for ${bookingData.companyName || 'Company'} - ${bookingData.startDate}`,
        propertyId_c: parseInt(bookingData.propertyId),
        companyId_c: bookingData.companyId || 'unknown',
        companyName_c: bookingData.companyName || '',
        startDate_c: bookingData.startDate || '',
        endDate_c: bookingData.endDate || '',
        guests_c: parseInt(bookingData.guests) || 1,
        status_c: bookingData.status || 'pending',
        totalPrice_c: parseFloat(bookingData.totalPrice) || 0,
        message_c: bookingData.message || '',
        contactEmail_c: bookingData.contactEmail || '',
        contactPhone_c: bookingData.contactPhone || ''
      };

      const params = {
        records: [dbRecord]
      };

      const response = await apperClient.createRecord('booking_c', params);
      
      if (!response.success) {
        console.error('Failed to create booking:', response);
        throw new Error(response.message || 'Failed to create booking');
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} booking:`, failed);
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

      throw new Error('No successful booking creation');
    } catch (error) {
      console.error('Error creating booking:', error);
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

      if (updates.propertyId !== undefined) dbUpdates.propertyId_c = parseInt(updates.propertyId);
      if (updates.companyId !== undefined) dbUpdates.companyId_c = updates.companyId;
      if (updates.companyName !== undefined) dbUpdates.companyName_c = updates.companyName;
      if (updates.startDate !== undefined) dbUpdates.startDate_c = updates.startDate;
      if (updates.endDate !== undefined) dbUpdates.endDate_c = updates.endDate;
      if (updates.guests !== undefined) dbUpdates.guests_c = parseInt(updates.guests);
      if (updates.status !== undefined) dbUpdates.status_c = updates.status;
      if (updates.totalPrice !== undefined) dbUpdates.totalPrice_c = parseFloat(updates.totalPrice);
      if (updates.message !== undefined) dbUpdates.message_c = updates.message;
      if (updates.contactEmail !== undefined) dbUpdates.contactEmail_c = updates.contactEmail;
      if (updates.contactPhone !== undefined) dbUpdates.contactPhone_c = updates.contactPhone;

      const params = {
        records: [dbUpdates]
      };

      const response = await apperClient.updateRecord('booking_c', params);
      
      if (!response.success) {
        console.error('Failed to update booking:', response);
        throw new Error(response.message || 'Failed to update booking');
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} booking:`, failed);
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

      throw new Error('No successful booking update');
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = { 
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('booking_c', params);
      
      if (!response.success) {
        console.error('Failed to delete booking:', response);
        throw new Error(response.message || 'Failed to delete booking');
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} booking:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
};