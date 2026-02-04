export type UserRole = 'teacher' | 'student';

export interface Participant {
  id: string;
  name: string;
  role: UserRole;
  isMuted: boolean;
  isCameraOn: boolean;
  isSpeaking?: boolean;
  handRaised?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}

export interface AIAction {
  id: string;
  message: string;
  timestamp: Date;
}

export type ClassroomScreen = 'create' | 'join' | 'classroom';

export interface ClassroomState {
  screen: ClassroomScreen;
  meetingId: string | null;
  currentUser: Participant | null;
  participants: Participant[];
  messages: ChatMessage[];
  aiActions: AIAction[];
  isAIActive: boolean;
}
