import { on } from 'events';

import { Button, Input } from '@nextui-org/react';

import { useTargetInfoContext } from '@/context/TargetInfoProvider';

import { PageComponent } from './type';

export const NamePage: PageComponent = ({ onNext }) => {
  const { name, setName } = useTargetInfoContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setName(e.target.value);
  };

  const handleClick = () => {
    if (name === '') {
      return alert('이름을 입력해주세요.');
    }
    onNext();
  };

  return (
    <>
      <section className="flex flex-col gap-3 justify-center w-full h-full">
        <label id="name">
          칭찬해주고 싶은 사람의 <span className="text-bold text-primary">이름</span> 을 적어주세요.
        </label>
        <Input
          name="name"
          onChange={handleChange}
          minLength={1}
          maxLength={10}
          color="success"
          variant="underlined"
          placeholder="이름"
          aria-labelledby="name"
        />
      </section>
      <Button color="primary" radius="sm" fullWidth={true} onClick={handleClick}>
        확인
      </Button>
    </>
  );
};
