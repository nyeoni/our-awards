import { on } from 'events';
import { useState } from 'react';

import { Button, Input } from '@nextui-org/react';

import Toast from '@/component/toast/Toast';
import { useTargetInfoContext } from '@/context/TargetInfoProvider';

import { PageComponent } from './type';

export const NamePage: PageComponent = ({ onNext }) => {
  const [isError, setIsError] = useState(false);
  const { name, setName } = useTargetInfoContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setName(e.target.value);
  };

  const handleClick = () => {
    if (name === '') {
      return setIsError(true);
    }
    onNext();
  };

  return (
    <>
      <section
        className="flex flex-col gap-3 justify-center w-full h-full"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
      >
        <label id="name">
          칭찬해주고 싶은 사람의 <span className="text-bold text-primary">이름</span> 을 적어주세요.
        </label>
        <Input
          name="name"
          autoFocus={true}
          onChange={handleChange}
          minLength={1}
          maxLength={10}
          color="success"
          variant="underlined"
          placeholder="이름"
          aria-labelledby="name"
        />
        <Button
          size="lg"
          color="primary"
          className="mt-5"
          radius="sm"
          fullWidth={true}
          onPress={handleClick}
        >
          확인
        </Button>
      </section>
      <Toast isVisible={isError} message="이름을 입력해주세요." onClose={() => setIsError(false)} />
    </>
  );
};
