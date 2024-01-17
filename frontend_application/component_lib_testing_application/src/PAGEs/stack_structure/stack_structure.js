import React, { useState, useEffect, useRef } from "react";
import "./stack_structure.css";

const StackStructure = () => {
  const [stack, setStack] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const stackStructureContainerRef = useRef(null);
  const [onSelectedIndex, setOnSelectedIndex] = useState(null);
  const [onDragIndex, setOnDragIndex] = useState(-1);
  const [onDropIndex, setOnDropIndex] = useState(-1);
  const [onSwapIndex, setOnSwapIndex] = useState(-1);

  const onStackItemDragStart = (e, index) => {
    e.target.style.width = "64px";

    setOnSelectedIndex(index);
    setOnDragIndex(index);
  };
  const onStackItemDragEnd = (e) => {
    e.target.style.width = "256px";

    if (onDropIndex !== -1) {
      const editedStacks = [...stack];
      const dragedItem = editedStacks.splice(onDragIndex, 1)[0];
      editedStacks.splice(onDropIndex, 0, dragedItem);
      setStack(editedStacks);
      setOnSelectedIndex(onDropIndex);
    }

    setOnDragIndex(-1);
    setOnDropIndex(-1);
    setOnSwapIndex(-1);
  };
  const containerOnDragOver = (e) => {
    e.preventDefault();
    const targetElement = e.target.closest(".stack_structure_item0116");
    if (targetElement && stackStructureContainerRef.current) {
      const childrenArray = Array.from(
        stackStructureContainerRef.current.children
      );
      const dropIndex = childrenArray.indexOf(targetElement);
      console.log(dropIndex+1)
      if (dropIndex !== onDropIndex && dropIndex !== -1) {
        setOnDropIndex(dropIndex);
      }
    }
  };
  useEffect(() => {
    setOnSwapIndex(onDropIndex);
  }, [onDropIndex]);

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
        switch (true) {
          case index === onDropIndex:
            className = "stack_structure_item_ondrop0116";
            break;
          default:
            className = "stack_structure_item0116";
        }
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
