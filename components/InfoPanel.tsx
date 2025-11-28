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
      <div className="h-full flex items-center justify-center text-slate-500 p-8 text-center border-l border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div>
          <p className="text-lg font-semibold mb-2">Interactive Diagram</p>
          <p className="text-sm">Select any component in the architecture to view technical specifications and Azure/Databricks integration details.</p>
        </div>
      </div>
    );
  }

  const isAzure = node.techStack === TechStack.AZURE;
  const isDatabricks = node.techStack === TechStack.DATABRICKS;

  const headerColor = isAzure ? 'text-cyan-400' : isDatabricks ? 'text-orange-400' : 'text-blue-400';
  const bgGradient = isAzure 
    ? 'from-cyan-900/20 to-slate-900' 
    : isDatabricks 
      ? 'from-orange-900/20 to-slate-900' 
      : 'from-blue-900/20 to-slate-900';

  return (
    <div className={`h-full flex flex-col bg-gradient-to-b ${bgGradient} border-l border-slate-700 overflow-hidden`}>
      <div className="p-6 border-b border-slate-700/50 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg bg-slate-800 ${headerColor}`}>
              <node.icon size={20} />
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-800 ${headerColor}`}>
              {node.techStack}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{node.label}</h2>
          <p className="text-sm text-slate-400 font-medium">{node.subLabel}</p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Functionality</h3>
          <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-line">
            {node.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Technology Stack</h3>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <ul className="space-y-3">
              {node.techDetails.map((tech, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className={`mt-0.5 ${headerColor}`} />
                  <span className="text-sm text-slate-200">{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Integration Context */}
        <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Architectural Role</h4>
          <p className="text-xs text-slate-500 italic">
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