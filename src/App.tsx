import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from '@@/redux/store';
import {
  useLoginMutation,
  useLazyGetMySessionQuery,
} from '@@/redux/slices/apiSlice';
import { localAccessTokenFound } from '@@/redux/slices/loggedUserSlice';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.loggedUser);

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [
    getMySession,
    { isLoading: sessionLoading, isUninitialized: sessionUninitialized },
  ] = useLazyGetMySessionQuery();

  useEffect(() => {
    console.log('env: ', import.meta.env);

    // Try to get a local persisted token
    const accessToken = window.localStorage.getItem('accessToken');

    if (loggedUser === null && accessToken) {
      // when loggedUser is still "null", try to use the local persisted token
      dispatch(localAccessTokenFound(accessToken));
    } else if (loggedUser?.accessToken) {
      // when the loggedUser has a token in the store, try to get the session (using this token)
      getMySession()
        .unwrap()
        .then(() => console.log('navigate to home page'));
    }
  }, [dispatch, getMySession, loggedUser]);

  if (sessionLoading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        height="70vh"
      >
        <Typography variant="h5">TaskManager</Typography>
        <TextField
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          variant="contained"
          loading={loginLoading}
          onClick={() => login({ email, password })}
        >
          Login
        </LoadingButton>
      </Stack>
    </Container>
  );
}

export default App;
