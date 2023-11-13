export const ICON_MANAGER = () => {
  let FILE_TYPE_STYLING_MANAGER = {
    default: {
      ICON: null,
      LABEL_COLOR: "#C8C8C8",
    },
  };
  try {
    //CODE FILE TYPES
    const JS512 = require("./FILETYPE_ICONs/512X512/js.png");
    const HTML512 = require("./FILETYPE_ICONs/512X512/html.png");
    const CSS512 = require("./FILETYPE_ICONs/512X512/css.png");
    const JSON512 = require("./FILETYPE_ICONs/512X512/json.png");
    const CPP512 = require("./FILETYPE_ICONs/512X512/cpp.png");
    const CS512 = require("./FILETYPE_ICONs/512X512/cs.png");
    const PY512 = require("./FILETYPE_ICONs/512X512/py.png");
    const JAVA512 = require("./FILETYPE_ICONs/512X512/java.png");
    const PHP512 = require("./FILETYPE_ICONs/512X512/php.png");
    const IPYNB512 = require("./FILETYPE_ICONs/512X512/ipynb.png");
    const XML512 = require("./FILETYPE_ICONs/512X512/xml.png");
    //IMAGE FILE TYPES
    const JPG512 = require("./FILETYPE_ICONs/512X512/jpg.png");
    const PNG512 = require("./FILETYPE_ICONs/512X512/png.png");
    const SVG512 = require("./FILETYPE_ICONs/512X512/svg.png");
    //DOCUMENT FILE TYPES
    const TXT512 = require("./FILETYPE_ICONs/512X512/txt.png");
    const PDF512 = require("./FILETYPE_ICONs/512X512/pdf.png");
    const PPTX512 = require("./FILETYPE_ICONs/512X512/pptx.png");
    const XLSX512 = require("./FILETYPE_ICONs/512X512/xlsx.png");
    const DOC512 = require("./FILETYPE_ICONs/512X512/doc.png");
    //DATABASE FILE TYPES
    const SQL512 = require("./FILETYPE_ICONs/512X512/sql.png");
    //OTHER FILE TYPES
    const GITIGNORE512 = require("./FILETYPE_ICONs/512X512/gitignore.png");
    const MD512 = require("./FILETYPE_ICONs/512X512/md.png");
    const ENV512 = require("./FILETYPE_ICONs/512X512/env.png");

    FILE_TYPE_STYLING_MANAGER = {
      //CODE FILE TYPES
      js: { ICON: JS512, LABEL_COLOR: "#CCCCCC", language: "javascript" },
      html: { ICON: HTML512, LABEL_COLOR: "#CCCCCC", language: "html" },
      css: { ICON: CSS512, LABEL_COLOR: "#CCCCCC", language: "css" },
      json: { ICON: JSON512, LABEL_COLOR: "#CCCCCC", language: "json" },
      cpp: { ICON: CPP512, LABEL_COLOR: "#CCCCCC", language: "c++" },
      cs: { ICON: CS512, LABEL_COLOR: "#CCCCCC", language: "c-sharp" },
      py: { ICON: PY512, LABEL_COLOR: "#CCCCCC", language: "python" },
      java: { ICON: JAVA512, LABEL_COLOR: "#CCCCCC", language: "java" },
      php: { ICON: PHP512, LABEL_COLOR: "#CCCCCC", language: "php" },
      ipynb: { ICON: IPYNB512, LABEL_COLOR: "#CCCCCC", language: "python" },
      xml: { ICON: XML512, LABEL_COLOR: "#CCCCCC", language: "xml" },
      //IMAGE FILE TYPES
      jpg: { ICON: JPG512, LABEL_COLOR: "#8C8C8C", language: "image" },
      jpeg: { ICON: JPG512, LABEL_COLOR: "#8C8C8C", language: "image" },
      png: { ICON: PNG512, LABEL_COLOR: "#8C8C8C", language: "image" },
      svg: { ICON: SVG512, LABEL_COLOR: "#8C8C8C", language: "image" },
      //DOCUMENT FILE TYPES
      txt: { ICON: TXT512, LABEL_COLOR: "#8C8C8C", language: "text" },
      pdf: { ICON: PDF512, LABEL_COLOR: "#8C8C8C", language: "pdf" },
      pptx: { ICON: PPTX512, LABEL_COLOR: "#CCCCCC", language: "powerpoint" },
      ppt: { ICON: PPTX512, LABEL_COLOR: "#CCCCCC", language: "powerpoint" },
      xlsx: { ICON: XLSX512, LABEL_COLOR: "#CCCCCC", language: "excel" },
      xls: { ICON: XLSX512, LABEL_COLOR: "#CCCCCC", language: "excel" },
      docx: { ICON: DOC512, LABEL_COLOR: "#CCCCCC", language: "word" },
      doc: { ICON: DOC512, LABEL_COLOR: "#CCCCCC", language: "word" },
      //DATABASE FILE TYPES
      sql: { ICON: SQL512, LABEL_COLOR: "#CCCCCC", language: "sql" },
      //OTHER FILE TYPES
      gitignore: { ICON: GITIGNORE512, LABEL_COLOR: "#8C8C8C", language: "git" },
      md: { ICON: MD512, LABEL_COLOR: "#8C8C8C", language: "markdown" },
      env: { ICON: ENV512, LABEL_COLOR: "#8C8C8C", language: "env" },
    };
  } catch (e) {
    console.log(e);
  }

  return { FILE_TYPE_STYLING_MANAGER: FILE_TYPE_STYLING_MANAGER };
};
