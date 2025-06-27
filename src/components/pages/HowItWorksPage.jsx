import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";
import ApperIcon from "@/components/ApperIcon";

const HowItWorksPage = () => {
const forCompanies = [
    {
      step: 1,
      title: 'Sök fastigheter',
      description: 'Bläddra bland tillgängliga fastigheter efter plats, datum och kapacitet. Använd filter för att hitta exakt vad du behöver.',
      icon: 'Search'
    },
    {
      step: 2,
      title: 'Visa detaljer',
      description: 'Kontrollera fastighetsdetaljer, foton, bekvämligheter och priser. Se exakt vad som ingår och är tillgängligt.',
      icon: 'Eye'
    },
    {
      step: 3,
      title: 'Begär bokning',
      description: 'Skicka en bokningsförfrågan med dina datum, antal arbetare och projektdetaljer.',
      icon: 'Calendar'
    },
    {
      step: 4,
      title: 'Få bekräftelse',
      description: 'Fastighetsägare kommer att granska och svara på din förfrågan. När den är bekräftad är du klar!',
      icon: 'CheckCircle'
    }
  ];

const forOwners = [
    {
      step: 1,
      title: 'Lista din fastighet',
      description: 'Skapa en detaljerad listning med foton, bekvämligheter, priser och tillgänglighet.',
      icon: 'Home'
    },
    {
      step: 2,
      title: 'Ta emot förfrågningar',
      description: 'Byggföretag kommer att skicka bokningsförfrågningar med sina projektdetaljer och krav.',
      icon: 'Mail'
    },
    {
      step: 3,
      title: 'Granska och acceptera',
      description: 'Granska bokningsförfrågningar och acceptera de som fungerar för dig och din fastighet.',
      icon: 'UserCheck'
    },
    {
      step: 4,
      title: 'Tjäna inkomst',
      description: 'Var värd för byggarbetare och tjäna konsekvent hyresintäkt från din fastighet.',
      icon: 'DollarSign'
    }
  ];

const benefits = [
    {
      title: 'För byggföretag',
      items: [
        'Hitta kvalitetsboenden för din arbetsstyrka',
        'Boka kortsiktiga eller långsiktiga vistelser',
        'Direkt kommunikation med fastighetsägare',
        'Flexibla bokningsvillkor',
        'Verifierade fastighetslistor'
      ],
      icon: 'Building2',
      color: 'bg-blue-500'
    },
    {
      title: 'För fastighetsägare',
      items: [
        'Konsekvent hyresintäkt',
        'Pålitliga byggföretag som hyresgäster',
        'Flexibel listhantering',
        'Direkta bokningsförfrågningar',
        'Professionella affärsrelationer'
      ],
      icon: 'Home',
      color: 'bg-emerald-500'
    }
  ];

  const faqs = [
    {
      question: 'How does the booking process work?',
      answer: 'Companies browse properties and send booking requests. Property owners review and accept requests. Once accepted, both parties can communicate directly to finalize details.'
    },
    {
      question: 'What types of properties can be listed?',
      answer: 'Any property suitable for construction workers including houses, apartments, dormitories, trailers, and other temporary housing options.'
    },
    {
      question: 'How are payments handled?',
      answer: 'Payments are arranged directly between property owners and construction companies. We facilitate the connection but don\'t process payments.'
    },
    {
      question: 'What if I need to cancel a booking?',
      answer: 'Cancellation policies are set by individual property owners. We recommend discussing cancellation terms directly with the property owner.'
    },
    {
      question: 'How do I know if a property is legitimate?',
      answer: 'All property listings are verified by our team. We also encourage direct communication between parties to ensure a good fit.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
{/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
<h1 className="text-4xl md:text-5xl font-semibold mb-6">Så fungerar Stay on Site</h1>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Kopplar samman byggföretag med fastighetsägare för tillfälliga arbetarbostäder
            </p>
          </motion.div>
        </div>
      </section>

      {/* For Companies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">För byggföretag</h2>
            <p className="text-lg text-gray-600">Hitta och boka kvalitetsboenden för din arbetsstyrka i 4 enkla steg</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forCompanies.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={step.icon} className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{step.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>

<div className="text-center mt-12">
            <Link to="/browse" className="btn-primary">
              Börja bläddra fastigheter
            </Link>
          </div>
        </div>
      </section>

      {/* For Property Owners */}
      <section className="py-16 bg-gray-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">För fastighetsägare</h2>
            <p className="text-lg text-gray-600">Lista din fastighet och börja tjäna inkomst i 4 enkla steg</p>
          </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forOwners.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={step.icon} className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-emerald-600 mb-2">{step.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>

<div className="text-center mt-12">
            <Link to="/create-listing" className="btn-primary">
              Lista din fastighet
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Varför välja Stay on Site?</h2>
            <p className="text-lg text-gray-600">Fördelar för både fastighetsägare och byggföretag</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center mr-4`}>
                    <ApperIcon name={benefit.icon} className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                </div>
                <ul className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <ApperIcon name="Check" className="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vanliga frågor</h2>
            <p className="text-lg text-gray-600">Få svar på vanliga frågor om Stay on Site</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
<h2 className="text-3xl font-bold text-white mb-6">Redo att komma igång?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Gå med Stay on Site idag och lös dina byggbostadsbehov
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Link to="/browse" className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Hitta boende
              </Link>
              <Link to="/create-listing" className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
                Lista fastighet
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;