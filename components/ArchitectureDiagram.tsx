import React, { useMemo } from 'react';
import { ArchitectureNode, Connection, TechStack } from '../types';
import { ChevronRight } from 'lucide-react';

interface Props {
  nodes: ArchitectureNode[];
  connections: Connection[];
  selectedNode: ArchitectureNode | null;
  onNodeSelect: (node: ArchitectureNode) => void;
}

const ArchitectureDiagram: React.FC<Props> = ({ nodes, connections, selectedNode, onNodeSelect }) => {
  
  // Helper to generate SVG path commands
  const getPath = (start: ArchitectureNode, end: ArchitectureNode, isCurved: boolean) => {
    // Convert percentages to coordinate space (assuming 1000x600 viewBox)
    const sx = start.x * 10 + (start.width ? 0 : 5); // Center X (approx)
    const sy = start.y * 6 + 4; // Center Y
    const ex = end.x * 10 + 5;
    const ey = end.y * 6 + 4;

    if (isCurved) {
      // Create a large looping curve for feedback loops
      const cp1x = sx + 50;
      const cp1y = sy + 50;
      const cp2x = ex + 50;
      const cp2y = ey + 50;
      return `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`;
    }

    // Standard elbow connector
    const midX = (sx + ex) / 2;
    return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
  };

  return (
    <div className="relative w-full aspect-[16/10] bg-slate-900/50 rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden backdrop-blur-sm">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      {/* SVG Layer for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 600">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
          <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
          </marker>
        </defs>
        {connections.map((conn, idx) => {
          const startNode = nodes.find(n => n.id === conn.from);
          const endNode = nodes.find(n => n.id === conn.to);
          
          if (!startNode || !endNode) return null;

          const isConnectedToSelected = selectedNode && (selectedNode.id === conn.from || selectedNode.id === conn.to);
          
          return (
            <g key={`${conn.from}-${conn.to}-${idx}`}>
              <path
                d={getPath(startNode, endNode, !!conn.curved)}
                fill="none"
                stroke={isConnectedToSelected ? '#38bdf8' : '#475569'}
                strokeWidth={isConnectedToSelected ? 3 : 2}
                markerEnd={isConnectedToSelected ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                className="transition-all duration-300"
                strokeDasharray={conn.curved ? "5,5" : "none"}
              />
              {conn.label && (
                <text x={(startNode.x * 10 + endNode.x * 10)/2 + 5} y={(startNode.y * 6 + endNode.y * 6)/2 + 5} fill="#94a3b8" fontSize="12" textAnchor="middle">
                  {conn.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes Layer */}
      <div className="absolute inset-0 z-10">
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          
          // Determine Border/Glow color based on TechStack
          let borderColor = 'border-slate-600';
          let shadowClass = '';
          let iconColor = 'text-slate-400';
          let badgeColor = 'bg-slate-600';

          if (node.techStack === TechStack.AZURE) {
            badgeColor = 'bg-cyan-600';
            if (isSelected) {
               borderColor = 'border-cyan-500';
               shadowClass = 'shadow-[0_0_20px_rgba(6,182,212,0.5)]';
               iconColor = 'text-cyan-400';
            }
          } else if (node.techStack === TechStack.DATABRICKS) {
             badgeColor = 'bg-orange-600';
             if (isSelected) {
               borderColor = 'border-orange-500';
               shadowClass = 'shadow-[0_0_20px_rgba(249,115,22,0.5)]';
               iconColor = 'text-orange-400';
             }
          } else if (node.techStack === TechStack.MICROSOFT) {
             badgeColor = 'bg-blue-700';
             if (isSelected) {
                borderColor = 'border-blue-500';
                shadowClass = 'shadow-[0_0_20px_rgba(59,130,246,0.5)]';
                iconColor = 'text-blue-400';
             }
          } else {
             // Generic
             if (isSelected) {
                borderColor = 'border-blue-500';
                shadowClass = 'shadow-[0_0_20px_rgba(59,130,246,0.5)]';
                iconColor = 'text-blue-400';
             }
          }

          return (
            <div
              key={node.id}
              onClick={() => onNodeSelect(node)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-105 group`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div 
                className={`
                  relative flex flex-col items-center 
                  w-48 p-3 bg-slate-800 rounded-lg border-2 ${borderColor} ${shadowClass}
                  transition-colors duration-300
                `}
              >
                <div className={`mb-2 p-2 rounded-full bg-slate-900 ${iconColor}`}>
                  <node.icon size={24} />
                </div>
                <h3 className="text-xs font-bold text-slate-200 text-center leading-tight mb-1">
                  {node.label}
                </h3>
                {node.subLabel && (
                  <span className="text-[10px] text-slate-400 text-center font-medium uppercase tracking-wider mb-2">
                    {node.subLabel}
                  </span>
                )}
                
                {/* Tech Stack Details List */}
                <div className="w-full pt-2 border-t border-slate-700/50 flex flex-col gap-1">
                  {node.techDetails.slice(0, 3).map((tech, i) => (
                    <div key={i} className="flex items-center gap-1.5 justify-center">
                       <div className={`w-1 h-1 rounded-full ${node.techStack === TechStack.AZURE ? 'bg-cyan-500' : node.techStack === TechStack.DATABRICKS ? 'bg-orange-500' : 'bg-slate-500'}`}></div>
                       <span className="text-[9px] text-slate-400 text-center truncate leading-tight max-w-[90%]">
                         {tech}
                       </span>
                    </div>
                  ))}
                  {node.techDetails.length > 3 && (
                    <div className="text-[8px] text-slate-500 text-center italic mt-0.5">
                      + {node.techDetails.length - 3} more...
                    </div>
                  )}
                </div>

                {/* Tech Badge */}
                <div className={`absolute -top-2 -right-2 px-1.5 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider shadow-sm ${badgeColor}`}>
                  {node.techStack === TechStack.GENERIC ? 'System' : node.techStack}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;