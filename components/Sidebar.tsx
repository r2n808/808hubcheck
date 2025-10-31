
import React from 'react';
import { Channel, User } from '../types';
import { UserAvatar } from './UserAvatar';
import { SettingsIcon, CloneIcon, QRIcon, LockIcon } from './Icons';

interface SidebarProps {
  channels: Channel[];
  currentUser: User;
  activeChannelId: string | null;
  onSelectChannel: (id: string) => void;
  onCloneClick: () => void;
  onQRClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ channels, currentUser, activeChannelId, onSelectChannel, onCloneClick, onQRClick }) => {
  const channelList = channels.filter(c => c.type === 'channel');
  const dmList = channels.filter(c => c.type === 'dm');

  const ChannelLink: React.FC<{channel: Channel}> = ({channel}) => (
    <li key={channel.id}>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onSelectChannel(channel.id); }}
        className={`flex items-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200 ${activeChannelId === channel.id ? 'bg-gray-700 text-white' : ''}`}
      >
        <span className="mr-3">{channel.icon}</span>
        <span className="flex-1 truncate">{channel.name}</span>
        {channel.locked && <LockIcon className="w-4 h-4 text-yellow-500" />}
        {channel.unreadCount && channel.unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{channel.unreadCount}</span>
        )}
      </a>
    </li>
  );
  
  const DMLink: React.FC<{channel: Channel}> = ({channel}) => (
      <li key={channel.id}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onSelectChannel(channel.id); }}
          className={`flex items-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200 ${activeChannelId === channel.id ? 'bg-gray-700 text-white' : ''}`}
        >
          <UserAvatar src={channel.avatarUrl!} alt={channel.name} size="sm" />
          <div className="ml-3 flex-1 overflow-hidden">
            <p className="font-medium text-sm truncate">{channel.name}</p>
            <p className="text-xs text-gray-500 truncate">{channel.lastMessage}</p>
          </div>
          <span className="text-xs text-gray-500">{channel.lastMessageTime}</span>
        </a>
      </li>
  );

  return (
    <div className="w-80 bg-gray-900 flex flex-col border-r border-gray-700">
      <div className="px-4 h-16 flex items-center border-b border-gray-700 shadow-md">
        <h1 className="text-xl font-bold text-white">Nexus Chat</h1>
        <div className="ml-auto flex items-center space-x-2">
            <button onClick={onQRClick} className="p-2 rounded-full hover:bg-gray-700"><QRIcon className="w-5 h-5"/></button>
            <button onClick={onCloneClick} className="p-2 rounded-full hover:bg-gray-700"><CloneIcon className="w-5 h-5"/></button>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div>
          <h2 className="px-2 mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">Channels</h2>
          <ul className="space-y-1">
            {channelList.map(channel => <ChannelLink key={channel.id} channel={channel} />)}
          </ul>
        </div>
        <div>
          <h2 className="px-2 mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">Direct Messages</h2>
          <ul className="space-y-1">
            {dmList.map(dm => <DMLink key={dm.id} channel={dm} />)}
          </ul>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center">
          <UserAvatar src={currentUser.avatarUrl} alt={currentUser.name} />
          <div className="ml-3">
            <p className="font-semibold text-sm">{currentUser.name}</p>
            {currentUser.isOwner && <p className="text-xs text-cyan-400">Owner</p>}
          </div>
          <button className="ml-auto p-2 rounded-full hover:bg-gray-700">
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
