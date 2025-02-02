// #region Imports
// Importing resources
import imgRepeatMondays from './resources/img-repeat-mondays.svg';
import imgRepeatTuesdays from './resources/img-repeat-tuesdays.svg';
import imgRepeatsWednesdays from './resources/img-repeat-wednesdays.svg';
import imgRepeatsThursdays from './resources/img-repeat-thursdays.svg';
import imgRepeatsFridays from './resources/img-repeat-fridays.svg';
import imgRepeatsSaturdays from './resources/img-repeat-saturdays.svg';
import imgRepeatsSundays from './resources/img-repeat-sundays.svg';
// #endregion Imports

// #region Exports
// #region Repeat
// Converts the weekday string to the corresponding image
export const repeatImage: { [key: string]: string } = {
  Monday: imgRepeatMondays,
  Tuesday: imgRepeatTuesdays,
  Wednesday: imgRepeatsWednesdays,
  Thursday: imgRepeatsThursdays,
  Friday: imgRepeatsFridays,
  Saturday: imgRepeatsSaturdays,
  Sunday: imgRepeatsSundays,
};
// #endregion Repeat


// #region Warning
// Converts the warning number to the corresponding string representation
export const parseWarningNumber = (warning: number): string => {
  if (warning === 0) return 'None';
  return `${warning} min`;
};

// Converts the warning string to the corresponding number
export const parseWarningText = (warning: string): number => {
  if (warning === 'None') return 0;
  return parseInt(warning);
};
// #endregion Warning


// #region Snooze
// Converts the snooze number to the corresponding string representation
export const parseSnoozeNumber = (snooze: number): string => {
  if (snooze === -1) {
    return 'Unlimited';
  } else if (snooze === 0) {
    return 'None';
  } else if (snooze === 1) {
    return 'Once';
  } else if (snooze === 2) {
    return 'Twice';
  } else {
    return `${snooze} times`;
  }
};

// Converts the snooze string to the corresponding number
export const parseSnoozeText = (snooze: string): number => {
  switch (snooze) {
    case 'Unlimited':
      return -1;
    case 'None':
      return 0;
    case 'Once':
      return 1;
    case 'Twice':
      return 2;
    default:
      return parseInt(snooze);
  }
}
// #endregion Snooze


// #region Extension
// Converts the extension number to the corresponding string representation
export const parseExtensionNumber = (extension: number): string => {
  if (extension === 0) return 'None';
  return `${extension} min`;
};

// Converts the extension string to the corresponding number
export const parseExtensionText = (extension: string): number => {
  if (extension === 'None') return 0;
  return parseInt(extension);
};
// #endregion Extension


// #region Equation
// Converts the equation number to the corresponding string representation
export const parseEquationNumber = (equation: number): string => {
  switch (equation) {
    case 1:
      return 'Easy';
    case 2:
      return 'Medium';
    case 3:
      return 'Hard';
    default:
      return 'None';
  }
};

// Converts the equation string to the corresponding number
export const parseEquationText = (equation: string): number => {
  switch (equation) {
    case 'Easy':
      return 1;
    case 'Medium':
      return 2;
    case 'Hard':
      return 3;
    default:
      return 0;
  }
}
// #endregion Equation
// #endregion Exports