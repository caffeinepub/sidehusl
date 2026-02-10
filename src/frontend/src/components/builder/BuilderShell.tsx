import { Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

interface BuilderShellProps {
  sessionsPanel: ReactNode;
  transcript: ReactNode;
  composer: ReactNode;
}

export default function BuilderShell({ sessionsPanel, transcript, composer }: BuilderShellProps) {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row">
      {/* Sessions Panel - Hidden on mobile, sidebar on desktop */}
      <div className="hidden md:flex md:w-64 lg:w-80 border-r bg-muted/30">
        {sessionsPanel}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight">
                SIDEHU$L AI App Builder
              </h1>
              <p className="text-sm text-muted-foreground">
                Describe your app idea and get a structured plan
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Sessions Toggle */}
        <div className="md:hidden border-b bg-muted/30 px-4 py-2">
          {sessionsPanel}
        </div>

        {/* Transcript */}
        <div className="flex-1 overflow-hidden">
          {transcript}
        </div>

        {/* Composer */}
        <div className="border-t bg-card">
          {composer}
        </div>
      </div>
    </div>
  );
}
