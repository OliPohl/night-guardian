// Global Guardian type definition
export interface Guardian {
  id: number;
  snoozeCount: number;
  alarm: string;
  repeats: Array<string>;
  warning: number;
  snooze: number;
  extension: number;
  equation: number;
  active: boolean;
}