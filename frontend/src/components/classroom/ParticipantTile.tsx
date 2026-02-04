import { Mic, MicOff, Video, VideoOff, Hand, Crown } from 'lucide-react';
import { Participant } from '@/types/classroom';
import { cn } from '@/lib/utils';

interface ParticipantTileProps {
  participant: Participant;
  isLarge?: boolean;
}

const ParticipantTile = ({ participant, isLarge = false }: ParticipantTileProps) => {
  const initials = participant.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        'video-tile relative group transition-all duration-300',
        isLarge ? 'aspect-video' : 'aspect-video',
        participant.isSpeaking && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
      )}
    >
      {/* Speaking Indicator */}
      {participant.isSpeaking && <div className="speaking-indicator" />}

      {/* Video / Avatar */}
      <div className="absolute inset-0 flex items-center justify-center">
        {participant.isCameraOn ? (
          // Placeholder for actual video - showing gradient background
          <div className="w-full h-full bg-gradient-to-br from-secondary to-card flex items-center justify-center">
            <div className="participant-avatar w-24 h-24 rounded-full">
              {initials}
            </div>
          </div>
        ) : (
          <div className="participant-avatar">
            {initials}
          </div>
        )}
      </div>

      {/* Raised Hand Indicator */}
      {participant.handRaised && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-warning flex items-center justify-center animate-bounce">
          <Hand className="w-4 h-4 text-warning-foreground" />
        </div>
      )}

      {/* Teacher Badge */}
      {participant.role === 'teacher' && (
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/20 backdrop-blur-sm flex items-center gap-1">
          <Crown className="w-3 h-3 text-primary" />
          <span className="text-xs text-primary font-medium">Host</span>
        </div>
      )}

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white truncate max-w-[70%]">
            {participant.name}
          </span>
          <div className="flex items-center gap-2">
            {participant.isMuted ? (
              <div className="w-6 h-6 rounded-full bg-destructive/80 flex items-center justify-center">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            ) : (
              <Mic className="w-4 h-4 text-white/80" />
            )}
            {!participant.isCameraOn && (
              <VideoOff className="w-4 h-4 text-white/60" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantTile;
