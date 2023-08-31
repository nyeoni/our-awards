import { createContext, useContext, useEffect, useState } from 'react';

import { Award } from '@prisma/client';

const USER_AWARDS_API = '/api/user/award';

type UserAwardsContextType = {
  total: number;
  awards: { [key: number]: Award[] };
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

const UserAwardsContext = createContext<UserAwardsContextType | null>(null);

// UserAwardsProvider.js
export const UserAwardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [total, setTotal] = useState(0);
  const [awards, setAwards] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const update = async () => {
      const res = await fetch(`${USER_AWARDS_API}?page=${currentPage}`, {
        next: { tags: ['award'] },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setTotal(data.total);
      setAwards({ ...awards, [currentPage]: data.awards });
    };
    update();
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
