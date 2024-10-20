import React from "react";

const Message = ({whom}) => {
  return (
    <div>
    <div className={`chat chat-${whom}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-bubble">I am Deepak</div>
</div>
        <div className="text-sm opacity-50 chat-footer">12:46</div>
    </div>
  );
};

export default Message;
