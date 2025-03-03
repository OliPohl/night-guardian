// #Region Imports
import { Guardian } from '../../../../shared/types/guardian.cts';
// #endregion Imports


// #region New Guardian
// This is the default guardian that will be used to create new guardians
export const newGuardian: Guardian = {
  id: -1,
  alarm: '23:00',
  repeats: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
  alarm: '21:00',
  repeats: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  warning: 5,
  snooze: -1,
  extension: 30,
  equation: 2,
  active: true,
};

export const testGuardianB: Guardian = {
  id: 2355,
  alarm: '23:55',
  repeats: ['Monday', 'Tuesday', 'Wednesday', 'Sunday'],
  warning: 10,
  snooze: 2,
  extension: 20,
  equation: 1,
  active: true,
};

export const testGuardianC: Guardian = {
  id: 2230,
  alarm: '22:30',
  repeats: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  warning: 10,
  snooze: 1,
  extension: 15,
  equation: 3,
  active: true,
};
// #endregion Sample Guardians