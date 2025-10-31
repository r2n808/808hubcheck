
import React, { useRef, useEffect } from 'react';
import { Channel, Message, User } from '../types';
import { MOCK_USERS } from '../constants';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ChatHeader } from './ChatHeader';

interface ChatWindowProps {
  channel: Channel | undefined;
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
  isKillSwitchActive: boolean;
  isOwner: boolean;
  onKillSwitchToggle: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ channel, messages, currentUser, onSendMessage, isKillSwitchActive, isOwner, onKillSwitchToggle }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  if (!channel) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Select a channel to start chatting</p>
      </div>
    );
  }

  const findSender = (senderId: string) => {
    return MOCK_USERS.find(u => u.id === senderId);
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ChatHeader
        channel={channel}
        isOwner={isOwner}
        isKillSwitchActive={isKillSwitchActive}
        onKillSwitchToggle={onKillSwitchToggle}
      />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            sender={findSender(msg.senderId)}
            isCurrentUser={msg.senderId === currentUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput 
        onSendMessage={onSendMessage} 
        channelName={channel.name} 
        disabled={isKillSwitchActive || !!channel.locked} 
      />
    </div>
  );
};
