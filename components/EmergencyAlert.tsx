'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

const EMERGENCY_KEYWORDS = [
  '자살', '죽고싶', '자해', '폭력', '학대', '성폭행', '협박', '맞았어', '때렸어'
];

interface EmergencyAlertProps {
  content: string;
}

export default function EmergencyAlert({ content }: EmergencyAlertProps) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const hasEmergency = EMERGENCY_KEYWORDS.some(keyword => content.includes(keyword));
    setShowAlert(hasEmergency);
  }, [content]);

  if (!showAlert) return null;

  return (
    <div className="bg-red-500/20 border-2 border-red-500 border-dashed rounded-xl p-4 my-6 text-red-100 flex items-start space-x-3">
      <AlertTriangle className="flex-shrink-0 text-red-500 mt-1" size={24} />
      <div>
        <h4 className="font-bold text-lg text-red-400 mb-1">긴급 도움 안내</h4>
        <p className="text-sm leading-relaxed">
          지금 즉시 위험한 상황이거나, 생명과 직결된 위급한 순간이라면 
          온라인 답장을 기다리지 마시고 <strong>가까운 보호자, 교사, 전문 상담기관(청소년전화 1388, 생명의 전화 1588-9191) 
          또는 경찰(112)</strong>에 즉시 도움을 요청해 주세요. 혼자 고민하지 마세요.
        </p>
      </div>
    </div>
  );
}
