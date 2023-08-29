import { getServerSession } from 'next-auth';

import { NextResponse } from 'next/server';

import authOptions from '@/lib/authOptions';

import prisma from '../../prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  // 세션 검사
  if (!session) {
    return NextResponse.redirect('/api/auth/signin');
  }

  // 유저 찾기
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user) {
    console.log('user not found');
    return NextResponse.redirect('/api/auth/signin');
  }

  const awards = await prisma.award.findMany({
    where: { receiverId: user.id },
    include: { sender: true },
  });

  return NextResponse.json({ awards });
}
