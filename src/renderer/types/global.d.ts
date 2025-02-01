// Connecting backend api calls to the frontend with the window.api object
export {};

declare global {
  interface Window {
    api: {
      // Minimizes the electron window
      minimizeWindow: () => void;
      // Maximizes the electron window
      maximizeWindow: () => void;
      // Closes the electron window
      closeWindow: () => void;
      // Listens for the maximize event
      onMaximize: (callback: (isMaximized: boolean) => void) => void;
      // Opens the GitHub repository in the default browser
      openGitHub: () => void;
    };
  }
}