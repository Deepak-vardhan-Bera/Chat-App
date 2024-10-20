import React from "react";

const Conversation = () => {
  return (
    <>
      <div className="flex items-center gap-2 p-2 py-2 rounded cursor-pointer hover:bg-green-600">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
       <div className="flex flex-col flex-1">
            <div className="flex flex-row justify-between">
                <p className="font-bold text-gray-200">John Doe</p>
                <span  className="text-xl">😁</span>
            </div>
        
       </div>
      </div>
        <div className="h-1 py-0 my-0 divider"></div>
    </>
  );
};

export default Conversation;
