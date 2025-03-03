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
export function getGuardianInfo() : string {
  const guardianIndex = process.argv.indexOf('--guardian');
  if (guardianIndex === -1) return '';
  return process.argv[guardianIndex + 1];
}
// #endregion Guardian