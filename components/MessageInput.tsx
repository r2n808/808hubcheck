
import React, { useState } from 'react';
import { SendIcon, PlusIcon } from './Icons';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  channelName: string;
  disabled: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, channelName, disabled }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !disabled) {
      onSendMessage(content.trim());
      setContent('');
    }
  };

  return (
    <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
      <form onSubmit={handleSubmit} className="flex items-center bg-gray-700 rounded-lg p-1">
        <button type="button" className="p-2 text-gray-400 hover:text-white" disabled={disabled}>
          <PlusIcon className="w-6 h-6" />
        </button>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={disabled ? 'Channel is locked' : `Message #${channelName}`}
          disabled={disabled}
          className="flex-1 bg-transparent px-3 text-white placeholder-gray-500 focus:outline-none disabled:cursor-not-allowed"
          autoComplete="off"
        />
        <button type="submit" className="p-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed" disabled={!content.trim() || disabled}>
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
