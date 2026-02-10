import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SessionsPanelProps {
  sessions: string[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewSession: () => void;
  isCreatingSession: boolean;
  isLoading: boolean;
}

export default function SessionsPanel({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  isCreatingSession,
  isLoading,
}: SessionsPanelProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col h-full p-4 gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button
          onClick={onNewSession}
          disabled={isCreatingSession}
          className="w-full"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isCreatingSession ? 'Creating...' : 'New Session'}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {sessions.length === 0 ? (
            <div className="text-center py-8 px-4 text-sm text-muted-foreground">
              No sessions yet. Create one to get started!
            </div>
          ) : (
            sessions.map((sessionId) => (
              <button
                key={sessionId}
                onClick={() => onSelectSession(sessionId)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                  activeSessionId === sessionId
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  Session {sessionId.split('_')[1]?.slice(0, 8) || sessionId.slice(0, 8)}
                </span>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
