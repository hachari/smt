'use server';

import { store, Letter } from '@/lib/store';

// 고민 편지 보내기
export async function submitLetter(formData: FormData) {
  const nickname = formData.get('nickname') as string;
  const ageGroup = formData.get('ageGroup') as string;
  const topic = formData.get('topic') as string;
  const replyStyle = formData.get('replyStyle') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const isPublic = formData.get('isPublic') === 'on';

  // 무작위 접수번호 (예: 4자리-4자리) 및 비밀번호 생성
  const id = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const password = Math.floor(1000 + Math.random() * 9000).toString();

  const newLetter: Letter = {
    id,
    password,
    nickname,
    ageGroup,
    topic,
    replyStyle,
    title,
    content,
    isPublic,
    status: 'WAITING',
    createdAt: Date.now(),
  };

  store.addLetter(newLetter);

  return { success: true, id, password };
}

// 답장 확인하기 (인증)
export async function checkReplyAuth(id: string, password: string) {
  const letter = store.getLetterById(id);
  if (!letter) {
    return { success: false, message: '존재하지 않는 접수번호입니다.' };
  }
  if (letter.password !== password) {
    return { success: false, message: '비밀번호가 일치하지 않습니다.' };
  }
  return { success: true, letter };
}

// 공개 게시판 글 가져오기
export async function getPublicLetters() {
  return store.getLetters()
    .filter(l => l.isPublic && l.status !== 'HIDDEN')
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(l => ({
      id: l.id,
      title: l.title,
      topic: l.topic,
      replyStyle: l.replyStyle,
      createdAt: l.createdAt,
      status: l.status,
    }));
}

// 만족도 평가
export async function submitSatisfaction(id: string, satisfaction: 'GOOD' | 'BAD') {
  store.updateLetter(id, { satisfaction });
  return { success: true };
}

// (관리자용) 전체 목록 가져오기
export async function adminGetLetters() {
  return store.getLetters().sort((a, b) => b.createdAt - a.createdAt);
}

// (관리자용) 답장 작성 / 수정 / 상태 변경
export async function adminUpdateLetter(id: string, updates: Partial<Letter>) {
  store.updateLetter(id, updates);
  return { success: true };
}
