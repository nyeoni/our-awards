import { NextResponse } from 'next/server';

import prisma from '../../prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id; // 'a', 'b', or 'c'

  const award = await prisma.award.findUnique({
    where: { id },
    include: { sender: true, receiver: true },
  });

  if (!award) {
    return console.log('award not found');
  }
  return NextResponse.json(award);
}
