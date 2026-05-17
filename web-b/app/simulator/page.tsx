"use client";

import { useState } from "react";

export default function SimulatorPage() {
  const [url, setUrl] = useState("http://localhost:3000");
  const [opacity, setOpacity] = useState(0.5);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col md:flex-row">
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-white p-6 shadow-xl z-20 flex flex-col border-r border-gray-200">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Clickjacking Lab
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Simulate a clickjacking attack by adjusting the opacity of the target website over a malicious decoy UI.
          </p>
        </div>

        <div className="space-y-6 flex-grow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Website URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
              placeholder="http://localhost:3001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
              <span>Iframe Opacity</span>
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">{opacity.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Invisible (0)</span>
              <span>Solid (1)</span>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
            <h3 className="text-sm font-semibold text-blue-800 mb-1">How it works</h3>
            <p className="text-xs text-blue-700 leading-relaxed">
              When opacity is <strong>0</strong>, the target site is completely invisible, but it still receives clicks. 
              The user thinks they are clicking the "Claim Prize" button, but they are actually interacting with the invisible iframe.
            </p>
          </div>
        </div>
      </div>

      {/* Main Simulator Area */}
      <div className="flex-grow relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-100 overflow-hidden min-h-[600px]">
        
        {/* The Attacker's Decoy UI (Background) */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-red-50 to-orange-50">
           <div className="bg-white p-10 rounded-2xl shadow-2xl border-2 border-red-200 text-center max-w-md w-full">
             <div className="text-6xl mb-4">🎁</div>
             <h2 className="text-3xl font-extrabold text-red-600 mb-2">YOU WON!</h2>
             <p className="text-gray-600 mb-8 font-medium">Click the button below to instantly claim your free gift card.</p>
             
             {/* Malicious button specifically positioned to line up with target's button (depending on styling) */}
             <div className="mt-[180px]">
               <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-orange-600 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer">
                 CLAIM PRIZE NOW
               </button>
             </div>
             
             <p className="text-xs text-gray-400 mt-4">*Terms and conditions apply</p>
           </div>
        </div>

        {/* The Target Iframe (Foreground) */}
        {url && (
          <div 
            className="absolute inset-0 z-10 w-full h-full pointer-events-auto flex justify-center items-center"
            style={{ opacity: opacity }}
          >
            <iframe 
              src={url} 
              className="w-full h-full border-0 shadow-2xl"
              title="Target Website"
              scrolling="no"
            />
          </div>
        )}

      </div>
    </div>
  );
}
