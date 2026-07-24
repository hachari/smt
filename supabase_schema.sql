-- Supabase SQL Editor에 복사하여 실행하세요.

-- 1. letters 테이블 생성
CREATE TABLE public.letters (
    id TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    nickname TEXT NOT NULL,
    age_group TEXT NOT NULL,
    topic TEXT NOT NULL,
    reply_style TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'WAITING', -- 'WAITING', 'WRITING', 'COMPLETED', 'HIDDEN'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    reply_content TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    satisfaction TEXT -- 'GOOD' or 'BAD'
);

-- 2. RLS (Row Level Security) 설정
-- 이 서비스는 관리자만 전체 조회가 가능하고, 일반 유저는 서버 액션을 통해서만 데이터를 조작하므로
-- 클라이언트에서 직접 쿼리하는 것을 막거나 서비스 키를 사용하는 백엔드를 위해 RLS를 기본적으로 활성화합니다.
ALTER TABLE public.letters ENABLE ROW LEVEL SECURITY;

-- 서버(Next.js Server Actions)에서 서비스 키(Service Role)가 아닌 
-- 익명 키(Anon Key)로 접근할 경우를 대비한 모든 권한 허용 정책 (임시/MVP용)
-- (실제 프로덕션에서는 서버에서만 통신하더라도 권한을 더 엄격하게 제한하는 것이 좋습니다.)
CREATE POLICY "Allow all operations for anon" ON public.letters FOR ALL USING (true);
