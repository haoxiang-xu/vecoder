import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";

import "./sidepane.css";

let nodeId = 3; // TODO: Need to get ID of existing nodes from DB

export default function GraphSidepane() {
    const GraphFunctions = useReactFlow();

    const addNewNode = useCallback(() => {
        let { x, y } = GraphFunctions.project({
            x: 0,
            y: 0 + convertEmToPixels(1),
        });

        const id = `${++nodeId}`;
        const newNode = {
            id,
            type: "descNode",
            position: {
                x: x,
                y: y
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
        <div id="graph_sidepane" className="background_UI_Frame_1">
            <button
                id="graph_sidepane_add_edge_button"
                className="background_UI_Frame_1"
                onClick={addNewNode}
            >
                Add Node
            </button>
        </div>
    );
}

function convertEmToPixels (em) {
    // Get the root font size in pixels
    var rootFontSize = parseFloat (getComputedStyle (document.documentElement).fontSize);
    // Multiply by the EM value to get the pixel value
    return em * rootFontSize;
  }
  