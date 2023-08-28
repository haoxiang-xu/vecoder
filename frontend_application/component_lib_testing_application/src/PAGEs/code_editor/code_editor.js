import React from "react";
import CodeEditor from "../../COMPONENTs/codeEditor/codeEditor";
import axios from "axios";

const CodeEditorPage = () => {
  const code = "my code";

  return (
    <div id="app_page_container0803">
      <CodeEditor code={code} />
    </div>
  );
};

export default CodeEditorPage;
