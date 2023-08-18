import { Button, Textarea } from '@nextui-org/react';

import { useTargetInfoContext } from '@/context/TargetInfoProvider';

import { PageComponent } from './type';

export const ContentPage: PageComponent = ({ onNext }) => {
  const { name, content, setContent } = useTargetInfoContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleClick = () => {
    if (content === '') {
      return alert('칭찬 내용을 입력해주세요.');
    } else if (content.length < 3) {
      return alert('칭찬 내용은 3글자 이상 적어주세요.');
    }
    onNext();
  };

  return (
    <>
      <section className="flex flex-col gap-3 justify-center h-full w-full">
        <label id="content">
          <span className="text-bold text-primary">{name}</span> 님을 칭찬하고 싶은 내용을 자유롭게
          적어주세요.
        </label>
        <Textarea
          name="content"
          onChange={handleChange}
          variant="bordered"
          color="success"
          fullWidth={true}
          placeholder="칭찬해주고 싶은 부분을 적어주세요."
          aria-labelledby="content"
        />
      </section>
      <Button className="mt-5" color="primary" radius="sm" fullWidth={true} onClick={handleClick}>
        확인
      </Button>
    </>
  );
};
