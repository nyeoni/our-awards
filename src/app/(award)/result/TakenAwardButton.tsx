import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import type { Award } from '@prisma/client';

import { Toast, useToast } from '@/components';
import { ROUTE } from '@/constants/route';

import { ShareAwardButton } from './ShareAwardButton';

export const TakenAwardButton = ({ award }: { award: Award }) => {
  const router = useRouter();
  const [isTaken, setIsTaken] = useState(false);
  const { status } = useSession();
  const { isVisible, message, open, close } = useToast();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { id } = award;

  const handleTakenAward = async () => {
    // auth 로그인이 안되어있는 유저일때 - '로그인이 필요합니다' 와 함께 로그인페이지로 리다이렉트
    if (status === 'unauthenticated') {
      return router.push(
        `${ROUTE.AUTH.LOGIN}?callbackUrl=${ROUTE.AWARD.RESULT}/${id}&error=Unauthorized`
      );
    }
    // auth 로그인이 되어있는 유저일때 - 수여받기 api 호출
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/user/award`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ awardId: id }),
      });
      onClose();
      open("상장을 수여받았습니다! '공유하기' 버튼을 눌러서 친구들에게 공유해보세요!");
      setIsTaken(true);
    } catch (error) {
      throw new Error('수여받기 실패');
    }
  };

  return (
    <>
      {isTaken ? (
        <ShareAwardButton award={award} />
      ) : (
        <>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-teal-400 text-white shadow-lg"
            radius="sm"
            fullWidth={true}
            onPress={onOpen}
          >
            수여받기
          </Button>

          <Modal backdrop="opaque" isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
            <ModalContent>
              {onClose => (
                <>
                  <ModalHeader>수여받기</ModalHeader>
                  <ModalBody>
                    <p>상장을 수여받는게 본인이 맞나요?</p>
                    <p className="text-xs text-gray-300">
                      상장 수여는 한 번만 가능합니다. 수여를 진행하시면 다시 되돌릴 수 없습니다.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="light" fullWidth={true} onPress={onClose}>
                      아니요
                    </Button>
                    <Button color="primary" fullWidth={true} onPress={handleTakenAward}>
                      맞아요
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
      <Toast isVisible={isVisible} message={message} onClose={close} />
    </>
  );
};
