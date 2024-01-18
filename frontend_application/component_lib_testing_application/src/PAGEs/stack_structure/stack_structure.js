import React, { useState, useEffect, useRef } from "react";
import "./stack_structure.css";

const StackStructure = () => {
  const [stack, setStack] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const stackStructureContainerRef = useRef(null);
  const [onDragIndex, setOnDragIndex] = useState(-1);
  const [onDropIndex, setOnDropIndex] = useState(-1);

  const onStackItemDragStart = (e, index) => {
    setOnDragIndex(index);
  };
  const onStackItemDragEnd = (e) => {
    if (onDropIndex !== -1) {
      const editedStacks = [...stack];
      const dragedItem = editedStacks.splice(onDragIndex, 1)[0];
      editedStacks.splice(onDropIndex, 0, dragedItem);
      setStack(editedStacks);
    }

    setOnDragIndex(-1);
    setOnDropIndex(-1);
  };
  const containerOnDragOver = (e) => {
    e.preventDefault();
    const targetElement = e.target.closest(
      ".stack_structure_item0116"
    );
    if (targetElement && stackStructureContainerRef.current) {
      const childrenArray = Array.from(
        stackStructureContainerRef.current.children
      );
      const dropIndex = childrenArray.indexOf(targetElement);
      if (dropIndex !== onDropIndex && dropIndex !== -1) {
        setOnDropIndex(dropIndex);
      }
    }
  };

  return (
    <div
      className="stack_structure_container0116"
      ref={stackStructureContainerRef}
      onDragOver={(e) => {
        containerOnDragOver(e);
      }}
      onDragLeave={(e) => {
        setOnDropIndex(-1);
      }}
    >
      {stack.map((item, index) => {
        let className;
        className = "stack_structure_item0116";
        return (
          <div
            className={className}
            key={index}
            draggable={true}
            onDragStart={(e) => {
              onStackItemDragStart(e, index);
            }}
            onDragEnd={(e) => {
              onStackItemDragEnd(e);
            }}
          >
            <span className="stack_structure_label0116">{item}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StackStructure;
