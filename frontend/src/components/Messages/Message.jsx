import React from "react";
import { useAuthStore } from "../../Stores/authStore";
import { messageStore } from "../../Stores/messageStore";

const Message = ({ id, message, time,shake }) => {
  const { user } = useAuthStore();
  const { chatwithpic } = messageStore();
  const whom = id === user._id ? `justify-end` : `justify-start`;
  const bubbleStyle = id === user._id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black';
  
  const pic = id === user._id ? user?.profilePic : chatwithpic;
  const formattedTime = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
const shakeclass =shake? "shake":""
  return (
    <div className={`flex ${whom} items-end gap-2`}>
      {id !== user._id && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="User avatar" src={pic} />
          </div>
        </div>
      )}
      <div className={`chat-bubble ${bubbleStyle} ${shakeclass} rounded-lg px-4 py-2`}>
        {message}
      <div className="text-sm opacity-50">{formattedTime}</div>
      </div>
      {id === user._id && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="User avatar" src={pic} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
