const STORAGE_KEY = 'bisstay_bookings';

// Mock data
const defaultBookings = [
  {
    Id: 1,
    propertyId: 1,
    companyId: 'BuildCorp Construction',
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    guests: 6,
    status: 'confirmed',
    totalPrice: 5400,
    message: 'We need housing for our downtown project team. Looking forward to working with you.',
    companyName: 'BuildCorp Construction',
    contactEmail: 'projects@buildcorp.com',
    contactPhone: '(555) 123-4567',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    Id: 2,
    propertyId: 2,
    companyId: 'Metro Builders',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    guests: 4,
    status: 'pending',
    totalPrice: 3360,
    message: 'Our team will be working on the new office complex nearby. We need clean, comfortable accommodations.',
    companyName: 'Metro Builders',
    contactEmail: 'housing@metrobuilders.com',
    contactPhone: '(555) 234-5678',
    createdAt: '2024-01-18T14:00:00Z'
  },
  {
    Id: 3,
    propertyId: 3,
    companyId: 'Industrial Solutions LLC',
    startDate: '2024-01-25',
    endDate: '2024-04-25',
    guests: 12,
    status: 'confirmed',
    totalPrice: 5850,
    message: 'Long-term project requiring worker housing. We appreciate dormitory-style accommodations.',
    companyName: 'Industrial Solutions LLC',
    contactEmail: 'admin@industrialsolutions.com',
    contactPhone: '(555) 345-6789',
    createdAt: '2024-01-15T09:00:00Z'
  },
  {
    Id: 4,
    propertyId: 4,
    companyId: 'Highway Construction Co',
    startDate: '2024-02-10',
    endDate: '2024-03-10',
    guests: 5,
    status: 'pending',
    totalPrice: 2550,
    message: 'Road construction project. Need temporary housing for our crew.',
    companyName: 'Highway Construction Co',
    contactEmail: 'crew@highwayco.com',
    contactPhone: '(555) 456-7890',
    createdAt: '2024-01-22T11:00:00Z'
  },
  {
    Id: 5,
    propertyId: 5,
    companyId: 'Premium Development Group',
    startDate: '2024-03-01',
    endDate: '2024-05-01',
    guests: 4,
    status: 'confirmed',
    totalPrice: 15000,
    message: 'High-end construction project. Looking for premium accommodations for our management team.',
    companyName: 'Premium Development Group',
    contactEmail: 'management@premiumdev.com',
    contactPhone: '(555) 567-8901',
    createdAt: '2024-01-25T13:00:00Z'
  }
];

// Initialize data
const initializeData = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBookings));
  }
};

// Helper to get data from localStorage
const getData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save data to localStorage
const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Service methods
export const bookingService = {
  async getAll() {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 300));
    return getData();
  },

  async getById(id) {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 200));
    const bookings = getData();
    const booking = bookings.find(b => b.Id === id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  },

  async create(bookingData) {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const bookings = getData();
    const maxId = bookings.length > 0 ? Math.max(...bookings.map(b => b.Id)) : 0;
    
    const newBooking = {
      ...bookingData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    saveData(bookings);
    return newBooking;
  },

  async update(id, updates) {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const bookings = getData();
    const index = bookings.findIndex(b => b.Id === id);
    
    if (index === -1) {
      throw new Error('Booking not found');
    }
    
    bookings[index] = { ...bookings[index], ...updates };
    saveData(bookings);
    return bookings[index];
  },

  async delete(id) {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const bookings = getData();
    const filteredBookings = bookings.filter(b => b.Id !== id);
    
    if (filteredBookings.length === bookings.length) {
      throw new Error('Booking not found');
    }
    
    saveData(filteredBookings);
    return true;
  }
};