/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  Lock, 
  PhoneCall, 
  Building, 
  Star, 
  Briefcase, 
  Database,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  FileDown
} from 'lucide-react';
import { Project, Testimonial, Lead } from '../types';
import { PROJECTS, TESTIMONIALS } from '../data';

interface LandingPageProps {
  onLeadSubmit: (lead: Omit<Lead, 'id' | 'createdAt' | 'status' | 'assignedTo' | 'notes'>) => void;
  onNavigateToLogin: () => void;
}

export default function LandingPage({ onLeadSubmit, onNavigateToLogin }: LandingPageProps) {
  // Hero Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'UI/UX Redesign',
    budget: '$25,000 - $50,000',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectFilter, setProjectFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      alert('Please fill in the required fields (Name, Email, and Company).');
      return;
    }
    onLeadSubmit(formData);
    setFormSubmitted(true);
    // Reset form after delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: 'UI/UX Redesign',
        budget: '$25,000 - $50,000',
        message: ''
      });
      setFormSubmitted(false);
    }, 4000);
  };

  const filteredProjects = PROJECTS.filter(p => {
    if (projectFilter === 'all') return true;
    return p.status === projectFilter;
  });

  const faqs = [
    {
      q: 'How does Stratechgy manage project scoping and SLAs?',
      a: 'We operate on a stringent milestone-based architecture. Every client engagement is bound by a custom Service Level Agreement (SLA) with guaranteed delivery dates, technical parameters, and dedicated QA sprints.'
    },
    {
      q: 'Can we integrate the Lead CRM database with our existing CRM?',
      a: 'Absolutely. The CRM build has native JSON/CSV downloadable structures, allowing full compatibility. If using the PHP template code provided inside the CRM, you can automate synchronization with Salesforce, HubSpot, or localized databases.'
    },
    {
      q: 'What is the standard timeline for custom enterprise builds?',
      a: 'Completed projects typically range from 4 to 12 weeks depending on complexity. Ongoing projects showcase our continuous integration (CI) workflow, ensuring weekly staging releases for active stakeholder review.'
    },
    {
      q: 'How does your lead generation and conversion strategy work?',
      a: 'We leverage semantic search optimization protocols, robust visual layouts, high-converting UX copywriting, and minimized technical friction (such as lightweight fast-loading markup) to maximize target action rates.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg-100 text-brand-text-100 selection:bg-brand-primary-300 selection:text-brand-primary-100">
      
      {/* Dynamic SEO Alert / Top Banner */}
      <div className="bg-brand-accent-200 text-[#ffffff] text-center py-2 px-4 text-xs font-mono tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-brand-accent-100 animate-pulse" />
        <span>SEO INDEX ACTIVE • GOOGLE WORKSPACE DISCOVER PROTOCOLS ENABLED</span>
        <span className="hidden md:inline">• TRUSTED BY FORWARD-THINKING ENTERPRISES</span>
      </div>

      {/* Header Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-[#ffffff]/90 backdrop-blur-md border-b border-brand-bg-300/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary-100 to-brand-primary-200 flex items-center justify-center shadow-lg shadow-brand-primary-100/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-display font-bold text-lg text-white">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-medium text-xl tracking-tight text-brand-text-100 text-left">
                Stratechgy<span className="text-brand-primary-100">.</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent-100 -mt-1 text-left">
                SYSTEMS & AGENCY
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link Toggles */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-text-200">
            <a href="#services" className="hover:text-brand-primary-100 transition-colors uppercase tracking-wider text-xs">Services</a>
            <a href="#projects" className="hover:text-brand-primary-100 transition-colors uppercase tracking-wider text-xs font-semibold flex items-center gap-1">
              <span>Case Studies</span>
              <span className="px-1.5 py-0.5 bg-brand-primary-300/30 text-brand-primary-100 rounded-md text-[9px] font-mono tracking-normal capitalize">Project Pipeline</span>
            </a>
            <a href="#testimonials" className="hover:text-brand-primary-100 transition-colors uppercase tracking-wider text-xs">Testimonials</a>
            <a href="#faqs" className="hover:text-brand-primary-100 transition-colors uppercase tracking-wider text-xs">Process FAQ</a>
          </nav>

          {/* Action Navigation Controls */}
          <div className="flex items-center gap-3">
            <button 
              id="header_crm_btn"
              onClick={onNavigateToLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-mono font-medium rounded-lg text-brand-accent-200 bg-brand-accent-100/10 border border-brand-accent-100/40 hover:bg-brand-accent-100 hover:text-[#white] hover:border-brand-accent-100 transition-all cursor-pointer shadow-sm active:scale-95 duration-200"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>CRM Portal</span>
            </button>

            <a 
              href="#book_consultation"
              className="hidden lg:flex items-center gap-1 px-5 py-2.5 text-xs font-bold rounded-lg text-white bg-brand-primary-100 hover:bg-brand-primary-200 active:scale-98 shadow-md shadow-brand-primary-100/20 transition-all"
            >
              <span>Book Strategy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">

        {/* SECTION 1: HERO SECTION WITH THE RICH CAPTURE FORM */}
        <section id="book_consultation" className="relative pt-12 pb-24 md:py-28 overflow-hidden bg-gradient-to-b from-brand-bg-200 via-white to-brand-bg-100">
          
          {/* Ambient visual background vectors */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary-300/10 rounded-bl-full filter blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-brand-accent-100/5 rounded-tr-full filter blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: High Conversion SEO Copywriting Content */}
              <div className="lg:col-span-7 space-y-8 text-left">
                
                {/* Micro Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary-300/40 text-brand-primary-100 rounded-full text-xs font-mono font-semibold tracking-wider">
                  <TrendingUp className="w-4 h-4 text-brand-primary-100 animate-bounce" />
                  <span>PREMIUM DIGITAL ARCHITECTURE LAB</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[54px] leading-tight text-brand-text-100 tracking-tight">
                  We Design and Build High-Performance <span className="text-brand-primary-100 underline decoration-2 decoration-brand-accent-100">Digital Engines</span> That Scale Enterprise Assets.
                </h1>

                {/* Supporting Body Text */}
                <p className="text-brand-text-200 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
                  Stratechgy bridges elite design aesthetics with industrial-grade systems development. 
                  Optimize your bottom line, capture pristine qualified leads, and establish bulletproof custom CRM systems built to convert.
                </p>

                {/* Bullet Proof Trust Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent-100 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-brand-text-100">Pristine Design Integration</h4>
                      <p className="text-xs text-brand-text-200">Matching specified red & deep teal brand requirements beautifully.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent-100 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-brand-text-100">Locked Lead Management CRM</h4>
                      <p className="text-xs text-brand-text-200">Directly inspect form-submissions live with username/password lock.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-brand-accent-100 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-brand-text-100">SEO Protocol Framework</h4>
                      <p className="text-xs text-brand-text-200">Proper header nestings, canonical linking, and structural data tagging.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Zap className="w-5 h-5 text-brand-accent-100 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-brand-text-100">No Complex Junk Middleware</h4>
                      <p className="text-xs text-brand-text-200">Lightweight high-speed client loaders. Pure design execution.</p>
                    </div>
                  </div>
                </div>

                {/* Callout stats bar */}
                <div className="pt-6 border-t border-brand-bg-300/40 flex flex-wrap gap-8">
                  <div>
                    <span className="font-display font-bold text-3xl text-brand-accent-200">41%</span>
                    <span className="text-xs block text-brand-text-200 uppercase tracking-widest font-mono">Clarity Gain</span>
                  </div>
                  <div>
                    <span className="font-display font-bold text-3xl text-brand-accent-200">$5.8M+</span>
                    <span className="text-xs block text-brand-text-200 uppercase tracking-widest font-mono">Facilitated Transactions</span>
                  </div>
                  <div>
                    <span className="font-display font-bold text-3xl text-brand-accent-200">99.9%</span>
                    <span className="text-xs block text-brand-text-200 uppercase tracking-widest font-mono">Build Accuracy Rates</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Lead Capture Form Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-8 shadow-xl shadow-brand-text-100/5 border border-brand-bg-300 relative">
                  
                  {/* Decorative glowing header line */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-primary-100 to-brand-accent-100 rounded-t-2xl" />

                  <div className="text-left mb-6">
                    <h3 className="font-display font-bold text-2xl text-brand-text-100">
                      Request Strategy <span className="text-brand-accent-100">Session</span>
                    </h3>
                    <p className="text-xs text-brand-text-200 mt-1">
                      No obligation discovery briefing. 15-minute diagnostic evaluation.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="py-12 px-4 text-center rounded-xl bg-brand-accent-100/5 border border-brand-accent-100/30 animate-pulse">
                      <div className="w-16 h-16 rounded-full bg-brand-accent-100/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-brand-accent-100" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-brand-text-100">Lead Registered Successfully!</h4>
                      <p className="text-xs text-brand-text-200 mt-2 max-w-sm mx-auto leading-relaxed">
                        Your custom request has been integrated into the secure database. You can instantly login to the CRM Portal with credentials <span className="font-mono bg-brand-primary-300/30 text-brand-primary-100 px-1 py-0.5 rounded">Raj</span> to inspect the lead!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      <div className="text-left">
                        <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1" htmlFor="client_name">Name <span className="text-brand-primary-100">*</span></label>
                        <div className="relative">
                          <input 
                            type="text" 
                            id="client_name"
                            required
                            placeholder="e.g. Aron Vance"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-3.5 py-2 text-sm bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-2 focus:ring-brand-accent-100/50 focus:border-brand-accent-100 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-left">
                          <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1" htmlFor="client_email">Email <span className="text-brand-primary-100">*</span></label>
                          <input 
                            type="email" 
                            id="client_email"
                            required
                            placeholder="e.g. contact@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-3.5 py-2 text-sm bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-2 focus:ring-brand-accent-100/50 focus:border-brand-accent-100 focus:bg-white transition-all"
                          />
                        </div>
                        <div className="text-left">
                          <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1" htmlFor="client_company">Company <span className="text-brand-primary-100">*</span></label>
                          <input 
                            type="text" 
                            id="client_company"
                            required
                            placeholder="e.g. Spectre Inc."
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="w-full px-3.5 py-2 text-sm bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-2 focus:ring-brand-accent-100/50 focus:border-brand-accent-100 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-left">
                          <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1" htmlFor="client_phone">Phone</label>
                          <input 
                            type="tel" 
                            id="client_phone"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-3.5 py-2 text-sm bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-2 focus:ring-brand-accent-100/50 focus:border-brand-accent-100 focus:bg-white transition-all"
                          />
                        </div>

                        <div className="text-left">
                          <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1" htmlFor="client_budget">Project Budget</label>
                          <select 
                            id="client_budget"
                            value={formData.budget}
                            onChange={(e) => setFormData({...formData, budget: e.target.value})}
                            className="w-full px-3 py-2 text-sm bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-2 focus:ring-brand-accent-100/50 focus:border-brand-accent-100 focus:bg-white transition-all cursor-pointer"
                          >
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                            <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                            <option value="$50,000+">$50,000+</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-left">
                        <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1" htmlFor="client_project_type">Core Stream Objective</label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {['UI/UX Redesign', 'Web Development', 'Acquisition Strategy', 'Custom Enterprise Hub'].map((type) => (
                            <button
                              type="button"
                              key={type}
                              onClick={() => setFormData({...formData, projectType: type})}
                              className={`py-2 px-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                                formData.projectType === type 
                                ? 'border-brand-primary-100 bg-brand-primary-300/20 text-brand-primary-100 font-semibold' 
                                : 'border-brand-bg-300 hover:border-brand-text-200 bg-brand-bg-200 text-brand-text-200'
                              }`}
                            >
                              <span>{type}</span>
                              {formData.projectType === type && <div className="w-1.5 h-1.5 rounded-full bg-brand-primary-100 shrink-0" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="text-left">
                        <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1" htmlFor="client_message">Core Directives / Message</label>
                        <textarea 
                          id="client_message"
                          rows={3}
                          placeholder="Please elaborate on your infrastructure specs, deadlines, or design requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full px-3.5 py-2 text-sm bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-2 focus:ring-brand-accent-100/50 focus:border-brand-accent-100 focus:bg-white transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-4 bg-brand-primary-100 hover:bg-brand-primary-200 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-primary-100/20 transition-all transform active:scale-95 duration-150 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Deploy Conversion Signal</span>
                      </button>

                    </form>
                  )}

                  <div className="mt-4 text-center">
                    <p className="text-[10px] text-brand-text-200 font-mono flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-accent-100" />
                      <span>SECURE LOCAL DATA COMPLIANCE STANDARD CO-09</span>
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TRUST BADGES VECTOR ELEMENT (LP protocol) */}
        <section className="bg-brand-bg-200 border-y border-brand-bg-300/40 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-mono uppercase tracking-widest text-brand-text-200/80 text-center mb-5 font-semibold">
              Trusted by tech executives and corporate leaders worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
              {['SpectreCorp', 'Aurora FinTech', 'Atlas Cargo', 'Nexus Networks', 'Mercury Systems'].map((partner, idx) => (
                <div key={partner} className="flex items-center gap-1.5 font-display font-bold text-sm tracking-wider text-brand-text-200">
                  <Building className="w-4.5 h-4.5 text-brand-accent-200" />
                  <span>{partner.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONVERSION CORE BENEFITS SECTION */}
        <section id="services" className="py-24 bg-white text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-brand-primary-100 font-bold mb-3">
                INTELLIGENT DELIVERY PLATFORM
              </h2>
              <h3 className="font-display font-medium text-3xl sm:text-4xl text-brand-text-100 tracking-tight">
                An agency architecture purpose-built to execute on ambitious bottom lines.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Benefit 1 */}
              <div className="p-8 rounded-2xl bg-brand-bg-200 border border-brand-bg-300 hover:border-brand-accent-100/50 hover:bg-white hover:shadow-xl hover:shadow-brand-accent-100/5 transition-all group duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-primary-300/30 text-brand-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-xl text-brand-text-100 mb-3">Extremely High Speed Releases</h4>
                <p className="text-sm text-brand-text-200 leading-relaxed">
                  We implement streamlined React + custom styled tailwind systems designed for high speed and loading efficiency to bypass the typical speed blockers.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="p-8 rounded-2xl bg-brand-bg-200 border border-brand-bg-300 hover:border-brand-accent-100/50 hover:bg-white hover:shadow-xl hover:shadow-brand-accent-100/5 transition-all group duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-accent-100/10 text-brand-accent-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-xl text-brand-text-100 mb-3">Engineered Lead Acquisition</h4>
                <p className="text-sm text-brand-text-200 leading-relaxed">
                  Every form, anchor, spacing, and hero is carefully calibrated around proven conversion heuristics, keeping qualified user registration high.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="p-8 rounded-2xl bg-brand-bg-200 border border-brand-bg-300 hover:border-brand-accent-100/50 hover:bg-white hover:shadow-xl hover:shadow-brand-accent-100/5 transition-all group duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-primary-100/10 text-brand-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-xl text-brand-text-100 mb-3">Partner Protected Storage</h4>
                <p className="text-sm text-brand-text-200 leading-relaxed">
                  Review leads securely in the integrated Administrative CRM portal. Manage status parameters, export compiled records instantly.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: LIST ONGOING PROJECTS AND COMPLETED PROJECTS */}
        <section id="projects" className="py-24 bg-brand-bg-200 border-y border-brand-bg-300/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header copy */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-brand-accent-100 font-bold mb-3">
                  SYSTEM PORTFOLIO
                </h2>
                <h3 className="font-display font-medium text-3xl sm:text-4xl text-brand-text-100 tracking-tight">
                  Active Project Lifecycle Listing
                </h3>
                <p className="text-sm text-brand-text-200 mt-2 max-w-xl">
                  Real-time showcase of projects currently undergoing intensive development or actively integrated into enterprise workflows.
                </p>
              </div>

              {/* Filtering Toggles matching standard UX rules */}
              <div className="flex items-center p-1 bg-white rounded-xl border border-brand-bg-300/80 shadow-sm shrink-0">
                <button
                  onClick={() => setProjectFilter('all')}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                    projectFilter === 'all' 
                    ? 'bg-brand-primary-100 text-white shadow-sm' 
                    : 'text-brand-text-200 hover:text-brand-text-100'
                  }`}
                >
                  All Projects ({PROJECTS.length})
                </button>
                <button
                  onClick={() => setProjectFilter('completed')}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                    projectFilter === 'completed' 
                    ? 'bg-brand-primary-100 text-white shadow-sm' 
                    : 'text-brand-text-200 hover:text-brand-text-100'
                  }`}
                >
                  Completed ({PROJECTS.filter(p => p.status === 'completed').length})
                </button>
                <button
                  onClick={() => setProjectFilter('ongoing')}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                    projectFilter === 'ongoing' 
                    ? 'bg-brand-primary-100 text-white shadow-sm' 
                    : 'text-brand-text-200 hover:text-brand-text-100'
                  }`}
                >
                  Ongoing ({PROJECTS.filter(p => p.status === 'ongoing').length})
                </button>
              </div>
            </div>

            {/* Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <article 
                  key={project.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-brand-bg-300 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  
                  {/* Photo container with metrics overlay */}
                  <div className="h-48 w-full relative overflow-hidden bg-brand-text-100 shrink-0">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-400" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded-md ${
                        project.status === 'completed' 
                        ? 'bg-brand-accent-200 text-white' 
                        : 'bg-brand-primary-100 text-white animate-pulse'
                      }`}>
                        {project.status === 'completed' ? '✓ Completed' : '⚙ In Progress'}
                      </span>
                    </div>

                    {/* Impact Metric bottom overlay */}
                    <div className="absolute bottom-4 right-4">
                      <span className="px-3 py-1.5 bg-[#ffffff]/90 backdrop-blur-md rounded-lg text-xs font-mono font-bold text-brand-accent-200 shadow-md">
                        {project.impactMetrics}
                      </span>
                    </div>
                  </div>

                  {/* Body textual content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-brand-accent-100 uppercase block mb-1">
                        {project.category}
                      </span>
                      <h4 className="font-display font-semibold text-lg text-brand-text-100 group-hover:text-brand-primary-100 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-brand-text-200/90 font-mono mt-0.5">
                        Client: {project.client}
                      </p>
                      <p className="text-xs text-brand-text-200 mt-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-brand-bg-300/40">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-brand-bg-200 hover:bg-brand-bg-300 text-[10px] text-brand-text-100 rounded font-mono transition-colors">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </article>
              ))}
            </div>

          </div>
        </section>

        {/* EXECUTIVE TESTIMONIALS (LP protocol) */}
        <section id="testimonials" className="py-24 bg-white text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-2xl mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-brand-primary-100 font-bold mb-3">
                PARTNER TESTIMONY
              </h2>
              <h3 className="font-display font-medium text-3xl sm:text-4xl text-brand-text-100 tracking-tight">
                What scalability feels like.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TESTIMONIALS.map((testimony) => (
                <div key={testimony.id} className="p-8 rounded-2xl bg-brand-bg-200 border border-brand-bg-300 relative flex flex-col justify-between">
                  
                  {/* Decorative quote indicator */}
                  <span className="absolute top-6 right-8 text-6xl font-serif text-brand-primary-300/30 font-bold -pointer-events-none">“</span>

                  <div className="space-y-4">
                    
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(testimony.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-primary-100 text-brand-primary-100" />
                      ))}
                    </div>

                    <p className="text-base text-brand-text-100 italic leading-relaxed">
                      "{testimony.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-8 pt-4 border-t border-brand-bg-300/40">
                    <img 
                      src={testimony.avatarUrl} 
                      alt={testimony.name}
                      className="w-12 h-12 rounded-full object-cover border border-brand-accent-100/50"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-semibold text-sm text-brand-text-100">{testimony.name}</h4>
                      <p className="text-xs text-brand-text-200">{testimony.role} at {testimony.company}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* INTERACTIVE ACCORDION PROCESS FAQS (SEO Search crawler optimization standard) */}
        <section id="faqs" className="py-24 bg-brand-bg-200 border-t border-brand-bg-300/40 text-left">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-brand-accent-100 font-bold mb-3">
                INTELLIGENT REASSURANCE
              </h2>
              <h3 className="font-display font-medium text-3xl text-brand-text-100 tracking-tight">
                Process FAQ Protocols
              </h3>
              <p className="text-sm text-brand-text-200 mt-2 max-w-md mx-auto">
                Detailed breakdowns regarding operational procedures, CRM integrations, and strategic workflows.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border border-brand-bg-300 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-brand-text-100 hover:text-brand-primary-100 transition-colors font-display font-semibold text-base sm:text-lg"
                  >
                    <span>{faq.q}</span>
                    <HelpCircle className={`w-5 h-5 shrink-0 text-brand-accent-100 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-brand-primary-100' : ''}`} />
                  </button>

                  <div className={`transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-60' : 'max-h-0'} overflow-hidden`}>
                    <div className="p-5 pt-0 text-sm text-brand-text-200 border-t border-brand-bg-200/70 leading-relaxed bg-brand-bg-200/50">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* BOTTOM CALL TO ACTION MODULE */}
        <section className="py-20 bg-brand-accent-200 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-primary-100/10 mix-blend-color-dodge filter blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight max-w-2xl mx-auto">
              Ready to construct higher converting digital frameworks?
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-md mx-auto leading-relaxed">
              Book a session to configure custom technical blueprints matched instantly to your operational targets.
            </p>
            <div className="pt-4">
              <a 
                href="#book_consultation"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary-100 hover:bg-brand-primary-200 text-white font-bold rounded-xl shadow-lg hover:shadow-brand-primary-100/30 transition-all text-sm active:scale-95"
              >
                <span>Request Strategic Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-brand-text-100 text-[#ffffff] border-t border-brand-bg-300/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            <div className="md:col-span-5 text-left space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-primary-100 flex items-center justify-center">
                  <span className="font-display font-bold text-white text-sm">S</span>
                </div>
                <span className="font-display font-bold text-lg text-white">Stratechgy</span>
              </div>
              <p className="text-xs text-brand-bg-300 leading-relaxed max-w-sm">
                Strategic acquisition workflows paired with enterprise scale digital codebases. Structured for speed, performance, and maximum indexability.
              </p>
              <div className="text-xs font-mono text-brand-accent-100">
                SYSTEM AGENT ID: <span className="text-[#white]">AISTUDIO-e4bb</span>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="text-xs text-brand-primary-200 font-mono uppercase tracking-wider mb-3">Enterprise Suite</h4>
                <ul className="space-y-2 text-xs text-brand-bg-300/80">
                  <li><a href="#services" className="hover:text-brand-accent-100 transition-colors">Strategic Audits</a></li>
                  <li><a href="#services" className="hover:text-brand-accent-100 transition-colors">Digital Blueprints</a></li>
                  <li><a href="#projects" className="hover:text-brand-accent-100 transition-colors">Code Pipelines</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs text-brand-primary-200 font-mono uppercase tracking-wider mb-3">Platform Access</h4>
                <ul className="space-y-2 text-xs text-brand-bg-300/80">
                  <li>
                    <button onClick={onNavigateToLogin} className="hover:text-brand-accent-100 transition-colors text-left flex items-center gap-1">
                      <Lock className="w-3 h-3 text-brand-accent-100" />
                      <span>CRM Administration</span>
                    </button>
                  </li>
                  <li><a href="#faqs" className="hover:text-brand-accent-100 transition-colors">Client SLA Logs</a></li>
                  <li><a href="#book_consultation" className="hover:text-brand-accent-100 transition-colors">Schedule Call</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-xs text-brand-primary-200 font-mono uppercase tracking-wider mb-3">Contact Support</h4>
                <p className="text-xs text-brand-bg-300/80">
                  Raj@stratechgy.co
                </p>
                <p className="text-[11px] text-brand-bg-300/50 font-mono mt-2">
                  System Live Target GMT-0
                </p>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-brand-bg-300/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-brand-bg-300/50">
            <p>© {new Date().getFullYear()} Stratechgy. Built with meticulous brand alignments. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-accent-100">Privacy Directives</a>
              <span>•</span>
              <a href="#" className="hover:text-brand-accent-100">Service Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-brand-accent-100">SEO Protocol Schema</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
