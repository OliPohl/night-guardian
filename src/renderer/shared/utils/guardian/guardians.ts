// #Region Imports
import { Guardian } from '../../../../shared/types/guardian.cts';
// #endregion Imports


// #region New Guardian
// This is the default guardian that will be used to create new guardians
export const newGuardian: Guardian = {
  id: -1,
  snoozeCount: 0,
  alarm: '23:00',
  repeats: ['MON','TUE','WED','THU','FRI','SAT','SUN'],
  warning: 15,
  snooze: -1,
  extension: 30,
  equation: 2,
  active: true,
};
// #endregion New Guardian


// #region Test Guardians
// These are sample guardians that will be used to test the application
export const testGuardianA: Guardian = {
  id: 2100,
  snoozeCount: 0,
  alarm: '21:00',
  repeats: ['MON','TUE','WED','THU','FRI','SAT','SUN'],
  warning: 5,
  snooze: -1,
  extension: 30,
  equation: 2,
  active: true,
};

export const testGuardianB: Guardian = {
  id: 2355,
  snoozeCount: 0,
  alarm: '23:55',
  repeats: ['MON','TUE','WED','SUN'],
  warning: 10,
  snooze: 2,
  extension: 20,
  equation: 1,
  active: true,
};

export const testGuardianC: Guardian = {
  id: 2230,
  snoozeCount: 0,
  alarm: '22:30',
  repeats: ['MON','TUE','WED','THU','FRI'],
  warning: 10,
  snooze: 1,
  extension: 15,
  equation: 3,
  active: true,
};
// #endregion Sample Guardians