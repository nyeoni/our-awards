import wrapPromise from '@/lib/wrapPromise';

const USER_AWARDS_API = '/api/user/award';
export function getAward(page: number = 1) {
  const suspender = fetch(`${process.env.NEXT_PUBLIC_BASEURL}${USER_AWARDS_API}?page=${page}`, {
    method: 'GET',
    next: { tags: ['award'] },
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    console.log('res', res);
    return res.json();
  });

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }
  return wrapPromise(suspender);
}
