import React from 'react';
import { ArchitectureNode, TechStack } from '../types';
import { X, CheckCircle2 } from 'lucide-react';

interface Props {
  node: ArchitectureNode | null;
  onClose: () => void;
}

const InfoPanel: React.FC<Props> = ({ node, onClose }) => {
  if (!node) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500 p-8 text-center bg-white/50">
        <div>
          <p className="text-lg font-semibold mb-2 text-slate-700">Interactive Diagram</p>
          <p className="text-sm text-slate-500">Select any component in the architecture to view technical specifications and Azure/Databricks integration details.</p>
        </div>
      </div>
    );
  }

  const isAzure = node.techStack === TechStack.AZURE;
  const isDatabricks = node.techStack === TechStack.DATABRICKS;

  const headerColor = isAzure ? 'text-cyan-700' : isDatabricks ? 'text-orange-700' : 'text-blue-700';
  const iconBg = isAzure ? 'bg-cyan-50' : isDatabricks ? 'bg-orange-50' : 'bg-blue-50';
  const badgeColor = isAzure ? 'bg-cyan-100 text-cyan-800' : isDatabricks ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800';
  
  const bgGradient = isAzure 
    ? 'from-cyan-50/80 to-white' 
    : isDatabricks 
      ? 'from-orange-50/80 to-white' 
      : 'from-blue-50/80 to-white';

  return (
    <div className={`h-full flex flex-col bg-gradient-to-b ${bgGradient} overflow-hidden`}>
      <div className="p-6 border-b border-slate-200 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${iconBg} ${headerColor}`}>
              <node.icon size={20} />
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${badgeColor}`}>
              {node.techStack}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{node.label}</h2>
          <p className="text-sm text-slate-500 font-medium">{node.subLabel}</p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3">Functionality</h3>
          <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
            {node.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3">Technology Stack</h3>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <ul className="space-y-3">
              {node.techDetails.map((tech, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className={`mt-0.5 ${headerColor}`} />
                  <span className="text-sm text-slate-700">{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Integration Context */}
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Architectural Role</h4>
          <p className="text-xs text-slate-600 italic">
            Part of the {node.techStack} ecosystem within the LSEG Fraud Detection pipeline. Ensures 
            {node.id === 'storage' ? ' single source of truth' : 
             node.id === 'agents' ? ' automated reliability' : 
             node.id === 'model' ? ' predictive accuracy' : 
             ' seamless data flow'}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;