import React from 'react';
import "./style.scss";
const BSubMessage = ({ content, type = "success" }) => {
  return (
    <div className='bPl-submessage-wrapper'>
      <div className={`bPl-submessage ${type}`} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BSubMessage;