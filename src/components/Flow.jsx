import { useCallback, useState, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";
import SideBar from "./SideBar";
import CustomNode from "./CustomNode"; // Import your custom node

const initialNodes = [];
const initialEdges = [];

const Flow = () => {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = useCallback((newNode) => {
    setNodes((nds) => [...nds, newNode]);
  }, []);

  return (
    <div className="h-screen w-full flex">
      <SideBar addNode={addNode} />
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes} // Pass the memoized nodeTypes here
        style={{ width: "100%", height: "100vh" }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Flow;
