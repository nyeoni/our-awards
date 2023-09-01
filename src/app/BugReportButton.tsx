'use client';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react';

import megaphoneImg from '@/public/assets/megaphone.png';

export default function BugReportButton() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  }, []);

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50">
      <Popover
        isOpen={isOpen}
        // onOpenChange={open => setIsOpen(open)}
        content="서비스에서 문제되는 부분을 알려주세요! 여러분들의 의견은 저희 서비스에 너무 큰 도움이 됩니다. 🙏"
        placement="right"
      >
        <PopoverTrigger>
          <Button
            size="md"
            radius="lg"
            className="p-1.5 shadow-sm"
            isIconOnly
            aria-label="Report Bugs"
            onPress={() => alert('hi')}
          >
            <img src={megaphoneImg.src} alt="Report Bugs" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
