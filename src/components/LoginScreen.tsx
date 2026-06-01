/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, ArrowLeft, Eye, EyeOff, ShieldAlert, KeyRound } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export default function LoginScreen({ onLoginSuccess, onBack }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    // Simulate standard secure system latency check (350ms)
    setTimeout(() => {
      // Prompt specification credentials: Username: Raj, password: 12345
      if (username.trim() === 'Raj' && password === '12345') {
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid System Credentials. Verify Username or Password key.');
        setLoading(false);
        setPassword('');
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-brand-bg-200 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-brand-primary-300 selection:text-brand-primary-100 relative">
      
      {/* Background vector rings */}
      <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-brand-accent-100/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 bg-brand-primary-100/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 text-left relative z-10">
        
        {/* Return Button */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-text-200 hover:text-brand-primary-100 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO STRATECHGY HOMEPAGE</span>
        </button>

        {/* Content Card container */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl shadow-brand-text-100/5 border border-brand-bg-300 relative">
          
          {/* Top colored accent indicator line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-accent-100 to-brand-primary-100 rounded-t-2xl" />

          {/* Locked Logo */}
          <div className="flex flex-col items-center text-center space-y-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand-text-100 flex items-center justify-center text-brand-accent-100 shadow-md">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl text-brand-text-100">Partnership Login</h2>
              <p className="text-xs text-brand-text-200 mt-1">Authorized Agency CRM Credentials Enforced.</p>
            </div>
          </div>

          {/* Validation Alert */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-brand-primary-100/10 border border-brand-primary-100/35 flex items-start gap-2.5 text-xs text-brand-primary-100 font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            <div>
              <label 
                htmlFor="user_key_field" 
                className="block text-[10px] font-mono uppercase tracking-wider text-brand-text-200 mb-1"
              >
                Username Key <span className="text-brand-primary-100">*</span>
              </label>
              <input
                id="user_key_field"
                type="text"
                required
                placeholder="e.g. Raj"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-2 focus:ring-brand-accent-100/50 focus:border-brand-accent-100 focus:bg-white transition-all font-mono"
              />
            </div>

            <div>
              <label 
                htmlFor="pass_key_field" 
                className="block text-[10px] font-mono uppercase tracking-wider text-brand-text-200 mb-1"
              >
                Security Password <span className="text-brand-primary-100">*</span>
              </label>
              <div className="relative">
                <input
                  id="pass_key_field"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-brand-bg-200 border border-brand-bg-300 rounded-lg text-brand-text-100 focus:outline-none focus:ring-2 focus:ring-brand-accent-100/50 focus:border-brand-accent-100 focus:bg-white transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-brand-text-200 hover:text-black cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="login_action_btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-brand-accent-200 hover:bg-brand-accent-200/90 text-white rounded-xl text-xs font-mono font-bold tracking-wider shadow-lg shadow-brand-accent-200/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-brand-accent-100" />
              <span>{loading ? 'CHALLENGING ACCORDANCE...' : 'AUTHORIZE SESSION'}</span>
            </button>

          </form>

          {/* Secure Hint */}
          <div className="mt-6 text-center border-t border-brand-bg-300/40 pt-4">
            <p className="text-[10px] text-brand-text-200 leading-relaxed font-mono">
              Demo bypass key: <span className="font-bold underline text-brand-accent-250 bg-brand-primary-300/20 px-1 py-0.5 rounded text-brand-primary-100">Raj / 12345</span>
            </p>
          </div>

        </div>

        <div className="text-center">
          <p className="text-[10px] font-mono text-brand-text-200">
            SYSTEM IP: 127.0.0.1 • SESSION METADATA ENCRYPTED VIA STATE
          </p>
        </div>

      </div>

    </div>
  );
}
