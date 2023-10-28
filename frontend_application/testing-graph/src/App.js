import {
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from "reactflow";

import Graph from "./Components/graph/graph";
import GraphSidepane from "./Components/graph_sidepane/sidepane";

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

    return (
        <div id="graph_window">            
            <ReactFlowProvider>
                <GraphSidepane />
                <Graph nodeBundle={nodeBundle} edgeBundle={edgeBundle} />
            </ReactFlowProvider>
        </div>
    );
}
