import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import authOptions from '@/lib/authOptions';

import prisma from '../../prisma';

export async function GET(request: Request) {
  let session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const size = Number(searchParams.get('size') ?? '12');

  // 세션 검사
  if (!session) {
    return NextResponse.redirect('/api/auth/signin');
  }

  const { user } = session;

  const data = await prisma.$transaction([
    prisma.award.count({ where: { receiverId: user.id } }),
    prisma.award.findMany({
      skip: (page - 1) * size,
      take: size,
      where: { receiverId: user.id },
      include: { sender: true },
    }),
  ]);

  return NextResponse.json({
    total: data[0],
    awards: data[1],
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect('/api/auth/signin');
  }

  const { awardId } = await request.json();

  // 여기에 try catch 넣어야함?
  const award = await prisma.award.update({
    where: { id: awardId },
    data: { receiverId: session.user.id },
  });

  revalidateTag('award');

  return NextResponse.json({ id: award.id });
}
