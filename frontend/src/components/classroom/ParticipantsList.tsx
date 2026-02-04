import { X, Mic, MicOff, Video, VideoOff, Hand, Crown } from 'lucide-react';
import { Participant } from '@/types/classroom';

interface ParticipantsListProps {
  participants: Participant[];
  isOpen: boolean;
  onClose: () => void;
}

const ParticipantsList = ({ participants, isOpen, onClose }: ParticipantsListProps) => {
  if (!isOpen) return null;

  const teachers = participants.filter(p => p.role === 'teacher');
  const students = participants.filter(p => p.role === 'student');

  return (
    <div className="fixed right-0 top-0 bottom-20 w-80 glass-panel-strong m-4 flex flex-col z-30 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">
          Participants ({participants.length})
        </h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Participants */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Teachers */}
        {teachers.length > 0 && (
          <div className="p-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Host
            </h3>
            <div className="space-y-2">
              {teachers.map((participant) => (
                <ParticipantRow key={participant.id} participant={participant} />
              ))}
            </div>
          </div>
        )}

        {/* Students */}
        {students.length > 0 && (
          <div className="p-4 pt-0">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Students ({students.length})
            </h3>
            <div className="space-y-2">
              {students.map((participant) => (
                <ParticipantRow key={participant.id} participant={participant} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ParticipantRow = ({ participant }: { participant: Participant }) => {
  const initials = participant.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary flex items-center justify-center text-sm font-medium">
        {initials}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground truncate">
            {participant.name}
          </span>
          {participant.role === 'teacher' && (
            <Crown className="w-3 h-3 text-primary shrink-0" />
          )}
          {participant.handRaised && (
            <Hand className="w-3 h-3 text-warning shrink-0" />
          )}
        </div>
      </div>

      {/* Status Icons */}
      <div className="flex items-center gap-1">
        {participant.isMuted ? (
          <MicOff className="w-4 h-4 text-destructive" />
        ) : (
          <Mic className="w-4 h-4 text-muted-foreground" />
        )}
        {participant.isCameraOn ? (
          <Video className="w-4 h-4 text-muted-foreground" />
        ) : (
          <VideoOff className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
};

export default ParticipantsList;
