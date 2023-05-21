import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt:
    "give me information about pikachu\n\nPikachu is a fictional character and one of the main protagonists of the Pokémon franchise, appearing in Pokémon animated media as well as the long-running Pokémon video game series. It is a mouse-like creature that has an electrical tail which it uses to generate electricity. Pikachu is well-known for its yellow color, red cheeks and electric powers. It is one of the most recognizable characters in the franchise, and is often featured in promotional material for the Pokémon series.",
  temperature: 0.7,
  max_tokens: 200,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
