import { Mic, MessageCircle, Award, CheckCircle2, AlertTriangle, Plug, PauseCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ClassSummaryReportProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalizeEnd: () => void;
}

const ClassSummaryReport = ({ isOpen, onClose, onFinalizeEnd }: ClassSummaryReportProps) => {
  // Placeholder data only — purely visual
  const activeParticipants = [
    { name: 'Emma Johnson', icon: 'mic' },
    { name: 'Alex Chen', icon: 'chat' },
    { name: 'Sarah Williams', icon: 'mic' },
    { name: 'Michael Brown', icon: 'chat' },
  ];

  const meaningfulContributors = [
    'Student A',
    'Student B',
    'Student C',
    'Student D',
  ];

  const lowParticipation = [
    'Student E',
    'Student F',
    'Student G',
  ];

  const inactiveOrDisconnected = [
    'Student H',
    'Student I',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel-strong max-w-4xl p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">Class Participation Summary</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              A visual overview of student participation in this session
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Participants */}
            <section className="glass-panel rounded-xl p-5 border border-border/50 shadow-sm">
              <h3 className="text-base font-semibold">Active Participants</h3>
              <p className="text-sm text-muted-foreground mt-1">Students who actively participated in the discussion</p>
              <ul className="mt-4 space-y-3">
                {activeParticipants.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      {item.icon === 'mic' ? (
                        <Mic className="w-4 h-4" />
                      ) : (
                        <MessageCircle className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Meaningful Contributions */}
            <section className="glass-panel rounded-xl p-5 border border-border/50 shadow-sm">
              <h3 className="text-base font-semibold">Meaningful Contributions</h3>
              <p className="text-sm text-muted-foreground mt-1">Students who gave relevant or correct responses</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {meaningfulContributors.map((name) => (
                  <Badge key={name} variant="secondary" className="bg-success/15 text-success border border-success/30">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                    {name}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Low Participation */}
            <section className="glass-panel rounded-xl p-5 border border-border/50 shadow-sm">
              <h3 className="text-base font-semibold">Low Participation</h3>
              <p className="text-sm text-muted-foreground mt-1">Students who spoke very little or did not participate</p>
              <ul className="mt-4 space-y-3">
                {lowParticipation.map((name) => (
                  <li key={name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-warning/15 text-warning flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-foreground">{name}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Disconnected or Inactive */}
            <section className="glass-panel rounded-xl p-5 border border-border/50 shadow-sm">
              <h3 className="text-base font-semibold">Disconnected or Inactive</h3>
              <p className="text-sm text-muted-foreground mt-1">Students who were disconnected or inactive during the class</p>
              <ul className="mt-4 space-y-3">
                {inactiveOrDisconnected.map((name, idx) => (
                  <li key={name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted/30 text-muted-foreground flex items-center justify-center">
                      {idx % 2 === 0 ? (
                        <Plug className="w-4 h-4" />
                      ) : (
                        <PauseCircle className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm text-foreground">{name}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border/60 bg-background/60 backdrop-blur-sm px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button variant="outline" onClick={onClose} className="sm:min-w-[140px]">Close Report</Button>
          <Button variant="destructive" onClick={onFinalizeEnd} className="sm:min-w-[140px] ring-1 ring-primary/25 hover:ring-primary/35 transition-all">End Class</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassSummaryReport;