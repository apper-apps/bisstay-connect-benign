import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { propertyService } from "@/services/api/propertyService";
import ApperIcon from "@/components/ApperIcon";

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    price: '',
    capacity: 1,
    propertyType: '',
    amenities: [],
    images: [],
    contactEmail: '',
    contactPhone: ''
  });

const steps = [
    { id: 1, name: 'Grundinfo', icon: 'Home' },
    { id: 2, name: 'Detaljer', icon: 'FileText' },
    { id: 3, name: 'Bekvämligheter', icon: 'Star' },
    { id: 4, name: 'Foton', icon: 'Camera' },
    { id: 5, name: 'Kontakt', icon: 'Phone' }
  ];

const propertyTypes = [
    { id: 'house', name: 'Hus', icon: 'Home' },
    { id: 'apartment', name: 'Lägenhet', icon: 'Building' },
    { id: 'dormitory', name: 'Sovsal', icon: 'Building2' },
    { id: 'trailer', name: 'Husvagn', icon: 'Truck' },
  ];

const amenities = [
    { id: 'wifi', name: 'WiFi', icon: 'Wifi' },
    { id: 'parking', name: 'Parkering', icon: 'Car' },
    { id: 'kitchen', name: 'Kök', icon: 'ChefHat' },
    { id: 'laundry', name: 'Tvättstuga', icon: 'Shirt' },
    { id: 'ac', name: 'Luftkonditionering', icon: 'Snowflake' },
    { id: 'heating', name: 'Uppvärmning', icon: 'Flame' },
    { id: 'furnished', name: 'Möblerad', icon: 'Armchair' },
    { id: 'utilities', name: 'Avgifter inkluderade', icon: 'Zap' },
    { id: 'gym', name: 'Gym/Fitness', icon: 'Dumbbell' },
    { id: 'pool', name: 'Pool', icon: 'Waves' },
    { id: 'security', name: 'Säkerhet', icon: 'Shield' },
    { id: 'cleaning', name: 'Städservice', icon: 'Sparkles' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        images: formData.images.length > 0 ? formData.images : [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=800'
        ]
      };
      
await propertyService.create(propertyData);
      toast.success('Fastighet listad framgångsrikt!');
      navigate('/owner-dashboard');
} catch (error) {
      toast.error('Misslyckades att skapa listning. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.address && formData.price;
      case 2:
        return formData.description && formData.propertyType && formData.capacity;
      case 3:
        return true; // Amenities are optional
      case 4:
        return true; // Images are optional (we'll use defaults)
      case 5:
        return formData.contactEmail;
      default:
        return false;
    }
  };

return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
<div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-3">Lista din fastighet</h1>
          <p className="text-neutral-600 text-sm">Skapa en listning för byggarbetarbostäder</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  currentStep >= step.id
                    ? 'bg-neutral-900 border-neutral-900 text-white'
                    : 'border-neutral-300 text-neutral-400'
                }`}>
                  <ApperIcon name={step.icon} className="h-4 w-4" />
                </div>
                <div className={`ml-3 ${currentStep >= step.id ? 'text-neutral-900' : 'text-neutral-400'}`}>
                  <div className="text-xs font-medium">{step.name}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 transition-colors ${
                    currentStep > step.id ? 'bg-neutral-900' : 'bg-neutral-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
<div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Grundläggande information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fastighetstitel</label>
                  <input
                    type="text"
                    value={formData.title}
onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-field"
                    placeholder="t.ex., Rymligt 4-rumshus för byggarbetare"
                    required
                  />
                </div>

<div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adress</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
className="input-field"
                    placeholder="Fullständig fastighetsadress"
                    required
                  />
                </div>

<div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pris per natt (kr)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="input-field"
                    placeholder="150"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
<div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Fastighetsdetaljer</h2>
                
<div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivning</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
className="input-field"
                    placeholder="Beskriv din fastighet, dess funktioner och varför den är perfekt för byggarbetare..."
                    required
                  />
                </div>

<div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Fastighetstyp</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleInputChange('propertyType', type.id)}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                          formData.propertyType === type.id
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <ApperIcon name={type.icon} className="h-6 w-6 mb-2" />
                        <span className="text-sm font-medium">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

<div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Maximal kapacitet</label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('capacity', Math.max(1, formData.capacity - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <ApperIcon name="Minus" className="h-4 w-4" />
                    </button>
                    <span className="text-xl font-semibold w-16 text-center">{formData.capacity}</span>
                    <button
                      type="button"
                      onClick={() => handleInputChange('capacity', formData.capacity + 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <ApperIcon name="Plus" className="h-4 w-4" />
</button>
                    <span className="text-gray-600">arbetare</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Amenities */}
{currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Bekvämligheter</h2>
                <p className="text-gray-600 mb-6">Välj alla bekvämligheter som gäller för din fastighet</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {amenities.map((amenity) => (
                    <label
                      key={amenity.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.amenities.includes(amenity.id)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity.id)}
                        onChange={() => handleAmenityToggle(amenity.id)}
                        className="sr-only"
                      />
                      <ApperIcon name={amenity.icon} className="h-5 w-5" />
                      <span className="text-sm font-medium">{amenity.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
{currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Foton</h2>
                <p className="text-gray-600 mb-6">Lägg till foton av din fastighet (valfritt - exempelfoton kommer att användas om inga tillhandahålls)</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
<ApperIcon name="Camera" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ladda upp foton</h3>
                  <p className="text-gray-600 mb-4">Dra och släpp dina foton här, eller klicka för att bläddra</p>
                  <button
                    type="button"
                    className="btn-outline"
                  >
                    Välj foton
                  </button>
                </div>
                
<div className="text-sm text-gray-500">
                  <p>Tips för bra foton:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Ta foton i bra belysning</li>
                    <li>Visa alla rum och gemensamma utrymmen</li>
                    <li>Inkludera exteriörbilder</li>
                    <li>Framhäv viktiga bekvämligheter</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 5: Contact */}
{currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Kontaktinformation</h2>
                
<div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-postadress</label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="input-field"
                    placeholder="your-email@example.com"
                    required
                  />
                </div>

<div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefonnummer</label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <ApperIcon name="Info" className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
<div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">Granska din listning</p>
                      <p>Kontrollera all information innan du skickar in. Du kan redigera din listning efter att den publicerats.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
{/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Föregående
              </button>
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Nästa
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !canProceed()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Skapar listning...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Check" className="h-4 w-4" />
                      <span>Publicera listning</span>
                    </>
                  )}
                </button>
              )}
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateListingPage;