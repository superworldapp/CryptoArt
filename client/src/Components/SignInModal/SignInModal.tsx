/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react';
import {
  Button,
  Dialog,
  Box,
  Grid,
  Link,
  Typography,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  DialogContentText,
  Snackbar,
} from '@material-ui/core';
import { LayoutContext } from '../../state/Layout/context';
import Cookies from 'js-cookie';
import axios from 'axios';
import './SignInModal.css';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import ConnectWalletModal from '../ConnectWalletModal/ConnectWalletModal';
import Auth from '../Auth.js';

interface IHeader {
  initContracts: () => void;
}

interface Props {
  login: () => void;
}
const SignInModal = ({ initContracts }: IHeader, { login }: Props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(LayoutContext);
  // const { activate, account } = useWeb3React<Web3Provider>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(Auth.getAuth());
  const [newSignUp, setNewSignUp] = useState<boolean>(false);
  const [forgotPass, setForgotPass] = useState<boolean>(false);
  const [resetPass, setResetPass] = useState<boolean>(false);
  const [resetCode, setResetCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [notificationMessage, setNotificationMessage] = useState<any>(null);
  // const [open, setOpen] = React.useState(false);
  // const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [openError, setOpenError] = useState(false);
  const [walletSignin, setWalletSignin] = useState(false);
  const [signIn, setSignIn] = useState<boolean>(true);

  const resendVerification = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/resend/verification`, {
        email,
      });
      // Add feedback her
      setOpenError(true);
      setNotificationMessage(
        <Alert variant='filled' severity='success'>
          Verification email sent
        </Alert>
      );
    } catch (error) {
      setOpenError(true);
      setNotificationMessage(
        <Alert variant='filled' severity='error'>
          There was an error send your email, please try again
        </Alert>
      );
      // setOpenError(false)
    }
  };

  const forgotPassword = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_SW_API_URL}/password/forgot`, {
        authType: 'e',
        authId: email,
      });
      setOpenError(true);
      setNotificationMessage(
        <Alert variant='filled' severity='success'>
          Please check your email for the code to reset your password.
        </Alert>
      );
    } catch (error) {
      setOpenError(true);
      setNotificationMessage(
        <Alert variant='filled' severity='success'>
          ERROR: Could not find a matching email or matching username
        </Alert>
      );
    }
  };

  const resetPassword = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SW_API_URL}/password/reset`,
        {
          authType: 'e',
          authId: email,
          authToken: newPassword,
          authCode: resetCode,
        }
      );
      setOpenError(true);
      if (res.data.r === 's') {
        setPassword(newPassword);
        setNotificationMessage(
          <Alert variant='filled' severity='success'>
            Your password has been reset!
          </Alert>
        );
      } else {
        setNotificationMessage(
          <Alert variant='filled' severity='error'>
            ERROR: Could not reset password. Invalid reset code.
          </Alert>
        );
      }
      setResetCode('');
      setNewPassword('');
    } catch (error) {
      setOpenError(true);
      setNotificationMessage(
        <Alert variant='filled' severity='error'>
          ERROR: Could not reset password. Invalid reset code.
        </Alert>
      );
    }
  };

  const handleUserSignIn = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SW_API_URL}/user/connect`,
        {
          authType: 'e',
          authId: email,
          authToken: password,
          username,
        }
      );
      Cookies.set('email', email);
      // Cookies.set('uid', res.data.user._id);
      //NEED A BEARER TOKEN
      // Cookies.set('Authorization', 'Bearer ' + res.data.tk, {
      //   path: '',
      // });
      Cookies.set('session', res.data.data.session);
      Cookies.set('userId', res.data.data.userId);
      setLoggedIn(true);
      Auth.authenticate();
      // Auth.setUser(res.data.user);
      setLoading(false);
    } catch (error) {
      console.log('login error');
      setOpenError(true);
      setNotificationMessage(
        <Alert variant='filled' severity='error'>
          There was an error logging you in!
        </Alert>
      );
      setLoading(false);
    }
  };

  const handleUserSignUp = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_SW_API_URL}/user/connect`, {
        username: username,
      })
      .then((res) => {
        console.log('res in signup', res);
        // Cookies.set('uid', res.data.user._id);
        // Cookies.set('Authorization', 'Bearer ' + res.data.tk, { path: '' });

        Cookies.set('session', res.data.data.session);
        Cookies.set('userId', res.data.data.userId);
        setLoggedIn(true);
        Auth.authenticate();
        // Auth.setUser(res.data.user);
        setLoading(false);
        setNewSignUp(true);
      })
      .catch(() => {
        setOpenError(true);
        setNotificationMessage(
          <Alert variant='filled' severity='error'>
            There was an error signing you up! Please make sure that your
            account email is unique
          </Alert>
        );
        setLoading(false);
      });
  };

  const handleCloseSnackbar = () => {
    setLoading(false);
  };

  const wallet = (
    <>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {notificationMessage}
      </Snackbar>
      <Dialog
        fullWidth
        maxWidth='md'
        open={state.signInModalIsOpen}
        keepMounted
        PaperProps={{
          style: {
            // height: '500px',
            padding: '340px 0px',
            maxHeight: '100%',
          },
        }}
        style={{
          // height: '500px',
          maxHeight: '100%',
        }}
        onClose={() =>
          dispatch({
            type: 'TOGGLE_SIGN_IN_MODAL',
            payload: !state.signInModalIsOpen,
          })
        }
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent>
          <ConnectWalletModal
            hidden={!state.signInModalIsOpen}
            initContracts={initContracts}
          />
        </DialogContent>
      </Dialog>
    </>
  );

  const logout = (
    <>
      <Button
        onClick={() => {
          axios
            .post(`${process.env.REACT_APP_API_URL}/user/logout`)
            .catch((_e: any) => {
              console.log('logging out error');
              console.log(_e);
            });
          Auth.logout();
        }}
      >
        Log Out
      </Button>
    </>
  );

  const signUpModal = (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={state.signInModalIsOpen}
        keepMounted
        onClose={() =>
          dispatch({
            type: 'TOGGLE_SIGN_IN_MODAL',
            payload: !state.signInModalIsOpen,
          })
        }
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 20,
            padding: '30px',
            borderRadius: '10px',
          },
        }}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          {notificationMessage}
        </Snackbar>
        <Box mx='auto'>
          <DialogTitle
            disableTypography
            id='responsive-dialog-title'
            style={{
              fontSize: '1.6rem',
              fontFamily: 'Gibson',
              fontWeight: 500,
              lineHeight: 1.6,
              letterSpacing: ' 0.0075rem',
            }}
          >
            Create an account with SuperWorld to start purchasing properties.
          </DialogTitle>
        </Box>
        <DialogContent>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            spacing={2}
          >
            <form
              onSubmit={(e) => {
                if (password.length >= 6) {
                  handleUserSignUp(e);
                }
              }}
            >
              <Grid item xs={12} spacing={4}>
                <Box my={1} mx={4}>
                  <TextField
                    label='Username'
                    variant='outlined'
                    className='emailInput'
                    style={{
                      borderRadius: '100px',
                    }}
                    value={username}
                    fullWidth
                    // autoComplete="current-password"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Box>
                <Box my={1} mx={4}>
                  <TextField
                    label='Email'
                    variant='outlined'
                    className='emailInput'
                    style={{
                      borderRadius: '100px',
                    }}
                    fullWidth
                    // autoComplete="current-password"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Box>
                <Box my={1} mx={4}>
                  <TextField
                    style={{
                      borderRadius: '100px',
                      margin: 'auto',
                    }}
                    id='password-input'
                    label='Password'
                    className='emailInput'
                    type='password'
                    variant='outlined'
                    value={password}
                    // autoComplete="current-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {/* <CircularProgress variant="static" value={passwordStrength * 25} /> */}
                </Box>
              </Grid>
              <DialogActions>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <>
                      {loading && (
                        <CircularProgress size={24} className='progress' />
                      )}
                      <Button
                        type='submit'
                        disabled={password.length < 6 || loading}
                        className='LoginButton-header'
                      >
                        Sign up
                      </Button>
                    </>
                  </Grid>
                  <Typography>
                    Already have an account?
                    <Link
                      onClick={() => {
                        setSignIn(!signIn);
                        setUsername('');
                        setPassword('');
                        setEmail('');
                        setSignIn(!signIn);
                      }}
                    >
                      {' '}
                      Click Here
                    </Link>
                  </Typography>
                </Grid>
              </DialogActions>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
  const signInModal = (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={state.signInModalIsOpen}
        keepMounted
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 20,
            padding: '30px',
            borderRadius: '10px',
          },
        }}
        onClose={() =>
          dispatch({
            type: 'TOGGLE_SIGN_IN_MODAL',
            payload: !state.signInModalIsOpen,
          })
        }
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          {notificationMessage}
        </Snackbar>
        <Box mx='auto'>
          <DialogTitle
            disableTypography
            id='responsive-dialog-title'
            style={{
              fontSize: '1.6rem',
              fontFamily: 'Gibson',
              fontWeight: 500,
              lineHeight: 1.6,
              letterSpacing: ' 0.0075rem',
            }}
          >
            Welcome Back!
          </DialogTitle>
        </Box>
        <DialogContent>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            spacing={2}
          >
            <form onSubmit={(e) => handleUserSignIn(e)}>
              <Grid item xs={12} spacing={4}>
                <Box my={1} mx={4}>
                  <TextField
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    label='Email'
                    variant='outlined'
                    className='emailInput'
                    style={{
                      borderRadius: '100px',
                    }}
                    fullWidth
                  />
                </Box>
                <Box my={1} mx={4}>
                  <TextField
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                    }}
                    label='Password'
                    className='emailInput'
                    type='password'
                    id='passwordField'
                    value={password}
                    variant='outlined'
                    style={{
                      borderRadius: '100px',
                      margin: 'auto',
                    }}
                  />
                </Box>
              </Grid>
              <DialogActions>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <>
                      {loading && (
                        <CircularProgress size={24} className='progress' />
                      )}
                      <Button
                        type='submit'
                        disabled={loading}
                        className='LoginButton-header'
                      >
                        Sign In
                      </Button>
                    </>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      Forgot Password?
                      <Link onClick={() => setForgotPass(true)}>
                        {' '}
                        Click Here
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <Link
                        onClick={() => {
                          // setSignIn(!signIn);
                          setUsername('');
                          setPassword('');
                          setEmail('');
                          setSignIn(!signIn);
                        }}
                      >
                        {' '}
                        Create an account
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </DialogActions>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );

  const forgotPasswordModal = (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={state.signInModalIsOpen}
        keepMounted
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 20,
            padding: '30px',
            borderRadius: '10px',
          },
        }}
        onClose={() =>
          dispatch({
            type: 'TOGGLE_SIGN_IN_MODAL',
            payload: !state.signInModalIsOpen,
          })
        }
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          {notificationMessage}
        </Snackbar>
        <Box mx='auto'>
          <DialogTitle
            disableTypography
            id='responsive-dialog-title'
            style={{
              fontSize: '1.6rem',
              fontFamily: 'Gibson',
              fontWeight: 500,
              lineHeight: 1.6,
              letterSpacing: ' 0.0075rem',
            }}
          >
            Please enter your email
          </DialogTitle>
        </Box>
        <DialogContent>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <form
              onSubmit={(e) => {
                forgotPassword(e);
                setForgotPass(false);
              }}
            >
              <Grid item xs={12} spacing={4}>
                <Box my={1} mx={4}>
                  <TextField
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    label='Email'
                    variant='outlined'
                    className='emailInput'
                    style={{
                      borderRadius: '100px',
                    }}
                    fullWidth
                  />
                </Box>
                {/* <Box my={1} mx={4}>
                  <TextField
                    onChange={(e: any) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                    label='Username'
                    variant='outlined'
                    className='emailInput'
                    style={{
                      borderRadius: '100px',
                    }}
                    fullWidth
                  />
                </Box> */}
              </Grid>
              <DialogActions>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <>
                      {loading && (
                        <CircularProgress size={24} className='progress' />
                      )}
                      <Button
                        type='submit'
                        disabled={loading}
                        className='LoginButton-header'
                        onClick={() => setResetPass(true)}
                      >
                        Reset Password
                      </Button>
                    </>
                  </Grid>
                </Grid>
                <Typography>
                  Go Back to Login
                  <Link
                    onClick={() => {
                      setForgotPass(false);
                      // console.log('TEST');
                      setSignIn(!signIn);
                      setUsername('');
                      setPassword('');
                      setEmail('');
                      setSignIn(!signIn);
                    }}
                  >
                    {' '}
                    Click Here
                  </Link>
                </Typography>
              </DialogActions>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );

  const resetPasswordModal = (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={state.signInModalIsOpen}
        keepMounted
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 20,
            padding: '30px',
            borderRadius: '10px',
          },
        }}
        onClose={() =>
          dispatch({
            type: 'TOGGLE_SIGN_IN_MODAL',
            payload: !state.signInModalIsOpen,
          })
        }
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          {notificationMessage}
        </Snackbar>
        <Box mx='auto'>
          <DialogTitle
            disableTypography
            id='responsive-dialog-title'
            style={{
              fontSize: '1.6rem',
              fontFamily: 'Gibson',
              fontWeight: 500,
              lineHeight: 1.6,
              letterSpacing: ' 0.0075rem',
              textAlign: 'center',
            }}
          >
            Please enter reset code and your new password.
          </DialogTitle>
        </Box>
        <DialogContent>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <form
              onSubmit={(e) => {
                resetPassword(e);
                setResetPass(false);
              }}
            >
              <Grid item xs={12} spacing={4}>
                <Box my={1} mx={4}>
                  <TextField
                    onChange={(e: any) => {
                      setResetCode(e.target.value);
                    }}
                    value={resetCode}
                    label='Reset Code'
                    variant='outlined'
                    className='emailInput'
                    style={{
                      borderRadius: '100px',
                    }}
                    fullWidth
                  />
                </Box>
                <Box my={1} mx={4}>
                  <TextField
                    onChange={(e: any) => {
                      setNewPassword(e.target.value);
                    }}
                    label='New Password'
                    value={newPassword}
                    type='password'
                    variant='outlined'
                    className='emailInput'
                    style={{
                      borderRadius: '100px',
                    }}
                    fullWidth
                  />
                </Box>
              </Grid>
              <DialogActions>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <>
                      {loading && (
                        <CircularProgress size={24} className='progress' />
                      )}
                      <Button
                        type='submit'
                        disabled={loading}
                        className='LoginButton-header'
                      >
                        Reset Password
                      </Button>
                    </>
                  </Grid>
                </Grid>
              </DialogActions>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );

  const signUpSuccess = (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={state.signInModalIsOpen}
        keepMounted
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 20,
            padding: '30px',
            borderRadius: '10px',
          },
        }}
        onClose={() =>
          dispatch({
            type: 'TOGGLE_SIGN_IN_MODAL',
            payload: !state.signInModalIsOpen,
          })
        }
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          {notificationMessage}
        </Snackbar>
        <Box mx='auto'>
          <DialogTitle
            disableTypography
            id='responsive-dialog-title'
            style={{
              fontSize: '1.6rem',
              fontFamily: 'Gibson',
              fontWeight: 500,
              lineHeight: 1.6,
              letterSpacing: ' 0.0075rem',
            }}
          >
            You're almost there!
          </DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
              spacing={2}
            >
              <p
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '1.1rem',
                  fontFamily: 'Gibson',
                  fontWeight: 500,
                  letterSpacing: ' 0.0075rem',
                }}
              >
                We sent a verification link to your email{' '}
                <strong>{email}</strong>
              </p>
              <p
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '1.1rem',
                  fontFamily: 'Gibson',
                  fontWeight: 500,
                  letterSpacing: ' 0.0075rem',
                }}
              >
                Click on the link in that email to finish creating your account.
                If you don't see it, you may have to check your{' '}
                <strong>spam folder</strong>.
              </p>
              <p
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '1.1rem',
                  fontFamily: 'Gibson',
                  fontWeight: 500,
                  letterSpacing: ' 0.0075rem',
                }}
              >
                After that, feel free to take a tour of SuperWorld!
              </p>

              <Button
                style={{ marginBottom: '10px' }}
                onClick={resendVerification}
                className='LoginButton'
              >
                Resend Email
              </Button>
              {/* <Button
                onClick={() => {
                  dispatch({
                    type: 'TOGGLE_SIGN_IN_MODAL',
                    payload: !state.signInModalIsOpen,
                  });
                  history.push('/slides');
                }}
                className='LoginButton'
              >
                Learn About SuperWorld
              </Button> */}
            </Grid>
          </DialogContentText>
          <DialogActions></DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
  if (forgotPass) {
    return forgotPasswordModal;
  }
  if (resetPass) {
    return resetPasswordModal;
  }
  if (newSignUp) {
    return signUpSuccess;
  } else if (!loggedIn) {
    return !signIn ? signUpModal : signInModal;
  } else {
    // initContracts();
    return wallet;
  }
};

export default SignInModal;
