import React, { useState } from 'react';
import { ArchitectureNode } from './types';
import { NODES, CONNECTIONS } from './constants';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import InfoPanel from './components/InfoPanel';
import { Box } from 'lucide-react';

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur flex items-center px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 bg-lseg-900 rounded flex items-center justify-center shadow-md shadow-slate-200">
             <span className="font-bold text-white text-xs">LSEG</span>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <div>
            <h1 className="font-semibold text-slate-900 tracking-tight">Agentic AI Architecture</h1>
            <p className="text-xs text-slate-500">Fraud Detection & Anomaly Analysis Platform</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
           <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 py-1.5 px-3 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Azure
              <span className="w-2 h-2 rounded-full bg-orange-500 ml-2"></span> Databricks
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Diagram Area */}
        <div className="flex-1 p-8 overflow-y-auto relative flex flex-col items-center justify-center bg-slate-50/50">
          <div className="max-w-6xl w-full">
            <div className="mb-6 flex justify-between items-end">
               <div>
                  <h2 className="text-xl font-light text-slate-900 mb-2">System Architecture</h2>
                  <p className="text-slate-500 text-sm max-w-2xl">
                    High-level design of the fraud detection pipeline utilizing Databricks Agentic AI for ETL, Delta Lake for unified storage, and Azure Machine Learning for real-time scoring.
                  </p>
               </div>
            </div>
            
            <ArchitectureDiagram 
              nodes={NODES} 
              connections={CONNECTIONS}
              selectedNode={selectedNode}
              onNodeSelect={setSelectedNode}
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                  <h4 className="text-cyan-600 font-bold text-sm mb-1">Unified Data</h4>
                  <p className="text-xs text-slate-500">Raw logs to Gold features via Delta Lake.</p>
               </div>
               <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                  <h4 className="text-orange-600 font-bold text-sm mb-1">Agentic Intelligence</h4>
                  <p className="text-xs text-slate-500">Autonomous agents handle data reliability.</p>
               </div>
               <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                  <h4 className="text-blue-600 font-bold text-sm mb-1">Real-time Scoring</h4>
                  <p className="text-xs text-slate-500">Sub-second fraud probability inference.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <aside className={`
          fixed right-0 top-16 bottom-0 w-80 lg:w-96 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out border-l border-slate-200
          ${selectedNode ? 'translate-x-0' : 'translate-x-full'}
          lg:relative lg:translate-x-0 lg:block lg:border-l lg:border-slate-200
        `}>
          <InfoPanel 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />
        </aside>

      </main>
    </div>
  );
};

export default App;