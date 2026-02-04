import { useState } from 'react';
import { Copy, Check, Camera, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateClassScreenProps {
  onStartClass: (meetingId: string) => void;
}

const CreateClassScreen = ({ onStartClass }: CreateClassScreenProps) => {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateMeetingId = () => {
    const id = `class-${Math.random().toString(36).substring(2, 8)}-${Math.random().toString(36).substring(2, 6)}`;
    setMeetingId(id);
  };

  const copyLink = () => {
    const link = `${window.location.origin}?join=${meetingId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartClass = () => {
    if (meetingId) {
      onStartClass(meetingId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
      <div className="glass-panel-strong p-10 md:p-14 max-w-xl w-full text-center space-y-8 shimmer glow-effect rounded-2xl">
        {/* Logo / Header */}
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 flex items-center justify-center backdrop-blur-sm border border-primary/25 shadow-sm">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-semibold tracking-wide text-foreground">Create a New Class</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Start your virtual classroom and invite students to join
          </p>
        </div>

        {/* Features (pill style) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-2">
          <div className="rounded-full border border-primary/25 bg-background/40 backdrop-blur-sm px-5 py-3 flex items-center gap-3 hover:border-primary/35 transition-all">
            <Users className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">Up to 50 participants</p>
          </div>
          <div className="rounded-full border border-primary/25 bg-background/40 backdrop-blur-sm px-5 py-3 flex items-center gap-3 hover:border-primary/35 transition-all">
            <Shield className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">Secure & private</p>
          </div>
        </div>

        {!meetingId ? (
          <Button
            onClick={generateMeetingId}
            className="w-full h-12 text-base md:text-lg font-medium rounded-xl shadow-lg ring-1 ring-white/10 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white hover:brightness-110 transition-all"
            size="lg"
          >
            Create Class
          </Button>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Meeting Link */}
            <div className="glass-panel p-4 space-y-3">
              <p className="text-sm text-muted-foreground">Meeting Link</p>
              <div className="flex items-center gap-2 bg-background/50 rounded-lg p-3">
                <code className="flex-1 text-sm text-foreground truncate">
                  {`${window.location.origin}?join=${meetingId}`}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyLink}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Share this link with students to join the class
            </p>

            <Button
              onClick={handleStartClass}
              className="w-full h-12 text-base md:text-lg font-medium rounded-xl shadow-lg ring-1 ring-white/10 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white hover:brightness-110 transition-all"
              size="lg"
            >
              Start Class
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateClassScreen;
