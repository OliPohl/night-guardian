// #region Imports
// Importing libraries and types
const { contextBridge, ipcRenderer } = require('electron');
import type { Guardian } from '../shared/types/guardian.cts';
// #endregion Imports


// #region Api
// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld('api', {
  // Minimizes the electron window
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  // Maximizes the electron window
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  // Closes the electron window
  closeWindow: () => ipcRenderer.send('close-window'),
  // Listens for the maximize event
  onMaximize: (callback: (isMaximized: boolean) => void) => ipcRenderer.on('window-maximize-status', (event, isMaximized) => callback(isMaximized)),

  // Opens the GitHub repository in the default browser
  openGitHub: () => ipcRenderer.send('open-github'),

  // Fetches guardians from the backend
  fetchGuardians: () => { return ipcRenderer.invoke('fetch-guardians') },
  // Saves a guardian to the backend
  saveGuardian: (guardian: Guardian) => ipcRenderer.send('save-guardian', guardian),
  // Deletes a guardian from the backend
  deleteGuardian: (id: number) => ipcRenderer.send('delete-guardian', id),


  // Tells the frontend if programm is currently launched as guardian
  isGuardian: () => { return ipcRenderer.invoke('is-guardian') },
  // Returns the current guardian if programm is currently launched as guardian
  getGuardian: () => { return ipcRenderer.invoke('get-current-guardian') },
});
// #endregion Api
