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

router.post("/variable", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const descriptionWordLimit = 20;

    const instruction =
      /*"You will be provided with a piece of " +
      //req.body.language +
      "java code, and your task is to analyze the given code to a json format "+
      "to get variables which is defined in corresponding code, "+
      "do not show variable that is created in functions"+
      //"show the variable's source is created in function or incoming parameter, "+
      "then show their data type and description of variables' role,"+
      
   		" Then analyize what the function does in json list format." +
			" This list should only have the following columns: " +
			" name, description,input type ,input variable, output type , output variable, private variable in function." +
			" Also show the sub functions are used in this function."
      " if you cannot find the output type or output variable check what the function return or print."*/
			
      "Read the code provided, analyise all the variables and sub-functions, "+
      "if there is a self-defined class name, do not think it as a function and ignore it. "+
      "Do the following tasks as a recursion."+
      "For each function, show the function names if there are any sub-functions under this function and the variables that is created in this function,  ignore any variables that is created in sub-functions."+
      " For sub-functions, also show the newly created variables and their sub-functions but do not show information of their parent."+
      " Output as a jason list, showing format like: "+
      "function: function_names,input variables and datatype,outputvariable and datatype,local created variables, sub_function_names"
      ;
      //"and their usage description under"+
      //String(descriptionWordLimit) +
      //" characters.";
      
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
router.post("/jsonTesting", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
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
module.exports = router;
