import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';

import authOptions from '@/libs/authOptions';

import prisma from '../../prisma';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: authOptions.secret });

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const size = Number(searchParams.get('size') ?? '12');

  // 세션 검사
  if (!token) {
    return NextResponse.json({ error: 'Token is missing' }, { status: 401 });
    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASEURL}/api/auth/signin`);
  }

  console.log('GET /user/award', token);

  const data = await prisma.$transaction([
    prisma.award.count({ where: { receiverId: token.sub } }),
    prisma.award.findMany({
      skip: (page - 1) * size,
      take: size,
      where: { receiverId: token.sub },
      include: { sender: true },
    }),
  ]);

  return NextResponse.json({
    total: data[0],
    awards: data[1],
  });
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret: authOptions.secret });

  if (!token) {
    return NextResponse.redirect('/api/auth/signin');
  }

  const { awardId } = await request.json();

  // 여기에 try catch 넣어야함?
  const award = await prisma.award.update({
    where: { id: awardId },
    data: { receiverId: token.id },
  });

  revalidateTag('award');

  return NextResponse.json({ id: award.id });
}
