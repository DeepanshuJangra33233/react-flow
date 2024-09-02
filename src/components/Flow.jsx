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

const Flow = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // Automatically generate JSON when a new node is added
  const addNode = useCallback(
    (newNode) => {
      setNodes((nds) => {
        const updatedNodes = [...nds, newNode];
        const jsonOutput = updatedNodes.map((node) =>
          buildJsonStructure(node.id)
        );
        console.log(JSON.stringify(jsonOutput, null, 2));
        return updatedNodes;
      });
    },
    [nodes, edges]
  ); // Add nodes and edges as dependencies to re-generate JSON

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
  }, []);

  const buildJsonStructure = (nodeId) => {
    // Try to find the node in the existing nodes array
    const node = nodes.find((n) => n.id === nodeId);

    // Define default values
    let result = {
      custom_type: "Document", // Default custom_type
      document_url: "contact list.ods", // Default document_url
      bot_terminate: true, // Assume termination unless there are connected nodes
    };

    // If the node is found, customize result with its data
    if (node) {
      const { type, type_id, time_delay, title, message } = node.data;

      result = {
        ...result, // Start with default values
        ...(type && { type }), // Overwrite defaults if specific values exist
        ...(type_id && { type_id }),
        ...(time_delay && { time_delay }),
        ...(title && { title }),
        ...(message && { message }),
      };

      // Check for connected edges to update bot_terminate
      const connectedEdges = edges.filter((edge) => edge.source === nodeId);
      if (connectedEdges.length > 0) {
        result.bot_terminate = false; // There are child nodes, so do not terminate
        result.context = {
          type: "button_reply",
          button_reply: connectedEdges.map((edge) => {
            const targetNode = nodes.find((n) => n.id === edge.target);
            const buttonReply = {
              id: edge.target,
              title: targetNode?.data.title, // Safely access targetNode data
              next_node: buildJsonStructure(edge.target),
            };
            return buttonReply;
          }),
        };
      }
    }

    return result;
  };

  const handleDataFromChild = (id, data) => {
    console.log(`Data from node ${id}:`, data);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  };

  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  return (
    <div className="h-screen w-full flex">
      <SideBar
        addNode={addNode}
        deleteNode={deleteNode}
        handleDataFromChild={handleDataFromChild}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        style={{ width: "100%", height: "100vh" }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      {/* The button below is removed since JSON generation is automatic */}
      {/* <button onClick={generateJson}>Generate JSON</button> */}
    </div>
  );
};

export default Flow;
