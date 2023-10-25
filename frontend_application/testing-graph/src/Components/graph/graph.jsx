import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import DescriptionNode from '../description_node/description_node';

import 'reactflow/dist/style.css';
import './graph.css';

const nodeTypes = { descNode: DescriptionNode };

// STUFF THAT NEEDS TO COME FROM BACKEND
// v v v v v v v v v v v v v v v v v v v 

const initialNodes = [
  { id: '1', type: 'descNode', position: { x: 0, y: 0 }, data: { label: 'test 1', description: 'what is this?', icon: '/java.png' } },
  { id: '2', type: 'descNode', position: { x: 500, y: 100 }, data: { label: 'test 2' } },
  { id: '3', type: 'descNode', position: { x: 0, y: 500}, data: { label: 'test 3' } },

];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'smoothstep' }];

// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ 

export default function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background variant="cross" color='#505050' gap={100} size={10} />
      </ReactFlow>
    </div>
  );
}