// React Component Imports
import React, { useCallback, useEffect } from "react";
import ReactFlow, { useReactFlow, Controls, ControlButton, Background, addEdge } from "reactflow";
import DescriptionNode from "../description_node/description_node";

// Styling Imports
import "reactflow/dist/style.css";
import "./graph.css";

// Icon Imports
import { ReactComponent as AutoArrangeIcon } from "./auto_arrange.svg";

// Node Types for ReactFlow
const nodeTypes = { descNode: DescriptionNode };

/**
 * Automatically organizes the nodes in the graph
 * @param {*} nodes - Array of nodes
 * @param {*} edges - Array of edges
 * @returns - Array of nodes with updated positions
 */
function organizeNodes(nodes, edges) {
    // Combine the nodes and edges into one structure {nodeID, children[], parents[]}
    let nodeStructure = [];
    edges.forEach((edge) => {
        let sourceNode = nodeStructure.find((node) => node.id === edge.source);
        if (!sourceNode) {
            sourceNode = nodes.find((node) => node.id === edge.source);
            sourceNode.children = [];
            sourceNode.parents = [];
            sourceNode.visited = false;
            nodeStructure.push(sourceNode);
        }

        let targetNode = nodeStructure.find((node) => node.id === edge.target);
        if (!targetNode) {
            targetNode = nodes.find((node) => node.id === edge.target);
            targetNode.children = [];
            targetNode.parents = [];
            targetNode.visited = false;
            nodeStructure.push(targetNode);
        }

        sourceNode.children.push(targetNode);
        targetNode.parents.push(sourceNode);
    });

    // Push nodes that are not in the nodeStructure into finalNodeStructure, chnage position.y and position.x with y = 0 and x = index * 400
    let finalNodeStructure = [];

    // Lone node handler
    nodes.forEach((node, index) => {
        if (!nodeStructure.find((n) => n.id === node.id)) {
            node.position = {
                x: index * 500,
                y: 0,
            };
            node.children = [];
            node.parents = [];
            node.visited = false;
            finalNodeStructure.push(node);
        }
    });

    // Add nodes with no parents to finalNodeStructure with y = 400 and x = index * 400, then recursively add children
    let rootNodes = nodeStructure.filter((node) => node.parents.length === 0);

    console.log("finalNodeStructure", finalNodeStructure);
    console.log("nodeStructure", nodeStructure);
    console.log("nodes", nodes);
    console.log("edges", edges);
    console.log("rootNodes", rootNodes);

    // Handles trees where there's a root (no parent node)
    let xPositionArray = [0];
    rootNodes.forEach((node) => {
        addNodes(node, finalNodeStructure, 1, xPositionArray);
        console.log("MaxPosition", Math.max(...xPositionArray));
        xPositionArray = [Math.max(...xPositionArray) + 1];
    });

    // Handles trees where there is a cyclic structure (A -> B -> C -> A)
    while (finalNodeStructure.length < nodes.length) {
        let unvisitedNodes = nodeStructure.filter((node) => !node.visited);
        addNodes(unvisitedNodes[0], finalNodeStructure, 1, xPositionArray);
        xPositionArray = [Math.max(...xPositionArray) + 1];
    }
    return finalNodeStructure;
}

/**
 * Helper function for organizeNodes, recursively adds nodes to finalNodeStructure while updating their positions
 * @param {*} node - Node to add
 * @param {*} finalNodeStructure - Array of nodes with updated positions
 * @param {*} yPosition - Current y (grid) position
 * @param {*} max_x_positions - Keeps track of the current maximum x (grid) position for each y (grid) position
 */
function addNodes(node, finalNodeStructure, yPosition, max_x_positions) {
    // If node has already been visited, end recursion
    if (node.visited) return;

    // Mark node as visited
    node.visited = true;

    console.log("xPositionArray", max_x_positions);

    // Initialize value in xPositionArray to previous yPosition's maxXValue if not defined for current yPosition
    if (max_x_positions[yPosition] === undefined) {
        max_x_positions[yPosition] = max_x_positions[yPosition - 1];
    }
    // Else increment current yPosition's maxXValue
    else {
        max_x_positions[yPosition]++;
    }

    // If node has children, update current node maximum xPosition to maximum value of previous subtree's maximum xPosition
    if (node.children.length > 0) {
        // ... todo
    }
    
    // Recursively add children
    node.children.forEach((child) => {
        if (!child.visited) {
            addNodes(child, finalNodeStructure, yPosition + 1, max_x_positions);
        }
    });

    // Add node to finalNodeStructure and remove children and parents
    node.position = {
        x: max_x_positions[yPosition] * 500,
        y: yPosition * 400,
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
    }, [reactFlow, nodes, edges, setNodes]);

    const handleAutoArrange = useCallback(() => {
        setNodes(organizeNodes(nodes, edges));
    }, [nodes, edges, setNodes]);

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
                    <ControlButton onClick={handleAutoArrange}>
                        <AutoArrangeIcon />
                    </ControlButton>
                </Controls>
                <Background variant="cross" color="#505050" gap={100} size={10} />
            </ReactFlow>
        </div>
    );
}
