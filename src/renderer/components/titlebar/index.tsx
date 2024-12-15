import React from 'react';
import "./Titlebar.css";
import hideIcon from './resources/hide.svg'
import maximizeIcon from './resources/maximize.svg'
import minimizeIcon from './resources/minimize.svg'
import closeIcon from './resources/close.svg'

const Titlebar: React.FC = () => {
  return (
    <div className="titlebar">
      <h1 className="titlebar-heading">Night Guardian</h1>
      <div className="titlebar-buttons">
        <div id="titlebar-hide" className="titlebar-button">
          <img src={hideIcon} alt="Hide" />
        </div>
        <div id="titlebar-maximize" className="titlebar-button">
          <img src={maximizeIcon} alt="Maximize" />
        </div>
        <div id="titlebar-minimize" className="titlebar-button hidden">
          <img src={minimizeIcon} alt="Minimize" />
        </div>
        <div id="titlebar-close" className="titlebar-button">
          <img src={closeIcon} alt="Close" />
        </div>
      </div>
    </div>
  );
};

export default Titlebar;
