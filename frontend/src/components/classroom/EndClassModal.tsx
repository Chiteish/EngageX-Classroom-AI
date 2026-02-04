import { BarChart3, Users, TrendingUp, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EndClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEndClass: () => void;
  participantCount: number;
}

const EndClassModal = ({ isOpen, onClose, onEndClass, participantCount }: EndClassModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel-strong border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Class Report
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Summary of today's class session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={Users}
              label="Participants"
              value={participantCount.toString()}
            />
            <StatCard
              icon={Clock}
              label="Duration"
              value="45 min"
            />
            <StatCard
              icon={TrendingUp}
              label="Engagement"
              value="78%"
            />
            <StatCard
              icon={BarChart3}
              label="Questions"
              value="12"
            />
          </div>

          {/* Participation Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Participation Overview</h4>
            <div className="space-y-2">
              <ProgressBar label="Speaking Time" value={65} color="primary" />
              <ProgressBar label="Chat Activity" value={42} color="success" />
              <ProgressBar label="Hand Raises" value={28} color="warning" />
            </div>
          </div>

          {/* Engagement Summary */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Engagement Summary</h4>
            <div className="glass-panel p-4 space-y-2 text-sm text-muted-foreground">
              <p>• Average attention score: 82%</p>
              <p>• Most active participant: Student A</p>
              <p>• Topics covered: 4 of 5 planned</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={onEndClass} variant="destructive" className="flex-1">
            End Class
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="glass-panel p-4 space-y-2">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="w-4 h-4" />
      <span className="text-xs">{label}</span>
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
  </div>
);

const ProgressBar = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: 'primary' | 'success' | 'warning';
}) => {
  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClasses[color]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default EndClassModal;
