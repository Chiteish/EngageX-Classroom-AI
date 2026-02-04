import { Activity } from 'lucide-react';
import { AIAction } from '@/types/classroom';

interface AgenticAIActionsProps {
  actions: AIAction[];
  isActive: boolean;
}

const AgenticAIActions = ({ actions, isActive }: AgenticAIActionsProps) => {
  if (!isActive) return null;

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="ai-panel p-4 space-y-3 max-h-64">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-ai" />
        <h3 className="text-sm font-medium text-foreground">Agentic AI – Live Actions</h3>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-40 scrollbar-thin">
        {actions.length === 0 ? (
          <p className="text-xs text-muted-foreground py-2">
            No actions yet. AI is monitoring the class.
          </p>
        ) : (
          actions.map((action) => (
            <div
              key={action.id}
              className="flex items-start gap-2 p-2 rounded-lg bg-background/30 text-xs"
            >
              <span className="text-muted-foreground shrink-0">
                {formatTime(action.timestamp)}
              </span>
              <span className="text-foreground">{action.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgenticAIActions;
