const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld('api', {
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
});
