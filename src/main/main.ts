// #region Imports
// Importing libraries
import {app, BrowserWindow, screen, ipcMain, shell} from 'electron';
import path from 'path';

// Importing utils
import { isDev } from './utils/args.js';
import { getPreloadPath } from './utils/path-resolver.js';
import { setupMaximizeStatus, setupWindowControls } from './utils/window-controls.js';
import { setupExternalLinks } from './utils/external-links.js';
import { setupGuardianHandlers } from './utils/guardian-handler.js';
// #endregion Imports


// #region App
// Create the main window
let mainWindow: BrowserWindow | null;
app.on('ready', () => {
  // Get the primary display's width and height
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: "#2c303d",
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
  if (isDev()) {
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


  // #region Api
  // Sends the maximize status to the renderer process
  setupMaximizeStatus(mainWindow);

  // Setup the window controls on the titlebar
  setupWindowControls(mainWindow);

  // Open the GitHub repository
  setupExternalLinks();

  // Setup the guardian handlers
  setupGuardianHandlers();
  // #endregion Api
});
// #endregion App
