'use client';

import React, { useState, useCallback } from 'react';
import PageHeader from './components/PageHeader';
import TabBar from './components/TabBar';
import OverviewTab from './components/OverviewTab/OverviewTab';
import CompetitorTab from './components/CompetitorTab/CompetitorTab';
import QuadrantTab from './components/QuadrantTab/QuadrantTab';
import './company.css';

type TabName = 'overview' | 'competitor' | 'quadrants';

export default function CompanyPageContent() {
  const [activeTab, setActiveTab] = useState<TabName>('overview');
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string | undefined>(undefined);

  const handleOpenCompetitor = useCallback((id: string) => {
    setSelectedCompetitorId(id);
    setActiveTab('competitor');
  }, []);

  return (
    <main className="company-page">
      <PageHeader />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="page-body">
        {activeTab === 'overview' && (
          <OverviewTab onOpenCompetitor={handleOpenCompetitor} />
        )}
        {activeTab === 'competitor' && (
          <CompetitorTab initialCompetitorId={selectedCompetitorId} />
        )}
        {activeTab === 'quadrants' && (
          <QuadrantTab />
        )}
      </div>
    </main>
  );
}
