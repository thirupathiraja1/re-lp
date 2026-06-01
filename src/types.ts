/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectStatus = 'ongoing' | 'completed';

export interface Project {
  id: string;
  title: string;
  client: string;
  status: ProjectStatus;
  category: string;
  description: string;
  impactMetrics: string;
  tags: string[];
  imageUrl: string;
}

export type LeadStatus = 'new' | 'contacted' | 'negotiating' | 'won' | 'lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  notes: string;
  assignedTo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  text: string;
  rating: number;
}
