import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Handle, Position } from "react-flow-renderer";
import { MenuIcon, MessageIcon } from "../Icon";

const generateRandomId = () => {
  const length = Math.floor(Math.random() * 4) + 1;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const MessageBox = ({ isConnectable }) => {
  const [isBoxHidden, setIsBoxHidden] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const targetHandleId = useMemo(() => generateRandomId(), []);

  const deleteBoxHandler = () => {
    setIsBoxHidden(!isBoxHidden);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputValue);
    setInputValue("");
  };

  return (
    <div className="max-w-[300px] w-full h-[150px] rounded-lg overflow-hidden bg-white shadow-lg">
      {/* Only bottom handle */}
      <Handle
        type="target"
        position={Position.Bottom}
        id={targetHandleId}
        isConnectable={isConnectable}
      />
      <div className="bg-red-400 py-2 px-3 flex items-center justify-between">
        <div className="bg-[#ffffff66] rounded-full h-[40px] w-[40px] flex items-center justify-center p-2">
          <MessageIcon />
        </div>
        <div
          className="w-[25px] h-[25px] cursor-pointer hover:bg-[#ffffff34] rounded-full duration-300 relative"
          onClick={deleteBoxHandler}
        >
          <MenuIcon />
          <span
            className={`bg-white absolute top-9 right-0 p-3 rounded-md shadow-lg ${
              isBoxHidden ? "" : "hidden"
            }`}
          >
            <p>Delete</p>
          </span>
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex items-center gap-3 p-3 h-[calc(100%-56px)]"
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-black rounded-sm px-3 py-1 w-full"
          type="text"
          placeholder="Add text here..."
        />
        <button
          className="text-white bg-red-500 hover:bg-red-400 duration-300 px-3 py-2 rounded-md text-sm"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

MessageBox.propTypes = {
  isConnectable: PropTypes.bool.isRequired,
};

export default MessageBox;
