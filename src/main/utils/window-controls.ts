// #region Imports
// Importing the necessary modules
import { ipcMain, BrowserWindow } from 'electron';
// #endregion Imports


// #region Maximize
// Send the maximize status to the renderer process when the window is maximized or unmaximized
export function setupMaximizeStatus(mainWindow: BrowserWindow | null) {
  // When the window is maximized, send the status to the renderer process
  mainWindow?.on('maximize', () => {
    mainWindow?.webContents.send('window-maximize-status', true);
  });

  // When the window is unmaximized, send the status to the renderer process
  mainWindow?.on('unmaximize', () => {
    mainWindow?.webContents.send('window-maximize-status', false);
  });
}
// #endregion Maximize


// #region Controls
// Setup the window controls on the titlebar
export function setupWindowControls(mainWindow: BrowserWindow | null) {
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
}
// #endregion Controls