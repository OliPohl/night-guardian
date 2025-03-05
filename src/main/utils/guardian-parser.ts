// #region Imports
// Importing the type
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


// #region Warning
// Returns the guardians warning time in [hour, min]
export function getGuardianWarning(guardian: Guardian) {
  const [alarmHour, alarmMinute] = guardian.alarm.split(':').map(Number);
  const totalAlarmMinutes = alarmHour * 60 + alarmMinute;
  const totalWarningMinutes = totalAlarmMinutes - guardian.warning;
  const warningHour = Math.floor(totalWarningMinutes / 60);
  const warningMinute = totalWarningMinutes % 60;
  return [warningHour, warningMinute];
}
// #endregion Warning