import { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  Hand,
  Users,
  Phone,
  Smile,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ControlBarProps {
  isMuted: boolean;
  isCameraOn: boolean;
  isHandRaised: boolean;
  isChatOpen: boolean;
  isParticipantsOpen: boolean;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onToggleHand: () => void;
  onToggleChat: () => void;
  onToggleParticipants: () => void;
  onLeave: () => void;
  onReaction?: (emoji: string) => void;
}

const REACTIONS = ['👍', '👏', '❤️', '😂', '😮', '🎉'];

const ControlBar = ({
  isMuted,
  isCameraOn,
  isHandRaised,
  isChatOpen,
  isParticipantsOpen,
  onToggleMute,
  onToggleCamera,
  onToggleHand,
  onToggleChat,
  onToggleParticipants,
  onLeave,
  onReaction,
}: ControlBarProps) => {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-40">
      <div className="glass-panel-strong px-4 py-3 flex items-center gap-2 md:gap-3">
        {/* Mic */}
        <button
          onClick={onToggleMute}
          className={cn(
            'control-button',
            !isMuted && 'active'
          )}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Camera */}
        <button
          onClick={onToggleCamera}
          className={cn(
            'control-button',
            isCameraOn && 'active'
          )}
          title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
        >
          {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <div className="w-px h-8 bg-border mx-1" />

        {/* Raise Hand */}
        <button
          onClick={onToggleHand}
          className={cn(
            'control-button',
            isHandRaised && 'bg-warning text-warning-foreground'
          )}
          title={isHandRaised ? 'Lower hand' : 'Raise hand'}
        >
          <Hand className="w-5 h-5" />
        </button>

        {/* Reactions */}
        <div className="relative">
          <DropdownMenu open={showReactions} onOpenChange={setShowReactions}>
            <DropdownMenuTrigger asChild>
              <button className="control-button" title="Reactions">
                <Smile className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-panel p-2 flex gap-1 mb-2" align="center">
              {REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onReaction?.(emoji);
                    setShowReactions(false);
                  }}
                  className="w-10 h-10 rounded-lg hover:bg-secondary flex items-center justify-center text-xl transition-transform hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-px h-8 bg-border mx-1" />

        {/* Chat */}
        <button
          onClick={onToggleChat}
          className={cn(
            'control-button',
            isChatOpen && 'active'
          )}
          title="Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Participants */}
        <button
          onClick={onToggleParticipants}
          className={cn(
            'control-button',
            isParticipantsOpen && 'active'
          )}
          title="Participants"
        >
          <Users className="w-5 h-5" />
        </button>

        {/* More Options (mobile) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="control-button md:hidden" title="More options">
              <MoreVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass-panel" align="end">
            <DropdownMenuItem onClick={onToggleChat}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onToggleParticipants}>
              <Users className="w-4 h-4 mr-2" />
              Participants
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-8 bg-border mx-1" />

        {/* Leave */}
        <button
          onClick={onLeave}
          className="control-button destructive"
          title="Leave class"
        >
          <Phone className="w-5 h-5 rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
