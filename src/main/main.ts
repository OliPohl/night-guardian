// #region Imports
// Importing libraries
import {app, BrowserWindow, screen } from 'electron';

import path from 'path';

// Importing utils
import { getCurrentEnv, isGuardian } from './utils/args.js';
import { getPreloadPath } from './utils/path-resolver.js';
import { setupMaximizeStatus, setupWindowControls } from './utils/window-controls.js';
import { setupExternalLinks } from './utils/external-links.js';
import { setupSchtasksHandlers } from './utils/schtasks-handler.js';
// #endregion Imports


// #region App
// Create the main window
let mainWindow: BrowserWindow | null;
app.on('ready', () => {
  // Get the primary display's width and height
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  const launchAsGuardian : boolean = getCurrentEnv() === 1 || isGuardian() ? true : false;
  // Create the main browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: launchAsGuardian ? "rgba(0, 0, 0, 0.8)" : "#2c303d",
    transparent: launchAsGuardian,
    fullscreen: launchAsGuardian,
    resizable: !launchAsGuardian,
    frame: false,
    width: Math.round(screenWidth * (2 / 3)),
    height: Math.round(screenHeight * (2 / 3)),
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  // Set the minimum size of the window
  mainWindow.setMinimumSize(960, 540);

  // Load the index.html or use the local server for comfy development
  if (getCurrentEnv() != -1) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
  }

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });


  // #region Overlay
  // Create the overlay window when opend as guardian
  if (launchAsGuardian) {
    let overlayWindows : BrowserWindow[] = [];
    screen.getAllDisplays().forEach((display) => {
      if (display.id !== screen.getPrimaryDisplay().id) {
        overlayWindows.push(
          new BrowserWindow({
            transparent: true,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            frame: false,
            resizable: false,
            x: display.workArea.x,
            y: display.workArea.y,
            fullscreen: true,
            skipTaskbar: true
        }));
      }
    })

    // Couples the overlays to the main window
    mainWindow.on('closed', () => {
      for (const overlayWindow of overlayWindows) {
        overlayWindow.close();
      }
    })
    mainWindow.on('minimize', () => {
      for (const overlayWindow of overlayWindows) {
        overlayWindow.hide();
      }
    })
    mainWindow.on('focus', () => {
      for (const overlayWindow of overlayWindows) {
        overlayWindow.show();
      }
    })
    // TODO: fix alt tab issue
  }
  // #endregion Overlay


  // #region Api
  // Sends the maximize status to the renderer process
  setupMaximizeStatus(mainWindow);

  // Setup the window controls on the titlebar
  setupWindowControls(mainWindow);

  // Open the GitHub repository
  setupExternalLinks();

  // Setup the schtasks handlers
  setupSchtasksHandlers(app);
  // #endregion Api
});
// #endregion App
