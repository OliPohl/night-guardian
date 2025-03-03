// Global Guardian type definition
export interface Guardian {
  id: number;
  alarm: string;
  repeats: Array<string>;
  warning: number;
  snooze: number;
  extension: number;
  equation: number;
  active: boolean;
}