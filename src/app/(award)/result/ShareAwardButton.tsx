import { Button } from '@nextui-org/react';
import type { Award } from '@prisma/client';

import { Toast, useToast } from '@/components';
import { ROUTE } from '@/constants/route';

export const ShareAwardButton = ({ award }: { award: Award }) => {
  const { isVisible, message, open, close } = useToast();
  const { id } = award;

  const handleShare = () => {
    const shareObject = {
      title: '우리들의 시상식',
      text: `${award.name}님에게 ${award.label}이 도착했어요!`, // 이거 바꿔야함
      url: `${process.env.NEXT_PUBLIC_BASEURL}${ROUTE.AWARD.RESULT}/${id}`,
    };

    if (navigator.share) {
      // Navigator를 지원하는 경우만 실행
      navigator
        .share(shareObject)
        .then(() => {
          // 정상 동작할 경우 실행
          open('공유하기 성공');
        })
        .catch(error => {
          open('에러가 발생했습니다.');
          throw error;
        });
    } else {
      // navigator를 지원하지 않는 경우
      console.log(`${process.env.NEXT_PUBLIC_BASEURL}${ROUTE.AWARD.RESULT}/${id}`);
      navigator.clipboard
        .writeText(`${process.env.NEXT_PUBLIC_BASEURL}${ROUTE.AWARD.RESULT}/${id}`)
        .then(() => open('링크가 클립보드에 복사되었습니다.'));
    }
  };

  return (
    <>
      <Button size="lg" color="primary" radius="sm" fullWidth={true} onPress={handleShare}>
        공유하기
      </Button>
      <Toast isVisible={isVisible} message={message} onClose={close} />
    </>
  );
};
