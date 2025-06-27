const STORAGE_KEY = 'bisstay_bookings';

// Mock data
const defaultBookings = [
{
    Id: 1,
    propertyId: 1,
    companyId: 'Skanska Sverige',
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    guests: 6,
    status: 'confirmed',
    totalPrice: 54000,
    message: 'Vi behöver boende för vårt Stockholm-projekt team. Ser fram emot att arbeta med er.',
    companyName: 'Skanska Sverige',
    contactEmail: 'projekt@skanska.se',
    contactPhone: '08-123-4567',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    Id: 2,
    propertyId: 2,
    companyId: 'NCC Sverige',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    guests: 4,
    status: 'pending',
    totalPrice: 33600,
    message: 'Vårt team kommer att arbeta på det nya kontorskomplexet i närheten. Vi behöver rena, bekväma boenden.',
    companyName: 'NCC Sverige',
    contactEmail: 'boende@ncc.se',
    contactPhone: '031-234-5678',
    createdAt: '2024-01-18T14:00:00Z'
  },
  {
    Id: 3,
    propertyId: 3,
    companyId: 'Peab Byggservice',
    startDate: '2024-01-25',
    endDate: '2024-04-25',
    guests: 12,
    status: 'confirmed',
    totalPrice: 58500,
    message: 'Långsiktigt projekt som kräver arbetarboende. Vi uppskattar boende i kollektivform.',
    companyName: 'Peab Byggservice',
    contactEmail: 'admin@peab.se',
    contactPhone: '040-345-6789',
    createdAt: '2024-01-15T09:00:00Z'
  },
  {
    Id: 4,
    propertyId: 4,
    companyId: 'Svevia Väg & Anläggning',
    startDate: '2024-02-10',
    endDate: '2024-03-10',
    guests: 5,
    status: 'pending',
    totalPrice: 25500,
    message: 'Vägbyggnadsprojekt. Behöver tillfälligt boende för vårt arbetslag.',
    companyName: 'Svevia Väg & Anläggning',
    contactEmail: 'arbetslag@svevia.se',
    contactPhone: '018-456-7890',
    createdAt: '2024-01-22T11:00:00Z'
  },
  {
    Id: 5,
    propertyId: 5,
    companyId: 'JM Entreprenad',
    startDate: '2024-03-01',
    endDate: '2024-05-01',
    guests: 4,
    status: 'confirmed',
    totalPrice: 150000,
    message: 'Exklusivt byggprojekt. Söker premium boenden för vårt ledningsteam.',
    companyName: 'JM Entreprenad',
    contactEmail: 'ledning@jm.se',
    contactPhone: '08-567-8901',
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