export {};

declare global {
  interface Window {
    api: {
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      closeWindow: () => void;
      onMaximize: (callback: (isMaximized: boolean) => void) => void;
      openGitHub: () => void;
    };
  }
}