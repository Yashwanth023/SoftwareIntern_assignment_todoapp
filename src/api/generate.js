import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Provide step-by-step instructions on how to do the following task: ${prompt}`,
      max_tokens: 150,
      temperature: 0.6,
    });

    res.status(200).json({ result: completion.data.choices[0].text.trim() });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'An error occurred while generating instructions' });
  }
}

