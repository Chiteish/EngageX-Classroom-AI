import { useState, useEffect } from 'react';
import { ClassroomScreen, Participant } from '@/types/classroom';
import CreateClassScreen from '@/components/classroom/CreateClassScreen';
import JoinClassScreen from '@/components/classroom/JoinClassScreen';
import ClassroomView from '@/components/classroom/ClassroomView';
import PremiumBackground from '@/components/classroom/PremiumBackground';

const Index = () => {
  const [screen, setScreen] = useState<ClassroomScreen>('create');
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<Participant | null>(null);

  // Check URL for join parameter (student flow)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joinId = params.get('join');
    if (joinId) {
      setMeetingId(joinId);
      setScreen('join');
    }
  }, []);

  const handleStartClass = (id: string) => {
    setMeetingId(id);
    setCurrentUser({
      id: 'teacher-1',
      name: 'Teacher',
      role: 'teacher',
      isMuted: false,
      isCameraOn: true,
    });
    setScreen('classroom');
    // Clear URL params
    window.history.replaceState({}, '', window.location.pathname);
  };

  const handleJoinClass = (name: string) => {
    setCurrentUser({
      id: `student-${Date.now()}`,
      name,
      role: 'student',
      isMuted: true,
      isCameraOn: true,
    });
    setScreen('classroom');
    // Clear URL params
    window.history.replaceState({}, '', window.location.pathname);
  };

  const handleLeaveClass = () => {
    setCurrentUser(null);
    setMeetingId(null);
    setScreen('create');
  };

  return (
    <>
      <PremiumBackground />
      
      {screen === 'create' && (
        <CreateClassScreen onStartClass={handleStartClass} />
      )}

      {screen === 'join' && meetingId && (
        <JoinClassScreen meetingId={meetingId} onJoinClass={handleJoinClass} />
      )}

      {screen === 'classroom' && currentUser && meetingId && (
        <ClassroomView
          currentUser={currentUser}
          meetingId={meetingId}
          onLeaveClass={handleLeaveClass}
        />
      )}
    </>
  );
};

export default Index;
