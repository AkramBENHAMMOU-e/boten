import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext';
import MainSite from './Main';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import MentionsLegales from './MentionsLegales';
import PolitiqueConfidentialite from './PolitiqueConfidentialite';
import ConditionsGenerales from './ConditionsGenerales';

const MaintenancePage = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Site en Maintenance</h1>
        <p className="text-gray-600">Nous effectuons actuellement une maintenance. Veuillez revenir plus tard.</p>
      </div>
    </div>
);

const AppContent = () => {
  const { settings, isLoading } = useData();

  const startDate = new Date('2025-03-01');
  const endDate = new Date('2030-04-08');
  const currentDate = new Date();

  if (isLoading || !settings) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
      <Routes>
        {currentDate >= startDate && currentDate < endDate ? (
            <>
              {settings.maintenanceMode ? (
                  <>
                    <Route path="/" element={<MaintenancePage />} />
                    <Route path="/mentions-legales" element={<MaintenancePage />} />
                    <Route path="/politique-de-confidentialite" element={<MaintenancePage />} />
                    <Route path="/conditions-generales" element={<MaintenancePage />} />
                    <Route
                        path="/admin"
                        element={<ProtectedRoute correctPassword={settings.password}><AdminDashboard /></ProtectedRoute>}
                    />
                  </>
              ) : (
                  <>
                    <Route path="/" element={<MainSite />} />
                    <Route
                        path="/admin"
                        element={<ProtectedRoute correctPassword={settings.password}><AdminDashboard /></ProtectedRoute>}
                    />
                    <Route path="/mentions-legales" element={<MentionsLegales />} />
                    <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
                    <Route path="/conditions-generales" element={<ConditionsGenerales />} />
                  </>
              )}
            </>
        ) : (
            <Route path="*" element={<h1>Erreur Chez Heberjahiz, Contactez-nous : 0802 00 2800</h1>} />
        )}
      </Routes>
  );
};

const App = () => (
    <Router>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </Router>
);

export default App;