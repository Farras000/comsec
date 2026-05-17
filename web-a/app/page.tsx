"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        
        {/* Header section */}
        <div className="bg-indigo-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <h1 className="text-xl font-medium opacity-90 mb-1">Available Balance</h1>
            <h2 className="text-4xl font-extrabold tracking-tight">$12,450.00</h2>
          </div>
        </div>

        {/* Form section */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div>
              <p className="text-sm text-gray-500 font-medium">Payment to</p>
              <p className="text-lg font-bold text-gray-900">Charity Foundation</p>
            </div>
            <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 8h8" />
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (USD)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg sm:text-xl font-semibold">$</span>
                </div>
                <input
                  type="text"
                  readOnly
                  value="500.00"
                  className="block w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

        

            <button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              onClick={() => alert("Payment Processed! (This is just a simulation)")}
            >
              Confirm Payment
            </button>
          </div>
        </div>

        {/* Security Notice & Footer */}
        <div className="bg-gray-50 px-8 py-5 border-t border-gray-100">
          <div className="flex items-center justify-center text-green-600 mb-6">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <span className="text-xs font-semibold uppercase tracking-wider">Bank-Grade Security</span>
          </div>
          
          <div className="text-center">
            <Link 
              href="/simulator" 
              className="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Go to Clickjacking Simulator
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
