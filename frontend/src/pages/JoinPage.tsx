import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Participant } from '@/types/classroom';
import JoinClassScreen from '@/components/classroom/JoinClassScreen';
import PremiumBackground from '@/components/classroom/PremiumBackground';

const JoinPage = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();

  if (!classId) {
    return (
      <>
        <PremiumBackground />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Invalid class ID</p>
        </div>
      </>
    );
  }

  const handleJoinClass = (name: string) => {
    // Store the user and class info
    const user: Participant = {
      id: `student-${Date.now()}`,
      name,
      role: 'student',
      isMuted: true,
      isCameraOn: true,
    };

    // Navigate to classroom with state
    navigate(`/classroom/${classId}`, { state: { currentUser: user } });
  };

  return (
    <>
      <PremiumBackground />
      <JoinClassScreen meetingId={classId} onJoinClass={handleJoinClass} />
    </>
  );
};

export default JoinPage;
