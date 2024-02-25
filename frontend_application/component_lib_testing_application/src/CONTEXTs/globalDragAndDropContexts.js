import { createContext } from "react";

/* Parameters --------------------------------------------------------------
    draggedItem,
    setDraggedItem,
    draggedOverItem,
    setDraggedOverItem,
    dragCommand,
    setDragCommand,
*/
/* DragCommand Item ---------------------------------------------------
    File_Object
*/
/* DragCommand -------------------------------------------------------------
    "APPEND TO TARGET"
    "DELETE FROM SOURCE"
*/
export const globalDragAndDropContexts = createContext("");
