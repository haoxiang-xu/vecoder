import {
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from "reactflow";

import { useState } from "react";

import Graph from "./Components/graph/graph";
import GraphSidepane from "./Components/graph_sidepane/sidepane";
import ErrorPopup from "./Components/error_popup/error_popup";

import "./App.css";
import React from "react";

const initialNodes = [
    {
        id: "1",
        type: "descNode",
        position: { x: 0, y: 0 },
        data: {
            label: "test 1",
            description: "what is this?",
            icon: "/java.png",
        },
    },
    {
        id: "2",
        type: "descNode",
        position: { x: 500, y: 100 },
        data: { label: "test 2" },
    },
    {
        id: "3",
        type: "descNode",
        position: { x: 0, y: 500 },
        data: { label: "test 3" },
    },
];
const initialEdges = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: "true",
        type: "smoothstep",
    },
];

export default function App() {
    const nodeBundle = useNodesState(initialNodes);
    const edgeBundle = useEdgesState(initialEdges);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleError = (message) => {
        setErrorMessage([message, new Date().toLocaleString()]);
    };

    return (
        <div id="graph_window">            
            <ReactFlowProvider>
                <GraphSidepane handleError={handleError} />
                <Graph nodeBundle={nodeBundle} edgeBundle={edgeBundle} handleError={handleError} />
                <ErrorPopup errorMessage={errorMessage} />
            </ReactFlowProvider>
        </div>
    );
}