// #region Imports
// Importing the type
import type { Guardian } from '../../shared/types/guardian.cjs';
// #endregion Imports


// #region Development
// Returns the current environment the application is running in
export function getCurrentEnv() : number {
  switch (process.env.NODE_ENV) {
    case 'dev-editor': return 0;
    case 'dev-guardian': return 1;
  }
  return -1;
}
// #endregion Development


// #region Guardian
// Returns true if the application is started as Guardian
export function isGuardian() : boolean {
  return process.argv.includes('--guardian') || getCurrentEnv() === 1;
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

// Returns the current guardian
export function getCurrentGuardian() : Guardian {
  return argToGuardian(process.argv.join(' '));
}
// #endregion Guardian