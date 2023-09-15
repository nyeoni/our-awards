import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
import { getAward } from './getAwards';

const resource = getAward();

export default function Intro() {
  const { data: session } = useSession();
  // const [total, setTotal] = useState(0);
  const data = resource.read();

  console.log('suspense', data);
  // useEffect(() => {
  //   const update = async () => {
  //     // const data = await getAward();
  //     if (data) {
  //       setTotal(data.total);
  //     }
  //   };
  //   update();
  // }, []);

  return (
    <>
      <div className="font-uhbee-regular text-2xl">{session?.user.name} 님은</div>
      <div className="font-uhbee-regular text-2xl">
        총 <span className="text-secondary">{data.total}</span> 개의 상을 받았습니다.
      </div>
    </>
  );
}
