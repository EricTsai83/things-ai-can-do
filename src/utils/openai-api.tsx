import {Configuration, OpenAIApi, CreateChatCompletionRequest} from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_CHATGPT_API_KEY || '',
});
delete configuration.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(configuration);

async function getChatGPTApi(input: string): Promise<string> {
  const requestPayload: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: input}],
  };

  const response = await openai.createChatCompletion(requestPayload);
  const content = response.data.choices[0]?.message?.content || '';
  return content;
}

export default getChatGPTApi;
