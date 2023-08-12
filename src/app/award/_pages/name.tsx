import { Button, Input } from '@nextui-org/react';

import { PageComponent } from './type';

export const NamePage: PageComponent = ({ onNext, onValueChange }) => {
  return (
    <>
      <section className="flex flex-col gap-3 justify-center h-full">
        <label id="name">
          칭찬해주고 싶은 사람의 <span className="text-bold text-primary">이름</span> 을 적어주세요.
        </label>
        <Input
          name="name"
          onChange={onValueChange}
          minLength={1}
          maxLength={10}
          color="primary"
          variant="underlined"
          placeholder="이름"
          aria-labelledby="name"
        />
      </section>
      <Button color="primary" radius="sm" fullWidth={true} onClick={onNext}>
        확인
      </Button>
    </>
  );
};
