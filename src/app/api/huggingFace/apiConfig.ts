export const HOSTNAME = 'https://api-inference.huggingface.co/models';
export const HEADER = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN}`,
};
