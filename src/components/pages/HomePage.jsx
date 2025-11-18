import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchFilters.location) params.append('location', searchFilters.location);
    if (searchFilters.checkIn) params.append('checkIn', searchFilters.checkIn);
    if (searchFilters.checkOut) params.append('checkOut', searchFilters.checkOut);
    if (searchFilters.guests > 1) params.append('guests', searchFilters.guests);
    
    navigate(`/browse?${params.toString()}`);
  };

const features = [
    {
      icon: 'MapPin',
      title: 'Hitta perfekt boende',
      description: 'Sök och filtrera fastigheter efter plats, kapacitet, bekvämligheter och budget för att hitta idealiska arbetarboenden.'
    },
    {
      icon: 'Shield',
      title: 'Verifierade fastigheter',
      description: 'Alla fastigheter är verifierade och uppfyller säkerhetsstandarder för byggarbetarbostäder.'
    },
{
      icon: 'Users',
      title: 'Flexibel bokning',
      description: 'Boka för kortsiktiga projekt eller långsiktiga kontrakt med enkel datumhantering och tillgänglighetsspårning.'
    },
    {
      icon: 'MessageCircle',
      title: 'Direkt kommunikation',
      description: 'Kommunicera direkt med fastighetsägare för att diskutera specifika behov, gruppbokningar och särskilda arrangemang.'
    }
  ];

const steps = [
    {
      step: '01',
      title: 'Välj din roll',
      description: 'Välj om du är ett byggföretag som söker boende eller en fastighetsägare som vill lista din fastighet.',
      icon: 'UserCheck'
    },
    {
      step: '02',
      title: 'Sök eller lista',
      description: 'Företag kan söka efter lämpliga fastigheter medan ägare kan skapa detaljerade listor med foton och bekvämligheter.',
      icon: 'Search'
    },
    {
      step: '03',
      title: 'Anslut och boka',
      description: 'Skicka bokningsförfrågningar, kommunicera direkt och slutför arrangemang som fungerar för båda parter.',
      icon: 'Handshake'
    }
  ];

return (
    <div className="min-h-screen">
{/* Hero Section */}
      <section className="relative bg-white pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-semibold text-neutral-900 mb-8 leading-tight"
>
              Byggarbetarboenden
              <span className="block gradient-text">Enkelt gjort</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-600 max-w-3xl mx-auto mb-12"
            >
              Koppla samman fastighetsägare med byggföretag. Hitta kvalitetsboenden för tillfällig 
              inkvartering av din arbetsstyrka eller lista dina fastigheter för pålitlig hyresintäkt.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <SearchBar
              searchFilters={searchFilters}
              onSearchChange={setSearchFilters}
              onSearch={handleSearch}
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
<Link to="/browse" className="btn-primary flex items-center space-x-2">
              <ApperIcon name="Search" className="h-4 w-4" />
              <span>Bläddra fastigheter</span>
            </Link>
            <Link to="/create-listing" className="btn-secondary flex items-center space-x-2">
              <ApperIcon name="Plus" className="h-4 w-4" />
              <span>Lista din fastighet</span>
            </Link>
          </motion.div>
        </div>
      </section>

{/* Features Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
<h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6">
              Varför välja Stay on Site?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Strömlinjeformad plattform designad specifikt för byggindustrins bostadsbehov
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center border border-neutral-200"
              >
                <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name={feature.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
<section className="py-24 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Så fungerar det
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                Kom igång med vår plattform i tre enkla steg och hitta perfekta boendelösningar för ditt byggprojekt
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5">
              <div className="absolute left-1/6 right-1/6 h-full bg-gradient-to-r from-primary-200 via-accent-300 to-primary-200"></div>
            </div>
            
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 border border-neutral-100 group hover:-translate-y-2 h-full">
                  {/* Step number indicator */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <ApperIcon name={step.icon} className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      0{index + 1}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-8 text-white shadow-elevated">
              <h3 className="text-2xl font-bold mb-4">Redo att komma igång?</h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Gå med i tusentals byggföretag och fastighetsägare som redan använder vår plattform för att förenkla sina boendelösningar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors duration-200 shadow-md hover:shadow-lg">
                  <span className="flex items-center gap-2">
                    <ApperIcon name="Building2" className="h-5 w-5" />
                    Jag är ett byggföretag
                  </span>
                </button>
                <button className="bg-accent-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-500 transition-colors duration-200 shadow-md hover:shadow-lg">
                  <span className="flex items-center gap-2">
                    <ApperIcon name="Home" className="h-5 w-5" />
                    Jag är fastighetsägare
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

{/* CTA Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
<h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
              Redo att komma igång?
            </h2>
            <p className="text-lg text-neutral-300 mb-12">
              Gå med tusentals byggföretag och fastighetsägare som redan använder Stay on Site
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/browse" 
                className="bg-white text-neutral-900 px-8 py-3 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
              >
                Hitta boende nu
              </Link>
              <Link 
                to="/create-listing" 
                className="bg-accent-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors"
              >
                Lista din fastighet
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;