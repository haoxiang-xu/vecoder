const express = require("express");
const { exec } = require("child_process");
const router = express.Router();

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
  const pythonCode = `
  import ast
  code = "print('Hello, World!')"
  tree = ast.parse(code)
  print(ast.dump(tree))
  `;

  exec(
    `python -c "import ast; code = 'print(\\'Hello, World!\\')'; tree = ast.parse(code); print(ast.dump(tree))"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
        return;
      }
      if (stderr) {
        console.error(stderr); // Log stderr for debugging
        res.status(500).json({ error: stderr });
        return;
      }
      res.json({ output: stdout });
    }
  );

  // try {
  //   const nonSectionStartChar = [
  //     " ",
  //     "\t",
  //     "}",
  //     "]",
  //     ")",
  //     "#",
  //     "//",
  //     "'''",
  //     '"""',
  //     "/*",
  //     "*/",
  //   ];
  //   const sectionTypeStartsWithChar = {
  //     class: "CLASS",
  //     def: "FUNCTION",
  //     if: "CONDITION",
  //     elif: "CONDITION",
  //     else: "CONDITION",
  //     for: "LOOP",
  //     while: "LOOP",
  //     try: "TRY",
  //     except: "TRY",
  //     finally: "TRY",
  //     with: "WITH",
  //     return: "RETURN",
  //     yield: "YIELD",
  //     raise: "RAISE",
  //     break: "BREAK",
  //     continue: "CONTINUE",
  //     pass: "PASS",
  //     import: "IMPORT",
  //     from: "IMPORT",
  //     as: "IMPORT",
  //     global: "GLOBAL",
  //     nonlocal: "NONLOCAL",
  //     assert: "ASSERT",
  //     del: "DEL",
  //     lambda: "LAMBDA",
  //   };
  //   res.json(
  //     getPythonSubSections(
  //       req.body.prompt.split("\n"),
  //       0,
  //       nonSectionStartChar,
  //       sectionTypeStartsWithChar
  //     )
  //   );
  // } catch (error) {
  //   console.error(error);
  // }
});
const getPythonSubSections = (
  sourceCodeLines,
  parentSectionStart,
  nonSectionStartChar,
  sectionTypeStartsWithChar
) => {
  if (sourceCodeLines.length === 0) {
    return [];
  }
  // remove indiantation -----------------------------------------------
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
  // remove indiantation -----------------------------------------------

  var sections = [];

  var current_section_start = 0;
  var section = [];
  for (let i = 0; i < sourceCodeLines.length; i++) {
    newSectionStart = true;

    for (let c = 0; c < nonSectionStartChar.length; c++) {
      if (sourceCodeLines[i].startsWith(nonSectionStartChar[c])) {
        newSectionStart = false;
        break;
      }
    }

    if (newSectionStart && sourceCodeLines[i] !== "" && section.length !== 0) {
      // Define section type
      sectionType = "CODE";
      for (const [key, value] of Object.entries(sectionTypeStartsWithChar)) {
        if (section[0].startsWith(key)) {
          sectionType = value;
          break;
        }
      }

      // Push section
      sections.push({
        sectionHeader: section[0],
        sourceCodeLines: section.slice(1),
        section_start_line: parentSectionStart + current_section_start,
        section_end_line: parentSectionStart + i,
        sectionType: sectionType,
      });
      section = [];
      current_section_start = i + 1;
      section.push(sourceCodeLines[i]);
    } else {
      section.push(sourceCodeLines[i]);
    }
  }
  if (section.length !== 0) {
    // Define section type
    sectionType = "CODE";
    for (const [key, value] of Object.entries(sectionTypeStartsWithChar)) {
      if (section[0].startsWith(key)) {
        sectionType = value;
        break;
      }
    }
    // Push last section
    sections.push({
      sectionHeader: section[0],
      sourceCodeLines: section.slice(1),
      section_start_line: parentSectionStart + current_section_start,
      section_end_line: parentSectionStart + sourceCodeLines.length,
      sectionType: sectionType,
    });
  }

  // Get sub-sections -----------------------------------------------
  for (let i = 0; i < sections.length; i++) {
    sections[i].subSections = getPythonSubSections(
      sections[i].sourceCodeLines,
      sections[i].section_start_line,
      nonSectionStartChar,
      sectionTypeStartsWithChar
    );
  }
  // Get sub-sections -----------------------------------------------

  return sections;
};
module.exports = router;
