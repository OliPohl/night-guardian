// #region Imports
// Importing modules
import { ipcMain } from 'electron';
import { exec } from 'child_process';

// Importing types
import type { Guardian } from '../../shared/types/guardian.cjs';

// Importing utils
import { getGuardianName, getEnforcerName, guardianToXML, saveGuardianXML } from './guardian-parser.js';
import { argToGuardian } from './args.js';
// #endregion Imports


// #region Export
// Setup the Schtasks handlers
export function setupSchtasksHandlers(app: Electron.App) {
  // #region Fetch
  ipcMain.handle('fetch-guardians', async () => {
    const commandNames = 'schtasks /query /fo LIST';
    // Fetch the task names that start with NightGuardian and end with #0
    const guardianNames : String[] = await new Promise((resolve) => {
      executeSchtask(commandNames, (response) => {
        // Filter the LIST for the task names
        const tasksNames = response.split('\n').filter(line => line.startsWith('TaskName:'));
        // Filter the task names for the relevant ones
        const relevantNames = tasksNames.filter(tasksNames => tasksNames.includes('NightGuardian') && tasksNames.includes('#0')).map(task => task.split(': ')[1].trim());
        resolve(relevantNames.filter(name => name.endsWith('#0')));
      });
    });

    // Fetch the guardian information for each guardian
    const guardians : Guardian[] = [];
    for (const guardianName of guardianNames) {
      const commandInfo = `schtasks /query /tn ${guardianName} /xml | findstr /C:"Arguments"`;
      const guardian : Guardian = await new Promise((resolve) => {
        executeSchtask(commandInfo, (response) => {
          // Convert the response to a guardian and resolve it
          resolve(argToGuardian(response));
        });
      });
      // Add the guardian to the list if it is not null
      if (guardian.id !== -1) guardians.push(guardian);
    }
    return guardians;
  });
  // #endregion Fetch


  // #region Save
  ipcMain.on('save-guardian', (event, guardian: Guardian) => {
    // Create the schtasks command
    const command = `schtasks /create /tn "${getGuardianName(guardian.id, guardian.snoozeCount)}" /xml "${saveGuardianXML(guardian)}"`;
    executeSchtask(command , (response) => { console.log(response); });
    //TODO: Add Enforcer
  });
  // #endregion Save


  // #region Delete
  ipcMain.on('delete-guardian', (event, id: number) => {
    console.log('Deleting guardian with id: ' + id);
    // Delete the guardian associated with the given id
    const commandGuardian = `schtasks /delete /tn "${getGuardianName(id)}" /f`;
    executeSchtask(commandGuardian, (response) => { console.log(response); });
    // Delete the enforcer associated with the given id
    const commandEnforcer = `schtasks /delete /tn "${getEnforcerName(id)}" /f`;
    executeSchtask(commandEnforcer, (response) => { console.log(response); });
  });
  // #endregion Delete
}
// #endregion Export
// TODO: Add functions for extending time


// #region Functions
// Executes the given schtasks command
const executeSchtask = (command: string, callback: (response: string) => void) => {
  exec(command, (error, stdout, stderr) => {
    if (error){
      callback(error.message);
      return;
    }
    callback(stdout || stderr);
  });
};
// #endregion Functions