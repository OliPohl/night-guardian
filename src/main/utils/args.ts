// #region Imports
// Importing the type
import type { Guardian } from '../../shared/types/guardian.cjs';
// #endregion Imports


// #region Development
// Return true if the enviroment is started with the development flag
export function isDev() : boolean {
  return process.env.NODE_ENV === 'development';
}
// #endregion Development


// #region Guardian
// Returns true if the application is started as Guardian
export function isGuardian() : boolean {
  return process.argv.includes('--guardian');
}

// Returns the Guardian information from the command line arguments if it is started as Guardian
export function argToGuardian(args: string) {
  const argsArray = args.split(' ');
  const guardian: Guardian = {
    id: Number(argsArray[argsArray.indexOf('-id') + 1]) || -1,
    snoozeCount: Number(argsArray[argsArray.indexOf('-sc') + 1]) || 0,
    alarm: argsArray[argsArray.indexOf('-al') + 1] || '00:00',
    repeats: argsArray[argsArray.indexOf('-re') + 1].split(',') || [],
    warning: Number(argsArray[argsArray.indexOf('-wa') + 1]) || 0,
    snooze: Number(argsArray[argsArray.indexOf('-sn') + 1]) || 0,
    extension: Number(argsArray[argsArray.indexOf('-ex') + 1]) || 0,
    equation: Number(argsArray[argsArray.indexOf('-eq') + 1]) || 0,
    active: argsArray[argsArray.indexOf('-ac') + 1] === 'true' || false,
  };
  return guardian;
}

// Convert the guardian to executable arguments
export function guardianToArg(guardian: Guardian) {
  return [
    '--guardian',
    '-id', guardian.id.toString(),
    '-sc', guardian.snoozeCount.toString(),
    '-al', guardian.alarm,
    '-re', guardian.repeats.join(','),
    '-wa', guardian.warning.toString(),
    '-sn', guardian.snooze.toString(),
    '-ex', guardian.extension.toString(),
    '-eq', guardian.equation.toString(),
    '-ac', guardian.active.toString(),
  ].join(' ');
}
// #endregion Guardian