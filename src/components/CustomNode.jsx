import PropTypes from "prop-types";

const CustomNode = ({ data }) => {
  return <div>{data.component}</div>;
};

// Prop validation
CustomNode.propTypes = {
  data: PropTypes.shape({
    component: PropTypes.element.isRequired, // Ensures `component` is a React element and is required
  }).isRequired,
};

export default CustomNode;
