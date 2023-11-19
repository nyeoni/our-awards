'use client';

import { memo, useEffect, useState } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import { Toast, useToast } from '@/components';

type Device = 'ios' | 'android' | null;

const InAppInfoModal = () => {
  const [device, setDevice] = useState<Device>('android');
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isVisible, message, open, close } = useToast();

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/kakao|instagram|naver|facebook|twitter/i.test(userAgent)) {
      if (/iphone|ipad|ipod/i.test(userAgent)) {
        setDevice('ios');
      } else if (/android/i.test(userAgent)) {
        setDevice('android');
      }
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirectInAppBrowser = () => {
    location.href = `intent://${process.env.NEXT_PUBLIC_BASEURL}/#Intent;scheme=https;package=${
      device === 'ios' ? 'com.apple.mobilesafari' : 'com.android.chrome'
    };end;`;

    navigator.clipboard
      .writeText(location.href)
      .then(() => open('링크가 클립보드에 복사되었습니다.'));
    onClose();
  };

  if (device === null) return null;
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>기본 브라우저로 열기</ModalHeader>
              <ModalBody>
                인앱브라우저에서는 일부 기능이 정상적으로 작동하지 않을 수 있습니다.
                <p className="text-sm">크롬 등 기본브라우저 사용을 권장합니다.</p>
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-col w-full gap-1.5">
                  <Button
                    as="a"
                    target="_blank"
                    color="primary"
                    radius="sm"
                    size="lg"
                    fullWidth={true}
                    onClick={handleRedirectInAppBrowser}
                  >
                    기본 브라우저로 열기
                  </Button>
                  <Button variant="light" radius="sm" size="lg" fullWidth={true} onPress={onClose}>
                    그냥 볼래요
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toast isVisible={isVisible} message={message} onClose={close} />
    </>
  );
};

// export with memoization
export const InAppInfoModalMemo = memo(InAppInfoModal);
