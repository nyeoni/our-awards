'use client';

import { useEffect } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

export default function Page() {
  const { onClose } = useDisclosure();

  useEffect(() => {
    const agent = navigator.userAgent.toLowerCase();
    // 아이폰 / 안드로이드 구분
    if (agent.match(/iPhone|iPad/i)) {
      // 아이폰 접속 경우
      console.log('');
      console.log('[window ready] : [접속 모바일] : ' + '[아이폰]');
      console.log('');
      // 아이폰의 경우 현재 방법이 막혔습니다..
    } else {
      // 안드로이드 접속 경우
      console.log('');
      console.log('[window ready] : [접속 모바일] : ' + '[안드로이드]');
      console.log('');
      // 크롬으로 새창 열기
      location.href =
        'intent://' +
        location.href.replace(/https?:\/\//i, '') +
        '#Intent;scheme=http;package=com.android.chrome;end';
    }
  }, []);

  const handleRedirectInAppBrowser = () => {
    location.href = 'intent:https://ourawards.net#Intent;end';
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalContent>
        <ModalHeader>브라우저로 열기</ModalHeader>
        <ModalBody>인앱브라우저에서는 정상적으로 작동하지 않을 수 있습니다.</ModalBody>
        <ModalFooter>
          <Button
            as="a"
            target="_blank"
            color="primary"
            size="lg"
            radius="sm"
            fullWidth={true}
            onClick={handleRedirectInAppBrowser}
          >
            기본 브라우저로 열기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
