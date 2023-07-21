import { Configuration, OpenAIApi, CreateChatCompletionRequest } from 'openai';
import { NextResponse, NextRequest } from 'next/server';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_CHATGPT_API_KEY || '',
});
delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const requestPayload: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: body.input }],
  };
  const response = await openai.createChatCompletion(requestPayload);

  const content = response.data.choices[0]?.message?.content || '';
  return NextResponse.json(content);
}
