import { createContext, useContext, useState } from 'react';

type TargetInfo = {
  name: string;
  content: string;
  host: string;
};

type TargetInfoContextType = TargetInfo & {
  setName: (value: string) => void;
  setContent: (value: string) => void;
  setHost: (value: string) => void;
};

const TargetInfoContext = createContext<TargetInfoContextType | null>(null);

export default function TargetInfoProvider({ children }: { children: React.ReactNode }) {
  const [targetInfo, setTargetInfo] = useState<TargetInfo>({
    name: '',
    content: '',
    host: '',
  });
  const { name, content, host } = targetInfo;

  const setName = (name: string) => {
    setTargetInfo({ ...targetInfo, name });
  };

  const setContent = (content: string) => {
    setTargetInfo({ ...targetInfo, content });
  };

  const setHost = (host: string) => {
    setTargetInfo({ ...targetInfo, host });
  };

  return (
    <TargetInfoContext.Provider value={{ name, content, host, setName, setContent, setHost }}>
      {children}
    </TargetInfoContext.Provider>
  );
}

export const useTargetInfoContext = () => {
  const context = useContext(TargetInfoContext);
  if (!context) {
    throw new Error('useTargetInfoContext must be used within a TargetInfoContext');
  }
  return context;
};
