import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { Configuration, OpenAIApi } from "openai";
const port = process.env.PORT || 3000;
dotenv.config();

const app = express();

app.use(express.static("public")).use(cors()).use(bodyParser.json()).options("*", cors());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API,
});

app.post('/post', (req, res) => {
    const openai = new OpenAIApi(configuration);
    const response = openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Make this email formal: ${req.body.sentence}`,
        temperature: 0.7,
        max_tokens: 512,
        top_p: 0.8,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    response.then((data) => {
        res.send(data.data.choices[0].text)
    }).catch((error) => {
        console.log("Error in API call", error);
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
