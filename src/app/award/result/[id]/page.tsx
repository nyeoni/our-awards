'use client';

import html2canvas from 'html2canvas';
import Lottie from 'lottie-react';
import { useRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@nextui-org/react';

import Toast from '@/component/toast/Toast';

import sparklesAnimation from '../sparkles_animation.json';
import BackIcon from '/public/svgs/back.svg';

async function getAward(id: string) {
  if (!id) return;
  const res = await fetch(`/api/award/${id}`);
  return res.json();
}

export default async function Page(
  { params }: { params: { id: string } } = { params: { id: '' } }
) {
  const captureRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { label, name, content, host, createdAt, sender } = await getAward(params.id);
  const date = new Date(createdAt);

  const handleShare = () => {
    const shareObject = {
      title: '너에게 상을 줄게',
      text: 'WEBISFREE.com',
      url: window.location.href,
    };

    if (navigator.share) {
      // Navigator를 지원하는 경우만 실행
      navigator
        .share(shareObject)
        .then(() => {
          // 정상 동작할 경우 실행
          alert('공유하기 성공');
        })
        .catch(error => {
          alert('에러가 발생했습니다.');
        });
    } else {
      // navigator를 지원하지 않는 경우
      console.log(pathname);
      navigator.clipboard
        .writeText(`${process.env.NEXT_PUBLIC_BASEURL}${pathname}`)
        .then(() => alert('링크가 클립보드에 복사되었습니다.'));
      // alert('페이지 공유를 지원하지 않습니다.');
    }
  };

  const handleSaveImage = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL();

    // Create a link to download the image
    const link = document.createElement('a');
    link.href = imgData;
    link.download = label + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <Link className="flex items-center text-sm w-fit py-2" href="/">
        <BackIcon style={{ color: 'white' }} />
        <span className="ml-0.5 text-xs font-medium">메인페이지로</span>
      </Link>
      <div>
        <section
          ref={captureRef}
          className="oa-result grow-1 mb-5 flex flex-col justify-between items-center p-[42px] font-uhbee-regular text-black"
        >
          <div className="flex flex-col items-center mt-5 w-full gap-5">
            <h1 className="font-uhbee-bold text-2xl">상장</h1>
            <div className="text-sm self-start">{label}상</div>
            <div className="text-sm self-end">이름: {name}</div>
          </div>
          <div className="text-xs text-center p-3">{content}</div>
          <div className="text-sm">
            {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
          </div>
          <div className="text-sm">
            {host} {sender.name}
          </div>
        </section>
        <section className="flex flex-col gap-y-2 grow-0">
          <Button color="primary" radius="sm" fullWidth={true} onClick={handleShare}>
            공유하기
          </Button>
          <Button
            color="primary"
            variant="light"
            radius="sm"
            fullWidth={true}
            onClick={handleSaveImage}
          >
            사진으로 저장하기
          </Button>
        </section>
      </div>
      <Toast isVisible={true} message="상장이 저장되었습니다." />
      <Lottie className="fixed top-10 left-0" animationData={sparklesAnimation} loop={false} />
    </div>
  );
}
