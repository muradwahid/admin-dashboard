import React from 'react';
import "./style.scss";
const Notice = ({ content, variant }) => {
  return (
    <div className='bPl-notice-container'>
      <div className={`bPl-notice bPl-notice-${variant}`} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Notice;