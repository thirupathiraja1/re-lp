/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  LogOut, 
  Search, 
  Filter, 
  FileDown, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  CheckCircle, 
  Info, 
  ChevronDown, 
  Mail, 
  Phone, 
  Building,
  DollarSign,
  User,
  ExternalLink,
  Code
} from 'lucide-react';
import { Lead, LeadStatus } from '../types';

interface LeadCRMProps {
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: LeadStatus) => void;
  onUpdateLeadNotes: (id: string, notes: string) => void;
  onDeleteLead: (id: string) => void;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  onLogout: () => void;
}

export default function LeadCRM({ 
  leads, 
  onUpdateLeadStatus, 
  onUpdateLeadNotes, 
  onDeleteLead, 
  onAddLead,
  onLogout 
}: LeadCRMProps) {
  
  // Controls
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all');
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Manual New Lead Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'UI/UX Redesign',
    budget: '$25,000 - $50,000',
    message: '',
    notes: ''
  });

  // Export notifications
  const [showExportNotification, setShowExportNotification] = useState<'csv' | 'php' | null>(null);

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStartEditNotes = (lead: Lead) => {
    setEditingLeadId(lead.id);
    setTempNotes(lead.notes);
  };

  const handleSaveNotes = (id: string) => {
    onUpdateLeadNotes(id, tempNotes);
    setEditingLeadId(null);
  };

  const handleAddManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email || !newLead.company) {
      alert('Please fill in Name, Email, and Company fields.');
      return;
    }
    
    onAddLead({
      name: newLead.name,
      email: newLead.email,
      company: newLead.company,
      phone: newLead.phone,
      projectType: newLead.projectType,
      budget: newLead.budget,
      message: newLead.message,
      notes: newLead.notes || 'Manually registered in CRM.',
      status: 'new',
      assignedTo: 'Raj'
    });

    setNewLead({
      name: '',
      email: '',
      company: '',
      phone: '',
      projectType: 'UI/UX Redesign',
      budget: '$25,000 - $50,000',
      message: '',
      notes: ''
    });
    
    setShowAddModal(false);
  };

  // Helper: Export CRM Leads as CSV
  const handleExportCSV = () => {
    let headers = ['Lead ID', 'Name', 'Email', 'Company', 'Phone', 'Project Objective', 'Budget', 'Status', 'Message', 'Internal Notes', 'Assigned To', 'Created At'];
    let rows = leads.map(lead => [
      lead.id,
      `"${lead.name.replace(/"/g, '""')}"`,
      lead.email,
      `"${lead.company.replace(/"/g, '""')}"`,
      lead.phone,
      `"${lead.projectType}"`,
      `"${lead.budget}"`,
      lead.status.toUpperCase(),
      `"${(lead.message || '').replace(/"/g, '""')}"`,
      `"${(lead.notes || '').replace(/"/g, '""')}"`,
      lead.assignedTo,
      lead.createdAt
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'stratechgy_crm_leads.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportNotification('csv');
    setTimeout(() => setShowExportNotification(null), 3000);
  };

  // Helper: Export combined, fully layout-matched HTML & PHP Template Code
  const handleExportPHP = () => {
    // Generate code containing complete standalone HTML landing page, custom CSS variables, and a fully functional PHP form submission processor 
    const phpTemplateCode = `<?php
/**
 * Stratechgy SEO Landing Page & Lead Capture Engine
 * Fully operational for PHP 7.4+ Web Servers.
 * Matches requested branding: Primary Red (#de283b) & Accent Teal (#25b1bf).
 */

$submissionSuccess = false;
$errorMsg = "";

// Configure where submissions will be saved on your server (local JSON database)
$leadsDatabaseFile = __DIR__ . '/leads_database.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
    $email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
    $company = isset($_POST['company']) ? trim(strip_tags($_POST['company'])) : '';
    $phone = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
    $projectType = isset($_POST['projectType']) ? trim(strip_tags($_POST['projectType'])) : 'UI/UX Redesign';
    $budget = isset($_POST['budget']) ? trim(strip_tags($_POST['budget'])) : '';
    $message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

    if (empty($name) || empty($email) || empty($company)) {
        $errorMsg = "Please fill in all required fields (Name, Email, and Company).";
    } else {
        // Construct new lead record
        $newLead = [
            'id' => 'L-' . rand(1000, 9999),
            'name' => $name,
            'email' => $email,
            'company' => $company,
            'phone' => $phone,
            'projectType' => $projectType,
            'budget' => $budget,
            'message' => $message,
            'status' => 'new',
            'createdAt' => date('Y-m-d\\TH:i:sP'),
            'notes' => 'Customer registered via downloadable PHP hero form.',
            'assignedTo' => 'Raj'
        ];

        // Load existing leads database if present
        $existingLeads = [];
        if (file_exists($leadsDatabaseFile)) {
            $jsonData = file_get_contents($leadsDatabaseFile);
            $existingLeads = json_decode($jsonData, true);
            if (!is_array($existingLeads)) {
                $existingLeads = [];
            }
        }

        // Add new lead and persist
        array_unshift($existingLeads, $newLead);
        if (file_put_contents($leadsDatabaseFile, json_encode($existingLeads, JSON_PRETTY_PRINT))) {
            $submissionSuccess = true;
        } else {
            $errorMsg = "Server file permissions error. Unable to record lead securely.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stratechgy | High-Growth Enterprise Development & Strategy Agency</title>
    <meta name="description" content="Accelerate your brand with Stratechgy. We design high-performance digital products and build bespoke technical infrastructure.">
    
    <!-- Inline CSS mirroring requested color layouts -->
    <style>
        :root {
            --primary-100: #de283b;
            --primary-200: #ff6366;
            --primary-300: #ffccc4;
            --accent-100: #25b1bf;
            --accent-200: #005461;
            --text-100: #1a1a1a;
            --text-200: #404040;
            --bg-100: #ffffff;
            --bg-200: #f5f5f5;
            --bg-300: #cccccc;
            --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: var(--font-sans);
            color: var(--text-100);
            background-color: var(--bg-100);
            line-height: 1.5;
            scroll-behavior: smooth;
        }

        header {
            background: rgba(255, 255, 255, 0.95);
            border-bottom: 2px solid var(--bg-300);
            position: sticky;
            top: 0;
            z-index: 100;
            height: 80px;
            display: flex;
            align-items: center;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .header-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        .logo {
            font-weight: 700;
            font-size: 24px;
            color: var(--text-100);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo-box {
            width: 38px;
            height: 38px;
            background: var(--primary-100);
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .logo span {
            color: var(--primary-100);
        }

        .hero {
            background-color: var(--bg-200);
            padding: 60px 0;
            border-bottom: 1px solid var(--bg-300);
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 40px;
            align-items: center;
        }

        @media (max-width: 900px) {
            .hero-grid {
                grid-template-columns: 1fr;
            }
        }

        .hero-left h1 {
            font-size: 42px;
            font-weight: 700;
            line-height: 1.2;
            color: var(--text-100);
            margin-bottom: 20px;
        }

        .hero-left h1 span {
            color: var(--primary-100);
            border-bottom: 3px solid var(--accent-100);
        }

        .hero-left p {
            font-size: 18px;
            color: var(--text-200);
            margin-bottom: 30px;
        }

        .form-card {
            background: white;
            border-radius: 16px;
            padding: 30px;
            border: 2px solid var(--bg-300);
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .form-card h2 {
            font-size: 22px;
            margin-bottom: 15px;
            color: var(--text-100);
        }

        .form-card h2 span {
            color: var(--accent-100);
        }

        .form-group {
            margin-bottom: 15px;
            text-align: left;
        }

        .form-group label {
            display: block;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-200);
            margin-bottom: 5px;
            font-weight: 600;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--bg-300);
            border-radius: 8px;
            background-color: var(--bg-200);
            font-size: 14px;
            color: var(--text-100);
        }

        .form-control:focus {
            outline: none;
            border-color: var(--accent-100);
            background-color: white;
        }

        .row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .btn-submit {
            display: inline-block;
            width: 100%;
            padding: 14px;
            background-color: var(--primary-100);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 750;
            cursor: pointer;
            text-decoration: none;
            text-align: center;
            transition: all 0.2s;
        }

        .btn-submit:hover {
            background-color: var(--primary-200);
        }

        .success-box {
            padding: 30px;
            background-color: rgba(37, 177, 191, 0.1);
            border: 1px solid var(--accent-100);
            border-radius: 12px;
            text-align: center;
        }

        .success-box h3 {
            color: var(--accent-200);
            margin-bottom: 10px;
        }

        /* Portfolio list area */
        .portfolio-section {
            padding: 80px 0;
            text-align: left;
        }

        .section-title {
            font-size: 28px;
            margin-bottom: 30px;
            font-weight: 700;
            border-bottom: 2px solid var(--bg-200);
            padding-bottom: 10px;
        }

        .tag-completed {
            background: var(--accent-200);
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 10px;
            text-transform: uppercase;
            font-weight: bold;
        }

        .tag-ongoing {
            background: var(--primary-100);
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 10px;
            text-transform: uppercase;
            font-weight: bold;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
        }

        @media (max-width: 600px) {
            .projects-grid {
                grid-template-columns: 1fr;
            }
        }

        .project-card {
            background: white;
            border: 1px solid var(--bg-300);
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .project-image {
            height: 200px;
            background: #222;
            position: relative;
            background-size: cover;
            background-position: center;
        }

        .project-badge {
            position: absolute;
            top: 15px;
            left: 15px;
        }

        .project-impact {
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: rgba(255,255,255,0.9);
            color: var(--accent-200);
            font-weight: bold;
            font-size: 11px;
            padding: 5px 10px;
            border-radius: 6px;
        }

        .project-info {
            padding: 20px;
            flex-grow: 1;
        }

        .project-info h4 {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .project-info p {
            font-size: 13px;
            color: var(--text-200);
            margin-bottom: 15px;
            line-height: 1.4;
        }

        .project-tags {
            font-size: 11px;
            color: var(--accent-200);
            font-weight: 500;
        }
    </style>
</head>
<body>

    <header>
        <div class="container header-wrap">
            <a href="#" class="logo">
                <div class="logo-box">S</div>
                Stratechgy<span>.</span>
            </a>
            <div style="font-size: 12px; color: var(--text-200); font-weight: 500;">
                SECURE CONVERSION ENGINE
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container hero-grid">
            <div class="hero-left">
                <h1>We Design and Build High-Performance <span>Digital Engines</span></h1>
                <p>Ambitious design paired with enterprise systems dev. Capture leads with zero friction and track execution parameters seamlessly.</p>
                <div style="font-size: 14px; padding: 15px; background: white; border-radius: 8px; border: 1px solid var(--bg-300);">
                    💡 <strong>PHP Live Sync Alert:</strong> Submissions write directory data automatically to <code>leads_database.json</code> on local servers!
                </div>
            </div>

            <div>
                <div class="form-card">
                    <h2>Request Strategy <span>Session</span></h2>
                    
                    <?php if ($submissionSuccess): ?>
                        <div class="success-box">
                            <h3>Lead Recorded Successfully!</h3>
                            <p>Thank you, <?php echo htmlspecialchars($name); ?>. Our team will contact you shortly.</p>
                        </div>
                    <?php else: ?>
                        <?php if (!empty($errorMsg)): ?>
                            <div style="color: var(--primary-100); margin-bottom: 15px; font-size: 13px;">
                                ⚠️ <?php echo $errorMsg; ?>
                            </div>
                        <?php endif; ?>
                        
                        <form method="POST" action="">
                            <div class="form-group">
                                <label>Name *</label>
                                <input type="text" name="name" required placeholder="Aron Vance" class="form-control" value="<?php echo isset($_POST['name']) ? htmlspecialchars($_POST['name']) : ''; ?>">
                            </div>
                            
                            <div class="row-2">
                                <div class="form-group">
                                    <label>Email *</label>
                                    <input type="email" name="email" required placeholder="contact@spectre.io" class="form-control" value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
                                </div>
                                <div class="form-group">
                                    <label>Company *</label>
                                    <input type="text" name="company" required placeholder="Spectre Corp" class="form-control" value="<?php echo isset($_POST['company']) ? htmlspecialchars($_POST['company']) : ''; ?>">
                                </div>
                            </div>
                            
                            <div class="row-2">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" name="phone" placeholder="+1 (555) 3942" class="form-control" value="<?php echo isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : ''; ?>">
                                </div>
                                <div class="form-group">
                                    <label>Project Budget</label>
                                    <select name="budget" class="form-control">
                                        <option>$5,000 - $10,000</option>
                                        <option>$10,000 - $25,000</option>
                                        <option selected>$25,000 - $50,000</option>
                                        <option>$50,000+</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Core Objective</label>
                                <select name="projectType" class="form-control">
                                    <option>UI/UX Redesign</option>
                                    <option>Web Development</option>
                                    <option>Acquisition Strategy</option>
                                    <option>Custom Enterprise Hub</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Message</label>
                                <textarea name="message" rows="3" placeholder="Brief details about schedule/targets..." class="form-control"><?php echo isset($_POST['message']) ? htmlspecialchars($_POST['message']) : ''; ?></textarea>
                            </div>

                            <button type="submit" class="btn-submit">Submit Strategic Query</button>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>

    <section class="portfolio-section" id="projects">
        <div class="container">
            <h2 class="section-title">Case Studies & Pipeline</h2>
            
            <div class="projects-grid">
                <!-- Completed Project 1 -->
                <div class="project-card">
                    <div class="project-image" style="background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80')">
                        <div class="project-badge"><span class="tag-completed">✓ Completed</span></div>
                        <div class="project-impact">41% Speed Boost</div>
                    </div>
                    <div class="project-info">
                        <h4>Mercury Workspace Hub</h4>
                        <p>Bespoke collaborative ledger that unified 14 internal communication lines.</p>
                        <div class="project-tags">#React #CJS #CSS-Variables</div>
                    </div>
                </div>

                <!-- Completed Project 2 -->
                <div class="project-card">
                    <div class="project-image" style="background-image: url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=80')">
                        <div class="project-badge"><span class="tag-completed">✓ Completed</span></div>
                        <div class="project-impact">18% CAC Reduction</div>
                    </div>
                    <div class="project-info">
                        <h4>Finflow Ledger Redesign</h4>
                        <p>Clean billing visual charts optimized for continuous transactional audit.</p>
                        <div class="project-tags">#Data-Vis #Security #Compliance</div>
                    </div>
                </div>

                <!-- Ongoing Project 1 -->
                <div class="project-card">
                    <div class="project-image" style="background-image: url('https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80')">
                        <div class="project-badge"><span class="tag-ongoing">⚙ Ongoing</span></div>
                        <div class="project-impact">SLA 99.999%</div>
                    </div>
                    <div class="project-info">
                        <h4>Aegis Security Ledger</h4>
                        <p>Enterprise audit networks designed with strict encrypted key validations.</p>
                        <div class="project-tags">#Express #PostGres #Governance</div>
                    </div>
                </div>
            </div>
            
        </div>
    </section>

    <footer style="background: var(--text-100); color: white; padding: 40px 0; font-size: 12px; border-top: 5px solid var(--primary-100);">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <p>© <?php echo date('Y'); ?> Stratechgy. All rights reserved. PHP server-ready deployment package.</p>
            <p>Direct contact: Raj@stratechgy.co</p>
        </div>
    </footer>

</body>
</html>`;

    const blob = new Blob([phpTemplateCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stratechgy_index.php';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setShowExportNotification('php');
    setTimeout(() => setShowExportNotification(null), 3000);
  };

  // Status Badge UI helper
  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 text-[10px] font-mono font-bold bg-brand-primary-100/10 text-brand-primary-100 rounded-md border border-brand-primary-100/35 uppercase">NEW</span>;
      case 'contacted':
        return <span className="px-2 py-1 text-[10px] font-mono font-bold bg-brand-accent-100/20 text-brand-accent-200 rounded-md border border-brand-accent-100/35 uppercase">CONTACTED</span>;
      case 'negotiating':
        return <span className="px-2 py-1 text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 rounded-md border border-amber-500/30 uppercase">NEGOTIATING</span>;
      case 'won':
        return <span className="px-2 py-1 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 rounded-md border border-emerald-500/30 uppercase">WON</span>;
      case 'lost':
        return <span className="px-2 py-1 text-[10px] font-mono font-bold bg-brand-text-200/10 text-brand-text-200 rounded-md border border-brand-text-200/20 uppercase">LOST</span>;
      default:
        return null;
    }
  };

  const getStatusTabClassName = (tab: 'all' | LeadStatus) => {
    const base = "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ";
    if (statusFilter === tab) {
      return base + "bg-brand-accent-200 text-white shadow-sm";
    }
    return base + "text-brand-text-200 hover:bg-brand-bg-300/40 hover:text-brand-text-100";
  };

  return (
    <div className="bg-brand-bg-200 min-h-screen text-brand-text-100">
      
      {/* Dynamic CRM Alert */}
      {showExportNotification && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl shadow-xl bg-white border border-brand-accent-100 flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-brand-accent-100/10 flex items-center justify-center text-brand-accent-100">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text-100">Export Complete! </p>
            <p className="text-xs text-brand-text-200">
              {showExportNotification === 'csv' 
                ? 'Compiled records compiled securely to CSV.' 
                : 'Bespoke high-converting index.php file generated.'}
            </p>
          </div>
        </div>
      )}

      {/* Admin Dashboard header */}
      <header className="bg-brand-text-100 text-white py-4 shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand-accent-100 flex items-center justify-center">
              <Unlock className="w-4.5 h-4.5 text-brand-accent-200" />
            </div>
            <div className="text-left">
              <h1 className="font-display font-bold text-base tracking-tight flex items-center gap-1.5">
                <span>STRATECHGY CRM Portal</span>
                <span className="px-1.5 py-0.5 bg-brand-primary-100 rounded text-[9px] uppercase font-mono tracking-wider">SECURE ADM</span>
              </h1>
              <p className="text-[10px] font-mono text-brand-accent-100 -mt-0.5">Logged in as: Raj (System Director)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg text-white bg-brand-primary-100 hover:bg-brand-primary-200 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Lead</span>
            </button>

            <button
              id="crm_logout_button"
              onClick={onLogout}
              className="p-2 border border-white/20 hover:bg-white/10 text-white hover:text-brand-primary-200 rounded-lg transition-all cursor-pointer"
              title="Logout Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main CRM area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* SECTION 1: METRICS BOARDS */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
          
          <div className="bg-white p-5 rounded-xl border border-brand-bg-300 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-text-200 block">TOTAL SUBMISSIONS</span>
            <span className="text-3xl font-display font-medium block mt-1 text-black">{leads.length}</span>
            <p className="text-[10px] text-brand-text-200 mt-2 font-mono">Prone to index crawlers</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-brand-bg-300 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-primary-100 block">UNTOUCHED / NEW</span>
            <span className="text-3xl font-display font-medium text-brand-primary-100 block mt-1">
              {leads.filter(l => l.status === 'new').length}
            </span>
            <p className="text-[10px] text-brand-text-200 mt-2 font-mono">Requires instant diagnostic</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-brand-bg-300 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent-200 block">ACTIVE CONTACTS</span>
            <span className="text-3xl font-display font-medium text-brand-accent-200 block mt-1">
              {leads.filter(l => l.status === 'contacted' || l.status === 'negotiating').length}
            </span>
            <p className="text-[10px] text-brand-text-200 mt-2 font-mono">SLA scheduling ongoing</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-brand-bg-300 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 block">CLOSED WON</span>
            <span className="text-3xl font-display font-medium text-emerald-600 block mt-1">
              {leads.filter(l => l.status === 'won').length}
            </span>
            <p className="text-[10px] text-emerald-600 mt-2 font-mono">✓ High enterprise value</p>
          </div>

          <div className="bg-brand-text-100 p-5 rounded-xl text-left text-white col-span-2 md:col-span-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent-100 block">SYSTEM CODE</span>
              <span className="text-xs font-mono block mt-1 text-white">PHP Engine</span>
            </div>
            <button
              onClick={handleExportPHP}
              className="mt-3 w-full py-1.5 px-2 bg-brand-accent-100 hover:bg-brand-accent-100/95 text-brand-accent-200 rounded text-[10px] font-mono font-bold tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
              <span>EXPORT PHP & HTML</span>
            </button>
          </div>

        </section>

        {/* SECTION 2: SEARCH & FILTER BAR CONTROLS */}
        <section className="bg-white p-4 rounded-xl border border-brand-bg-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search */}
          <div className="w-full sm:w-1/3 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-brand-text-200">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              placeholder="Filter by name, company, objective..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-2 focus:ring-brand-accent-100/50 focus:border-brand-accent-100 transition-all font-mono"
            />
          </div>

          {/* Filtering states */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-text-200 mr-2">Filter State:</span>
            <div className="flex bg-brand-bg-200 p-1 rounded-lg border border-brand-bg-300">
              <button onClick={() => setStatusFilter('all')} className={getStatusTabClassName('all')}>All</button>
              <button onClick={() => setStatusFilter('new')} className={getStatusTabClassName('new')}>New</button>
              <button onClick={() => setStatusFilter('contacted')} className={getStatusTabClassName('contacted')}>Contact</button>
              <button onClick={() => setStatusFilter('negotiating')} className={getStatusTabClassName('negotiating')}>Negot</button>
              <button onClick={() => setStatusFilter('won')} className={getStatusTabClassName('won')}>Won</button>
              <button onClick={() => setStatusFilter('lost')} className={getStatusTabClassName('lost')}>Lost</button>
            </div>
          </div>

          {/* Code Download Action Toolbar */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 text-xs font-mono font-medium rounded-lg text-brand-text-100 bg-brand-bg-200 hover:bg-brand-bg-300 border border-brand-bg-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-brand-accent-200" />
              <span>CSV Leads</span>
            </button>

            <button
              onClick={handleExportPHP}
              className="px-3 py-2 text-xs font-mono font-bold rounded-lg text-white bg-brand-accent-200 hover:bg-brand-accent-200/90 border border-brand-accent-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-brand-accent-100" />
              <span>PHP/HTML Build</span>
            </button>
          </div>

        </section>

        {/* SECTION 3: LEADS MASTER LIST INTERACTIVE TABLE */}
        <section className="bg-white rounded-xl border border-brand-bg-300 overflow-hidden text-left shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              
              <thead className="bg-brand-bg-200 border-b border-brand-bg-300 text-[10px] font-mono uppercase tracking-wider text-brand-text-200">
                <tr>
                  <th className="py-4 px-4 text-left font-semibold">Lead ID</th>
                  <th className="py-4 px-4 text-left font-semibold">Client Target / Company</th>
                  <th className="py-4 px-4 text-left font-semibold">Contact Metrics</th>
                  <th className="py-4 px-4 text-left font-semibold">Objective & Budget</th>
                  <th className="py-4 px-4 text-left font-semibold">Status State</th>
                  <th className="py-4 px-4 text-left font-semibold">Internal Team Notes</th>
                  <th className="py-4 px-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-brand-bg-300">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 px-4 text-center text-brand-text-200">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Info className="w-6 h-6 text-brand-text-200 mx-auto" />
                        <p className="font-semibold text-brand-text-100 font-display">No matching leads found</p>
                        <p className="text-[10px] font-mono">Bypassed inputs or empty database configuration tags.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-brand-bg-200/40 transition-colors">
                      
                      {/* Lead Column 1 ID */}
                      <td className="py-4 px-4 font-mono font-medium text-brand-accent-200">{lead.id}</td>
                      
                      {/* Lead Column 2 Name / Company */}
                      <td className="py-4 px-4 space-y-1">
                        <div className="font-semibold text-sm text-brand-text-100">{lead.name}</div>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-brand-text-200">
                          <Building className="w-3 h-3 text-brand-text-200" />
                          <span>{lead.company}</span>
                        </div>
                      </td>

                      {/* Lead Column 3 Web Email */}
                      <td className="py-4 px-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-brand-text-100 font-mono">
                          <Mail className="w-3.5 h-3.5 text-brand-accent-100" />
                          <span>{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1.5 text-[11px] text-brand-text-200 font-mono">
                            <Phone className="w-3.5 h-3.5 text-brand-text-200" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </td>

                      {/* Lead Column 4 Project streams */}
                      <td className="py-4 px-4 space-y-1 text-left">
                        <span className="px-1.5 py-0.5 bg-brand-accent-100/10 text-brand-accent-200 text-[10px] rounded font-semibold border border-brand-accent-100/20 capitalize">
                          {lead.projectType}
                        </span>
                        <div className="flex items-center gap-0.5 text-brand-primary-100 font-semibold font-mono text-[11px] mt-0.5">
                          <DollarSign className="w-3 h-3" />
                          <span>{lead.budget}</span>
                        </div>
                      </td>

                      {/* Lead Column 5 State Modifier */}
                      <td className="py-4 px-4">
                        <div className="relative inline-block w-full">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className="bg-brand-bg-200 text-brand-text-100 rounded-lg p-1.5 border border-brand-bg-300 text-xs w-full focus:outline-none focus:ring-1 focus:ring-brand-accent-200 focus:border-brand-accent-200 cursor-pointer font-semibold uppercase"
                          >
                            <option value="new">🆕 New</option>
                            <option value="contacted">📞 Contacted</option>
                            <option value="negotiating">🤝 Negotiating</option>
                            <option value="won">🏆 Won</option>
                            <option value="lost">❌ Lost</option>
                          </select>
                        </div>
                      </td>

                      {/* Lead Column 6 Notes editor */}
                      <td className="py-4 px-4 max-w-xs">
                        {editingLeadId === lead.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              className="w-full px-2 py-1 border border-brand-accent-100 rounded focus:outline-none bg-white font-sans text-xs"
                              placeholder="Type notes..."
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveNotes(lead.id)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                              title="Save"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => setEditingLeadId(null)}
                              className="p-1 text-brand-primary-100 hover:bg-red-50 rounded"
                              title="Discard"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="group flex items-start gap-1 justify-between">
                            <p className="text-[11px] text-brand-text-200 line-clamp-2 italic pr-4">
                              {lead.notes || 'No comments registered.'}
                            </p>
                            <button
                              onClick={() => handleStartEditNotes(lead)}
                              className="text-brand-accent-100 hover:text-brand-accent-200 shrink-0 cursor-pointer"
                              title="Edit team internal comment"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Lead Column 7 Delete Action */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => {
                            if (confirm('Verify lead registration deletion?')) {
                              onDeleteLead(lead.id);
                            }
                          }}
                          className="p-1.5 text-brand-text-200 hover:text-brand-primary-100 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Purge Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
          
          {/* Table footer paging metrics info */}
          <div className="bg-brand-bg-200 p-4 border-t border-brand-bg-300 flex items-center justify-between text-[11px] font-mono text-brand-text-200">
            <span>Showing {filteredLeads.length} of {leads.length} recorded leads</span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ACTIVE SYSTEM INTEGRITY ENFORCED</span>
            </span>
          </div>
        </section>

        {/* SECURE DIRECTIVES GUIDE FOR RAJ */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-brand-bg-300 text-left space-y-4">
          <h3 className="font-display font-bold text-lg text-brand-text-100 flex items-center gap-2">
            <Info className="w-5 h-5 text-brand-accent-200" />
            <span>Operational Administrator Guidelines</span>
          </h3>
          <div className="text-xs text-brand-text-200 space-y-2 tracking-wide leading-relaxed">
            <p>1. <strong>CSV Export compatibility:</strong> Leads exported as CSV include full tags, timestamping, user messages, phone numbers, and operational notes. Compatible straight with MS Excel, Postgres engines, or Google Sheets.</p>
            <p>2. <strong>Bespoke PHP Port:</strong> The downloadable "PHP Build" produces <code>stratechgy_index.php</code> which utilizes local JSON write parameters to preserve local integrity without unrequested cloud databases or external telemetry layers.</p>
            <p>3. <strong>SEO Directives:</strong> Ensure your staging servers declare active canonical mapping pointing straight to the validated domain <code>https://stratechgy.co/</code>.</p>
          </div>
        </section>

      </main>

      {/* MODAL: Record offline manual leads */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-text-100/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-brand-bg-300 text-left">
            
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-brand-bg-200 text-brand-text-200 hover:text-black rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="font-display font-medium text-xl text-brand-text-100">Record Live lead submission</h3>
              <p className="text-xs text-brand-text-200 mt-1">For offline conferences, phone outreach, or walk-ins</p>
            </div>

            <form onSubmit={handleAddManualLead} className="space-y-4">
              
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1">Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Elon Musk"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  className="w-full px-3 py-2 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-1 focus:ring-brand-accent-200 focus:border-brand-accent-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1">Email *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="elon@spacex.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                    className="w-full px-3 py-2 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1">Company *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="SpaceX"
                    value={newLead.company}
                    onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                    className="w-full px-3 py-2 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 9932"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                    className="w-full px-3 py-2 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1">Budget</label>
                  <select 
                    value={newLead.budget}
                    onChange={(e) => setNewLead({...newLead, budget: e.target.value})}
                    className="w-full p-2 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none cursor-pointer"
                  >
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000</option>
                    <option>$50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1">Core Stream Objective</label>
                <select 
                  value={newLead.projectType}
                  onChange={(e) => setNewLead({...newLead, projectType: e.target.value})}
                  className="w-full p-2 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none cursor-pointer"
                >
                  <option>UI/UX Redesign</option>
                  <option>Web Development</option>
                  <option>Acquisition Strategy</option>
                  <option>Custom Enterprise Hub</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-200 mb-1">Internal Team Pre-Notes</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Elon wants to kick off next Wednesday. Raj leading meeting..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                  className="w-full px-3 py-2 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none resize-none font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-lg border border-brand-bg-300 text-xs text-brand-text-200 bg-brand-bg-200 hover:bg-brand-bg-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 font-bold rounded-lg bg-brand-accent-200 hover:bg-brand-accent-200/95 text-white shadow-md text-xs cursor-pointer"
                >
                  Enforce Lead
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
