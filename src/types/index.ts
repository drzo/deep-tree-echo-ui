// Re-export all types
export * from './chat';
export * from './memory';
export * from './workflow';
export * from './skills';

export type ViewType = 
  | 'profile'
  | 'chat' 
  | 'surf'
  | 'atomspace' 
  | 'reservoirs'
  | 'p-systems'
  | 'hypergraphs'
  | 'flows'
  | 'memory'
  | 'skills'
  | 'graph'
  | 'config';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dependencies?: string[];
  created_at: string;
  updated_at: string;
}

export interface Hotkey {
  command: string;
  description: string;
  previewPrompt: string;
  hidden?: boolean;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}