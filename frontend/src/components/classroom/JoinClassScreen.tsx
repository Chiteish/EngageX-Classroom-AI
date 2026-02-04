import { useState } from 'react';
import { User, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface JoinClassScreenProps {
  meetingId: string;
  onJoinClass: (name: string) => void;
}

const JoinClassScreen = ({ meetingId, onJoinClass }: JoinClassScreenProps) => {
  const [name, setName] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = () => {
    if (name.trim()) {
      setIsJoining(true);
      // Simulate brief loading
      setTimeout(() => {
        onJoinClass(name.trim());
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim()) {
      handleJoin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
      <div className="glass-panel-strong p-8 md:p-12 max-w-md w-full text-center space-y-8 shimmer glow-effect">
        {/* Logo / Header */}
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
            <Video className="w-8 h-8 text-primary" />
          </div>
          <h1 className="typography-h2">Join Class</h1>
          <p className="typography-body-sm typography-muted">You're joining: <span className="text-foreground font-medium">{meetingId}</span></p>
        </div>

        {/* Camera Preview Placeholder */}
        <div className="video-tile aspect-video flex items-center justify-center">
          <div className="participant-avatar w-20 h-20 rounded-full flex items-center justify-center">
            {name ? (
              <span className="text-2xl">{name.charAt(0).toUpperCase()}</span>
            ) : (
              <User className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Name Input */}
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-12 pl-11 text-lg bg-background/50 border-border"
              autoFocus
            />
          </div>

          <Button
            onClick={handleJoin}
            disabled={!name.trim() || isJoining}
            className="w-full h-12 text-lg font-medium"
            size="lg"
          >
            {isJoining ? 'Joining...' : 'Join Class'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinClassScreen;
