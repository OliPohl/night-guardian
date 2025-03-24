// #region Imports
// Importing libraries
import path from 'path';
import { app } from 'electron';

// Importing functions
import { getCurrentEnv } from './args.js';
// #endregion


// #region Exports
// Returns the path to the preload script
export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    getCurrentEnv() != -1 ? '.' : '..',
    '/dist-electron/main/preload.cjs'
  )
}
//TODO: Fix pathing issues when project is build
// Returns the exe path
export function getExePath() {
  return path.join(app.getPath('exe'), 'night-guardian.exe');
}

// Returns the Temp path
export function getTempPath() {
  return app.getPath('temp');
}
// #endregion Exports