import PropTypes from "prop-types";
import { EdgeText } from "react-flow-renderer";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, style }) => {
  return (
    <>
      <path
        id={id}
        style={style}
        d={`M${sourceX},${sourceY}L${targetX},${targetY}`}
        className="react-flow__edge-path"
      />
      <EdgeText
        x={(sourceX + targetX) / 2}
        y={(sourceY + targetY) / 2}
        label="Custom Label"
        labelStyle={{ fill: "#333", fontSize: 12 }}
      />
    </>
  );
};

CustomEdge.propTypes = {
  id: PropTypes.string.isRequired,
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default CustomEdge;
