import { useState, useEffect, useCallback } from 'react';
import { Participant, ChatMessage, AIAction } from '@/types/classroom';
import VideoGrid from './VideoGrid';
import ControlBar from './ControlBar';
import ChatPanel from './ChatPanel';
import ParticipantsList from './ParticipantsList';
import MotivationPopup from './MotivationPopup';
import AgenticAIPanel from './AgenticAIPanel';
import AgenticAIActions from './AgenticAIActions';
import EndClassModal from './EndClassModal';
import ClassSummaryReport from './ClassSummaryReport';

interface ClassroomViewProps {
  currentUser: Participant;
  meetingId: string;
  onLeaveClass: () => void;
}

// Mock participants for demo
const MOCK_PARTICIPANTS: Participant[] = [
  { id: '2', name: 'Emma Johnson', role: 'student', isMuted: true, isCameraOn: true, isSpeaking: false },
  { id: '3', name: 'Alex Chen', role: 'student', isMuted: false, isCameraOn: true, isSpeaking: true },
  { id: '4', name: 'Sarah Williams', role: 'student', isMuted: true, isCameraOn: false, isSpeaking: false, handRaised: true },
  { id: '5', name: 'Michael Brown', role: 'student', isMuted: false, isCameraOn: true, isSpeaking: false },
];

const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', senderId: '2', senderName: 'Emma Johnson', message: 'Good morning everyone!', timestamp: new Date(Date.now() - 300000) },
  { id: '2', senderId: '3', senderName: 'Alex Chen', message: 'Hi! Ready for today\'s lesson', timestamp: new Date(Date.now() - 240000) },
];

const MOCK_AI_ACTIONS: AIAction[] = [
  { id: '1', message: 'Muted Alex (speaking too long)', timestamp: new Date(Date.now() - 120000) },
  { id: '2', message: 'Monitoring Emma\'s participation', timestamp: new Date(Date.now() - 60000) },
  { id: '3', message: 'Suggested Sarah to speak next', timestamp: new Date(Date.now() - 30000) },
];

const MOTIVATION_MESSAGES = [
  "👍 You're doing well!",
  "Great participation, keep it up!",
  "🌟 Excellent focus today!",
  "Keep asking questions! 💡",
  "You're making great progress! 📚",
];

const ClassroomView = ({ currentUser, meetingId, onLeaveClass }: ClassroomViewProps) => {
  const [isMuted, setIsMuted] = useState(currentUser.isMuted);
  const [isCameraOn, setIsCameraOn] = useState(currentUser.isCameraOn);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isAIActive, setIsAIActive] = useState(true);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [aiActions, setAiActions] = useState<AIAction[]>(MOCK_AI_ACTIONS);
  
  // Motivation popup state (student only)
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');

  const isTeacher = currentUser.role === 'teacher';

  // Build participants list with current user
  const participants: Participant[] = [
    { ...currentUser, isMuted, isCameraOn, handRaised: isHandRaised },
    ...MOCK_PARTICIPANTS,
  ];

  // Show motivation popup periodically for students
  useEffect(() => {
    if (isTeacher) return;

    const showRandomMotivation = () => {
      const randomMessage = MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)];
      setMotivationMessage(randomMessage);
      setShowMotivation(true);
    };

    // Show first motivation after 5 seconds
    const initialTimer = setTimeout(showRandomMotivation, 5000);

    // Then show every 30-60 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 30000 + 30000; // 30-60 seconds
      setTimeout(showRandomMotivation, randomDelay);
    }, 60000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isTeacher]);

  // Simulate AI actions for teacher
  useEffect(() => {
    if (!isTeacher || !isAIActive) return;

    const newActions = [
      'No action required currently',
      'Monitoring class engagement',
      'Detected low participation from Student B',
      'Suggested break in 10 minutes',
    ];

    const interval = setInterval(() => {
      const randomAction = newActions[Math.floor(Math.random() * newActions.length)];
      setAiActions(prev => [
        { id: Date.now().toString(), message: randomAction, timestamp: new Date() },
        ...prev.slice(0, 9),
      ]);
    }, 15000);

    return () => clearInterval(interval);
  }, [isTeacher, isAIActive]);

  const handleSendMessage = useCallback((message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, [currentUser]);

  const handleLeave = () => {
    if (isTeacher) {
      setIsEndModalOpen(true);
    } else {
      onLeaveClass();
    }
  };

  const handleEndClass = () => {
    setIsEndModalOpen(false);
    setIsReportOpen(true);
  };

  const handleFinalizeEnd = () => {
    setIsReportOpen(false);
    onLeaveClass();
  };

  return (
    <div className="relative z-10">
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="glass-panel-strong px-4 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-foreground">{meetingId}</span>
        </div>

        {/* Teacher-only AI Controls */}
        {isTeacher && (
          <div className="hidden md:flex items-center gap-3">
            <AgenticAIPanel isActive={isAIActive} onToggle={() => setIsAIActive(!isAIActive)} />
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          {participants.length} participants
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {/* Video Grid */}
        <div className="absolute inset-0 pb-20">
          <VideoGrid participants={participants} currentUserId={currentUser.id} />
        </div>

        {/* Teacher-only AI Actions Panel */}
        {isTeacher && (
          <div className="absolute top-4 right-4 w-72 space-y-3 z-10 hidden md:block">
            <AgenticAIActions actions={aiActions} isActive={isAIActive} />
          </div>
        )}

        {/* Student Motivation Popup */}
        {!isTeacher && (
          <MotivationPopup
            isVisible={showMotivation}
            message={motivationMessage}
            onDismiss={() => setShowMotivation(false)}
          />
        )}

        {/* Side Panels */}
        <ChatPanel
          messages={messages}
          currentUserId={currentUser.id}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onSendMessage={handleSendMessage}
        />

        <ParticipantsList
          participants={participants}
          isOpen={isParticipantsOpen}
          onClose={() => setIsParticipantsOpen(false)}
        />
      </main>

      {/* Control Bar */}
      <ControlBar
        isMuted={isMuted}
        isCameraOn={isCameraOn}
        isHandRaised={isHandRaised}
        isChatOpen={isChatOpen}
        isParticipantsOpen={isParticipantsOpen}
        onToggleMute={() => setIsMuted(!isMuted)}
        onToggleCamera={() => setIsCameraOn(!isCameraOn)}
        onToggleHand={() => setIsHandRaised(!isHandRaised)}
        onToggleChat={() => {
          setIsChatOpen(!isChatOpen);
          if (!isChatOpen) setIsParticipantsOpen(false);
        }}
        onToggleParticipants={() => {
          setIsParticipantsOpen(!isParticipantsOpen);
          if (!isParticipantsOpen) setIsChatOpen(false);
        }}
        onLeave={handleLeave}
      />

      {/* End Class Modal (Teacher Only) */}
      {isTeacher && (
        <EndClassModal
          isOpen={isEndModalOpen}
          onClose={() => setIsEndModalOpen(false)}
          onEndClass={handleEndClass}
          participantCount={participants.length}
        />
      )}

      {/* Class Summary Report (Teacher Only) */}
      {isTeacher && (
        <ClassSummaryReport
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onFinalizeEnd={handleFinalizeEnd}
        />
      )}
    </div>
    </div>
  );
};

export default ClassroomView;
