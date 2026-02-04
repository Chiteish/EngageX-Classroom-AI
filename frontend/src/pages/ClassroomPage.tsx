import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Participant } from '@/types/classroom';
import ClassroomView from '@/components/classroom/ClassroomView';
import PremiumBackground from '@/components/classroom/PremiumBackground';

interface LocationState {
  currentUser?: Participant;
}

const ClassroomPage = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<Participant | null>(null);

  useEffect(() => {
    // Get user from navigation state
    const state = location.state as LocationState;
    if (state?.currentUser) {
      setCurrentUser(state.currentUser);
    } else if (!currentUser) {
      // If no user data, redirect to join page
      navigate(`/join/${classId}`);
    }
  }, [classId, navigate, currentUser, location.state]);

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

  if (!currentUser) {
    return (
      <>
        <PremiumBackground />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </>
    );
  }

  const handleLeaveClass = () => {
    navigate('/');
  };

  return (
    <>
      <PremiumBackground />
      <ClassroomView
        currentUser={currentUser}
        meetingId={classId}
        onLeaveClass={handleLeaveClass}
      />
    </>
  );
};

export default ClassroomPage;
