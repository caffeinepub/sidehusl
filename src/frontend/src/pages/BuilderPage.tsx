import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import BuilderShell from '../components/builder/BuilderShell';
import BuilderLoginGate from '../components/auth/BuilderLoginGate';
import ProfileSetupDialog from '../components/builder/ProfileSetupDialog';
import SessionsPanel from '../components/builder/SessionsPanel';
import ChatTranscript from '../components/builder/ChatTranscript';
import ChatComposer from '../components/builder/ChatComposer';
import { useBuilderSessions } from '../hooks/useBuilderSessions';
import { useBuilderMessages } from '../hooks/useBuilderMessages';
import { useCurrentUserProfile } from '../hooks/useCurrentUserProfile';
import { generateBuilderResponse } from '../utils/builderAssistant';
import { Variant_user_assistant } from '../backend';

export default function BuilderPage() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useCurrentUserProfile();
  const { data: sessions = [], isLoading: sessionsLoading } = useBuilderSessions();
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  
  const { data: messages = [], isLoading: messagesLoading } = useBuilderMessages(activeSessionId);
  const { mutateAsync: createSession, isPending: isCreatingSession } = useBuilderSessions();
  const { mutateAsync: appendMessage, isPending: isSendingMessage } = useBuilderMessages(activeSessionId);

  // Auto-select first session if none selected
  useEffect(() => {
    if (!activeSessionId && sessions.length > 0) {
      setActiveSessionId(sessions[0]);
    }
  }, [sessions, activeSessionId]);

  const handleNewSession = async () => {
    try {
      const sessionId = await createSession();
      setActiveSessionId(sessionId);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !activeSessionId) return;

    try {
      // Append user message
      await appendMessage({
        sessionId: activeSessionId,
        role: Variant_user_assistant.user,
        content: content.trim(),
      });

      // Generate assistant response
      const assistantResponse = generateBuilderResponse(content.trim());

      // Append assistant message
      await appendMessage({
        sessionId: activeSessionId,
        role: Variant_user_assistant.assistant,
        content: assistantResponse,
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  // Show login gate if not authenticated
  if (!isAuthenticated) {
    return <BuilderLoginGate />;
  }

  // Show profile setup if user has no profile
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  return (
    <>
      <BuilderShell
        sessionsPanel={
          <SessionsPanel
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelectSession={setActiveSessionId}
            onNewSession={handleNewSession}
            isCreatingSession={isCreatingSession}
            isLoading={sessionsLoading}
          />
        }
        transcript={
          <ChatTranscript
            messages={messages}
            isLoading={messagesLoading}
          />
        }
        composer={
          <ChatComposer
            onSend={handleSendMessage}
            disabled={!activeSessionId || isSendingMessage}
            isLoading={isSendingMessage}
          />
        }
      />
      {showProfileSetup && <ProfileSetupDialog />}
    </>
  );
}
