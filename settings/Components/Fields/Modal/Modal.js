import { SelectControl } from '@wordpress/components';
import React from 'react';
import { xmarkIcon } from '../../../utils/icons';
import "./style.scss";

const Modal = ({ render }) => {
  const [open, setOpen] = React.useState(false);
  const modalRef = React.useRef();
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])
  return (
    <div className="bPl-main-modalContainer">
      <div className='bPl-modal-main-wrapper'>
        <div className="bPl-modal-wrapper">
          <div className="bPl-modal-header">
            <div className="bPl-modal-titleSection">
              <h3 className="bPl-modal-title">Modal Title</h3>
              <span className="bPl-modal-close">
                {xmarkIcon}
              </span>
            </div>
            <div className="bPl-modal-select-fields">
              <SelectControl />
            </div>
          </div>
          <div className="bPl-modal-body-wrapper">

          </div>
        </div>
      </div>
      {render({ open: () => setOpen(true) })}
    </div>
  );
};

export default Modal;