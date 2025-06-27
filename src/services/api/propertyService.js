const STORAGE_KEY = 'bisstay_properties';

// Mock data
const defaultProperties = [
  {
    Id: 1,
    ownerId: 'owner1',
    title: 'Spacious 4-Bedroom House in Downtown',
    description: 'Perfect for construction crews working on downtown projects. This fully furnished house offers comfortable accommodations with all amenities needed for extended stays.',
    address: '123 Main Street, Downtown, TX 75001',
    coordinates: { lat: 32.7767, lng: -96.7970 },
    price: 180,
    capacity: 8,
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Laundry', 'Air Conditioning', 'Furnished'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'house',
    createdAt: '2024-01-15T10:00:00Z',
    status: 'active'
  },
  {
    Id: 2,
    ownerId: 'owner2',
    title: 'Modern Apartment Complex - Multiple Units',
    description: 'Modern apartment complex with multiple units available for construction workers. Each unit is fully equipped with kitchen, bathroom, and sleeping arrangements.',
    address: '456 Oak Avenue, Midtown, TX 75002',
    coordinates: { lat: 32.7850, lng: -96.8000 },
    price: 120,
    capacity: 4,
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Laundry', 'Air Conditioning', 'Furnished', 'Utilities Included'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'apartment',
    createdAt: '2024-01-10T09:00:00Z',
    status: 'active'
  },
  {
    Id: 3,
    ownerId: 'owner3',
    title: 'Construction Dormitory - Industrial Area',
    description: 'Purpose-built dormitory facility designed specifically for construction workers. Located in industrial area with easy access to major construction sites.',
    address: '789 Industrial Boulevard, East Side, TX 75003',
    coordinates: { lat: 32.7500, lng: -96.7500 },
    price: 65,
    capacity: 12,
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Laundry', 'Air Conditioning', 'Security', 'Cleaning Service'],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'dormitory',
    createdAt: '2024-01-05T08:00:00Z',
    status: 'active'
  },
  {
    Id: 4,
    ownerId: 'owner4',
    title: 'Comfortable Trailer Park Units',
    description: 'Clean, well-maintained trailer units perfect for temporary construction housing. Each unit has private bathroom and kitchen facilities.',
    address: '321 Highway 35, North Dallas, TX 75004',
    coordinates: { lat: 32.8000, lng: -96.8200 },
    price: 85,
    capacity: 6,
    amenities: ['Parking', 'Kitchen', 'Heating', 'Air Conditioning', 'Utilities Included'],
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'trailer',
    createdAt: '2024-01-12T11:00:00Z',
    status: 'active'
  },
  {
    Id: 5,
    ownerId: 'owner5',
    title: 'Luxury Furnished House - Upscale Neighborhood',
    description: 'High-end furnished house in upscale neighborhood. Perfect for management teams or premium construction crews who need comfortable accommodations.',
    address: '567 Maple Drive, Uptown, TX 75005',
    coordinates: { lat: 32.7900, lng: -96.7800 },
    price: 250,
    capacity: 6,
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Laundry', 'Air Conditioning', 'Furnished', 'Pool', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'house',
    createdAt: '2024-01-08T14:00:00Z',
    status: 'active'
  },
  {
    Id: 6,
    ownerId: 'owner6',
    title: 'Budget-Friendly Shared Housing',
    description: 'Affordable shared housing option for construction workers on a budget. Clean, safe, and well-maintained with all basic amenities.',
    address: '890 Cedar Street, South Dallas, TX 75006',
    coordinates: { lat: 32.7400, lng: -96.8100 },
    price: 45,
    capacity: 10,
    amenities: ['Parking', 'Kitchen', 'Laundry', 'Heating', 'Utilities Included'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'dormitory',
    createdAt: '2024-01-03T16:00:00Z',
    status: 'active'
  }
];

// Initialize data
const initializeData = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties));
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
export const propertyService = {
  async getAll() {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 300));
    return getData();
  },

  async getById(id) {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 200));
    const properties = getData();
    const property = properties.find(p => p.Id === id);
    if (!property) {
      throw new Error('Property not found');
    }
    return property;
  },

  async create(propertyData) {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const properties = getData();
    const maxId = properties.length > 0 ? Math.max(...properties.map(p => p.Id)) : 0;
    
    const newProperty = {
      ...propertyData,
      Id: maxId + 1,
      ownerId: `owner${maxId + 1}`,
      createdAt: new Date().toISOString(),
      status: 'active',
      coordinates: { lat: 32.7767, lng: -96.7970 }
    };
    
    properties.push(newProperty);
    saveData(properties);
    return newProperty;
  },

  async update(id, updates) {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const properties = getData();
    const index = properties.findIndex(p => p.Id === id);
    
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    properties[index] = { ...properties[index], ...updates };
    saveData(properties);
    return properties[index];
  },

  async delete(id) {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const properties = getData();
    const filteredProperties = properties.filter(p => p.Id !== id);
    
    if (filteredProperties.length === properties.length) {
      throw new Error('Property not found');
    }
    
    saveData(filteredProperties);
    return true;
  }
};