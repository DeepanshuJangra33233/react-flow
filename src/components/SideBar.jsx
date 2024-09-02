import MessageBox from "./common/MessageBox";
import QuestionBox from "./common/QuestionBox";
import PropTypes from "prop-types";
import { MessageIcon, QuestionIcon } from "./Icon";

const getRandomPosition = () => {
  const x = Math.random() * 800;
  const y = Math.random() * 600;
  return { x, y };
};

const SideBar = ({ addNode, deleteNode, handleDataFromChild }) => {
  const addSendMessageHandler = () => {
    const newNodeId = `${Math.random()}`; // Generate ID first
    const newNode = {
      id: newNodeId,
      type: "custom",
      position: getRandomPosition(),
      data: {
        component: (
          <MessageBox
            id={newNodeId}
            removeNode={deleteNode}
            handleData={handleDataFromChild}
          />
        ),
      },
    };
    addNode(newNode);
  };

  const addQuestionHandler = () => {
    const newNodeId = `${Math.random()}`; // Generate ID first
    const newNode = {
      id: newNodeId,
      type: "custom",
      position: getRandomPosition(),
      data: {
        component: (
          <QuestionBox
            id={newNodeId}
            removeNode={deleteNode}
            handleData={handleDataFromChild}
          />
        ),
      },
    };
    addNode(newNode);
  };

  return (
    <div className="w-[400px] border-r border-black bg-gray-100 p-3">
      <div className="flex items-center flex-col gap-3 w-full">
        <div
          onClick={addSendMessageHandler}
          className="flex items-center rounded-lg bg-red-600 w-full p-3 gap-3 cursor-pointer"
        >
          <div>
            <p className="text-white font-medium text-xl">Send a message</p>
            <p className="text-white">With no response required from victor</p>
          </div>
          <div className="bg-[#ffffff66] rounded-full size-13 flex items-center justify-center p-2">
            <MessageIcon />
          </div>
        </div>
        <div
          onClick={addQuestionHandler}
          className="flex items-center rounded-lg bg-yellow-500 w-full p-3 gap-3 cursor-pointer"
        >
          <div>
            <p className="text-white font-medium text-xl">Ask a Question</p>
            <p className="text-white">
              Ask a question and store user input in validation
            </p>
          </div>
          <div className="bg-[#ffffff66] rounded-full size-13 flex items-center justify-center p-2">
            <QuestionIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  addNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  handleDataFromChild: PropTypes.func.isRequired,
};

export default SideBar;
