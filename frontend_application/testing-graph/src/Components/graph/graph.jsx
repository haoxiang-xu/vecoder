import React, { useCallback, useEffect } from "react";
import ReactFlow, {
    useReactFlow,
    Controls,
    ControlButton,
    Background,
    addEdge,
} from "reactflow";

import DescriptionNode from "../description_node/description_node";

import "reactflow/dist/style.css";
import "./graph.css";

const nodeTypes = { descNode: DescriptionNode };

function organizeNodes(nodes, edges) {
    // Combine the nodes and edges into one structure {nodeID, children[], parents[]}
    let nodeStructure = [];
    edges.forEach((edge) => {
        let sourceNode = nodeStructure.find((node) => node.id === edge.source);
        if (!sourceNode) {
            sourceNode = nodes.find((node) => node.id === edge.source);
            sourceNode.children = [];
            sourceNode.parents = [];
            nodeStructure.push(sourceNode);
        }

        let targetNode = nodeStructure.find((node) => node.id === edge.target);
        if (!targetNode) {
            targetNode = nodes.find((node) => node.id === edge.target);
            targetNode.children = [];
            targetNode.parents = [];
            nodeStructure.push(targetNode);
        }

        sourceNode.children.push(targetNode);
        targetNode.parents.push(sourceNode);
    });

    // Push nodes that are not in the nodeStructure into finalNodeStructure, chnage position.y and position.x with y = 0 and x = index * 400
    let finalNodeStructure = [];
    let completedNodeIds = [];
    nodes.forEach((node) => {
        if (!nodeStructure.find((n) => n.id === node.id)) {
            node.position = {
                x: completedNodeIds.length * 500,
                y: 0,
            };
            node.children = [];
            node.parents = [];
            finalNodeStructure.push(node);
            completedNodeIds.push(node.id);
        }
    });

    // Add nodes with no parents to finalNodeStructure with y = 400 and x = index * 400, then recursively add children
    let rootNodes = nodeStructure.filter((node) => node.parents.length === 0);

    console.log("finalNodeStructure", finalNodeStructure);
    console.log("nodeStructure", nodeStructure);
    console.log("nodes", nodes);
    console.log("edges", edges);
    console.log("rootNodes", rootNodes);
    console.log("completedNodeIds", completedNodeIds);
    
    rootNodes.forEach((node, counter) => {
        counter = addNodes(node, completedNodeIds, finalNodeStructure, 1, counter);
    });

    return finalNodeStructure;
}

function addNodes(node, visitedNodeIDs, finalNodeStructure, level, childNum) {
    // Add node to visitedNodeIDs    
    visitedNodeIDs.push(node.nodeID);
    
    console.log("children nodes", node.children);
    // Add children to finalNodeStructure with y = (level + 1) * 400 and x = index * 400, then recursively add children
    node.children.forEach((child, index) => {
        if (!visitedNodeIDs.includes(child.id)) {
            addNodes(child, visitedNodeIDs, finalNodeStructure, level + 1, childNum + index);
        }
    });

    // Add node to finalNodeStructure with y = level * 400 and x = index * 400, and remove children and parents
    node.position = {
        x: childNum * 500,
        y: level * 400,
    };
    delete node.children;
    delete node.parents;
    finalNodeStructure.push(node);
}

export default function Graph(props) {
    const reactFlow = useReactFlow();
    const [nodes, setNodes, onNodesChange] = props.nodeBundle;
    const [edges, setEdges, onEdgesChange] = props.edgeBundle;

    // Add window event listener to delete selected edges when the delete key is pressed
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Delete") {
                reactFlow.getEdges().forEach((edge) => {
                    // check if edge is selected
                    if (edge.selected) {
                        reactFlow.deleteElements({ edges: [edge] });
                    }
                });
            }

            if (event.key === "Escape") {
                console.log("nodes", nodes);
                console.log("edges", edges);
            }

            if (event.key === "Enter") {
                let newNodes = organizeNodes(nodes, edges);
                console.log("newnodes", newNodes);
                setNodes(newNodes);

            }
        }

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [reactFlow, nodes, edges]);

    const onConnect = useCallback(
        (params) => {
            params.type = "smoothstep";
            params.animated = true;
            params.id = `e${params.source}-${params.target}`;
            setEdges((eds) => addEdge(params, eds));
        },
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
                fitView
            >
                <Controls>
                    <ControlButton onClick={organizeNodes}>Null</ControlButton>
                </Controls>
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
