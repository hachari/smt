export type LetterStatus = 'WAITING' | 'WRITING' | 'COMPLETED' | 'HIDDEN';

export interface Letter {
  id: string; // 접수번호 (Receipt Number)
  password: string;
  nickname: string;
  ageGroup: string;
  topic: string;
  replyStyle: string;
  title: string;
  content: string;
  isPublic: boolean;
  status: LetterStatus;
  createdAt: number;
  
  // 관리자 작성 항목
  replyContent?: string;
  repliedAt?: number;
  satisfaction?: 'GOOD' | 'BAD' | null;
}
