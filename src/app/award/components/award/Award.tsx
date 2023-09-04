import type { Award, User } from '@prisma/client';

export default function Award({ award }: { award: Award & { sender: User } }) {
  const { label, name, content, createdAt, host, sender } = award;
  const date = new Date(createdAt);

  return (
    <section className="oa-result grow-1 mb-5 flex flex-col justify-between items-center p-[42px] font-uhbee-regular text-black">
      <div className="flex flex-col items-center mt-5 w-full gap-5">
        <h1 className="font-uhbee-bold text-2xl">상장</h1>
        <div className="text-sm self-start">{label}</div>
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
  );
}
