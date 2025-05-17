import React from 'react';
import "./style.scss"
const BContent = ({content}) => {
  return (
    <div className='bPl-content-wrapper'>
        <div className="bPl-content" dangerouslySetInnerHTML={{__html:content}} />
    </div>
  );
};

export default BContent;