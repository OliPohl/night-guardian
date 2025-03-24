// #region Imports
// Importing modules
import { ipcMain } from 'electron';
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
export function setupSchtasksHandlers() {
  ipcMain.handle('fetch-guardians', async () => {
    return (await fetch()).filter(guardian => guardian.snoozeCount === 0);
  });

  ipcMain.on('save-guardian', (_event, guardian: Guardian) => {
    save(guardian);
  });

  ipcMain.on('delete-guardian', (_event, id: number) => {
    deleteGuardian(id);
  });

  ipcMain.on('delete-all-guardians', () => {
    deleteAllGuardians();
  });

  //TODO: create snooze function and ipcMain
  // #region Snooze
  // Snoozes the guardian
  // ipcMain.on('snooze-guardian', (event, guardian: Guardian) => {
  //   let snoozedGuardian = guardian;
  //   snoozedGuardian.snoozeCount++;
  //   ipcRenderer.send('save-guardian', snoozedGuardian);
  //   //TODO: Disable current guardian/enforcer once
  // });
  // #endregion Snooze
}
// #endregion Export


// #region Fetch
async function fetch(){
  const commandNames = 'schtasks /query /fo LIST';
  // Fetch the task names that start with NightGuardian and end with #0
  const guardianNames : String[] = await new Promise((resolve) => {
    executeSchtask(commandNames, (response) => {
      // Filter the LIST for the task names
      const tasksNames = response.split('\n').filter(line => line.startsWith('TaskName:'));
      // Filter the task names for the relevant ones
      const relevantNames = tasksNames.filter(tasksNames => tasksNames.includes('NightGuardian')).map(task => task.split(': ')[1].trim());
      resolve(relevantNames);
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
  // Fixes path if the file has been moved
  await fixPaths(guardians);
  return guardians;
}
// #endregion Fetch


// #region FixPaths
async function fixPaths(guardians: Guardian[]){
  for (const guardian of guardians) {
    // Get the current guardian path
    const commandInfo = `schtasks /query /tn ${getGuardianName(guardian.id, guardian.snoozeCount)} /xml | findstr /C:"Command"`;
    const exePath = await new Promise((resolve) => {
      executeSchtask(commandInfo, (response) => {
        const exePath = response.split('>')[1];
        resolve(exePath);
      });
    })
    // if the path is wrong resave the guardian
    if (exePath !== getExePath()) {
      deleteGuardian(guardian.id);
      save(guardian);
    }
  }
}
// #endregion FixPaths


// #region Save
async function save(guardian: Guardian){
  const kys = !(guardian.snoozeCount === 0);
  // Create the guardian xml
  const guardianXML = createXML(getNextWarningTime(guardian), getGuardianName(guardian.id, guardian.snoozeCount), createTriggerXML(getNextWarningTime(guardian), guardian.repeats, kys, guardian.active), getExePath(), guardianToArg(guardian));
  // Create the enforcer xml
  const enforcerXML = createXML(getNextAlarmTime(guardian), getEnforcerName(guardian.id), createTriggerXML(getNextAlarmTime(guardian), guardian.repeats, kys, guardian.active), "shutdown /s /f", "");

  // Create the guardian schtasks command
  const commandGuardian = `schtasks /create /tn "${getGuardianName(guardian.id, guardian.snoozeCount)}" /xml "${await saveXML(guardianXML, 'NightGuardian')}" /f`;
  // Execute the guardian schtasks command
  await new Promise((resolve) => {
    executeSchtask(commandGuardian, (response) => {
      console.log(response);
      resolve(response);
    });
  });

  // Create the enforcer schtasks command
  const commandEnforcer = `schtasks /create /tn "${getEnforcerName(guardian.id, guardian.snoozeCount)}" /xml "${await saveXML(enforcerXML, 'NightGuardian')}" /f`;
  // Execute the enforcer schtasks command
  await new Promise((resolve) => {
    executeSchtask(commandEnforcer, (response) => {
      console.log(response);
      resolve(response);
    });
  })
  // TODO fix warning and alarm time beeing wrong in xml
}
// #endregion Save


// #region Delete
async function deleteGuardian(id: number){
  // get all the guardians associated with the given id
  const guardians = (await fetch()).filter(guardian => guardian.id === id);

  for (const guardian of guardians){
    // Delete the guardian associated with the given id
    const commandGuardian = `schtasks /delete /tn "${getGuardianName(guardian.id, guardian.snoozeCount)}" /f`;
    executeSchtask(commandGuardian, (response) => { console.log(response); });
    // Delete the enforcer associated with the given id
    const commandEnforcer = `schtasks /delete /tn "${getEnforcerName(guardian.id, guardian.snoozeCount)}" /f`;
    executeSchtask(commandEnforcer, (response) => { console.log(response); });
  }
}
// #endregion Delete


// #region DeleteAll
// Removes all the guardians possibly for deinstall option later
async function deleteAllGuardians(){
  const guardians = await fetch();
  for (const guardian of guardians){
    deleteGuardian(guardian.id);
  }
}
// #endregion DeleteAll


// #region Utils
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
// #endregion Utils

// TODO: Frontend error handling