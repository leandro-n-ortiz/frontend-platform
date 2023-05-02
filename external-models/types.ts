/* Types to be used externally (when communicating with the backend or other services) */

import {
  Theme,
  Permission,
  TaskStatus,
  TaskColor,
  TaskSize,
  TaskPriority,
} from '@@external-models/enums';

export interface ApiSuccessResponse<T> {
  status: number;
  data: T;
}

export interface ApiErrorResponse {
  status: number;
  data: object;
}

export interface CredentialsDto {
  email: string;
  password: string;
}

export interface SignupUserDto {
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserDto {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
}

export interface SessionDto extends UserDto {
  permissions: Permission[];
  theme: Theme;
}

export interface TaskDto {
  id?: string;
  name: string;
  details: string;
  position: number;
  status: TaskStatus;
  color: TaskColor;
  size: TaskSize;
  priority: TaskPriority;
  subtasks: SubtaskDto[];
}

export interface SubtaskDto {
  id?: string;
  name: string;
  details: string;
  isDone: boolean;
}
