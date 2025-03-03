import path from 'path';
import { app } from 'electron';
import { isDev } from './utils.js';

// Returns the path to the preload script
export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    '/dist-electron/main/preload.cjs'
  )
}
