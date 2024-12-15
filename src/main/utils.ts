// Return true if the enviroment is started with the development flag
export function isDev() : boolean {
  return process.env.NODE_ENV === 'development';
}
