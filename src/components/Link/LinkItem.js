import React from "react";

function LinkItem({ link, index, showCount }) {
  return (<div className="flex items-start mt2">
    <div className="flex items-center">
      {showCount && <span className="gray">{index}</span>}
      <div class="vote-button">
        
      </div>
    </div>
  </div>);
}

export default LinkItem;
