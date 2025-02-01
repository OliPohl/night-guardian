// #region Imports
// Importing necessary react libraries
import { FC, useEffect } from 'react';

// Importing styles
import "./Titlebar.css";

// Importing resources
import imgMinimize from './resources/img-minimize.svg'
import imgMaximize from './resources/img-maximize.svg'
import imgUnmaximize from './resources/img-unmaximize.svg'
import imgclose from './resources/img-close.svg'
// #endregion Imports


// #region Titlebar
const Titlebar: FC = () => {
  // #region Maximize
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

  // Listen for the maximize event and call handleMaximize to change the icon
  useEffect(() => {
    window.api.onMaximize(handleMaximize);
    return () => {
      window.api.onMaximize(() => {});
    };
  }, []);
  // #endregion Maximize


  // #region HTML
  return (
    <div className="titlebar">
      {/* Heading */}
      <h1 className="titlebar-heading">Night Guardian</h1>
      
      {/* Buttons */}
      <div className="titlebar-buttons">
        {/* Minimize */}
        <div id="titlebar-minimize" className="titlebar-button" onClick={() => window.api.minimizeWindow()}>
          <img src={imgMinimize} alt="Minimize" />
        </div>
        
        {/* Maximize / Unmaximize */}
        <div id="titlebar-maximize" className="titlebar-button" onClick={() => window.api.maximizeWindow()}>
          <img id="titlebar-maximize-img" src={imgMaximize} alt="Maximize" />
          <img id="titlebar-unmaximize-img" src={imgUnmaximize} alt="Unmaximize" className="hidden" />
        </div>

        {/* Close */}
        <div id="titlebar-close" className="titlebar-button" onClick={() => window.api.closeWindow()}>
          <img src={imgclose} alt="Close" />
        </div>

      </div>
    </div>
  );
  // #endregion HTML
};

export default Titlebar;
// #endregion Titlebar