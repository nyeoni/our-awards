import { useEffect, useState } from 'react';

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    // 초기 크기 설정
    handleResize();

    // cleanup: resize 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []); // 빈 의존성 배열을 사용하여 이펙트를 마운트 시점에만 실행

  return windowSize;
}

export default useWindowSize;
