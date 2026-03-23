'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Typically you would call an API client here like so:
      // await apiClient.post('/auth/forgot-password', { email });
      // Simulating API call for now:
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px] mb-12">
      {/* Left Panel - Deep Blue Gradient */}
      <div className="md:w-1/2 p-12 text-white relative overflow-hidden flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, #0A4BD4 0%, #031B5B 100%)' }}>
        {/* Diagonal Background Lines Simulation */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }}></div>

        <div className="relative z-10 flex flex-col h-full">
          <Link href="/" className="flex items-center space-x-3 mb-auto group w-fit hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center relative group-hover:scale-110 transition-transform">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-wide transition-colors">YOUR<br /><span className="text-blue-200">LOGO</span></span>
          </Link>

          <div className="my-16">
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">Forgot Password?</h1>
            <p className="text-blue-100 max-w-sm mb-10 text-sm opacity-90 leading-relaxed font-light">
              No worries, we'll send you reset instructions.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-semibold text-sm hover:bg-white hover:text-blue-900 transition-all shadow-lg w-fit group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="md:w-1/2 p-12 bg-[#F8FAFC] flex flex-col justify-center relative">
        {!success ? (
          <form onSubmit={handleReset} className="w-full max-w-sm mx-auto space-y-6">
            {error && <div className="text-red-500 text-sm text-center mb-4 bg-red-50 py-2 rounded-lg">{error}</div>}

            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-16 pr-4 py-4 border-none rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm placeholder-gray-400 font-medium"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 mt-8 rounded-xl shadow-md text-sm font-bold text-blue-700 bg-white hover:bg-blue-50 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95 duration-200 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Reset password'}
            </button>

            <div className="mt-12 pt-8 text-center text-xs font-semibold text-gray-500 border-t border-gray-200">
              <Link href="/login" className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to log in
              </Link>
            </div>
          </form>
        ) : (
          <div className="w-full max-w-sm mx-auto text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              We have sent a password reset link to <span className="font-semibold text-gray-700">{email}</span>.
            </p>
            <div className="text-xs font-semibold text-gray-500">
              <Link href="/login" className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to log in
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
