import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import ApperIcon from '@/components/ApperIcon';
import { propertyService } from '@/services/api/propertyService';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom property marker icon
const createPropertyIcon = (price) => {
  return L.divIcon({
    className: 'custom-property-marker',
    html: `
      <div class="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg border-2 border-white">
        ${price} kr
      </div>
    `,
    iconSize: [60, 30],
    iconAnchor: [30, 15]
  });
};

// User location marker icon
const createUserIcon = () => {
  return L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

// Component to handle map view updates
const MapViewController = ({ center, zoom, onMapClick }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  useEffect(() => {
    if (onMapClick) {
      const handleMapClick = (e) => {
        onMapClick(e.latlng);
      };
      
      map.on('click', handleMapClick);
      
      return () => {
        map.off('click', handleMapClick);
      };
    }
  }, [map, onMapClick]);
  
  return null;
};

// Location search component
const LocationSearch = ({ onLocationSearch, searchRadius, onRadiusChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      await onLocationSearch(searchQuery, searchRadius);
    } catch (error) {
      console.error('Location search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <ApperIcon name="Search" className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Sök efter stad eller område..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-600">Radie:</span>
            <button
              type="button"
              onClick={() => onRadiusChange(Math.max(5, searchRadius - 5))}
              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <ApperIcon name="Minus" className="h-3 w-3" />
            </button>
            <span className="text-sm font-medium w-8 text-center">{searchRadius}</span>
            <button
              type="button"
              onClick={() => onRadiusChange(Math.min(100, searchRadius + 5))}
              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <ApperIcon name="Plus" className="h-3 w-3" />
            </button>
            <span className="text-sm text-gray-600">km</span>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-4 py-2 disabled:opacity-50"
          >
            {loading ? (
              <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
            ) : (
              <ApperIcon name="Search" className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const MapView = ({ 
  properties = [], 
  userLocation, 
  searchRadius = 25, 
  onLocationChange, 
  onRadiusChange 
}) => {
  const [mapCenter, setMapCenter] = useState([59.3293, 18.0686]); // Default to Stockholm
  const [mapZoom, setMapZoom] = useState(10);
const mapRef = useRef(null);

  // Handle map click for location selection
  const handleMapClick = (latlng) => {
    const coords = {
      lat: latlng.lat,
      lng: latlng.lng,
      name: 'Vald plats'
    };
    setMapCenter([coords.lat, coords.lng]);
    if (onLocationChange) {
      onLocationChange(coords);
    }
  };

useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
      setMapZoom(12);
    } else if (properties.length > 0) {
      // Center map on properties with better bounds calculation
      const validCoordinates = properties
        .filter(p => p.coordinates && p.coordinates.lat && p.coordinates.lng)
        .map(p => [p.coordinates.lat, p.coordinates.lng]);
      
      if (validCoordinates.length > 0) {
        const centerLat = validCoordinates.reduce((sum, coord) => sum + coord[0], 0) / validCoordinates.length;
        const centerLng = validCoordinates.reduce((sum, coord) => sum + coord[1], 0) / validCoordinates.length;
        setMapCenter([centerLat, centerLng]);
        setMapZoom(10);
      }
    }
  }, [userLocation, properties]);

  const handleLocationSearch = async (locationName, radius) => {
    try {
      const coordinates = await propertyService.geocodeLocation(locationName);
      setMapCenter([coordinates.lat, coordinates.lng]);
      setMapZoom(12);
      if (onLocationChange) {
        onLocationChange(coordinates);
      }
    } catch (error) {
      console.error('Location search failed:', error);
    }
  };

  return (
    <div className="relative h-96 md:h-[600px] w-full">
      <MapContainer
        ref={mapRef}
center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
<MapViewController 
          center={mapCenter} 
          zoom={mapZoom} 
          onMapClick={handleMapClick}
        />
        
        {/* User location marker and radius circle */}
        {userLocation && (
          <>
            <Marker 
              position={[userLocation.lat, userLocation.lng]}
              icon={createUserIcon()}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">Din plats</h3>
                  <p className="text-sm text-gray-600">{userLocation.name}</p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={searchRadius * 1000} // Convert km to meters
              pathOptions={{ 
                color: '#3B82F6', 
                fillColor: '#3B82F6', 
                fillOpacity: 0.1,
                weight: 2 
              }}
            />
          </>
        )}
        
        {/* Property markers */}
        {properties.map((property) => (
          <Marker
            key={property.Id}
            position={[property.coordinates.lat, property.coordinates.lng]}
            icon={createPropertyIcon(property.price)}
          >
            <Popup maxWidth={300}>
              <div className="p-2">
                <div className="flex items-start gap-3">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm leading-tight mb-1">
                      {property.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {property.address}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-primary-600 font-bold">
                        {property.price} SEK<span className="text-xs font-normal text-gray-500">/natt</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {property.capacity} gäster
                      </div>
                    </div>
                    <Link
                      to={`/property/${property.Id}`}
                      className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 mt-2"
                    >
                      Visa detaljer <ApperIcon name="ArrowRight" className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Search overlay */}
      <LocationSearch 
        onLocationSearch={handleLocationSearch}
        searchRadius={searchRadius}
        onRadiusChange={onRadiusChange}
      />

{/* Map controls */}
      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
        {/* Zoom In Button */}
        <button
          onClick={() => {
            if (mapRef.current) {
              const newZoom = Math.min(mapZoom + 1, 18);
              setMapZoom(newZoom);
            }
          }}
          className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          title="Zooma in"
        >
          <ApperIcon name="Plus" className="h-5 w-5 text-gray-600" />
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={() => {
            if (mapRef.current) {
              const newZoom = Math.max(mapZoom - 1, 1);
              setMapZoom(newZoom);
            }
          }}
          className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          title="Zooma ut"
        >
          <ApperIcon name="Minus" className="h-5 w-5 text-gray-600" />
        </button>

        {/* Find My Location Button */}
        <button
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    name: 'Min plats'
                  };
                  setMapCenter([coords.lat, coords.lng]);
                  setMapZoom(14);
                  if (onLocationChange) {
                    onLocationChange(coords);
                  }
                },
                (error) => {
                  console.error('Geolocation error:', error);
                  // Show user-friendly error message
                  if (error.code === error.PERMISSION_DENIED) {
                    alert('Tillgång till plats nekad. Aktivera platsåtkomst i webbläsarinställningarna.');
                  } else if (error.code === error.POSITION_UNAVAILABLE) {
                    alert('Din plats kunde inte hittas.');
                  } else {
                    alert('Fel vid hämtning av plats.');
                  }
                },
                { 
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 60000 
                }
              );
            } else {
              alert('Geolocation stöds inte av din webbläsare.');
            }
          }}
          className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          title="Hitta min plats"
        >
          <ApperIcon name="MapPin" className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Property count indicator */}
      {properties.length > 0 && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <ApperIcon name="Home" className="h-4 w-4 text-primary-600" />
            <span className="font-medium">{properties.length} fastighet{properties.length !== 1 ? 'er' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;