import React, { useState, useEffect } from 'react';
import { Send, Command } from 'lucide-react';
import { useStore } from '../store';
import { Message } from '../types';
import { sendMessage } from '../api/openai';
import TokenModal from './TokenModal';
import { getAssistantInstances } from '../utils/db';
import { AssistantInstance } from '../types/memory';

const QUICK_ACTIONS = [
  { command: '[Tasks]', description: 'Manage development tasks' },
  { command: '[Skills]', description: 'Access skill database' },
  { command: '[Memory]', description: 'Query memory systems' },
  { command: '[Learn]', description: 'Generate learning objectives' },
  { command: '[Status]', description: 'System status update' },
  { command: '[Export]', description: 'Export current state' }
];

export default function ChatInterface() {
  const { 
    messages = [], 
    addMessage, 
    openaiToken,
    assistantId,
    setAssistantId,
    setShowOpenAITokenModal 
  } = useStore();
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assistants, setAssistants] = useState<AssistantInstance[]>([]);

  useEffect(() => {
    loadAssistants();
  }, []);

  async function loadAssistants() {
    try {
      const instances = await getAssistantInstances();
      setAssistants(instances);
      
      // Set first production assistant as default if none selected
      if (!assistantId && instances.length > 0) {
        const defaultAssistant = instances.find(a => a.type === 'production') || instances[0];
        setAssistantId(defaultAssistant.assistantId);
      }
    } catch (error) {
      console.error('Failed to load assistants:', error);
    }
  }

  const handleQuickAction = async (command: string) => {
    if (isLoading || !assistantId) return;

    const userMessage: Message = { role: 'user', content: command };
    addMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await sendMessage(command);
      addMessage({ 
        role: 'assistant', 
        content: response 
      });
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      addMessage({ 
        role: 'assistant', 
        content: `I apologize, but I encountered an error: ${errorMessage}. Please try again.` 
      });
      
      if (error instanceof Error && (
        error.message.includes('token') || 
        error.message.includes('API key') ||
        error.message.includes('authentication')
      )) {
        setShowOpenAITokenModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!openaiToken) {
      setShowOpenAITokenModal(true);
      return;
    }

    const userMessage: Message = { role: 'user', content: input.trim() };
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(input.trim());
      addMessage({ 
        role: 'assistant', 
        content: response 
      });
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      addMessage({ 
        role: 'assistant', 
        content: `I apologize, but I encountered an error: ${errorMessage}. Please try again.` 
      });
      
      if (error instanceof Error && (
        error.message.includes('token') || 
        error.message.includes('API key') ||
        error.message.includes('authentication')
      )) {
        setShowOpenAITokenModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <select
              value={assistantId || ''}
              onChange={(e) => setAssistantId(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Assistant</option>
              {assistants?.map((assistant) => (
                <option key={assistant.assistantId} value={assistant.assistantId}>
                  {assistant.name} ({assistant.type})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.command}
              onClick={() => handleQuickAction(action.command)}
              disabled={isLoading || !assistantId}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={action.description}
            >
              <Command className="w-4 h-4" />
              {action.command}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages?.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`rounded-lg px-6 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      <TokenModal />
    </div>
  );
}