/* Types and interfaces to be used internally (inside the app) 
   Some of them can coincidentally be the same o external models
*/

import {
  CredentialsDto,
  SignupUserDto,
  UserDto,
  SessionDto,
  TaskDto,
  SubtaskDto,
} from '@@external-models/types';
import { Theme, Permission } from '@@external-models/enums';
import { UpdatesMode } from '@@/models/enums';

export interface ApiRequest<T> {
  id?: string;
  body: T;
}

export type Credentials = CredentialsDto;

export type SignupUser = SignupUserDto;

export type User = UserDto;

export type Session = SessionDto;

export type Task = TaskDto;

export type Subtask = SubtaskDto;

/**
 * LoggedUser
 * Used by the LoggedUserSlice to keep everything related to the logged user.
 * It's basically the SessionDto (User data + permissions + preferences) and some local-only data (e.g., updatesMode, updatesLastTimeCheck)
 */
export interface LoggedUser {
  id?: string;
  accessToken?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  permissions?: Permission[];
  theme?: Theme;
  updatesMode?: UpdatesMode;
  updatesLastTimeCheck?: string;
}
