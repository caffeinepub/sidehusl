import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Sparkles } from 'lucide-react';
import { BuilderMessage, Variant_user_assistant } from '../../backend';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useRef } from 'react';

interface ChatTranscriptProps {
  messages: BuilderMessage[];
  isLoading: boolean;
}

export default function ChatTranscript({ messages, isLoading }: ChatTranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="h-full p-4 space-y-4">
        <Skeleton className="h-24 w-3/4" />
        <Skeleton className="h-32 w-full ml-auto" />
        <Skeleton className="h-24 w-2/3" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold">Start Building Your App</h3>
          <p className="text-muted-foreground">
            Describe your app idea below and I'll help you create a structured plan with pages, features, data models, and implementation steps.
          </p>
          <div className="text-sm text-muted-foreground space-y-2 pt-4">
            <p className="font-medium">Try asking:</p>
            <ul className="text-left space-y-1 pl-4">
              <li>• "Build a task management app"</li>
              <li>• "Create a marketplace for digital art"</li>
              <li>• "Social platform for sharing recipes"</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full" ref={scrollRef}>
      <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
        {messages.map((message) => {
          const isUser = message.role === Variant_user_assistant.user;
          return (
            <div
              key={message.id.toString()}
              className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="flex-shrink-0">
                <AvatarFallback className={isUser ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}>
                  {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex-1 rounded-lg p-4 ${
                  isUser
                    ? 'bg-primary text-primary-foreground ml-12'
                    : 'bg-muted mr-12'
                }`}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap break-words leading-relaxed">
                  {message.content}
                </div>
                <div className="text-xs opacity-70 mt-2">
                  {new Date(Number(message.timestamp) / 1000000).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
