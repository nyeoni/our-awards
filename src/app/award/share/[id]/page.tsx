'use client';

import { useSession } from 'next-auth/react';
import { useRef } from 'react';

import { redirect, useRouter } from 'next/navigation';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import {
  Award,
  ImgSaveButton,
  NavigateButton,
  ShareButton,
  SparklesAnimation,
} from '../../components';

async function getAward(id: string) {
  if (!id) return;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/award/${id}`);
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  // 여기서 수여받은 기록이 있는지 없는지 확인하고
  // 이미 수여받아져 있으면 -> 다른 멋있는 뷰를 보여주고,
  // 수여받지 않았으면 -> 수여받을 수 있는 버튼을 보여준다. -> 버튼을 클릭하면 -> 모달이 뜨고, 정말 그 사람이 맞는지 확인하는 로직을 추가한다.
  const captureRef = useRef<HTMLDivElement>(null);
  const award = await getAward(params.id);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <NavigateButton path="/" />
      <div ref={captureRef}>
        <Award award={award} />
      </div>
      <section className="flex flex-col gap-y-2 grow-0">
        {/* <ShareButton id={params.id} /> */}
        <TakenAwardButton id={params.id} />
        <ImgSaveButton captureRef={captureRef} />
      </section>
      <SparklesAnimation />
    </div>
  );
}

const TakenAwardButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const { status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleTakenAward = async () => {
    // auth 로그인이 안되어있는 유저일때
    console.log('handleTakenAward');
    if (status === 'unauthenticated') {
      // 로그인 페이지로 이동
      return router.push(`/auth?callbackUrl=/award/share/${id}`);
    }
    // auth 로그인이 되어있는 유저일때
    // 수여받기 api 호출
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/user/award`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ awardId: id }),
      });

      console.log('share', res);
      
    } catch (error) {}
  };

  return (
    <>
      <Button color="primary" radius="sm" fullWidth={true} onPress={onOpen}>
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
  );
};
