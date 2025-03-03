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
// #endregion Exports