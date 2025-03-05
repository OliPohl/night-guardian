// #region Imports
// Importing libraries
import path from 'path';
import { app } from 'electron';

// Importing functions
import { isDev } from './args.js';
// #endregion


// #region Exports
// Returns the path to the preload script
export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    '/dist-electron/main/preload.cjs'
  )
}

// Returns the exe path
export function getExePath() {
  return path.join(app.getPath('exe'), 'night-guardian.exe');
}

// Returns the Temp path
export function getTempPath() {
  return app.getPath('temp');
}
// #endregion Exports