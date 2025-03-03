// #region Imports
// Importing the necessary modules
import { ipcMain, shell } from 'electron';
// #endregion Imports


// #region Export
// Connects the external links to the main process
export function setupExternalLinks() {
  // Open the GitHub repository
  ipcMain.on('open-github', () => {
    shell.openExternal('https://github.com/OliPohl/night-guardian');
  });
}
// #endregion Export