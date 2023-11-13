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
      model: "gpt-4-1106-preview",
      temperature: 0.2,
      messages: [{ "role": "system", "content": "You are a helpful assistant. only return json format response." },
      { "role": "user", "content": "Who won the world series in 2020?" },
      { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
      { "role": "user", "content": "Where was it played?" }],
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

router.post("/fileType", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const instruction =
      " You will be provided with a piece of " +
      " Java" +
      " code, and your task is to get the type of files and short brief of file descriptions (50 - 100 words), in json format (format should be constant)." +
      " For example: " +
      " File name: xxx \n" +
      " File type: xxx \n" +
      " File short description: xxxxxx ";

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      temperature: 0.2,
      messages: [
        { role: "system", content: instruction },
        { role: "user", content: req.body.prompt },
      ],
      response_format: { type: "json_object" }
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
      model: "gpt-3.5-turbo",
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

//这个api需要修改
router.post("/structureDescribe", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const instruction =
      req.body.language +
      ", give me a React demo project structure" +
      " where you list all the files in a json format" +
      " and indentation is required between primary and secondary files."+
      " Format and answers should be constant (No explanations, just list the structure)."+
      " No prefixes like \"names:\" or \"types:\".  header should be \"' ' ' \n.\""

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      temperature: 0,
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
router.post("/analyze", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const descriptionWordLimit = 20;

    const instruction =
      "You will be provided with a piece of " +
      req.body.language +
      " code, and your task is to analyze the given code to a CSV format table that has the following columns," +
      " variables, functions, external libraries' name, and their usage description under" +
      String(descriptionWordLimit) +
      " characters.";

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
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
