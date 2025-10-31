
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { Modal } from './components/Modal';
import { MOCK_CHANNELS, MOCK_USERS, MOCK_MESSAGES, CURRENT_USER_ID } from './constants';
import { Channel, User, Message, Bot } from './types';
import { getBotResponse } from './services/geminiService';
import { CloneIcon, LockIcon, QRIcon } from './components/Icons';

const App: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>(MOCK_CHANNELS);
  const [messages, setMessages] = useState<{[key: string]: Message[]}>(MOCK_MESSAGES);
  const [activeChannelId, setActiveChannelId] = useState<string | null>('1');
  const [currentUser] = useState<User>(MOCK_USERS.find(u => u.id === CURRENT_USER_ID)!);
  const [isKillSwitchActive, setKillSwitchActive] = useState(false);
  
  const [isPayPalModalOpen, setPayPalModalOpen] = useState(false);
  const [isCloneModalOpen, setCloneModalOpen] = useState(false);
  const [isQRModalOpen, setQRModalOpen] = useState(false);
  const [unlockingChannel, setUnlockingChannel] = useState<Channel | null>(null);

  const activeChannel = channels.find(c => c.id === activeChannelId);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!activeChannelId || !activeChannel) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      channelId: activeChannelId,
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMessage],
    }));
    
    // Bot interaction logic
    const botMention = activeChannel.bots.find(bot => content.toLowerCase().startsWith(`@${bot.name.toLowerCase()}`));
    if (botMention) {
        // Simulate bot thinking
        const botTypingMessage: Message = {
            id: `bot-typing-${Date.now()}`,
            channelId: activeChannelId,
            senderId: botMention.id,
            content: "Thinking...",
            timestamp: new Date().toISOString(),
            isBotTyping: true,
        };
        setMessages(prev => ({ ...prev, [activeChannelId]: [...prev[activeChannelId], botTypingMessage] }));

        const prompt = content.replace(`@${botMention.name}`, '').trim();
        const botReplyContent = await getBotResponse(prompt);
        
        const botReply: Message = {
            id: `msg-bot-${Date.now()}`,
            channelId: activeChannelId,
            senderId: botMention.id,
            content: botReplyContent,
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => {
            const currentMessages = prev[activeChannelId].filter(m => m.id !== botTypingMessage.id);
            return {...prev, [activeChannelId]: [...currentMessages, botReply]};
        });
    }
  }, [activeChannelId, activeChannel, currentUser.id]);

  const handleSelectChannel = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId);
    if(channel?.locked) {
        setUnlockingChannel(channel);
        setPayPalModalOpen(true);
    } else {
        setActiveChannelId(channelId);
    }
  };

  const handleUnlockChannel = () => {
    if(!unlockingChannel) return;
    setChannels(prev => prev.map(c => c.id === unlockingChannel.id ? {...c, locked: false} : c));
    setActiveChannelId(unlockingChannel.id);
    setPayPalModalOpen(false);
    setUnlockingChannel(null);
  };
  
  // Simulate receiving a message in a different channel to show unread indicator
  useEffect(() => {
    const interval = setInterval(() => {
        const otherChannel = channels.find(c => c.id !== activeChannelId && c.type !== 'dm');
        if (otherChannel) {
             setChannels(prev => prev.map(c => 
                c.id === otherChannel.id ? {...c, unreadCount: (c.unreadCount || 0) + 1} : c
            ));
        }
    }, 15000);
    return () => clearInterval(interval);
  }, [activeChannelId, channels]);

  return (
    <div className="flex h-screen w-screen font-sans bg-gray-900 text-gray-100">
      <Sidebar
        channels={channels}
        currentUser={currentUser}
        activeChannelId={activeChannelId}
        onSelectChannel={handleSelectChannel}
        onCloneClick={() => setCloneModalOpen(true)}
        onQRClick={() => setQRModalOpen(true)}
      />
      <main className="flex-1 flex flex-col bg-gray-800">
        {isKillSwitchActive && (
          <div className="w-full bg-red-600 text-white text-center p-2 font-bold text-sm z-50">
            KILLSWITCH ENGAGED: ALL SERVICES SUSPENDED BY OWNER
          </div>
        )}
        <ChatWindow
          channel={activeChannel}
          messages={messages[activeChannelId ?? ''] ?? []}
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
          isKillSwitchActive={isKillSwitchActive}
          isOwner={currentUser.isOwner}
          onKillSwitchToggle={() => setKillSwitchActive(prev => !prev)}
        />
      </main>

      {/* Modals */}
      <Modal isOpen={isPayPalModalOpen} onClose={() => setPayPalModalOpen(false)}>
        <div className="text-center">
            <LockIcon className="w-16 h-16 mx-auto text-cyan-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Unlock Premium Channel</h2>
            <p className="text-gray-400 mb-6">Unlock "{unlockingChannel?.name}" and get access to exclusive content.</p>
            <button
                onClick={handleUnlockChannel}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.png" alt="PayPal" className="h-6 mr-2"/>
                Unlock with PayPal
            </button>
        </div>
      </Modal>

      <Modal isOpen={isCloneModalOpen} onClose={() => setCloneModalOpen(false)}>
          <div className="text-center">
            <CloneIcon className="w-16 h-16 mx-auto text-cyan-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Clone Your Own Server</h2>
            <p className="text-gray-400 mb-6">Launch a fully branded version of this server for your own community. Start your empire-in-a-box.</p>
            <button
                onClick={() => setCloneModalOpen(false)}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
            >
                Launch Instance
            </button>
          </div>
      </Modal>
      
      <Modal isOpen={isQRModalOpen} onClose={() => setQRModalOpen(false)}>
          <div className="text-center">
            <QRIcon className="w-12 h-12 mx-auto text-cyan-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Onboarding & Invite</h2>
            <p className="text-gray-400 mb-4">Scan the QR code to join this server or onboard new members instantly.</p>
            <div className="p-4 bg-white rounded-lg inline-block">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/join/nexus-chat" alt="QR Code" />
            </div>
          </div>
      </Modal>
    </div>
  );
};

export default App;
