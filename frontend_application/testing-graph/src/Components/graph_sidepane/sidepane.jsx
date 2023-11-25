import React, { useCallback, useState, useEffect } from "react";
import { useReactFlow } from "reactflow";
import Explorer from "../explorer/explorer";
import RightClickContextMenu from "../rightClickContextMenu/rightClickContextMenu";

import "./sidepane.css";
import placeholderFolders from "./placeholder_folders.json";
import { ReactComponent as PlusIcon } from "./plus_button.svg";

let nodeId = 3; // TODO: Need to get ID of existing nodes from DB

export default function GraphSidepane() {
    // Explorer file structure read
    const [files, setFiles] = useState(placeholderFolders);

    // Right Click Menu (Explorer)
    const [isRightClicked, setIsRightClicked] = useState(false);
    const [rightClickX, setRightClickX] = useState(-1);
    const [rightClickY, setRightClickY] = useState(-1);
    const [onRightClickItem, setOnRightClickItem] = useState(null);
    const [rightClickCommand, setRightClickCommand] = useState(null);
    const [copyFile, setCopyFile] = useState(null);
    const handleRightClick = (event) => {
        event.preventDefault();
        setIsRightClicked(true);

        const boundingRect = event.currentTarget.getBoundingClientRect();

        const rightClickX = event.clientX - boundingRect.left;
        const rightClickY = event.clientY - boundingRect.top;

        setRightClickX(rightClickX);
        setRightClickY(rightClickY);
    };
    const handleOnClick = (event) => {
        setIsRightClicked(false);
        setOnRightClickItem(null);
    };
    //COPY and CUT command
    useEffect(() => {
        if (rightClickCommand !== null) {
            if (rightClickCommand.command === "copy") {
                setCopyFile(rightClickCommand.target_file);
            }
        }
    }, [rightClickCommand]);

    // React Flow
    const GraphFunctions = useReactFlow();

    const [selectedOption, setSelectedOption] = useState('descNode');
    const addNewNode = useCallback((selectedOption) => {
        let { x, y } = GraphFunctions.project({
            x: 0,
            y: 0 + convertEmToPixels(1),
        });

        const id = `${++nodeId}`;
        const newNode = {
            id,
            type: selectedOption,
            position: {
                x: x,
                y: y,
            },
            data: {
                label: `Node ${id}`,
            },
        };

        GraphFunctions.addNodes(newNode);
    }, [
        GraphFunctions.getViewport(),
        GraphFunctions.project({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        }),
    ]);

    return (
        <div id="graph_sidepane" onContextMenu={handleRightClick} onClick={handleOnClick}>
            <button
                id="graph_sidepane_add_edge_button"
                className="background_UI_Frame_1"
                onClick={() => addNewNode(selectedOption)}
            >
                <PlusIcon />
                <select onChange={(e) => setSelectedOption(e.target.value)} onClick={(e) => e.stopPropagation()}>
                    <option value="descNode">New Function Node</option>
                    <option value="varNode">New Variable Node</option>
                    <option value="option3">New Option 3</option>
                </select>
            </button>
            <div className="explorer_container background_UI_Frame_1">
                <Explorer
                    files={files}
                    onRightClickItem={onRightClickItem}
                    setOnRightClickItem={setOnRightClickItem}
                    rightClickCommand={rightClickCommand}
                    setRightClickCommand={setRightClickCommand}
                    copyFile={copyFile}
                />
                {isRightClicked ? (
                    <RightClickContextMenu
                        x={rightClickX}
                        y={rightClickY}
                        onRightClickItem={onRightClickItem}
                        setOnRightClickItem={setOnRightClickItem}
                        setRightClickCommand={setRightClickCommand}
                        copyFile={copyFile}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

function convertEmToPixels(em) {
    // Get the root font size in pixels
    var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    // Multiply by the EM value to get the pixel value
    return em * rootFontSize;
}
