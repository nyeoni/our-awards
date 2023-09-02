import type { RefObject } from 'react';

import { Button } from '@nextui-org/react';
import { toPng } from 'html-to-image';

import Toast, { useToast } from '@/component/toast/Toast';

export const ImgSaveButton = ({
  captureRef,
  imgName,
}: {
  captureRef: RefObject<HTMLDivElement>;
  imgName?: string;
}) => {
  const { isVisible, message, close } = useToast();

  const handleSaveImage = async () => {
    if (!captureRef.current) return;

    toPng(captureRef.current, { cacheBust: true })
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = imgName ?? '내상장.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Button
        size="lg"
        color="primary"
        variant="light"
        radius="sm"
        fullWidth={true}
        onPress={handleSaveImage}
      >
        사진으로 저장하기
      </Button>
      <Toast isVisible={isVisible} message={message} onClose={close} />
    </>
  );
};
