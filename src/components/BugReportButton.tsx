'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import megaphoneImg from '@/public/assets/megaphone.png';

export default function BugReportButton() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  }, []);

  return (
    <div className="fixed bottom-24 ml-72 z-50">
      <Popover
        isOpen={isOpen}
        placement="left-end"
        classNames={{
          base: 'max-w-[280px]',
        }}
      >
        <PopoverTrigger>
          <Button
            size="lg"
            radius="lg"
            className="p-2 shadow-sm"
            isIconOnly
            aria-label="Report Bugs"
            onPress={() =>
              (location.href =
                'https://docs.google.com/forms/d/124sj6w2jaj7HiTH8D77xMMgF9MDL3-Bo43KlbpJ9LYI/edit?pli=1')
            }
          >
            <Image src={megaphoneImg.src} height={32} width={32} alt="Report Bugs" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">버그 & 기능 제안 양식 업데이트! 🌟</div>
            <p className="text-tiny">
              버그를 발견하셨거나 서비스 개선에 대한 멋진 아이디어가 있으시다면 클릭해주세요!
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
