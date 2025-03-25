// #region Imports
// Importing types
import type { Guardian } from '../../shared/types/guardian.cjs';
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


// #region Alarm
// Returns the guardians alarm  with snooze in [hour, min]
export function getGuardianAlarmWithSnooze(guardian: Guardian, hOffset: number = 0) {
  const [alarmHour, alarmMinute] = guardian.alarm.split(':').map(Number);
  const totalAlarmMinutes = alarmHour + hOffset * 60 + alarmMinute;
  const totalSnoozeMinutes = guardian.snooze * guardian.snoozeCount;
  const totalAlarmMinutesWithSnooze = totalAlarmMinutes + totalSnoozeMinutes;
  return [Math.floor(totalAlarmMinutesWithSnooze / 60), totalAlarmMinutesWithSnooze % 60];
}

// Returns the next alarm time in 2025-03-06T17:35:47 format
export function getNextAlarmTime(guardian: Guardian, hOffset: number = 0) {
  const [hour, min] = getGuardianAlarmWithSnooze(guardian, hOffset);
  const today = new Date();
  const alarm = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, min);
  if(alarm.getTime() < today.getTime()) alarm.setDate(alarm.getDate() + 1);
  return alarm.toISOString().split('.')[0];
}
// #endregion Alarm


// #region Warning
// Returns the guardians warning time in [hour, min]
export function getGuardianWarning(guardian: Guardian, hOffset: number = 0) {
  const [alarmHour, alarmMinute] = getGuardianAlarmWithSnooze(guardian, hOffset);
  const totalAlarmMinutes = alarmHour * 60 + alarmMinute;
  const totalWarningMinutes = totalAlarmMinutes - guardian.warning;
  return [Math.floor(totalWarningMinutes / 60), totalWarningMinutes % 60];
}

// Returns the next warning time in 2025-03-06T17:35:47 format
export function getNextWarningTime(guardian: Guardian, hOffset: number = 0) {
  const [hour, min] = getGuardianWarning(guardian, hOffset);
  const today = new Date();
  const warning = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, min);
  if(warning.getTime() < today.getTime()) warning.setDate(warning.getDate() + 1);
  return warning.toISOString().split('.')[0];
}
// #endregion Warning


// #region Repeats
// Converts the abbreviation to the corresponding weekday string
export const parseRepeatAbbreviation = (repeat: string): string => {
  switch (repeat) {
    case 'MON':
      return 'Monday';
    case 'TUE':
      return 'Tuesday';
    case 'WED':
      return 'Wednesday';
    case 'THU':
      return 'Thursday';
    case 'FRI':
      return 'Friday';
    case 'SAT':
      return 'Saturday';
    case 'SUN':
      return 'Sunday';
    default:
      return '';
  }
};
// #endregion Repeats