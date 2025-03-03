// #region Imports
// Importing the necessary modules and types
import { ipcMain } from 'electron';
import path from 'path';
import { exec } from 'child_process';
import type { Guardian } from '../../shared/types/guardian.cjs';
// #endregion Imports


// #region Export
// Setup the Schtasks handlers
export function setupSchtasksHandlers(app: Electron.App) {
  // #region Fetch
  // Fetch guardians from the backend
  ipcMain.handle('fetch-guardians', () => {
    //TODO: Implement fetch guardians
    const guardians: Guardian[] = [
      {
        id: 1200200000,
        snoozeCount: 0,
        alarm: '12:00',
        repeats: ['Monday','Thursday','Friday','Saturday','Sunday'],
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
        repeats: ['Monday','Thursday','Friday','Saturday','Sunday'],
        warning: 20,
        snooze: -1,
        extension: 30,
        equation: 2,
        active: false,
      },
    ];
    return guardians;
  });
  // #endregion Fetch


  // #region Save
  // Save guardian
  ipcMain.on('save-guardian', (event, guardian: Guardian) => {
    // Create the guardian name
    const name = `NightGuardian#${guardian.id}#0`;

    // Calculate the guardians warning time
    const [alarmHour, alarmMinute] = guardian.alarm.split(':').map(Number);
    const totalAlarmMinutes = alarmHour * 60 + alarmMinute;
    const totalWarningMinutes = totalAlarmMinutes - guardian.warning;
    const warningHour = Math.floor(totalWarningMinutes / 60);
    const warningMinute = totalWarningMinutes % 60;

    // Parse the guardians repeats
    const dayOfWeek = guardian.repeats.map(day => {
      switch (day) {
        //TODO: Change the days format to the schtasks format
        case 'Sunday': return 'SUN';
        case 'Monday': return 'MON';
        case 'Tuesday': return 'TUE';
        case 'Wednesday': return 'WED';
        case 'Thursday': return 'THU';
        case 'Friday': return 'FRI';
        case 'Saturday': return 'SAT';
        default: return undefined;
      }
    }).filter(day => day !== undefined) as string[];

    // Create guardian info
    const guardianInfo = `--guardian true --id ${guardian.id} --snoozeCount ${guardian.snoozeCount} --alarm ${guardian.alarm} --repeats ${guardian.repeats} --warning ${guardian.warning} --snooze ${guardian.snooze} --extension ${guardian.extension} --equation ${guardian.equation} --active ${guardian.active}`;

    // Get the executable path
    const exePath = path.join(app.getPath('exe'), 'night-guardian.exe');

    // Create the schtasks command
    const command = `schtasks /create /tn "${name}" /tr "${exePath}" /sc weekly /d ${dayOfWeek.join(',')} /st ${warningHour}:${warningMinute}:00 /f`;
    //TODO: Add guardianInfo to the command
    //TODO: Change power mode
    //TODO: Change status enabled when guardian is inactive
    //TODO: Add Enforcer
    // Execute the schtasks command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  });
  // #endregion Save


  // #region Delete
  // Delete guardian
  ipcMain.on('delete-guardian', (event, id: number) => {
    console.log(id);
    // TODO: Implement delete guardian
  });
  // #endregion Delete
}
// #endregion Export
// TODO: Add functions for extending time