import React from 'react';
import "./style.scss"
const BSubHeading = ({ content }) => {
  return (
    <div className='bPl-subHeading-wrapper'>
      <div className="bPl-subHeading" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BSubHeading;