import { Bot, Power } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface AgenticAIPanelProps {
  isActive: boolean;
  onToggle: () => void;
}

const AgenticAIPanel = ({ isActive, onToggle }: AgenticAIPanelProps) => {
  return (
    <div className="ai-panel p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
          isActive ? "bg-ai/20" : "bg-muted"
        )}>
          <Bot className={cn(
            "w-4 h-4 transition-colors",
            isActive ? "text-ai" : "text-muted-foreground"
          )} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-foreground">Agentic AI</h3>
          <p className={cn(
            "text-xs transition-colors",
            isActive ? "text-success" : "text-muted-foreground"
          )}>
            {isActive ? 'Active' : 'Inactive'}
          </p>
        </div>
        <Switch
          checked={isActive}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-ai"
        />
      </div>
    </div>
  );
};

export default AgenticAIPanel;
