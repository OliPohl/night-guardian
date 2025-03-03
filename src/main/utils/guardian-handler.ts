// #region Imports
// Importing the necessary modules and types
import { ipcMain } from 'electron';
import type { Guardian } from '../../shared/types/guardian.cts';
// #endregion Imports


// #region Export
// Setup the guardian handlers
export function setupGuardianHandlers() {
  // Fetch guardians from the backend
  ipcMain.handle('fetch-guardians', () => {
    const guardians: Guardian[] = [
      {
        id: 1200200000,
        snoozeCount: 0,
        alarm: '12:00',
        repeats: ['Monday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        warning: 20,
        snooze: 3,
        extension: 30,
        equation: 2,
        active: true,
      },
      {
        id: 2200200000,
        snoozeCount: 0,
        alarm: '22:00',
        repeats: ['Monday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        warning: 20,
        snooze: -1,
        extension: 30,
        equation: 2,
        active: false,
      },
    ];
    return guardians;
  });

  // Save guardian
  ipcMain.on('save-guardian', (event, guardian: Guardian) => {
    console.log(guardian);
  });

  // Delete guardian
  ipcMain.on('delete-guardian', (event, id: number) => {
    console.log(id);
  });
}
// #endregion Export
// TODO: implement main logic