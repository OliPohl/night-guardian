// #region Imports
// Importing modules
import path from 'path';
import fs from 'fs';

// Importing types
import type { Guardian } from '../../shared/types/guardian.cjs';

// Importing utils
import { getExePath, getTempPath } from './path-resolver.js';
import { guardianToArg } from './args.js';
// #endregion Imports


// #region Name
// Returns the guardians schtasks name for the given id and snoozeCount
export function getGuardianName(id: number, snoozeCount: number = 0) {
  return `NightGuardian#${id}#${snoozeCount}`;
}

// Returns the enforcers schtasks name for the given id and snoozeCount
export function getEnforcerName(id: number, snoozeCount: number = 0) {
  return `NightEnforcer#${id}#${snoozeCount}`;
}
// #endregion Name


// #region Warning
// Returns the guardians warning time in [hour, min]
export function getGuardianWarning(guardian: Guardian) {
  const [alarmHour, alarmMinute] = guardian.alarm.split(':').map(Number);
  const totalAlarmMinutes = alarmHour * 60 + alarmMinute;
  const totalWarningMinutes = totalAlarmMinutes - guardian.warning;
  return [Math.floor(totalWarningMinutes / 60), totalWarningMinutes % 60];
}

// Returns the next warning time in 2025-03-06T17:35:47 format
export function getNextWarningTime(guardian: Guardian) {
  const [hour, min] = getGuardianWarning(guardian);
  const today = new Date();
  const warning = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, min);
  if(warning.getTime() < today.getTime()) warning.setDate(warning.getDate() + 1);
  return warning.toISOString().split('.')[0];
}
// #endregion Warning


// #region xml
export function guardianToXML(guardian: Guardian, kys: boolean = false) {
  let trigger = '';
  if(kys) {
    trigger = `<TimeTrigger>
      <StartBoundary>${getNextWarningTime(guardian)}</StartBoundary>
      <EndBoundary>${getNextWarningTime(guardian)}</EndBoundary>
    </TimeTrigger>`;
  } else if (guardian.repeats.length === 0) {
    trigger = `<TimeTrigger>
      <StartBoundary>${getNextWarningTime(guardian)}</StartBoundary>
      ${guardian.active ? '' : '<Enabled>false</Enabled>'}
    </TimeTrigger>`;
  } else {
    trigger = `<CalendarTrigger>
      <StartBoundary>${getNextWarningTime(guardian)}</StartBoundary>
      ${guardian.active ? '' : '<Enabled>false</Enabled>'}
      <ScheduleByWeek>
        <WeeksInterval>1</WeeksInterval>
        <DaysOfWeek>
          ${getGuardianRepeatsXML(guardian)}
        </DaysOfWeek>
      </ScheduleByWeek>
    </CalendarTrigger>`;
  }


  return `<?xml version="1.0" encoding="UTF-16"?>
          <Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
            <RegistrationInfo>
              <Date>${new Date().toISOString().split('.')[0]}</Date>
              <Author>NightGuardian</Author>
              <URI>\\${getGuardianName(guardian.id, guardian.snoozeCount)}</URI>
            </RegistrationInfo>
            <Principals>
              <Principal id="Author">
                <LogonType>InteractiveToken</LogonType>
              </Principal>
            </Principals>
            <Settings>
              ${kys ? '<DeleteExpiredTaskAfter>PT0S</DeleteExpiredTaskAfter>' : ''}
              <AllowHardTerminate>false</AllowHardTerminate>
              <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
              <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
              <ExecutionTimeLimit>PT0S</ExecutionTimeLimit>
              <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
              <IdleSettings>
                <StopOnIdleEnd>false</StopOnIdleEnd>
                <RestartOnIdle>false</RestartOnIdle>
              </IdleSettings>
            </Settings>
            <Triggers>
              ${trigger}
            </Triggers>
            <Actions Context="Author">
              <Exec>
                <Command>${getExePath()}</Command>
                <Arguments>${guardianToArg(guardian)}</Arguments>
              </Exec>
            </Actions>
          </Task>`;
}


// Save temporary saves the xml to a file
export function saveGuardianXML(guardian: Guardian, kys: boolean = false) {
  const filePath = path.join(getTempPath(), '/night-guardian.xml')
  console.log(filePath);
  fs.writeFileSync(filePath, guardianToXML(guardian, kys));
  return filePath;
}

// Returns the guardians repeats in <Monday /> \n <Tuesday /> ... format
export function getGuardianRepeatsXML(guardian: Guardian) {
  let repeats = '';
  for(const day of guardian.repeats) {
    switch(day) {
      case 'SUN':
        repeats += '<Sunday />';
        break;
      case 'MON':
        repeats += '<Monday />';
        break;
      case 'TUE':
        repeats += '<Tuesday />';
        break;
      case 'WED':
        repeats += '<Wednesday />';
        break;
      case 'THU':
        repeats += '<Thursday />';
        break;
      case 'FRI':
        repeats += '<Friday />';
        break;
      case 'SAT':
        repeats += '<Saturday />';
        break;
      }
    repeats += '\n';
  }
  return repeats;
}
// #endregion xml

//TODO: Refactor XML