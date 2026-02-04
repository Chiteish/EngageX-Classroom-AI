import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MotivationPopupProps {
  isVisible: boolean;
  message: string;
  onDismiss: () => void;
}

const MotivationPopup = ({ isVisible, message, onDismiss }: MotivationPopupProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsExiting(false);
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onDismiss, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-24 right-4 z-50 motivation-popup max-w-xs',
        isExiting && 'exiting'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-success" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{message}</p>
          <p className="text-xs text-muted-foreground mt-1">Keep it up! 🎯</p>
        </div>
      </div>
    </div>
  );
};

export default MotivationPopup;
