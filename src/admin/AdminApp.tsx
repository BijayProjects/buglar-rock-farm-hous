import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminMedia } from './AdminMedia';
import { AdminMenu } from './AdminMenu';
import { AdminExperiences } from './AdminExperiences';
import { AdminEvents } from './AdminEvents';
import { AdminGallery } from './AdminGallery';
import { AdminReviews } from './AdminReviews';
import { AdminInquiries } from './AdminInquiries';
import { AdminPages } from './AdminPages';
import { AdminNavigation } from './AdminNavigation';
import { AdminSettings } from './AdminSettings';
import { AdminBackup } from './AdminBackup';

interface AdminAppProps {
  onBackToSite: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onBackToSite }) => {
  const { isAuthenticated } = useCMS();
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  if (!isAuthenticated) {
    return <AdminLogin onBackToSite={onBackToSite} />;
  }

  return (
    <AdminLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      onVisitSite={onBackToSite}
    >
      {currentTab === 'dashboard' && (
        <AdminDashboard
          onNavigateTab={setCurrentTab}
          onVisitSite={onBackToSite}
        />
      )}
      {currentTab === 'media' && <AdminMedia onNavigateTab={setCurrentTab} />}
      {currentTab === 'menu' && <AdminMenu />}
      {currentTab === 'experiences' && <AdminExperiences />}
      {currentTab === 'events' && <AdminEvents />}
      {currentTab === 'gallery' && <AdminGallery />}
      {currentTab === 'reviews' && <AdminReviews />}
      {currentTab === 'inquiries' && <AdminInquiries />}
      {currentTab === 'pages' && <AdminPages />}
      {currentTab === 'navigation' && <AdminNavigation />}
      {currentTab === 'settings' && <AdminSettings />}
      {currentTab === 'backup' && <AdminBackup />}
    </AdminLayout>
  );
};
