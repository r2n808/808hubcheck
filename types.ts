
import React from 'react';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  isOwner?: boolean;
}

export interface Bot {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  bots: Bot[];
  members?: number;
  // Fix: React.ReactNode was used without importing React.
  icon?: React.ReactNode;
  locked?: boolean;
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
  // Fix: Added avatarUrl to support direct message avatars.
  avatarUrl?: string;
}

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: string;
  isBotTyping?: boolean;
}
