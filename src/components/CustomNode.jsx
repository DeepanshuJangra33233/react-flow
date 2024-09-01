import React from "react";
import PropTypes from "prop-types";

const CustomNode = ({ data, isConnectable }) => {
  return React.cloneElement(data.component, { isConnectable });
};

CustomNode.propTypes = {
  data: PropTypes.shape({
    component: PropTypes.element.isRequired,
  }).isRequired,
  isConnectable: PropTypes.bool.isRequired,
};

export default CustomNode;
