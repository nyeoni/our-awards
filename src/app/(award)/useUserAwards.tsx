const USER_AWARDS_API = '/api/user/award';
export async function getAward(page: number = 1) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}${USER_AWARDS_API}?page=${page}`, {
    method: 'GET',
    next: { tags: ['award'] },
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.group('res', res);
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
