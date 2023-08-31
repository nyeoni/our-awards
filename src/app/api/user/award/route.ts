import { getServerSession } from 'next-auth';

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import authOptions from '@/lib/authOptions';

import prisma from '../../prisma';

export async function GET(request: Request) {
  let session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const size = Number(searchParams.get('size') ?? '12');

  // 세션 검사
  if (!session) {
    // return NextResponse.redirect('/api/auth/signin');
    session = {
      user: {
        name: '김나연',
        email: 'skdusdl8804@gmail.com',
        picture:
          'https://lh3.googleusercontent.com/a/AAcHTtfvtu1rG54rsHg00IbKbAYBZuhCUFsYDwQG5C9oQF8b_zP6=s96-c',
        sub: 'cll56rclr00004lsot1rhv6qp',
        id: 'cll56rclr00004lsot1rhv6qp',
        emailVerified: null,
        image:
          'https://lh3.googleusercontent.com/a/AAcHTtfvtu1rG54rsHg00IbKbAYBZuhCUFsYDwQG5C9oQF8b_zP6=s96-c',
        iat: 1693389537,
        exp: 1695981537,
        jti: '5ca798ea-46f1-4a05-98e1-4124e5912d48',
      },
      expires: '2023-09-29T09:58:58.491Z',
    };
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

  revalidatePath('/api/user/award'); // 나중에 어떻게 잘 처리해보기

  return NextResponse.json({ id: award.id });
}
