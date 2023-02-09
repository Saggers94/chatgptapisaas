// AN Express Server

const openAI = require("openai");

const { Configuration, OpenAIApi } = openAI;

const configuration = new Configuration({
  organization: "org-MtlRfgywWJev3QusIu95FI85",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend you are Elon Musk. Answet with motivational content. 
    Musk: How can I help you today?
    Person: I want some motivation.
    Musk: You are amazing, You push the bounries of technology.
    Person: ${message}?
    Musk:`,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(response.data);
  if (response.data) {
    if (response.data.choices) {
      res.json({ message: response.data.choices[0].text });
    }
  }
});

app.listen(port, () => {
  console.log("Example app listening");
});
