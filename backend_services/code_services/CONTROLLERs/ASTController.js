const express = require("express");
const router = express.Router();
require("dotenv").config();


const OpenAI = require("openai");
const esprima = require('esprima');

router.post("/", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const instruction =
      "You will be provided with a piece of " +
      req.body.language +
      "code." +
      "Read the code provided, analyise all the variables and sub-functions, " +
      "if there is a self-defined class name, do not think it as a function and ignore it. " +
      "Do the following tasks as a recursion." +
      "For each function, show the function names if there are any sub-functions under this function and the variables that is created in this function,  ignore any variables that is created in sub-functions." +
      " For sub-functions, also show the newly created variables and their sub-functions but do not show information of their parent." +
      " Output as a json format variable, showing format like: " +
      "{" +
      "   function_name: 'function_name'," +
      "   function_start_line_number: int," +
      "   parameter_variables: [{varibale_type: 'String', variable_name: 'variable_name'}]," +
      "   return_variables: []," +
      "   local_variables: []," +
      "   sub-functions: [" +
      "      {" +
      "         function_name: 'function_name'," +
      "         function_start_line_number: int," +
      "         parameter_variables: []," +
      "         return_variables: []," +
      "         local_variables: []," +
      "         sub-functions: []," +
      "      }," +
      "   ]," +
      "}";

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [
        { role: "system", content: instruction },
        { role: "user", content: req.body.prompt },
      ],
    });

    console.log(chatCompletion.choices[0].message.content);

    res.json({
      data: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.json({ openAIControllerError: String(error) });
  }
});

router.post("/javascript", async (req, res) => {
  try {
    // Parse the JavaScript code using esprima with ecmaVersion set to 2015 (ES6)
    const ast = esprima.parseScript(req.body.prompt, { ecmaVersion: 2015 });

    // Log the AST to the console
    console.log(JSON.stringify(ast, null, 2));

    // Continue with the rest of your logic (if needed)
    res.json({
      ast: ast,  // You can send the AST back in the response or process it further
    });
  } catch (error) {
    console.error(error);
  }
});

router.post("/python", async (req, res) => {
  try {
    const nonSectionStartChar = [" ", "\t", "}", "]", ")"];
    res.json(
      getPythonSubSections(req.body.prompt.split("\n"), 0, nonSectionStartChar)
    );
  } catch (error) {
    console.error(error);
  }
});
const getPythonSubSections = (sourceCodeLines, parentSectionStart, nonSectionStartChar) => {
  if (sourceCodeLines.length === 0) {
    return [];
  }
  indiantation = 0;
  for (let c = 0; c < sourceCodeLines[0].length; c++) {
    if (sourceCodeLines[0][c] === " ") {
      indiantation += 1;
    } else {
      break;
    }
  }
  for (let i = 0; i < sourceCodeLines.length; i++) {
    sourceCodeLines[i] = sourceCodeLines[i].slice(indiantation);
  }

  var sections = [];

  var current_section_start = 0;
  var section = [];
  for (let i = 0; i < sourceCodeLines.length; i++) {
    newSectionStart = true;

    for (let c = 0; c < nonSectionStartChar.length; c++) {
      if (sourceCodeLines[i][0] === nonSectionStartChar[c]) {
        newSectionStart = false;
        break;
      }
    }

    if (
      newSectionStart &&
      sourceCodeLines[i] !== "" &&
      section.length !== 0
    ) {
      sections.push({
        sourceHeader: section[0],
        sourceCodeLines: section.slice(1),
        section_start_line: parentSectionStart + current_section_start,
        section_end_line: parentSectionStart + i,
      });
      section = [];
      current_section_start = i + 1;
      section.push(sourceCodeLines[i]);
    } else {
      section.push(sourceCodeLines[i]);
    }
  }
  sections.push({
    sourceHeader: section[0],
    sourceCodeLines: section.slice(1),
    section_start_line: parentSectionStart + current_section_start,
    section_end_line: parentSectionStart + sourceCodeLines.length,
  });

  for (let i = 0; i < sections.length; i++) {
    sections[i].subSections = getPythonSubSections(
      sections[i].sourceCodeLines,
      sections[i].section_start_line,
      nonSectionStartChar
    );
  }

  return sections;
};

module.exports = router;
