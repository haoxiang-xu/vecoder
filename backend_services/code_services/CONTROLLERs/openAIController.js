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
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. only return json format response.",
        },
        { role: "user", content: "Who won the world series in 2020?" },
        {
          role: "assistant",
          content: "The Los Angeles Dodgers won the World Series in 2020.",
        },
        { role: "user", content: "Where was it played?" },
      ],
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
router.post("/analyzeFilePathes", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const instruction =
      "You are a professional program coder,You will be provided with a piece of " +
      req.body.language +
      " code, and your task is to return a list for json variables, including belowing keys: " +
      " 1. Imported lib or object named " +
      " 2.imported path" +
      " 3. object type for Imported lib or object " +
      " 4. Description.";

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
router.post("/analyzeFunctions", async (req, res) => {
	try {
		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const descriptionWordLimit = 20;

		const instruction =
			"You will be provided with a piece of code " +
			req.body.language +
			" Your task is to analyize what the function do with Json Formate" +
			" This list should only have the following columns" +
			" name, descriptio,input type ,input variable, output type , output variable." +
			" if you cannot find the output type or output variable check what the function return or print " +
			" Give the relationship between function with arrow, if no just return none" +
			" if there is more than one function generate the list for each function ";
			//" generate the list with Json Formate.";
		const chatCompletion =
			await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				temperature: 0,
				messages: [
					{ role: "system", content: instruction },
					{
						role: "user",
						content: `
						function isPrime(num) {
							for (let i = 2; i < num; i++) {
							  if (num % i === 0) {
								return false;
							  }
							}
							return true;
						  }
						  
						  function getNextPrime() {
							prime++;
							while (!isPrime(prime)) {
							  prime++;
							}
							return prime;
						  }
					
					`,
					},],
			});

		res.json({
			data: chatCompletion.choices[0].message,
		});
	} catch (error) {
		console.error(error);
		res.json({ openAIControllerError: String(error) });
	}
});
router.post("/analyzeExternalLibraries", async (req, res) => {
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
