import { getServerSession } from 'next-auth/next';
import { Configuration, OpenAIApi } from 'openai';

import { NextResponse } from 'next/server';

import authOptions from '@/lib/authOptions';

import prisma from '../prisma';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function extractName(str: string) {
  const idx = str.indexOf(': ');

  if (idx !== -1) {
    return str.substring(idx + 2);
  }
  return str; // 혹은 빈 문자열("")을 반환하도록 할 수도 있습니다.
}

function splitAtFirstNewline(str: string) {
  const idx = str.indexOf('\n');

  if (idx !== -1) {
    return [str.substring(0, idx), str.substring(idx + 1)];
  }
  return [str]; // 만약 '\n'이 문자열에 없다면 원래 문자열을 그대로 반환합니다.
}

function removeSurroundingQuotes(str: string) {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.substring(1, str.length - 1);
  } else if (str.startsWith("'") && str.endsWith("'")) {
    return str.substring(1, str.length - 1);
  }
  return str; // 따옴표로 둘러싸여 있지 않은 경우 원래 문자열 반환
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect('/api/auth/signin');
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user) {
    console.log('user not found');
    return NextResponse.redirect('/api/auth/signin');
  }

  // Error Handling 어케할지 고민

  const { name, content, host }: { name: string; content: string; host: string } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: '너는 상장의 이름과 내용을 만들어주는 인공지능이야.',
      },
      {
        role: 'user',
        content: `다음은 칭찬의 내용을 포함하는 상장을 만드는 시나리오입니다. 칭찬 내용: ${content}. 상장이름은 8글자 이내로 지어주고, 상장내용은 칭찬 내용을 바탕으로 "위 사람은" 으로 시작해서 "무엇으로 어떤 것을 하여" 는 칭찬 내용을 바탕으로 함체로 간단하게 채워서 넣어주고, 마지막은 "이를 칭찬하여 이 상장을 수여함" 으로 끝나는 형식으로 만들어줘.`,
      },
    ],
    temperature: 0.5,
    max_tokens: 200,
  });
  console.log('chatgpt request', response.data.choices[0]);

  const message = response.data.choices[0].message?.content;
  if (!message) {
    throw Error('message is null');
  }
  let [label, newContent] = splitAtFirstNewline(message).map(str =>
    removeSurroundingQuotes(extractName(str).trim())
  );

  if (label.at(-1) !== '상') {
    label += '상';
  }
  console.log('result', label, newContent);

  // db 에 저장
  const newAward = await prisma.award.create({
    data: {
      label,
      name,
      content: newContent,
      host,
      senderId: user.id,
    },
  });

  // Return the response from the OpenAI API
  return NextResponse.json({ id: newAward.id });
}
