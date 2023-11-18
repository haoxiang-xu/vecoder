const express = require("express");
const router = express.Router();
require("dotenv").config();
const acorn = require("acorn");

const OpenAI = require("openai");

router.post("/", async (req, res) => {
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

      "Read the code provided, analyise all the variables and sub-functions, " +
      "if there is a self-defined class name, do not think it as a function and ignore it. " +
      "Do the following tasks as a recursion." +
      "For each function, show the function names if there are any sub-functions under this function and the variables that is created in this function,  ignore any variables that is created in sub-functions." +
      " For sub-functions, also show the newly created variables and their sub-functions but do not show information of their parent." +
      " Output as a jason list, showing format like: " +
      "function: function_names,input variables and datatype,outputvariable and datatype,local created variables, sub_function_names";
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
router.post("/javascript", async (req, res) => {
  // Function to traverse the AST and perform actions based on node type
  function traverse(node, action) {
    action(node);

    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        const child = node[key];
        if (typeof child === "object" && child !== null) {
          traverse(child, action);
        }
      }
    }
  }
  // Example action: Log function names and their parameters
  function logFunctionInfo(node) {
    if (node.type === "FunctionDeclaration") {
      console.log(`Function Name: ${node.id.name}`);
      // Check if 'loc' exists
      if (node.loc) {
        console.log(`Function Start Line: ${node.loc.start.line}`);
        console.log(`Function End Line: ${node.loc.end.line}`);
      } else {
        console.log("Location information is not available.");
      }

      node.params.forEach((param) => {
        console.log(`Parameter: ${param.name}`);
      });

      // Additional code to handle function body, etc.
    }
  }
  const code = `
    function add(a, b) {
        return a + b;
    }
  `;
  // Parsing the code to an AST
  const ast = acorn.parse(code, {
    ecmaVersion: 2020,
    locations: true, // Include this line
  });
  // Traverse the AST and log function info
  traverse(ast, logFunctionInfo);

  res.json({
    data: "ASTController",
  });
});

module.exports = router;
