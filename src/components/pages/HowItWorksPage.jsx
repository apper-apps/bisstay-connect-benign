import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ApperIcon from "@/components/ApperIcon";

const HowItWorksPage = () => {
  const { t } = useLanguage();

  const forCompanies = [
    {
      step: 1,
      title: t('howItWorks.forCompanies.step1.title'),
      description: t('howItWorks.forCompanies.step1.description'),
      icon: 'Search'
    },
    {
      step: 2,
      title: t('howItWorks.forCompanies.step2.title'),
      description: t('howItWorks.forCompanies.step2.description'),
      icon: 'Eye'
    },
    {
      step: 3,
      title: t('howItWorks.forCompanies.step3.title'),
      description: t('howItWorks.forCompanies.step3.description'),
      icon: 'Calendar'
    },
    {
      step: 4,
      title: t('howItWorks.forCompanies.step4.title'),
      description: t('howItWorks.forCompanies.step4.description'),
      icon: 'CheckCircle'
    }
  ];

  const forOwners = [
    {
      step: 1,
      title: t('howItWorks.forOwners.step1.title'),
      description: t('howItWorks.forOwners.step1.description'),
      icon: 'Home'
    },
    {
      step: 2,
      title: t('howItWorks.forOwners.step2.title'),
      description: t('howItWorks.forOwners.step2.description'),
      icon: 'Mail'
    },
    {
      step: 3,
      title: t('howItWorks.forOwners.step3.title'),
      description: t('howItWorks.forOwners.step3.description'),
      icon: 'UserCheck'
    },
    {
      step: 4,
      title: t('howItWorks.forOwners.step4.title'),
      description: t('howItWorks.forOwners.step4.description'),
      icon: 'DollarSign'
    }
  ];

  const benefits = [
    {
      title: t('howItWorks.benefits.forCompanies.title'),
      items: [
        t('howItWorks.benefits.forCompanies.benefit1'),
        t('howItWorks.benefits.forCompanies.benefit2'),
        t('howItWorks.benefits.forCompanies.benefit3'),
        t('howItWorks.benefits.forCompanies.benefit4'),
        t('howItWorks.benefits.forCompanies.benefit5')
      ],
      icon: 'Building2',
      color: 'bg-blue-500'
    },
    {
      title: t('howItWorks.benefits.forOwners.title'),
      items: [
        t('howItWorks.benefits.forOwners.benefit1'),
        t('howItWorks.benefits.forOwners.benefit2'),
        t('howItWorks.benefits.forOwners.benefit3'),
        t('howItWorks.benefits.forOwners.benefit4'),
        t('howItWorks.benefits.forOwners.benefit5')
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
<h1 className="text-4xl md:text-5xl font-semibold mb-6">{t('howItWorks.title')}</h1>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* For Companies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('howItWorks.forCompanies.title')}</h2>
            <p className="text-lg text-gray-600">{t('howItWorks.forCompanies.subtitle')}</p>
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
              {t('howItWorks.forCompanies.startBrowsing')}
            </Link>
          </div>
        </div>
      </section>

      {/* For Property Owners */}
      <section className="py-16 bg-gray-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('howItWorks.forOwners.title')}</h2>
            <p className="text-lg text-gray-600">{t('howItWorks.forOwners.subtitle')}</p>
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
              {t('howItWorks.forOwners.listProperty')}
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('howItWorks.benefits.title')}</h2>
            <p className="text-lg text-gray-600">{t('howItWorks.benefits.subtitle')}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('howItWorks.faq.title')}</h2>
            <p className="text-lg text-gray-600">{t('howItWorks.faq.subtitle')}</p>
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
<h2 className="text-3xl font-bold text-white mb-6">{t('howItWorks.finalCta.title')}</h2>
            <p className="text-xl text-primary-100 mb-8">
              {t('howItWorks.finalCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse" className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                {t('howItWorks.finalCta.findAccommodation')}
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