'use server';

import { supabase } from '@/lib/supabase';
import { Letter } from '@/lib/store';

// 에러 처리 헬퍼
function checkSupabase() {
  if (!supabase) {
    throw new Error('Supabase 클라이언트가 초기화되지 않았습니다. 환경변수를 확인해주세요.');
  }
}

// 고민 편지 보내기
export async function submitLetter(formData: FormData) {
  checkSupabase();

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

  const { error } = await supabase!.from('letters').insert([
    {
      id,
      password,
      nickname,
      age_group: ageGroup,
      topic,
      reply_style: replyStyle,
      title,
      content,
      is_public: isPublic,
      status: 'WAITING',
    }
  ]);

  if (error) {
    console.error('Supabase Insert Error:', error);
    return { success: false, message: 'DB 저장 중 오류가 발생했습니다.' };
  }

  return { success: true, id, password };
}

// 답장 확인하기 (인증)
export async function checkReplyAuth(id: string, password: string) {
  checkSupabase();

  const { data, error } = await supabase!
    .from('letters')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return { success: false, message: '존재하지 않는 접수번호입니다.' };
  }
  
  if (data.password !== password) {
    return { success: false, message: '비밀번호가 일치하지 않습니다.' };
  }

  // DB 컬럼명을 프론트엔드 모델(camelCase)로 변환
  const letter: Letter = {
    id: data.id,
    password: data.password,
    nickname: data.nickname,
    ageGroup: data.age_group,
    topic: data.topic,
    replyStyle: data.reply_style,
    title: data.title,
    content: data.content,
    isPublic: data.is_public,
    status: data.status,
    createdAt: new Date(data.created_at).getTime(),
    replyContent: data.reply_content,
    repliedAt: data.replied_at ? new Date(data.replied_at).getTime() : undefined,
    satisfaction: data.satisfaction,
  };

  return { success: true, letter };
}

// 공개 게시판 글 가져오기
export async function getPublicLetters() {
  checkSupabase();

  const { data, error } = await supabase!
    .from('letters')
    .select('id, title, topic, reply_style, status, created_at')
    .eq('is_public', true)
    .neq('status', 'HIDDEN')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map(l => ({
    id: l.id,
    title: l.title,
    topic: l.topic,
    replyStyle: l.reply_style,
    status: l.status,
    createdAt: new Date(l.created_at).getTime(),
  }));
}

// 만족도 평가
export async function submitSatisfaction(id: string, satisfaction: 'GOOD' | 'BAD') {
  checkSupabase();

  const { error } = await supabase!
    .from('letters')
    .update({ satisfaction })
    .eq('id', id);

  if (error) return { success: false };
  return { success: true };
}

// (관리자용) 전체 목록 가져오기
export async function adminGetLetters() {
  checkSupabase();

  const { data, error } = await supabase!
    .from('letters')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map(data => ({
    id: data.id,
    password: data.password,
    nickname: data.nickname,
    ageGroup: data.age_group,
    topic: data.topic,
    replyStyle: data.reply_style,
    title: data.title,
    content: data.content,
    isPublic: data.is_public,
    status: data.status,
    createdAt: new Date(data.created_at).getTime(),
    replyContent: data.reply_content,
    repliedAt: data.replied_at ? new Date(data.replied_at).getTime() : undefined,
    satisfaction: data.satisfaction,
  }));
}

// (관리자용) 답장 작성 / 수정 / 상태 변경
export async function adminUpdateLetter(id: string, updates: Partial<Letter>) {
  checkSupabase();

  // 프론트엔드 모델(camelCase)을 DB 컬럼명(snake_case)으로 변환
  const dbUpdates: any = {};
  if (updates.replyContent !== undefined) dbUpdates.reply_content = updates.replyContent;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.isPublic !== undefined) dbUpdates.is_public = updates.isPublic;
  if (updates.repliedAt !== undefined) dbUpdates.replied_at = updates.repliedAt ? new Date(updates.repliedAt).toISOString() : null;

  const { error } = await supabase!
    .from('letters')
    .update(dbUpdates)
    .eq('id', id);

  if (error) {
    console.error('Supabase Update Error:', error);
    return { success: false };
  }
  return { success: true };
}
