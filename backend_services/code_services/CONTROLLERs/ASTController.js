const express = require("express");
const router = express.Router();
const htmlparser = require('htmlparser2');
const postcss = require('postcss');
const phpparser = require('php-parser');

require("dotenv").config();

const OpenAI = require("openai");

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
function parseHTMLPromise(htmlString) {
  return new Promise((resolve, reject) => {
    const handler = new htmlparser.DomHandler((error, dom) => {
      if (error) {
        reject(error);
      } else {
        resolve(dom);
      }
    });

    const parser = new htmlparser.Parser(handler);
    try {
      console.log('htmlString:', htmlString);
      parser.write(htmlString);
      parser.end();
    } catch (parserError) {
      reject(parserError);
    }
  });
}

router.post("/html", async (req, res) => {
  try {
    // Assuming req.body.htmlContent is a string containing HTML code
    const htmlAST = await parseHTMLPromise(req.body.htmlContent);

    // Custom replacer function to handle potential circular references
    const replacer = (key, value) => {
      // Check for specific circular references and exclude them
      if (key === 'next' || key === 'prev' || key === 'parent') {
        return undefined;
      }
      return value;
    };

    // Convert AST to JSON string with custom replacer
    const jsonString = JSON.stringify(htmlAST, replacer);

    // Parse the JSON string back to an object for validation (optional)
    const parsedObject = JSON.parse(jsonString);

    res.json({
      htmlAST: parsedObject,
      // You can add more properties if needed
    });
  } catch (error) {
    console.error('HTML 代码解析错误:', error);
    res.status(500).json({ error: { message: 'Internal Server Error', details: error.message, stack: error.stack, }, }); 
  }
});

router.post('/php', (req, res) => {
  const { phpCode } = req.body;

  if (!phpCode) {
    return res.status(400).send('Missing PHP code in the request body');
  }

  const phpParser = new phpparser({
    parser: {
      debug: false,
      locations: false,
      extractDoc: false,
      suppressErrors: false,
    },
    ast: {
      withPositions: true,
    },
  });

  try {
    // 解析 PHP 代码并返回 AST
    const ast = phpParser.parseCode(phpCode);

    // 打印 AST
    console.log(JSON.stringify(ast, null, 2));

    // 返回 AST 作为 JSON 响应
    res.json(ast);
  } catch (error) {
    console.error('PHP 代码解析错误:', error); // 输出更详细的错误信息 
    res.status(500).json({ error: { message: 'Internal Server Error', details: error.message, stack: error.stack, }, });
  }
});

function parseCSSPromise(cssString) {
  return new Promise((resolve, reject) => {
    postcss().process(cssString).then((result) => {
      resolve(result.root);
    }).catch((error) => {
      reject(error);
    });
  });
}
router.post("/css", async (req, res) => {
  try {
    // Assuming req.body.cssContent is a string containing CSS code
    const cssAST = await parseCSSPromise(req.body.cssContent);

    res.json({
      cssAST: cssAST,
      // You can add more properties if needed
    });
  } catch (error) {
    console.error('CSS 代码解析错误:', error); // 输出更详细的错误信息 
    res.status(500).json({ error: { message: 'Internal Server Error', details: error.message, stack: error.stack, }, });
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
