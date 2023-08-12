import { Button, Input } from '@nextui-org/react';

import { useTargetInfoContext } from '../page';
import { PageComponent } from './type';

export const HostPage: PageComponent = ({ onNext, onValueChange }) => {
  const { name } = useTargetInfoContext();
  return (
    <>
      <section className="flex flex-col gap-3 justify-center h-full w-full">
        <label id="name">
          나는 <span className="text-bold text-primary">{name}</span> 님에게 어떤 사람인가요?
        </label>
        <span className="text-xs">상장 하단에 적힐 이름이에요! (예시: 너의베프)</span>
        <Input
          name="host"
          onChange={onValueChange}
          minLength={1}
          maxLength={10}
          color="primary"
          variant="underlined"
          aria-labelledby="name"
        />
      </section>
      <Button
        className="mt-5"
        variant="shadow"
        color="primary"
        radius="sm"
        fullWidth={true}
        onClick={onNext}
      >
        상장 만들기
      </Button>
    </>
  );
};
