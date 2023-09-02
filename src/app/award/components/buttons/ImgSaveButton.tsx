import { toPng } from 'html-to-image';
import { RefObject } from 'react';

import { Button } from '@nextui-org/react';

import Toast, { useToast } from '@/component/toast/Toast';

export const ImgSaveButton = ({
  captureRef,
  imgName,
}: {
  captureRef: RefObject<HTMLDivElement>;
  imgName?: string;
}) => {
  const { isVisible, message, duration, open, close } = useToast();

  const handleSaveImage = async () => {
    if (!captureRef.current) return;

    toPng(captureRef.current, { cacheBust: true })
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
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
