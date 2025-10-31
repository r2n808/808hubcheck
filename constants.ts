
import React from 'react';
import { Channel, User, Message, Bot } from './types';
import { HashIcon, LockIcon, BotIcon, StarIcon } from './components/Icons';

export const CURRENT_USER_ID = 'user-1';

export const MOCK_USERS: (User | Bot)[] = [
  { id: 'user-1', name: 'Xavier Kalani', avatarUrl: `https://picsum.photos/seed/xavier/40/40`, isOwner: true },
  { id: 'user-2', name: 'Jane Doe', avatarUrl: `https://picsum.photos/seed/jane/40/40` },
  { id: 'user-3', name: 'Agent Smith', avatarUrl: `https://picsum.photos/seed/smith/40/40` },
  { id: 'bot-1', name: 'Gemini', avatarUrl: `https://i.imgur.com/e42tGjl.png` },
  { id: 'bot-2', name: 'Poe', avatarUrl: `https://i.imgur.com/v1EnYxT.png` },
];

export const MOCK_BOTS: Bot[] = MOCK_USERS.filter(u => u.id.startsWith('bot-')).map(b => ({id: b.id, name: b.name, avatarUrl: b.avatarUrl}));

export const MOCK_CHANNELS: Channel[] = [
  // Fix: Replaced JSX with React.createElement to avoid errors in a .ts file.
  { id: '1', name: 'general', type: 'channel', bots: MOCK_BOTS, members: 1337, icon: React.createElement(HashIcon, { className: "w-5 h-5 text-gray-400" }), lastMessage: 'Welcome to the future of chat!', lastMessageTime: '10:42 AM' },
  // Fix: Replaced JSX with React.createElement to avoid errors in a .ts file.
  { id: '2', name: 'ai-automation', type: 'channel', bots: [MOCK_BOTS[0]], members: 808, icon: React.createElement(BotIcon, { className: "w-5 h-5 text-gray-400" }), unreadCount: 3, lastMessage: 'Just dropped a new automation script.', lastMessageTime: '10:35 AM' },
  // Fix: Replaced JSX with React.createElement to avoid errors in a .ts file.
  { id: '3', name: 'passive-income', type: 'channel', bots: [], members: 420, icon: React.createElement(HashIcon, { className: "w-5 h-5 text-gray-400" }), lastMessage: 'Anyone tried the new KDP strategy?', lastMessageTime: '9:15 AM' },
  // Fix: Replaced JSX with React.createElement to avoid errors in a .ts file.
  { id: '4', name: 'premium-lounge', type: 'channel', bots: MOCK_BOTS, members: 77, icon: React.createElement(StarIcon, { className: "w-5 h-5 text-yellow-400" }), locked: true },
  { id: '5', name: 'Jane Doe', type: 'dm', bots: [], avatarUrl: MOCK_USERS.find(u => u.id === 'user-2')?.avatarUrl, lastMessage: 'Hey, did you get my email?', lastMessageTime: '8:50 AM' },
  { id: '6', name: 'Agent Smith', type: 'dm', bots: [], avatarUrl: MOCK_USERS.find(u => u.id === 'user-3')?.avatarUrl, lastMessage: 'The matrix has you...', lastMessageTime: 'Yesterday' },
];

export const MOCK_MESSAGES: { [key: string]: Message[] } = {
  '1': [
    { id: 'msg-1-1', channelId: '1', senderId: 'user-2', content: 'Hey everyone! Welcome to Nexus Chat.', timestamp: '2023-10-27T10:30:00Z' },
    { id: 'msg-1-2', channelId: '1', senderId: 'user-3', content: 'This platform is amazing. The real-time feels so smooth.', timestamp: '2023-10-27T10:31:00Z' },
    { id: 'msg-1-3', channelId: '1', senderId: 'user-1', content: 'Glad you like it! We have big plans. Try asking the bot a question, like `@Gemini what is a prompt pixel?`', timestamp: '2023-10-27T10:32:00Z' },
  ],
  '2': [
    { id: 'msg-2-1', channelId: '2', senderId: 'user-1', content: 'Just dropped a new automation script for syncing Shopify and Manus365. You can ask @Gemini to explain how it works.', timestamp: '2023-10-27T10:35:00Z' },
  ],
  '3': [
     { id: 'msg-3-1', channelId: '3', senderId: 'user-2', content: 'Anyone tried the new KDP coloring book strategy? Seems promising.', timestamp: '2023-10-27T09:15:00Z' },
  ],
  '5': [
    { id: 'msg-5-1', channelId: '5', senderId: 'user-2', content: 'Hey, did you get my email?', timestamp: '2023-10-27T08:50:00Z' },
  ],
  '6': [
     { id: 'msg-6-1', channelId: '6', senderId: 'user-3', content: 'The matrix has you...', timestamp: '2023-10-26T14:00:00Z' },
  ],
};
