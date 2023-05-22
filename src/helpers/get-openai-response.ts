import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.PUBLIC_OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getFunFactAboutPokemon = async (name: string): Promise<string> => {
  delete configuration.baseOptions.headers["User-Agent"];
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Fun fact about pokemon ${name}:`,
    temperature: 0.7,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].text || "Missing fun fact about pokemon";
};
