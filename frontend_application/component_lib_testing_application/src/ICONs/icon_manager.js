export const ICON_MANAGER = () => {
  /*FILE_TYPE_STYLING_MANAGER ---------------------------------------------------------------- */
  let FILE_TYPE_ICON_MANAGER = {
    default: {
      ICON16: null,
      ICON: null,
      LABEL_COLOR: "#C8C8C8",
    },
  };
  try {
    /* 16X16 ICONs ---------------------------------------------------------------------- */
    const JS16 = require("./FILETYPE_ICONs/16X16/js.png");
    const HTML16 = require("./FILETYPE_ICONs/16X16/html.png");
    const CSS16 = require("./FILETYPE_ICONs/16X16/css.png");
    const JSON16 = require("./FILETYPE_ICONs/16X16/json.png");
    const CPP16 = require("./FILETYPE_ICONs/16X16/cpp.png");
    const CS16 = require("./FILETYPE_ICONs/16X16/cs.png");
    const PY16 = require("./FILETYPE_ICONs/16X16/py.png");
    const JAVA16 = require("./FILETYPE_ICONs/16X16/java.png");
    const PHP16 = require("./FILETYPE_ICONs/16X16/php.png");
    const IPYNB16 = require("./FILETYPE_ICONs/16X16/ipynb.png");
    const XML16 = require("./FILETYPE_ICONs/16X16/xml.png");
    //IMAGE FILE TYPES
    const JPG16 = require("./FILETYPE_ICONs/16X16/jpg.png");
    const PNG16 = require("./FILETYPE_ICONs/16X16/png.png");
    const SVG16 = require("./FILETYPE_ICONs/16X16/svg.png");
    //DOCUMENT FILE TYPES
    const TXT16 = require("./FILETYPE_ICONs/16X16/txt.png");
    const PDF16 = require("./FILETYPE_ICONs/16X16/pdf.png");
    const PPTX16 = require("./FILETYPE_ICONs/16X16/pptx.png");
    const PPT16 = require("./FILETYPE_ICONs/16X16/ppt.png");
    const XLSX16 = require("./FILETYPE_ICONs/16X16/xlsx.png");
    const XLS16 = require("./FILETYPE_ICONs/16X16/xls.png");
    const DOCX16 = require("./FILETYPE_ICONs/16X16/docx.png");
    const DOC16 = require("./FILETYPE_ICONs/16X16/doc.png");
    //DATABASE FILE TYPES
    const SQL16 = require("./FILETYPE_ICONs/16X16/sql.png");
    //OTHER FILE TYPES
    const GITIGNORE16 = require("./FILETYPE_ICONs/16X16/gitignore.png");
    const MD16 = require("./FILETYPE_ICONs/16X16/md.png");
    const ENV16 = require("./FILETYPE_ICONs/16X16/env.png");
    /* 16X16 ICONs ---------------------------------------------------------------------- */

    /* 512X512 ICONs ---------------------------------------------------------------------- */
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
    const PPT512 = require("./FILETYPE_ICONs/512X512/ppt.png");
    const XLSX512 = require("./FILETYPE_ICONs/512X512/xlsx.png");
    const XLS512 = require("./FILETYPE_ICONs/512X512/xls.png");
    const DOCX512 = require("./FILETYPE_ICONs/512X512/docx.png");
    const DOC512 = require("./FILETYPE_ICONs/512X512/doc.png");
    //DATABASE FILE TYPES
    const SQL512 = require("./FILETYPE_ICONs/512X512/sql.png");
    //OTHER FILE TYPES
    const GITIGNORE512 = require("./FILETYPE_ICONs/512X512/gitignore.png");
    const MD512 = require("./FILETYPE_ICONs/512X512/md.png");
    const ENV512 = require("./FILETYPE_ICONs/512X512/env.png");
    /* 512X512 ICONs ---------------------------------------------------------------------- */

    FILE_TYPE_ICON_MANAGER = {
      default: {
        ICON16: null,
        ICON: null,
        LABEL_COLOR: "#C8C8C8",
      },
      //CODE FILE TYPES
      js: {
        ICON16: JS16,
        ICON512: JS512,
        LABEL_COLOR: "#CCCCCC",
        language: "javascript",
      },
      html: {
        ICON16: HTML16,
        ICON512: HTML512,
        LABEL_COLOR: "#CCCCCC",
        language: "html",
      },
      css: {
        ICON16: CSS16,
        ICON512: CSS512,
        LABEL_COLOR: "#CCCCCC",
        language: "css",
      },
      json: {
        ICON16: JSON16,
        ICON512: JSON512,
        LABEL_COLOR: "#CCCCCC",
        language: "json",
      },
      cpp: {
        ICON16: CPP16,
        ICON512: CPP512,
        LABEL_COLOR: "#CCCCCC",
        language: "cpp",
      },
      cs: {
        ICON16: CS16,
        ICON512: CS512,
        LABEL_COLOR: "#CCCCCC",
        language: "cs",
      },
      py: {
        ICON16: PY16,
        ICON512: PY512,
        LABEL_COLOR: "#CCCCCC",
        language: "python",
      },
      java: {
        ICON16: JAVA16,
        ICON512: JAVA512,
        LABEL_COLOR: "#CCCCCC",
        language: "java",
      },
      php: {
        ICON16: PHP16,
        ICON512: PHP512,
        LABEL_COLOR: "#CCCCCC",
        language: "php",
      },
      ipynb: {
        ICON16: IPYNB16,
        ICON512: IPYNB512,
        LABEL_COLOR: "#CCCCCC",
        language: "python",
      },
      xml: {
        ICON16: XML16,
        ICON512: XML512,
        LABEL_COLOR: "#CCCCCC",
        language: "xml",
      },
      //IMAGE FILE TYPES
      jpg: {
        ICON16: JPG16,
        ICON512: JPG512,
        LABEL_COLOR: "#8C8C8C",
        language: "image",
      },
      png: {
        ICON16: PNG16,
        ICON512: PNG512,
        LABEL_COLOR: "#8C8C8C",
        language: "image",
      },
      svg: {
        ICON16: SVG16,
        ICON512: SVG512,
        LABEL_COLOR: "#8C8C8C",
        language: "image",
      },
      //DOCUMENT FILE TYPES
      txt: {
        ICON16: TXT16,
        ICON512: TXT512,
        LABEL_COLOR: "#8C8C8C",
        language: "text",
      },
      pdf: {
        ICON16: PDF16,
        ICON512: PDF512,
        LABEL_COLOR: "#8C8C8C",
        language: "pdf",
      },
      pptx: {
        ICON16: PPTX16,
        ICON512: PPTX512,
        LABEL_COLOR: "#8C8C8C",
        language: "powerpoint",
      },
      ppt: {
        ICON16: PPT16,
        ICON512: PPT512,
        LABEL_COLOR: "#8C8C8C",
        language: "powerpoint",
      },
      xlsx: {
        ICON16: XLSX16,
        ICON512: XLSX512,
        LABEL_COLOR: "#8C8C8C",
        language: "excel",
      },
      xls: {
        ICON16: XLS16,
        ICON512: XLS512,
        LABEL_COLOR: "#8C8C8C",
        language: "excel",
      },
      docx: {
        ICON16: DOCX16,
        ICON512: DOCX512,
        LABEL_COLOR: "#8C8C8C",
        language: "word",
      },
      doc: {
        ICON16: DOC16,
        ICON512: DOC512,
        LABEL_COLOR: "#8C8C8C",
        language: "word",
      },
      //DATABASE FILE TYPES
      sql: {
        ICON16: SQL16,
        ICON512: SQL512,
        LABEL_COLOR: "#CCCCCC",
        language: "sql",
      },
      //OTHER FILE TYPES
      gitignore: {
        ICON16: GITIGNORE16,
        ICON512: GITIGNORE512,
        LABEL_COLOR: "#8C8C8C",
        language: "gitignore",
      },
      md: {
        ICON16: MD16,
        ICON512: MD512,
        LABEL_COLOR: "#8C8C8C",
        language: "markdown",
      },
      env: {
        ICON16: ENV16,
        ICON512: ENV512,
        LABEL_COLOR: "#8C8C8C",
        language: "env",
      },
    };
  } catch (e) {
    console.log(e);
  }
  /*FILE_TYPE_STYLING_MANAGER ---------------------------------------------------------------- */

  /*FILE_TYPE_STYLING_MANAGER ---------------------------------------------------------------- */
  let SYSTEM_ICON_MANAGER = {
    default: {
      ICON16: null,
      ICON: null,
      LABEL_COLOR: "#C8C8C8",
    },
  };
  try {
    /* 16X16 ICONs ---------------------------------------------------------------------- */
    const CLOSE_ICON16 = require("./SYSTEM_ICONs/16X16/close.png");
    const ARROW_ICON16 = require("./SYSTEM_ICONs/16X16/arrow.png");
    const AST_ICON16 = require("./SYSTEM_ICONs/16X16/ast.png");
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
    const SEND16 = require("./SYSTEM_ICONs/16X16/send.png");
    const SAVE16 = require("./SYSTEM_ICONs/16X16/save.png");
    const SEARCH16 = require("./SYSTEM_ICONs/16X16/search.png");
  
    const RIGHT_ARROW16 = require("./SYSTEM_ICONs/16X16/right_arrow.png");
    const LEFT_ARROW16 = require("./SYSTEM_ICONs/16X16/left_arrow.png");
    const UP_ARROW16 = require("./SYSTEM_ICONs/16X16/up_arrow.png");
    const DOWN_ARROW16 = require("./SYSTEM_ICONs/16X16/down_arrow.png");

    const FOLD16 = require("./SYSTEM_ICONs/16X16/fold.png");
    const UNFOLD16 = require("./SYSTEM_ICONs/16X16/unfold.png");

    const FOLDER_TREE16 = require("./SYSTEM_ICONs/16X16/folder_tree.png");
    /* 16X16 ICONs ---------------------------------------------------------------------- */

    /* 512X512 ICONs ---------------------------------------------------------------------- */
    const CLOSE_ICON512 = require("./SYSTEM_ICONs/512X512/close.png");
    const ARROW_ICON512 = require("./SYSTEM_ICONs/512X512/arrow.png");
    const AST_ICON512 = require("./SYSTEM_ICONs/512X512/ast.png");
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
    const SEND512 = require("./SYSTEM_ICONs/512X512/send.png");
    const SAVE512 = require("./SYSTEM_ICONs/512X512/save.png");
    const SEARCH512 = require("./SYSTEM_ICONs/512X512/search.png");

    const RIGHT_ARROW512 = require("./SYSTEM_ICONs/512X512/right_arrow.png");
    const LEFT_ARROW512 = require("./SYSTEM_ICONs/512X512/left_arrow.png");
    const UP_ARROW512 = require("./SYSTEM_ICONs/512X512/up_arrow.png");
    const DOWN_ARROW512 = require("./SYSTEM_ICONs/512X512/down_arrow.png");

    const FOLD512 = require("./SYSTEM_ICONs/512X512/fold.png");
    const UNFOLD512 = require("./SYSTEM_ICONs/512X512/unfold.png");

    const FOLDER_TREE512 = require("./SYSTEM_ICONs/512X512/folder_tree.png");
    /* 512X512 ICONs ---------------------------------------------------------------------- */

    SYSTEM_ICON_MANAGER = {
      default: {
        ICON16: null,
        ICON: null,
        LABEL_COLOR: "#C8C8C8",
      },
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
      ast: {
        ICON16: AST_ICON16,
        ICON512: AST_ICON512,
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
      send: {
        ICON16: SEND16,
        ICON512: SEND512,
        LABEL_COLOR: "#CCCCCC",
      },
      save: {
        ICON16: SAVE16,
        ICON512: SAVE512,
        LABEL_COLOR: "#CCCCCC",
      },
      search: {
        ICON16: SEARCH16,
        ICON512: SEARCH512,
        LABEL_COLOR: "#CCCCCC",
      },
      rightArrow: {
        ICON16: RIGHT_ARROW16,
        ICON512: RIGHT_ARROW512,
        LABEL_COLOR: "#CCCCCC",
      },
      leftArrow: {
        ICON16: LEFT_ARROW16,
        ICON512: LEFT_ARROW512,
        LABEL_COLOR: "#CCCCCC",
      },
      upArrow: {
        ICON16: UP_ARROW16,
        ICON512: UP_ARROW512,
        LABEL_COLOR: "#CCCCCC",
      },
      downArrow: {
        ICON16: DOWN_ARROW16,
        ICON512: DOWN_ARROW512,
        LABEL_COLOR: "#CCCCCC",
      },
      fold: {
        ICON16: FOLD16,
        ICON512: FOLD512,
        LABEL_COLOR: "#CCCCCC",
      },
      unfold: {
        ICON16: UNFOLD16,
        ICON512: UNFOLD512,
        LABEL_COLOR: "#CCCCCC",
      },
      folderTree: {
        ICON16: FOLDER_TREE16,
        ICON512: FOLDER_TREE512,
        LABEL_COLOR: "#CCCCCC",
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
