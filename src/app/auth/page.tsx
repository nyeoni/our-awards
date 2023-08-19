import { Logo } from '@/component';
import { GoogleBtn, KakaoBtn, NaverBtn } from '@/component/oauth';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      <section className="flex justify-center my-8">
        <Logo />
      </section>
      <section className="flex flex-col w-full p-5 gap-2 justify-center">
        <NaverBtn />
        <KakaoBtn />
        <GoogleBtn />
      </section>
    </div>
  );
}
