import React, { useCallback } from "react";
import ReactFlow, {
    Controls,
    Background,
    addEdge,
} from "reactflow";

import DescriptionNode from "../description_node/description_node";

import "reactflow/dist/style.css";
import "./graph.css";

const nodeTypes = { descNode: DescriptionNode };

// STUFF THAT NEEDS TO COME FROM BACKEND
// v v v v v v v v v v v v v v v v v v v

// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^

export default function Graph(props) {
    const [nodes, setNodes, onNodesChange] = props.nodeBundle;
    const [edges, setEdges, onEdgesChange] = props.edgeBundle;

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                // fitView
            >
                <Controls />
                <Background
                    variant="cross"
                    color="#505050"
                    gap={100}
                    size={10}
                />
            </ReactFlow>
        </div>
    );
}
