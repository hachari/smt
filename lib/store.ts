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

// In-memory store (Vercel Serverless 환경에서는 Cold Start 시 초기화됩니다)
let letters: Letter[] = [];

export const store = {
  getLetters: () => letters,
  addLetter: (letter: Letter) => {
    letters.push(letter);
  },
  getLetterById: (id: string) => {
    return letters.find(l => l.id === id);
  },
  updateLetter: (id: string, updates: Partial<Letter>) => {
    letters = letters.map(l => (l.id === id ? { ...l, ...updates } : l));
  },
  deleteLetter: (id: string) => {
    letters = letters.filter(l => l.id !== id);
  },
  // 서버 초기화 방지용(필요시 더미 데이터 삽입 가능)
  seedDummyData: () => {
    if (letters.length === 0) {
      letters.push({
        id: '1234-5678',
        password: '0000',
        nickname: '고민쟁이',
        ageGroup: '고등학생',
        topic: '진로',
        replyStyle: '토닥 채리',
        title: '미래가 너무 불안해요',
        content: '제가 정말 잘할 수 있는 게 뭔지 모르겠어요. 친구들은 다들 꿈이 있는데 저만 제자리걸음인 것 같아요.',
        isPublic: true,
        status: 'COMPLETED',
        createdAt: Date.now() - 86400000,
        replyContent: '고민쟁이님, 남들과 비교하며 조급해하지 않아도 괜찮아요. 누구나 자신만의 속도가 있답니다. (현실 점검) 지금 당장 거창한 꿈이 없더라도, 내가 좋아하는 작은 것부터 하나씩 시도해보면 어떨까요? (실천) 오늘 하루 내가 즐거웠던 일 3가지를 적어보는 것부터 시작해봐요! 채리 선생님이 항상 응원할게요.',
        repliedAt: Date.now(),
        satisfaction: 'GOOD'
      });
    }
  }
};

// 최초 로드 시 더미 데이터 삽입
store.seedDummyData();
