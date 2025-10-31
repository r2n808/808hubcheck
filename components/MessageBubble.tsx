
import React from 'react';
import { Message, User, Bot } from '../types';
import { UserAvatar } from './UserAvatar';

interface MessageBubbleProps {
  message: Message;
  sender: User | Bot | undefined;
  isCurrentUser: boolean;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-2">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
	    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
	    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
);

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender, isCurrentUser }) => {
  if (!sender) {
    return null; // or a fallback UI
  }

  const isBot = sender.id.startsWith('bot-');

  const alignment = isCurrentUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isCurrentUser ? 'bg-cyan-600' : 'bg-gray-700';
  const nameColor = isCurrentUser ? 'text-white' : (isBot ? 'text-cyan-400' : 'text-gray-300');
  const messageRadius = isCurrentUser ? 'rounded-l-2xl rounded-tr-2xl' : 'rounded-r-2xl rounded-tl-2xl';

  return (
    <div className={`flex items-end gap-3 ${alignment}`}>
      {!isCurrentUser && (
        <UserAvatar src={sender.avatarUrl} alt={sender.name} />
      )}
      <div className={`flex flex-col max-w-xs md:max-w-md ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {!isCurrentUser && (
            <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${nameColor}`}>{sender.name}</span>
                {isBot && <span className="text-xs bg-cyan-900/50 text-cyan-400 px-2 py-0.5 rounded-full">BOT</span>}
            </div>
        )}
        <div className={`px-4 py-3 ${bubbleColor} ${messageRadius} shadow-md`}>
           {message.isBotTyping ? <TypingIndicator /> : <p className="text-white text-sm whitespace-pre-wrap">{message.content}</p>}
        </div>
        <p className="text-xs text-gray-500 mt-1 px-1">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
  );
};
