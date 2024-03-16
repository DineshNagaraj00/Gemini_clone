import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

export default function Sidebar() {
  const [extend, setExtend] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt } = useContext(Context);

  // Function to load prompt and trigger onSent
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt); // Set the recent prompt in context state
    await onSent(prompt); // Trigger onSent with the selected prompt
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtend((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />

        <div className="new_chat">
          <img src={assets.plus_icon} alt="" />
          {extend ? <p>New Chat</p> : null}
        </div>
        {extend ? (
          <div className="recent">
            <p className="title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                className="recent_entry"
                onClick={() => loadPrompt(item)} // Call loadPrompt with the selected prompt
              >
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0, 15)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom_item recent_entry">
          <img src={assets.question_icon} alt="" />
          {extend ? <p>Help?</p> : null}
        </div>
        <div className="bottom_item recent_entry">
          <img src={assets.history_icon} alt="" />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className="bottom_item recent_entry">
          <img src={assets.setting_icon} alt="" />
          {extend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}
