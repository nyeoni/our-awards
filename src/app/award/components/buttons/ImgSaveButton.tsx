import html2canvas from 'html2canvas';
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
    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL();

    // Create a link to download the image
    const link = document.createElement('a');
    link.href = imgData;
    link.download = imgName ?? '내상장' + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button
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
