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
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge"; // Import your custom edge component

const initialNodes = [];
const initialEdges = [];

const Flow = () => {
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

  const onConnect = useCallback((params) => {
    console.log("Connected nodes:", params);
    setEdges((eds) => {
      // Allow multiple edges between nodes
      return addEdge(params, eds);
    });
  }, []);

  const addNode = useCallback((newNode) => {
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );

  return (
    <div className="h-screen w-full flex">
      <SideBar addNode={addNode} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // connectionLineType="smoothstep"
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
