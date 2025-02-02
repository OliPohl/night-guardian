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


// Converts the weekday string to the corresponding image
export const parseRepeatString: { [key: string]: string } = {
  Monday: imgRepeatMondays,
  Tuesday: imgRepeatTuesdays,
  Wednesday: imgRepeatsWednesdays,
  Thursday: imgRepeatsThursdays,
  Friday: imgRepeatsFridays,
  Saturday: imgRepeatsSaturdays,
  Sunday: imgRepeatsSundays,
};
// #endregion Exports