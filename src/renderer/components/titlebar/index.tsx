import { FC } from 'react';
import "./Titlebar.css";
import minimizeIcon from './resources/minimize.svg'
import maximizeIcon from './resources/maximize.svg'
import closeIcon from './resources/close.svg'

const Titlebar: FC = () => {
  return (
    <div className="titlebar">
      <h1 className="titlebar-heading">Night Guardian</h1>
      <div className="titlebar-buttons">
        <div id="titlebar-minimize" className="titlebar-button" onClick={() => window.api.minimizeWindow()}>
          <img src={minimizeIcon} alt="Minimize" />
        </div>
        <div id="titlebar-maximize" className="titlebar-button" onClick={() => window.api.maximizeWindow()}>
          <img src={maximizeIcon} alt="Maximize" />
        </div>
        <div id="titlebar-close" className="titlebar-button" onClick={() => window.api.closeWindow()}>
          <img src={closeIcon} alt="Close" />
        </div>
      </div>
    </div>
  );
};

export default Titlebar;
