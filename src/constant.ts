export enum LocalKey {
  TASK_STORE = 'TASK_STORE',
}

export interface Position {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
export interface Task {
  taskID: number;
  title: string;
  start: string;
  duration: number;
  position: Position;
}

export interface DailySchedule {
  displayName: string;
  start: string;
  end: string;
  list: Task[];
}

export enum DayEnum {
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat',
  SUN = 'sun',
}
export type DayOfWeek = `${DayEnum}`;
