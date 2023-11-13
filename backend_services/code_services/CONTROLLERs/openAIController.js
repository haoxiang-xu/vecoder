const express = require("express");
const router = express.Router();
require("dotenv").config();

const OpenAI = require("openai");

router.post("/", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello!" },
      ],
      max_tokens: 100,
    });

    res.json({
      data: chatCompletion.choices[0].message,
    });
  } catch (error) {
    console.error(error);
    res.json({ openAIControllerError: String(error) });
  }
});
router.post("/jsonTesting", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [{"role": "system", "content": "You are a helpful assistant. only return json format response."},
      {"role": "user", "content": "Who won the world series in 2020?"},
      {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
      {"role": "user", "content": "Where was it played?"}],
      max_tokens: 100,
      response_format: { type: "json_object" },
    });

    res.json({
      data: chatCompletion.choices[0].message,
    });
  } catch (error) {
    console.error(error);
    res.json({ openAIControllerError: String(error) });
  }
});
router.post("/continue", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const instruction =
      "You will be provided with a piece of " +
      req.body.language +
      " code, and your task is to continue writing it." +
      " Don't explain the code, just generate the code itself." +
      " Don't overthink the problem, If there's no clue, just return an empty string." +
      " Make sure all indentations are correct.";

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [
        { role: "system", content: instruction },
        { role: "system", content: req.body.analyzeCode },
        { role: "user", content: req.body.prompt },
      ],
    });

    res.json({
      data: chatCompletion.choices[0].message,
    });
  } catch (error) {
    console.error(error);
    res.json({ openAIControllerError: String(error) });
  }
});
router.post("/fix", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const instruction =
      "You will be provided with a piece of " +
      req.body.language +
      " code, and your task is to" +
      " (1) find and fix logic errors in it, if necessary." +
      " (2) fix indentations, if necessary." +
      " (3) find and fix syntax errors, if necessary." +
      " Don't explain the code, just generate the code itself." +
      " Don't overthink the problem, If there's no clue, just return an empty string.";

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: instruction },
        { role: "user", content: req.body.prompt },
      ],
    });

    res.json({
      data: chatCompletion.choices[0].message,
    });
  } catch (error) {
    console.error(error);
    res.json({ openAIControllerError: String(error) });
  }
});
router.post("/filePath", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const instruction =
      "You will be provided with a piece of " +
      req.body.language +
      " code, and your task is to get the absolute path of files in my PC." +
      " Don't overthink the question, just output the path of files." +
      " For example, format: This file is at 'C:/../..'" + 
      " Format should be constant." + 
      " If you can't find the path, just return the result 'empty' in json format, format should be constant";

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      temperature: 0.1,
      messages: [
        { role: "system", content: instruction },
        { role: "user", content: req.body.prompt },
      ],
    });

    res.json({
      data: chatCompletion.choices[0].message,
    });
  } catch (error) {
    console.error(error);
    res.json({ openAIControllerError: String(error) });
  }
});
router.post("/analyzeFilePath", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


    const instruction =
      "You are a professional program coder,You will be provided with a piece of " +
      req.body.language +
      " code, and your task is to return a list for json variables, including belowing keys: " +
      " 1. Imported lib or object named " +
      " 2.imported path"+
      " 3. object type for Imported lib or object " +
      " 4. Description." 

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [
        { role: "system", content: instruction },
        { role: "user", content: req.body.prompt },
      ],
    });

    res.json({
      data: chatCompletion.choices[0].message,
    });
  } catch (error) {
    console.error(error);
    res.json({ openAIControllerError: String(error) });
  }
});

module.exports = router;
