import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { ChatMessage } from '@/types/classroom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatPanelProps {
  messages: ChatMessage[];
  currentUserId: string;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
  enableLanguageAssist?: boolean;
}

const ChatPanel = ({
  messages,
  currentUserId,
  isOpen,
  onClose,
  onSendMessage,
  enableLanguageAssist = false,
}: ChatPanelProps) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Add tab state and language selection for Language Assist
  const [activeTab, setActiveTab] = useState<'chat' | 'assist'>(() => (enableLanguageAssist ? 'assist' : 'chat'));
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 bottom-20 w-80 glass-panel-strong m-4 flex flex-col z-30 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="typography-subtitle">Chat</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs (student-only when enabled) */}
      {enableLanguageAssist && (
        <div className="px-4 pt-2 pb-3 border-b border-border flex items-center gap-2">
          <button
            className={cn(
              'text-xs px-3 py-1 rounded-md transition-colors',
              activeTab === 'chat' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary text-muted-foreground'
            )}
            onClick={() => setActiveTab('chat')}
          >
            Class Chat
          </button>
          <button
            className={cn(
              'text-xs px-3 py-1 rounded-md transition-colors',
              activeTab === 'assist' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary text-muted-foreground'
            )}
            onClick={() => setActiveTab('assist')}
          >
            Language Assist
          </button>
        </div>
      )}

      {/* Content */}
      {activeTab === 'chat' && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-8">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((msg) => {
                const isOwn = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex flex-col gap-1',
                      isOwn ? 'items-end' : 'items-start'
                    )}
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{isOwn ? 'You' : msg.senderName}</span>
                      <span>{formatTime(msg.timestamp)}</span>
                    </div>
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-4 py-2 text-sm',
                        isOwn
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-secondary text-secondary-foreground rounded-bl-md'
                      )}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-background/50"
              />
              <Button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                size="icon"
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      {activeTab === 'assist' && enableLanguageAssist && (
        <>
          {/* Assist Header */}
          <div className="p-4">
            <h2 className="text-sm font-semibold text-foreground">Live Language Assist</h2>
            <p className="text-xs text-muted-foreground mt-1">Understand the lesson in your preferred language</p>

            {/* Language Selection (visual only) */}
            <div className="mt-3">
              <label className="text-xs text-muted-foreground" htmlFor="assist-language">Select your language</label>
              <select
                id="assist-language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="mt-1 w-full rounded-md bg-background/60 border border-border px-3 py-2 text-sm"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Telugu</option>
                <option>Tamil</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          {/* Assist Messages */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 scrollbar-thin">
            <div className="text-center text-muted-foreground text-xs py-2">AI is translating the teacher’s explanation…</div>
            <div className="max-w-[85%] rounded-2xl px-4 py-2 text-sm bg-primary/10 border border-primary/20 text-foreground animate-slide-up">
              Translated summary will appear here.
            </div>
            <div className="max-w-[85%] rounded-2xl px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-bl-md">
              This explanation is shown in your selected language ({selectedLanguage}).
            </div>
          </div>

          {/* Optional Input (read-only by default) */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value=""
                placeholder="Explain again in simpler words"
                disabled
                className="flex-1 bg-background/50"
              />
              <Button disabled size="icon" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">Translations are AI-generated and meant to support understanding.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPanel;
