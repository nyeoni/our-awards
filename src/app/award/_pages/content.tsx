import { Button, Textarea } from '@nextui-org/react';

import { useTargetInfoContext } from '../page';
import { PageComponent } from './type';

export const ContentPage: PageComponent = ({ onNext, onValueChange }) => {
  const { name } = useTargetInfoContext();
  return (
    <>
      <section className="flex flex-col gap-3 justify-center h-full w-full">
        <label id="content">
          <span className="text-bold text-primary">{name}</span> 님을 칭찬하고 싶은 내용을 자유롭게
          적어주세요.
        </label>
        <Textarea
          name="content"
          onChange={onValueChange}
          color="default"
          fullWidth={true}
          placeholder="칭찬해주고 싶은 부분을 적어주세요."
          aria-labelledby="content"
        />
      </section>
      <Button className="mt-5" color="primary" radius="sm" fullWidth={true} onClick={onNext}>
        확인
      </Button>
    </>
  );
};
