/* Enums to be used externally (when communicating with the backend or other services) */

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export enum Permission {
  manageUsers = 'manageUsers',
}

export enum TaskColor {
  transparent = 'transparent',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  green = 'green',
  blue = 'blue',
  pink = 'pink',
  purple = 'purple',
}

export enum TaskSize {
  xs = 'xSmall',
  s = 'small',
  m = 'medium',
  l = 'large',
  xl = 'xLarge',
}

export enum TaskPriority {
  urgent = 'urgent',
  normal = 'normal',
  someday = 'someday',
}

export enum TaskStatus {
  toDo = 'toDo',
  done = 'done',
  canceled = 'canceled',
}
