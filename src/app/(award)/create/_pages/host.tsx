import { useState } from 'react';

import { Button, Input } from '@nextui-org/react';

import Toast from '@/components/toast/Toast';
import { useTargetInfoContext } from '@/contexts/TargetInfoProvider';

import type { PageComponent } from './type';

export const HostPage: PageComponent = ({ onNext }) => {
  const [isError, setIsError] = useState(false);
  const { name, host, setHost } = useTargetInfoContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setHost(e.target.value);
  };

  const handleClick = () => {
    if (host === '') {
      return setIsError(true);
    }
    onNext();
  };

  return (
    <>
      <section
        className="flex flex-col gap-3 justify-center h-full w-full"
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) {
            return;
          }
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
      >
        <label id="name">
          나는 <span className="text-bold text-primary">{name}</span> 님에게 어떤 사람인가요?
        </label>
        <span className="text-xs text-gray-200">상장 하단에 적힐 이름이에요! (예시: 너의베프)</span>
        <Input
          name="host"
          autoFocus={true}
          onChange={handleChange}
          minLength={1}
          maxLength={10}
          color="success"
          variant="underlined"
          aria-labelledby="name"
        />
        <Button
          size="lg"
          className="mt-5"
          variant="shadow"
          color="primary"
          radius="sm"
          fullWidth={true}
          onPress={handleClick}
        >
          상장 만들기
        </Button>
      </section>
      <Toast isVisible={isError} message="내용을 입력해주세요." onClose={() => setIsError(false)} />
    </>
  );
};
