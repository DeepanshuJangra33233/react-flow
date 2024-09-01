import { useState, useMemo } from "react";
import { Handle, Position } from "react-flow-renderer";
import PropTypes from "prop-types";
import { MenuIcon, QuestionIcon } from "../Icon";

const generateRandomId = () => {
  const length = Math.floor(Math.random() * 4) + 1;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const QuestionBox = ({ isConnectable, id, removeNode }) => {
  const [isBoxHidden, setIsBoxHidden] = useState(false);

  // Generate unique IDs for handles
  const yesLeftId = useMemo(() => generateRandomId(), []);
  const yesRightId = useMemo(() => generateRandomId(), []);

  const deleteBoxHandler = () => {
    setIsBoxHidden(!isBoxHidden);
  };

  return (
    <div className="w-[250px] h-[170px] rounded-lg overflow-hidden bg-white shadow-lg">
      <Handle
        type="source"
        position={Position.Left}
        id={yesLeftId}
        isConnectable={isConnectable}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      <div className="bg-yellow-500 py-2 px-3 flex items-center justify-between">
        <div className="bg-[#ffffff66] rounded-full h-[40px] w-[40px] flex items-center justify-center p-2">
          <QuestionIcon />
        </div>
        <div
          onClick={deleteBoxHandler}
          className="w-[25px] h-[25px] cursor-pointer hover:bg-[#ffffff34] rounded-full duration-300 relative"
        >
          <MenuIcon />
          <span
            onClick={() => removeNode(id)}
            className={`bg-white absolute top-9 right-0 p-3 rounded-md shadow-lg z-20 ${
              isBoxHidden ? "" : "hidden"
            }`}
          >
            <p>Delete</p>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 h-[calc(100%-56px)] flex-col">
        <div className="relative w-full">
          <button
            className="text-white w-full bg-red-500 hover:bg-red-400 duration-300 px-3 py-2 rounded-md text-sm"
            type="submit"
          >
            Yes
          </button>
        </div>
        <div className="relative w-full">
          <button
            className="text-white w-full bg-red-500 hover:bg-red-400 duration-300 px-3 py-2 rounded-md text-sm"
            type="submit"
          >
            No
          </button>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={yesRightId}
        isConnectable={isConnectable}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
    </div>
  );
};

QuestionBox.propTypes = {
  isConnectable: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  removeNode: PropTypes.func.isRequired,
};

export default QuestionBox;
