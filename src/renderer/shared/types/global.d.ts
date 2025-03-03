import { Guardian } from "../../../shared/types/guardian.cts";

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
      // Fetches guardians from the backend
      fetchGuardians: () => Promise<Guardian[]>;
      // Saves a guardian to the backend
      saveGuardian: (guardian: Guardian) => void;
      // Deletes a guardian from the backend
      deleteGuardian: (id: number) => void;
    };
  }
}