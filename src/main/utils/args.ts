// #region Development
// Return true if the enviroment is started with the development flag
export function isDev() : boolean {
  return process.env.NODE_ENV === 'development';
}
// #endregion Development


// #region Enforcer
// Returns true if the application is started as Enforcer
export function isEnforcer() : boolean {
  return process.argv.includes('--enforcer');
}

// Returns the Enforcer information from the command line arguments if it is started as Enforcer
export function getEnforcerInfo() : string {
  const guardianIndex = process.argv.indexOf('--enforcer');
  if (guardianIndex === -1) return '';
  return process.argv[guardianIndex + 1];
}
// #endregion Enforcer