import React from 'react';
import { useStore } from './store';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import SurfInterface from './components/SurfInterface';
import AtomSpaceVisualizer from './components/AtomSpaceVisualizer';
import ReservoirView from './components/ReservoirView';
import PSystemView from './components/PSystemView';
import HypergraphView from './components/HypergraphView';
import FlowsView from './components/FlowsView';
import MemoryView from './components/MemoryView';
import ProfileView from './components/ProfileView';
import ConfigView from './components/ConfigView';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const { currentView } = useStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden">
          <ErrorBoundary>
            {currentView === 'profile' && <ProfileView />}
            {currentView === 'chat' && <ChatInterface />}
            {currentView === 'surf' && <SurfInterface />}
            {currentView === 'atomspace' && <AtomSpaceVisualizer />}
            {currentView === 'reservoirs' && <ReservoirView />}
            {currentView === 'p-systems' && <PSystemView />}
            {currentView === 'hypergraphs' && <HypergraphView />}
            {currentView === 'flows' && <FlowsView />}
            {currentView === 'memory' && <MemoryView />}
            {currentView === 'config' && <ConfigView />}
            {currentView === 'graph' && (
              <div className="h-full flex items-center justify-center text-gray-500">
                Knowledge Graph view coming soon
              </div>
            )}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}