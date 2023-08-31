async function getAward(id: string) {
  if (!id) return;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/award/${id}`);
  return res.json();
}

export default async function Award({ awardId }: { awardId: string }) {
  const { label, name, content, host, createdAt, sender } = await getAward(awardId);
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
