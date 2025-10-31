
import React from 'react';
import { Channel } from '../types';
import { HashIcon, UsersIcon } from './Icons';

interface ChatHeaderProps {
  channel: Channel;
  isOwner: boolean;
  isKillSwitchActive: boolean;
  onKillSwitchToggle: () => void;
}

const KillSwitchToggle: React.FC<{isOwner: boolean, isActive: boolean, onToggle: () => void}> = ({ isOwner, isActive, onToggle }) => {
  if (!isOwner) return null;
  
  return (
      <div className="flex items-center space-x-2">
          <span className={`text-xs font-bold ${isActive ? 'text-red-500' : 'text-gray-400'}`}>Killswitch</span>
          <label htmlFor="killswitch-toggle" className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isActive} onChange={onToggle} id="killswitch-toggle" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
      </div>
  );
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ channel, isOwner, isKillSwitchActive, onKillSwitchToggle }) => {
  return (
    <header className="flex-shrink-0 flex items-center justify-between px-6 h-16 border-b border-gray-700 shadow-md bg-gray-800">
      <div className="flex items-center">
        {channel.type === 'channel' ? <HashIcon className="w-6 h-6 text-gray-500" /> : null}
        <h2 className="ml-2 text-lg font-bold text-white">{channel.name}</h2>
      </div>
      <div className="flex items-center space-x-4">
        {channel.members && (
            <div className="flex items-center text-gray-400 text-sm">
                <UsersIcon className="w-5 h-5 mr-1" />
                <span>{channel.members}</span>
            </div>
        )}
        <KillSwitchToggle 
            isOwner={isOwner} 
            isActive={isKillSwitchActive} 
            onToggle={onKillSwitchToggle} 
        />
      </div>
    </header>
  );
};
