// src/components/forms/SignUp.tsx

import * as React from 'react';
import {
  Box, Button, Checkbox, CssBaseline, FormControlLabel, Divider,
  FormLabel, FormControl, Link, TextField, Typography, Stack, Card as MuiCard
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from '../ui/AppTheme';
import { GoogleIcon, FacebookIcon } from '../ui/CustomIcons';
import { signUpWithEmail } from '../../utils/firebaseAuth';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUp() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      const userCredential = await signUpWithEmail(email, password);
      console.log("サインアップ成功:", userCredential.user);
      setSuccessMessage("アカウントが作成されました。");
      // 例: navigate("/welcome") またはログイン後のリダイレクト
    } catch (err: any) {
      console.error("サインアップ失敗:", err.message);
      setPasswordError(true);
      setPasswordErrorMessage("登録に失敗しました。メールアドレスをご確認ください。");
    }
  };

  return (
    <AppTheme>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                required
                fullWidth
                error={emailError}
                helperText={emailErrorMessage}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                required
                fullWidth
                error={passwordError}
                helperText={passwordErrorMessage}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">Create Account</Button>
          </Box>
          {successMessage && (
            <Typography color="success.main" sx={{ mt: 1, textAlign: 'center' }}>
                {successMessage}
            </Typography>
            )}
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>Sign up with Google</Button>
          </Box>
          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            Already have an account?{' '}
            <Link href="/" variant="body2">Sign in</Link>
          </Typography>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
