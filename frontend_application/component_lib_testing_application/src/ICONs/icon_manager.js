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
      js: { ICON: JS512, LABEL_COLOR: "#CCCCCC" },
      html: { ICON: HTML512, LABEL_COLOR: "#CCCCCC" },
      css: { ICON: CSS512, LABEL_COLOR: "#CCCCCC" },
      json: { ICON: JSON512, LABEL_COLOR: "#CCCCCC" },
      cpp: { ICON: CPP512, LABEL_COLOR: "#CCCCCC" },
      cs: { ICON: CS512, LABEL_COLOR: "#CCCCCC" },
      py: { ICON: PY512, LABEL_COLOR: "#CCCCCC" },
      java: { ICON: JAVA512, LABEL_COLOR: "#CCCCCC" },
      php: { ICON: PHP512, LABEL_COLOR: "#CCCCCC" },
      ipynb: { ICON: IPYNB512, LABEL_COLOR: "#CCCCCC" },
      xml: { ICON: XML512, LABEL_COLOR: "#CCCCCC" },
      //IMAGE FILE TYPES
      jpg: { ICON: JPG512, LABEL_COLOR: "#8C8C8C" },
      jpeg: { ICON: JPG512, LABEL_COLOR: "#8C8C8C" },
      png: { ICON: PNG512, LABEL_COLOR: "#8C8C8C" },
      svg: { ICON: SVG512, LABEL_COLOR: "#8C8C8C" },
      //DOCUMENT FILE TYPES
      txt: { ICON: TXT512, LABEL_COLOR: "#8C8C8C" },
      pdf: { ICON: PDF512, LABEL_COLOR: "#8C8C8C" },
      pptx: { ICON: PPTX512, LABEL_COLOR: "#CCCCCC" },
      ppt: { ICON: PPTX512, LABEL_COLOR: "#CCCCCC" },
      xlsx: { ICON: XLSX512, LABEL_COLOR: "#CCCCCC" },
      xls: { ICON: XLSX512, LABEL_COLOR: "#CCCCCC" },
      docx: { ICON: DOC512, LABEL_COLOR: "#CCCCCC" },
      doc: { ICON: DOC512, LABEL_COLOR: "#CCCCCC" },
      //DATABASE FILE TYPES
      sql: { ICON: SQL512, LABEL_COLOR: "#CCCCCC" },
      //OTHER FILE TYPES
      gitignore: { ICON: GITIGNORE512, LABEL_COLOR: "#8C8C8C" },
      md: { ICON: MD512, LABEL_COLOR: "#8C8C8C" },
      env: { ICON: ENV512, LABEL_COLOR: "#8C8C8C" },
    };
  } catch (e) {
    console.log(e);
  }

  return { FILE_TYPE_STYLING_MANAGER: FILE_TYPE_STYLING_MANAGER };
};
