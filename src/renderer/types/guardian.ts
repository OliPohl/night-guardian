export interface Guardian {
  name: string;
  alarm: string;
  repeats: Array<string>;
  warning: number;
  snooze: number;
  extension: number;
  difficulty: number;
  active: boolean;
}