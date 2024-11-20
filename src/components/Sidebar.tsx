import React from 'react';
import { 
  MessageSquare, 
  Network, 
  Share2, 
  Waves, 
  Grid, 
  GitGraph,
  UserCircle,
  Globe,
  Settings,
  GitBranch,
  Workflow,
  Brain
} from 'lucide-react';
import { useStore } from '../store';
import { ViewType } from '../types';

export default function Sidebar() {
  const { currentView, setView } = useStore();

  const views: { type: ViewType; icon: React.ReactNode; label: string }[] = [
    { type: 'profile', icon: <UserCircle className="w-6 h-6" />, label: 'Profile' },
    { type: 'chat', icon: <MessageSquare className="w-6 h-6" />, label: 'Chat' },
    { type: 'surf', icon: <Globe className="w-6 h-6" />, label: 'Surf' },
    { type: 'atomspace', icon: <Network className="w-6 h-6" />, label: 'AtomSpace' },
    { type: 'reservoirs', icon: <Waves className="w-6 h-6" />, label: 'Reservoirs' },
    { type: 'p-systems', icon: <Grid className="w-6 h-6" />, label: 'P-Systems' },
    { type: 'hypergraphs', icon: <GitGraph className="w-6 h-6" />, label: 'Hypergraphs' },
    { type: 'flows', icon: <Workflow className="w-6 h-6" />, label: 'Flows' },
    { type: 'memory', icon: <Brain className="w-6 h-6" />, label: 'Memory' },
    { type: 'graph', icon: <Share2 className="w-6 h-6" />, label: 'Graph' },
    { type: 'config', icon: <Settings className="w-6 h-6" />, label: 'Config' }
  ];

  return (
    <div className="w-20 bg-gray-900 flex flex-col items-center py-4">
      {views.map(({ type, icon, label }) => (
        <button
          key={type}
          onClick={() => setView(type)}
          className={`w-full p-4 flex flex-col items-center gap-1 ${
            currentView === type
              ? 'text-blue-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {icon}
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
}