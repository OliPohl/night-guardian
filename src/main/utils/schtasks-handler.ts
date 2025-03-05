// #region Imports
// Importing modules
import { ipcMain, ipcRenderer } from 'electron';
import { exec } from 'child_process';

// Importing types
import type { Guardian } from '../../shared/types/guardian.cjs';

// Importing utils
import { getGuardianName, getEnforcerName, getNextWarningTime, getNextAlarmTime } from './guardian-parser.js';
import { argToGuardian, guardianToArg } from './args.js';
import { createXML, saveXML, createTriggerXML } from './xml-creator.js';
import { getExePath } from './path-resolver.js';
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
    const kys = !(guardian.snoozeCount === 0);
    // Create the guardian xml
    const guardianXML = createXML(getNextWarningTime(guardian), getGuardianName(guardian.id, guardian.snoozeCount), kys.toString(), createTriggerXML(getNextWarningTime(guardian), guardian.repeats, kys, guardian.active), getExePath(), guardianToArg(guardian));
    // Create the enforcer xml
    const enforcerXML = createXML(getNextAlarmTime(guardian), getEnforcerName(guardian.id), kys.toString(), createTriggerXML(getNextAlarmTime(guardian), guardian.repeats, kys, guardian.active), "shutdown /s /f", "");

    // Create the guardian schtasks command
    const commandGuardian = `schtasks /create /tn "${getGuardianName(guardian.id, guardian.snoozeCount)}" /xml "${saveXML(guardianXML, 'NightGuardian')}" /f`;
    // Create the enforcer schtasks command
    const commandEnforcer = `schtasks /create /tn "${getEnforcerName(guardian.id, guardian.snoozeCount)}" /xml "${saveXML(enforcerXML, 'NightGuardian')}" /f`;

    // Execute the guardian schtasks command
    executeSchtask(commandGuardian , (response) => { console.log(response); });
    // Execute the enforcer schtasks command
    executeSchtask(commandEnforcer, (response) => { console.log(response); });
  });
  // #endregion Save


  // #region Delete
  ipcMain.on('delete-guardian', (event, id: number) => {
    // Delete the guardian associated with the given id
    const commandGuardian = `schtasks /delete /tn "${getGuardianName(id)}" /f`;
    executeSchtask(commandGuardian, (response) => { console.log(response); });
    // Delete the enforcer associated with the given id
    const commandEnforcer = `schtasks /delete /tn "${getEnforcerName(id)}" /f`;
    executeSchtask(commandEnforcer, (response) => { console.log(response); });
  });
  // #endregion Delete


  // #region Snooze
  // Snoozes the guardian
  ipcMain.on('snooze-guardian', (event, guardian: Guardian) => {
    let snoozedGuardian = guardian;
    snoozedGuardian.snoozeCount++;
    ipcRenderer.send('save-guardian', snoozedGuardian);
    //TODO: Disable current guardian/enforcer once
  });
  // #endregion Snooze
}
// #endregion Export


// #region Ulti
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
// #endregion Ulti