import React, { useEffect, useState, useCallback } from "react";
import { messageStore } from "../../Stores/messageStore";
import { useSocketStore } from "../../Stores/socketStore";

const Conversation = ({ pic, name, id }) => {
  const { onlineUsers } = useSocketStore();
  const { setChatwith, getMessages, chatwithid } = messageStore();
  
  const [color, setColor] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const handleClick = useCallback(() => {
    setChatwith(id, name, pic);
    getMessages(id);
  }, [id, name, pic, setChatwith, getMessages]);

  useEffect(() => {
    if (chatwithid === id) {
      setColor(true);
    } else {
      setColor(false);
    }
  }, [chatwithid, id]);

  useEffect(() => {
    
    if (onlineUsers?.includes(id)) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [onlineUsers, id]);

  return (
    <>
      <div 
        className={`flex items-center gap-2 p-2 py-2 rounded cursor-pointer hover:bg-green-600 ${color ? "bg-green-600" : ""}`} 
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={pic} alt={name} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-row justify-between">
            <p className="font-bold text-gray-200">{name}</p>
            <span className="text-xl"></span>
          </div>
        </div>
      </div>
      <div className="h-1 py-0 my-0 divider"></div>
    </>
  );
};

export default Conversation;
