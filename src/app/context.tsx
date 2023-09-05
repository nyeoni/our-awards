import { createContext, useContext, useEffect, useState } from 'react';

import type { Award } from '@prisma/client';

const USER_AWARDS_API = '/api/user/award';

type UserAwardsContextType = {
  total: number;
  awards: { [key: number]: Award[] };
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export async function getAward(page: number = 1) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}${USER_AWARDS_API}?page=${page}`, {
      method: 'GET',
      next: { tags: ['award'] },
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (error) {
    console.log('???????????????????', error);
  }
}

const UserAwardsContext = createContext<UserAwardsContextType | null>(null);

// UserAwardsProvider.js
export const UserAwardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [total, setTotal] = useState(0);
  const [awards, setAwards] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const update = async () => {
      const data = await getAward(currentPage);
      setTotal(data.total);
      setAwards({ ...awards, [currentPage]: data.awards });
    };
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <UserAwardsContext.Provider value={{ awards, total, currentPage, setCurrentPage }}>
      {children}
    </UserAwardsContext.Provider>
  );
};

export const useUserAwardsContext = () => {
  const context = useContext(UserAwardsContext);
  if (!context) {
    throw new Error('useUserAwardsContext must be used within a UserAwardsProvider');
  }
  return context;
};
