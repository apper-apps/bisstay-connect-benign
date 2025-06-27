import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import HomePage from '@/components/pages/HomePage';
import BrowsePropertiesPage from '@/components/pages/BrowsePropertiesPage';
import PropertyDetailPage from '@/components/pages/PropertyDetailPage';
import OwnerDashboardPage from '@/components/pages/OwnerDashboardPage';
import CompanyDashboardPage from '@/components/pages/CompanyDashboardPage';
import CreateListingPage from '@/components/pages/CreateListingPage';
import MessagesPage from '@/components/pages/MessagesPage';
import HowItWorksPage from '@/components/pages/HowItWorksPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePropertiesPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />
          <Route path="/company-dashboard" element={<CompanyDashboardPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;