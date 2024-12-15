import { FC, useEffect } from 'react';
import "./Titlebar.css";
import minimizeIcon from './resources/minimize.svg'
import maximizeIcon from './resources/maximize.svg'
import unmaximizeIcon from './resources/unmaximize.svg'
import closeIcon from './resources/close.svg'

const Titlebar: FC = () => {
  useEffect(() => {
    // Changes the maximize icon when the window is maximized or unmaximized
    const handleMaximize = (isMaximized: boolean) => {
      if (isMaximized) {
        document.getElementById('titlebar-maximize-img')?.classList.add('hidden');
        document.getElementById('titlebar-unmaximize-img')?.classList.remove('hidden');
      } else {
        document.getElementById('titlebar-maximize-img')?.classList.remove('hidden');
        document.getElementById('titlebar-unmaximize-img')?.classList.add('hidden');
      }
    };

    // Listen for the maximize event
    window.api.onMaximize(handleMaximize);
    return () => {
      window.api.onMaximize(() => {});
    };
  }, []);


  return (
    <div className="titlebar">
      <h1 className="titlebar-heading">Night Guardian</h1>
      <div className="titlebar-buttons">
        <div id="titlebar-minimize" className="titlebar-button" onClick={() => window.api.minimizeWindow()}>
          <img src={minimizeIcon} alt="Minimize" />
        </div>
        <div id="titlebar-maximize" className="titlebar-button" onClick={() => window.api.maximizeWindow()}>
          <img id="titlebar-maximize-img" src={maximizeIcon} alt="Maximize" />
          <img id="titlebar-unmaximize-img" src={unmaximizeIcon} alt="Unmaximize" className="hidden" />
        </div>
        <div id="titlebar-close" className="titlebar-button" onClick={() => window.api.closeWindow()}>
          <img src={closeIcon} alt="Close" />
        </div>
      </div>
    </div>
  );
};

export default Titlebar;
