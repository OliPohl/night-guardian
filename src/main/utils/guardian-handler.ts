// #region Imports
// Importing modules
import { ipcMain } from 'electron';

// Importing Utils
import { isGuardian, getCurrentGuardian } from './args.js';
// #endregion Imports



// #region Handlers
export function setupGuardianHandlers() {
  // connects the isGuardian function to the frontend
  ipcMain.handle('is-guardian', () => { return isGuardian(); });

  // connects the getCurrentGuardian function to the frontend
  ipcMain.handle('get-current-guardian', () => { return getCurrentGuardian(); });
}
// #endregion Handlers