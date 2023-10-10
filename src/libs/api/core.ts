export const getData = async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}${url}`);

  if (!res.ok) {
    throw new Error('SWRConfigProvider: Failed to fetch data');
  }
  return res.json();
};
