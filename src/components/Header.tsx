import React from 'react';
import { useStore } from '../store';
import { Settings, Github, Key } from 'lucide-react';

export default function Header() {
  const { 
    githubUser, 
    githubToken,
    setShowGitHubTokenModal, 
    setShowOpenAITokenModal,
    setView
  } = useStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          {githubToken && githubUser ? (
            <>
              <img
                src={githubUser.avatar_url}
                alt={`${githubUser.login}'s avatar`}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="text-sm font-medium">{githubUser.name || githubUser.login}</h3>
                <p className="text-xs text-gray-500">{githubUser.public_repos} repos · {githubUser.followers} followers</p>
              </div>
            </>
          ) : (
            <button
              onClick={() => setShowGitHubTokenModal(true)}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">Connect GitHub</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowGitHubTokenModal(true)}
            className="flex items-center space-x-1 px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </button>
          <button
            onClick={() => setShowOpenAITokenModal(true)}
            className="flex items-center space-x-1 px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50"
          >
            <Key className="w-4 h-4" />
            <span>OpenAI</span>
          </button>
          <button 
            onClick={() => setView('config')}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}