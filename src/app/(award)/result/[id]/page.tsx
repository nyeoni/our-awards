import type { Metadata, ResolvingMetadata } from 'next';

import type { User } from 'next-auth';

import type { Award } from '@prisma/client';

import { AwardResult } from '../AwardResult';
import { SparklesAnimation } from '../SparklesAnimation';

export const revalidate = 3600;

export interface AwardDto extends Award {
  sender: User;
  receiver: User;
}

async function getAwardById(id: string): Promise<AwardDto> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/award/${id}`, {
    method: 'GET',
    cache: 'force-cache',
    next: { tags: ['award'] },
  });
  return res.json();
}

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await getAwardById(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.label,
    openGraph: {
      title: '우리들의 시상식',
      description: `${product.name}님에게 상이 도착했어요!`,
      images: ['/assets/preview.png', ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const award = await getAwardById(params.id);

  return (
    <>
      <AwardResult award={award} />
      <SparklesAnimation />
    </>
  );
}
