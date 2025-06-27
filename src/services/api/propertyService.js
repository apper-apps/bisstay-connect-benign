const STORAGE_KEY = 'bisstay_properties';

// Mock data
const defaultProperties = [
{
    Id: 1,
    ownerId: 'owner1',
    title: 'Rymligt 4-rumshus i centrala Stockholm',
    description: 'Perfekt för byggteam som arbetar med projekt i centrala Stockholm. Detta fullt möblerade hus erbjuder bekväma boenden med alla bekvämligheter som behövs för längre vistelser.',
    address: 'Vasagatan 123, Stockholm, 111 20',
    coordinates: { lat: 59.3293, lng: 18.0686 },
    price: 1800,
    capacity: 8,
    amenities: ['WiFi', 'Parkering', 'Kök', 'Tvättmaskin', 'Luftkonditionering', 'Möblerat'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'hus',
    createdAt: '2024-01-15T10:00:00Z',
    status: 'active'
  },
  {
    Id: 2,
    ownerId: 'owner2',
    title: 'Modernt lägenhetskomplex - Flera enheter',
    description: 'Modernt lägenhetskomplex med flera enheter tillgängliga för byggnadsarbetare. Varje enhet är fullt utrustad med kök, badrum och sovplatser.',
    address: 'Drottninggatan 456, Göteborg, 411 07',
    coordinates: { lat: 57.7089, lng: 11.9746 },
    price: 1200,
    capacity: 4,
    amenities: ['WiFi', 'Parkering', 'Kök', 'Tvättmaskin', 'Luftkonditionering', 'Möblerat', 'El och värme ingår'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'lägenhet',
    createdAt: '2024-01-10T09:00:00Z',
    status: 'active'
  },
  {
    Id: 3,
    ownerId: 'owner3',
    title: 'Byggarbetarboende - Industriområde',
    description: 'Specialbyggt boende designat specifikt för byggnadsarbetare. Beläget i industriområde med enkel tillgång till större byggprojekt.',
    address: 'Industrivägen 789, Malmö, 200 10',
    coordinates: { lat: 55.6050, lng: 13.0038 },
    price: 650,
    capacity: 12,
    amenities: ['WiFi', 'Parkering', 'Kök', 'Tvättmaskin', 'Luftkonditionering', 'Säkerhet', 'Städservice'],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'boende',
    createdAt: '2024-01-05T08:00:00Z',
    status: 'active'
  },
  {
    Id: 4,
    ownerId: 'owner4',
    title: 'Bekväma husvagnsenheter',
    description: 'Rena, välskötta husvagnsenheter perfekta för tillfälligt byggboende. Varje enhet har privat badrum och köksfaciliteter.',
    address: 'Västerleden 321, Uppsala, 752 28',
    coordinates: { lat: 59.8586, lng: 17.6389 },
    price: 850,
    capacity: 6,
    amenities: ['Parkering', 'Kök', 'Värme', 'Luftkonditionering', 'El och värme ingår'],
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'husvagn',
    createdAt: '2024-01-12T11:00:00Z',
    status: 'active'
  },
  {
    Id: 5,
    ownerId: 'owner5',
    title: 'Lyxigt möblerat hus - Exklusivt område',
    description: 'Högklassigt möblerat hus i exklusivt område. Perfekt för ledningsgrupper eller premium byggteam som behöver bekväma boenden.',
    address: 'Strandvägen 567, Stockholm, 114 56',
    coordinates: { lat: 59.3326, lng: 18.0649 },
    price: 2500,
    capacity: 6,
    amenities: ['WiFi', 'Parkering', 'Kök', 'Tvättmaskin', 'Luftkonditionering', 'Möblerat', 'Pool', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'hus',
    createdAt: '2024-01-08T14:00:00Z',
    status: 'active'
  },
  {
    Id: 6,
    ownerId: 'owner6',
    title: 'Budgetvänligt delat boende',
    description: 'Prisvärt delat boende för byggnadsarbetare med begränsad budget. Rent, säkert och välskött med alla grundläggande bekvämligheter.',
    address: 'Folkungagatan 890, Stockholm, 116 30',
    coordinates: { lat: 59.3180, lng: 18.0649 },
    price: 450,
    capacity: 10,
    amenities: ['Parkering', 'Kök', 'Tvättmaskin', 'Värme', 'El och värme ingår'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800'
    ],
    availability: ['2024-01-01', '2024-12-31'],
    propertyType: 'boende',
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
coordinates: { lat: 59.3293, lng: 18.0686 }
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