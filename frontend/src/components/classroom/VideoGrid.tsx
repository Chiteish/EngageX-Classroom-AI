import { Participant } from '@/types/classroom';
import ParticipantTile from './ParticipantTile';
import { cn } from '@/lib/utils';

interface VideoGridProps {
  participants: Participant[];
  currentUserId: string;
}

const VideoGrid = ({ participants, currentUserId }: VideoGridProps) => {
  const getGridClass = () => {
    const count = participants.length;
    if (count === 1) return 'grid-cols-1 max-w-2xl mx-auto';
    if (count === 2) return 'grid-cols-2 max-w-4xl mx-auto';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-3';
    if (count <= 9) return 'grid-cols-3 lg:grid-cols-3';
    return 'grid-cols-3 lg:grid-cols-4';
  };

  // Sort: current user last, teacher first
  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.id === currentUserId) return 1;
    if (b.id === currentUserId) return -1;
    if (a.role === 'teacher') return -1;
    if (b.role === 'teacher') return 1;
    return 0;
  });

  return (
    <div className={cn('grid gap-3 p-4 h-full content-center', getGridClass())}>
      {sortedParticipants.map((participant) => (
        <ParticipantTile
          key={participant.id}
          participant={participant}
          isLarge={participants.length <= 2}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
