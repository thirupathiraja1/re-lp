/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import LeadCRM from './components/LeadCRM';
import { Lead, LeadStatus } from './types';
import { INITIAL_LEADS } from './data';

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'crm'>('landing');
  const [leads, setLeads] = useState<Lead[]>([]);

  // Load leads from localStorage on startup or populate with INITIAL_LEADS
  useEffect(() => {
    const savedLeads = localStorage.getItem('stratechgy_crm_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (err) {
        console.error('Error parsing saved leads: ', err);
        setLeads(INITIAL_LEADS);
      }
    } else {
      setLeads(INITIAL_LEADS);
      localStorage.setItem('stratechgy_crm_leads', JSON.stringify(INITIAL_LEADS));
    }
  }, []);

  // Helper and state controllers
  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status' | 'assignedTo' | 'notes'>) => {
    const freshId = `L-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentUtcTime = new Date().toISOString();
    
    const freshLead: Lead = {
      ...newLeadData,
      id: freshId,
      createdAt: currentUtcTime,
      status: 'new',
      assignedTo: 'Raj',
      notes: 'Customer registered via scalable lead-capture form widget.'
    };

    const updatedLeads = [freshLead, ...leads];
    setLeads(updatedLeads);
    localStorage.setItem('stratechgy_crm_leads', JSON.stringify(updatedLeads));
  };

  const handleUpdateLeadStatus = (id: string, nextStatus: LeadStatus) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, status: nextStatus };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('stratechgy_crm_leads', JSON.stringify(updated));
  };

  const handleUpdateLeadNotes = (id: string, nextNotes: string) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, notes: nextNotes };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('stratechgy_crm_leads', JSON.stringify(updated));
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem('stratechgy_crm_leads', JSON.stringify(updated));
  };

  const handleAddManualLeadInCRM = (manualLeadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const freshId = `L-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentUtcTime = new Date().toISOString();

    const manualLead: Lead = {
      ...manualLeadData,
      id: freshId,
      createdAt: currentUtcTime
    };

    const updatedLeads = [manualLead, ...leads];
    setLeads(updatedLeads);
    localStorage.setItem('stratechgy_crm_leads', JSON.stringify(updatedLeads));
  };

  return (
    <div className="min-h-screen bg-brand-bg-100 font-sans antialiased text-brand-text-100">
      
      {/* Dynamic Main View Selector */}
      {view === 'landing' && (
        <LandingPage 
          onLeadSubmit={handleAddLead}
          onNavigateToLogin={() => setView('login')}
        />
      )}

      {view === 'login' && (
        <LoginScreen 
          onLoginSuccess={() => setView('crm')}
          onBack={() => setView('landing')}
        />
      )}

      {view === 'crm' && (
        <LeadCRM 
          leads={leads}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onUpdateLeadNotes={handleUpdateLeadNotes}
          onDeleteLead={handleDeleteLead}
          onAddLead={handleAddManualLeadInCRM}
          onLogout={() => setView('landing')}
        />
      )}

    </div>
  );
}
