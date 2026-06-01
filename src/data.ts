/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Testimonial, Lead } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Mercury Workspace Hub',
    client: 'Mercury Technologies Group',
    status: 'completed',
    category: 'Enterprise SaaS',
    description: 'Bespoke custom dashboard & cloud infrastructure that unified 14 disparate business streams into a single real-time collaborative ledger.',
    impactMetrics: '41% Efficiency Gain',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    title: 'Finflow Ledger Redesign',
    client: 'FinFlow Inc.',
    status: 'completed',
    category: 'Fintech Portal',
    description: 'An advanced data-visualization dashboard and frictionless checkout engine optimized for compliance and rapid transaction auditing.',
    impactMetrics: '18% CAC Reduction',
    tags: ['Data Vis', 'UI/UX Audits', 'Compliance', 'Security'],
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    title: 'Velocita Direct Acquisition',
    client: 'Velocita Automobili',
    status: 'completed',
    category: 'E-Commerce Storefront',
    description: 'A headless e-commerce build for a high-end luxury vehicle subscription platform designed specifically for high-net-worth clients.',
    impactMetrics: '280% Sales Spike',
    tags: ['SEO Protocol', 'Headless CMS', 'Stripe Proxy', 'Core Web Vitals'],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    title: 'Aegis Security Ledger',
    client: 'Aegis Global Defense',
    status: 'ongoing',
    category: 'Cloud Security Systems',
    description: 'Migrating multi-national internal server frameworks to localized high-encryption web-accessible audits with zero downtime.',
    impactMetrics: '99.999% SLA Uptime Target',
    tags: ['NextGen Encryption', 'Express', 'React UI', 'DevOps Audits'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p5',
    title: 'Luna Wellness Telehealth',
    client: 'Luna Care Systems',
    status: 'ongoing',
    category: 'Telehealth Platform',
    description: 'Crafting responsive multi-device clinic control centers for medical staff and patient appointment lifecycle tracking.',
    impactMetrics: 'Launch Scheduled Q3',
    tags: ['Interactive Scheduler', 'Tailwind Grid', 'HIPAA compliant structure'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p6',
    title: 'Zeta Real-time Pipeline',
    client: 'Zeta Intelligence Corp',
    status: 'ongoing',
    category: 'Data Extraction Engine',
    description: 'A robust ETL dashboard tracking data ingestion streams, alerting logistics managers of network distribution bottlenecks.',
    impactMetrics: 'Beta Test Live now',
    tags: ['D3 Visualization', 'WebSocket Nodes', 'Enterprise Design'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Helena Vance',
    role: 'VP of Product Innovation',
    company: 'FinFlow Inc.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    text: 'Stratechgy revamped our customer onboarding funnels completely. Within two weeks of release, customer drop-off halved and we were able to process multi-million dollar ledgers without any friction.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Jonathan Sterling',
    role: 'Chief Operations Officer',
    company: 'Mercury Technologies Group',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    text: 'Their technical execution was immaculate. Standard web agencies speak about design, but Stratechgy built real business architecture. Our internal speeds skyrocketed by 40%.',
    rating: 5
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'L-9842',
    name: 'Aron Vance',
    email: 'aron@spectrecorp.io',
    company: 'Spectre Corp',
    phone: '+1 (555) 382-99042',
    projectType: 'UI/UX Redesign',
    budget: '$25,000 - $50,000',
    message: 'We want to perform a comprehensive overhaul of our customer billing console. Our target start timeline is July.',
    status: 'new',
    createdAt: '2026-05-29T10:14:00Z',
    notes: 'Needs custom analysis of Figma files. Good dynamic match.',
    assignedTo: 'Raj'
  },
  {
    id: 'L-1302',
    name: 'Chloe Sinclair',
    email: 'chloe@aurorafintech.com',
    company: 'Aurora Fintech Systems',
    phone: '+1 (555) 991-3829',
    projectType: 'Web Development',
    budget: '$50,000+',
    message: 'Looking for a reliable agency to assist in building our multi-tenant SaaS integration. Must follow highest compliance standards.',
    status: 'contacted',
    createdAt: '2026-05-30T14:45:00Z',
    notes: 'Sent initial discovery pricing deck. Waiting for feedback on scheduling a conference call.',
    assignedTo: 'Raj'
  },
  {
    id: 'L-5201',
    name: 'Marcus Brody',
    email: 'marcus@atlascargo.global',
    company: 'Atlas Cargo Global',
    phone: '+1 (555) 283-9912',
    projectType: 'Acquisition Strategy',
    budget: '$10,000 - $25,000',
    message: 'We are trying to scale lead capture for B2B logistics. Interested in conversion-focused architectures.',
    status: 'negotiating',
    createdAt: '2026-05-31T09:30:00Z',
    notes: 'Reviewed lead landing vectors. Proposing a clean custom hub.',
    assignedTo: 'Raj'
  },
  {
    id: 'L-0294',
    name: 'Sloan Peters',
    email: 'sloan@nexusnetworks.space',
    company: 'Nexus Networks',
    phone: '+1 (555) 839-2245',
    projectType: 'Custom Enterprise Hub',
    budget: '$50,000+',
    message: 'Need standard enterprise ledger interfaces paired with full scale backend routing.',
    status: 'won',
    createdAt: '2026-05-28T16:20:00Z',
    notes: 'Contract signed. Raj leading kickoff meeting next Wednesday.',
    assignedTo: 'Raj'
  }
];
