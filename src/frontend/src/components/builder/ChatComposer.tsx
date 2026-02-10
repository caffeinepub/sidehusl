import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ChatComposerProps {
  onSend: (content: string) => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function ChatComposer({ onSend, disabled, isLoading }: ChatComposerProps) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (disabled) {
      toast.error('Please create or select a session first');
      return;
    }

    try {
      await onSend(input);
      setInput('');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-6">
      <div className="flex gap-2 max-w-4xl mx-auto">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your app idea... (Press Enter to send, Shift+Enter for new line)"
          className="min-h-[60px] max-h-[200px] resize-none"
          disabled={disabled || isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || isLoading || !input.trim()}
          className="h-[60px] w-[60px] flex-shrink-0"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2 max-w-4xl mx-auto">
        Describe your app idea and get a structured implementation plan
      </p>
    </form>
  );
}
