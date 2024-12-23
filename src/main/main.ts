import {app, BrowserWindow, screen, ipcMain, shell} from 'electron';
import path from 'path';
import { isDev } from './utils.js';
import { getPreloadPath } from './path-resolver.js';

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

  // When the window is maximized, send the status to the renderer process
  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window-maximize-status', true);
  });

  // When the window is unmaximized, send the status to the renderer process
  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window-maximize-status', false);
  });
});


// Hide the app into the dock
ipcMain.on('minimize-window', () => {
  mainWindow?.minimize();
});

// Toggle maximize the window
ipcMain.on('maximize-window', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow?.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

// Close the window
ipcMain.on('close-window', () => {
  mainWindow?.close();
});

// Open the GitHub repository
ipcMain.on('open-github', () => {
  shell.openExternal('https://github.com/OliPohl/night-guardian');
});
