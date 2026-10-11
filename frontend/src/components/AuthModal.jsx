import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, ShieldCheck, Store, ArrowRight, CheckCircle2 } from 'lucide-react';

const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    currentRole, 
    switchRole, 
    currentUser, 
    setCurrentUser,
    showToast 
  } = useApp();

  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'demo'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('Madhapur');

  if (!isAuthModalOpen) return null;

  const handleCustomLogin = (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email.');
      return;
    }
    setCurrentUser({
      id: Date.now(),
      name: name || email.split('@')[0],
      email: email,
      role: 'ROLE_BUYER',
      phone: '+91 98765 00000',
      locality: locality,
      address: `Hyderabad, ${locality}`
    });
    switchRole('BUYER');
    showToast(`Welcome back, ${name || email.split('@')[0]}!`);
    setIsAuthModalOpen(false);
  };

  const handleSelectDemoAccount = (role) => {
    switchRole(role);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-md bg-[#13151b] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-white rounded-full bg-gray-800/60 hover:bg-gray-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight">FitFlex Hyderabad Account</h3>
          <p className="text-xs text-gray-400 mt-1">Access orders, delivery tracking, and merchant services</p>
        </div>

        {/* Mode Tabs */}
        <div className="flex bg-[#191c25] p-1 rounded-xl border border-gray-800 mb-6 text-xs font-bold">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-lg transition ${authMode === 'login' ? 'bg-orange-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 rounded-lg transition ${authMode === 'register' ? 'bg-orange-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            Create Account
          </button>
          <button
            onClick={() => setAuthMode('demo')}
            className={`flex-1 py-2 rounded-lg transition ${authMode === 'demo' ? 'bg-orange-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            Demo Accounts
          </button>
        </div>

        {/* Form: Sign In / Create Account */}
        {authMode !== 'demo' && (
          <form onSubmit={handleCustomLogin} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#181a22] border border-gray-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@fitflex.hyd"
                  className="w-full bg-[#181a22] border border-gray-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#181a22] border border-gray-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 text-xs uppercase tracking-wider transition mt-2"
            >
              {authMode === 'login' ? 'Sign In to FitFlex' : 'Create Free Account'}
            </button>
          </form>
        )}

        {/* Demo Accounts List */}
        {authMode === 'demo' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 text-center mb-2">
              Select any pre-configured Hyderabad demo profile:
            </p>

            {/* Buyer Profile */}
            <div
              onClick={() => handleSelectDemoAccount('BUYER')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                currentRole === 'BUYER' 
                  ? 'bg-orange-500/10 border-orange-500 text-white' 
                  : 'bg-[#181a22] border-gray-800 text-gray-300 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xs">
                  RS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Rahul Sharma</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.2 rounded font-semibold">BUYER</span>
                  </div>
                  <span className="text-[11px] text-gray-500">Madhapur, Hyderabad • Active COD Orders</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>

            {/* Seller Profile: IronCore */}
            <div
              onClick={() => handleSelectDemoAccount('SELLER')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                currentRole === 'SELLER' 
                  ? 'bg-orange-500/10 border-orange-500 text-white' 
                  : 'bg-[#181a22] border-gray-800 text-gray-300 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center font-bold text-xs">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">IronCore Activewear Hub</span>
                    <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.2 rounded font-semibold">MERCHANT</span>
                  </div>
                  <span className="text-[11px] text-gray-500">Banjara Hills, Road No 10 • Manage Stock & COD</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>

            {/* Admin Profile */}
            <div
              onClick={() => handleSelectDemoAccount('ADMIN')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                currentRole === 'ADMIN' 
                  ? 'bg-orange-500/10 border-orange-500 text-white' 
                  : 'bg-[#181a22] border-gray-800 text-gray-300 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">FitFlex Admin Operations</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-semibold">ADMIN HQ</span>
                  </div>
                  <span className="text-[11px] text-gray-500">Gachibowli HQ • Platform GMV & Fleet Monitor</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthModal;
