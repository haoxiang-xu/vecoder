export const ICON_MANAGER = () => {
  /*FILE_TYPE_STYLING_MANAGER ---------------------------------------------------------------- */
  let FILE_TYPE_ICON_MANAGER = {
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

    FILE_TYPE_ICON_MANAGER = {
      //CODE FILE TYPES
      js: { ICON512: JS512, LABEL_COLOR: "#CCCCCC", language: "javascript" },
      html: { ICON512: HTML512, LABEL_COLOR: "#CCCCCC", language: "html" },
      css: { ICON512: CSS512, LABEL_COLOR: "#CCCCCC", language: "css" },
      json: { ICON512: JSON512, LABEL_COLOR: "#CCCCCC", language: "json" },
      cpp: { ICON512: CPP512, LABEL_COLOR: "#CCCCCC", language: "c++" },
      cs: { ICON512: CS512, LABEL_COLOR: "#CCCCCC", language: "c-sharp" },
      py: { ICON512: PY512, LABEL_COLOR: "#CCCCCC", language: "python" },
      java: { ICON512: JAVA512, LABEL_COLOR: "#CCCCCC", language: "java" },
      php: { ICON512: PHP512, LABEL_COLOR: "#CCCCCC", language: "php" },
      ipynb: { ICON512: IPYNB512, LABEL_COLOR: "#CCCCCC", language: "python" },
      xml: { ICON512: XML512, LABEL_COLOR: "#CCCCCC", language: "xml" },
      //IMAGE FILE TYPES
      jpg: { ICON512: JPG512, LABEL_COLOR: "#8C8C8C", language: "image" },
      jpeg: { ICON512: JPG512, LABEL_COLOR: "#8C8C8C", language: "image" },
      png: { ICON512: PNG512, LABEL_COLOR: "#8C8C8C", language: "image" },
      svg: { ICON512: SVG512, LABEL_COLOR: "#8C8C8C", language: "image" },
      icon: { ICON512: SVG512, LABEL_COLOR: "#8C8C8C", language: "image" },
      //DOCUMENT FILE TYPES
      txt: { ICON512: TXT512, LABEL_COLOR: "#8C8C8C", language: "text" },
      pdf: { ICON512: PDF512, LABEL_COLOR: "#8C8C8C", language: "pdf" },
      pptx: {
        ICON512: PPTX512,
        LABEL_COLOR: "#CCCCCC",
        language: "powerpoint",
      },
      ppt: { ICON512: PPTX512, LABEL_COLOR: "#CCCCCC", language: "powerpoint" },
      xlsx: { ICON512: XLSX512, LABEL_COLOR: "#CCCCCC", language: "excel" },
      xls: { ICON512: XLSX512, LABEL_COLOR: "#CCCCCC", language: "excel" },
      docx: { ICON512: DOC512, LABEL_COLOR: "#CCCCCC", language: "word" },
      doc: { ICON512: DOC512, LABEL_COLOR: "#CCCCCC", language: "word" },
      //DATABASE FILE TYPES
      sql: { ICON512: SQL512, LABEL_COLOR: "#CCCCCC", language: "sql" },
      //OTHER FILE TYPES
      gitignore: {
        ICON512: GITIGNORE512,
        LABEL_COLOR: "#8C8C8C",
        language: "git",
      },
      md: { ICON512: MD512, LABEL_COLOR: "#8C8C8C", language: "markdown" },
      env: { ICON512: ENV512, LABEL_COLOR: "#8C8C8C", language: "env" },
    };
  } catch (e) {
    console.log(e);
  }
  /*FILE_TYPE_STYLING_MANAGER ---------------------------------------------------------------- */

  /*FILE_TYPE_STYLING_MANAGER ---------------------------------------------------------------- */
  let SYSTEM_ICON_MANAGER = {
    default: {
      ICON: null,
      LABEL_COLOR: "#C8C8C8",
    },
  };
  try {
    // 16X16 ICONs
    const CLOSE_ICON16 = require("./SYSTEM_ICONs/16X16/close.png");
    const ARROW_ICON16 = require("./SYSTEM_ICONs/16X16/arrow.png");
    const CODE_ICON16 = require("./SYSTEM_ICONs/16X16/code.png");
    const CONTINUE_ICON16 = require("./SYSTEM_ICONs/16X16/continue.png");
    const COPY_ICON16 = require("./SYSTEM_ICONs/16X16/copy.png");
    const CUSTOMIZE16 = require("./SYSTEM_ICONs/16X16/customize.png");
    const DUPLICATE16 = require("./SYSTEM_ICONs/16X16/duplicate.png");
    const FIX16 = require("./SYSTEM_ICONs/16X16/fix.png");
    const INSERT_FILE16 = require("./SYSTEM_ICONs/16X16/insert_file.png");
    const NEW_FILE16 = require("./SYSTEM_ICONs/16X16/new_file.png");
    const NEW_FOLDER16 = require("./SYSTEM_ICONs/16X16/new_folder.png");
    const PASTE16 = require("./SYSTEM_ICONs/16X16/paste.png");
    const RENAME16 = require("./SYSTEM_ICONs/16X16/rename.png");
    const UNPASTE16 = require("./SYSTEM_ICONs/16X16/unpaste.png");
    const UPDATE16 = require("./SYSTEM_ICONs/16X16/update.png");
    const TRASH16 = require("./SYSTEM_ICONs/16X16/trash.png");

    // 512X512 ICONs
    const CLOSE_ICON512 = require("./SYSTEM_ICONs/512X512/close.png");
    const ARROW_ICON512 = require("./SYSTEM_ICONs/512X512/arrow.png");
    const CODE_ICON512 = require("./SYSTEM_ICONs/512X512/code.png");
    const CONTINUE_ICON512 = require("./SYSTEM_ICONs/512X512/continue.png");
    const COPY_ICON512 = require("./SYSTEM_ICONs/512X512/copy.png");
    const CUSTOMIZE512 = require("./SYSTEM_ICONs/512X512/customize.png");
    const DUPLICATE512 = require("./SYSTEM_ICONs/512X512/duplicate.png");
    const FIX512 = require("./SYSTEM_ICONs/512X512/fix.png");
    const INSERT_FILE512 = require("./SYSTEM_ICONs/512X512/insert_file.png");
    const NEW_FILE512 = require("./SYSTEM_ICONs/512X512/new_file.png");
    const NEW_FOLDER512 = require("./SYSTEM_ICONs/512X512/new_folder.png");
    const PASTE512 = require("./SYSTEM_ICONs/512X512/paste.png");
    const RENAME512 = require("./SYSTEM_ICONs/512X512/rename.png");
    const UNPASTE512 = require("./SYSTEM_ICONs/512X512/unpaste.png");
    const UPDATE512 = require("./SYSTEM_ICONs/512X512/update.png");
    const TRASH512 = require("./SYSTEM_ICONs/512X512/trash.png");

    SYSTEM_ICON_MANAGER = {
      close: {
        ICON16: CLOSE_ICON16,
        ICON512: CLOSE_ICON512,
        LABEL_COLOR: "#CCCCCC",
      },
      arrow: {
        ICON16: ARROW_ICON16,
        ICON512: ARROW_ICON512,
        LABEL_COLOR: "#CCCCCC",
      },
      code: {
        ICON16: CODE_ICON16,
        ICON512: CODE_ICON512,
        LABEL_COLOR: "#CCCCCC",
      },
      continue: {
        ICON16: CONTINUE_ICON16,
        ICON512: CONTINUE_ICON512,
        LABEL_COLOR: "#CCCCCC",
      },
      copy: {
        ICON16: COPY_ICON16,
        ICON512: COPY_ICON512,
        LABEL_COLOR: "#CCCCCC",
      },
      customize: {
        ICON16: CUSTOMIZE16,
        ICON512: CUSTOMIZE512,
        LABEL_COLOR: "#CCCCCC",
      },
      duplicate: {
        ICON16: DUPLICATE16,
        ICON512: DUPLICATE512,
        LABEL_COLOR: "#CCCCCC",
      },
      fix: {
        ICON16: FIX16,
        ICON512: FIX512,
        LABEL_COLOR: "#CCCCCC",
      },
      insertFile: {
        ICON16: INSERT_FILE16,
        ICON512: INSERT_FILE512,
        LABEL_COLOR: "#CCCCCC",
      },
      newFile: {
        ICON16: NEW_FILE16,
        ICON512: NEW_FILE512,
        LABEL_COLOR: "#CCCCCC",
      },
      newFolder: {
        ICON16: NEW_FOLDER16,
        ICON512: NEW_FOLDER512,
        LABEL_COLOR: "#CCCCCC",
      },
      paste: {
        ICON16: PASTE16,
        ICON512: PASTE512,
        LABEL_COLOR: "#CCCCCC",
      },
      rename: {
        ICON16: RENAME16,
        ICON512: RENAME512,
        LABEL_COLOR: "#CCCCCC",
      },
      unpaste: {
        ICON16: UNPASTE16,
        ICON512: UNPASTE512,
        LABEL_COLOR: "#8C8C8C",
      },
      update: {
        ICON16: UPDATE16,
        ICON512: UPDATE512,
        LABEL_COLOR: "#CCCCCC",
      },
      trash: {
        ICON16: TRASH16,
        ICON512: TRASH512,
        LABEL_COLOR: "#F1592A",
      },
    };
  } catch (e) {
    console.log(e);
  }
  /*FILE_TYPE_STYLING_MANAGER ---------------------------------------------------------------- */

  return {
    FILE_TYPE_ICON_MANAGER: FILE_TYPE_ICON_MANAGER,
    SYSTEM_ICON_MANAGER: SYSTEM_ICON_MANAGER,
  };
};
