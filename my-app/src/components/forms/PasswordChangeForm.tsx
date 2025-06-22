import React, { useState } from 'react';
import {
  Stack,
  Typography,
  TextField,
  Button,
  Card as MuiCard,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';
import { fireAuth } from '../../utils/firebase';
import AppTheme from '../ui/AppTheme';

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '100%',
  maxWidth: 500,
  margin: 'auto',
  boxShadow: theme.shadows[3],
  borderRadius: theme.spacing(2),
}));

const FullPageContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to bottom right, #ffffff, #f0f2f5)',
  ...theme.applyStyles('dark', {
    background: 'linear-gradient(to bottom right, #1e1e1e, #2c2c2c)',
  }),
}));

export default function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('新しいパスワードが一致しません');
      setSuccess('');
      return;
    }

    const user = fireAuth.currentUser;
    if (!user || !user.email) {
      setError('ログイン情報が確認できません');
      setSuccess('');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setSuccess('パスワードを変更しました。');
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error(err);
      setError('現在のパスワードが間違っています');
      setSuccess('');
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <FullPageContainer>
        <Card>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            パスワードの変更
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="現在のパスワード"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="新しいパスワード"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="新しいパスワード（確認）"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}

            <Button variant="contained" onClick={handleChangePassword}>
              パスワードを変更
            </Button>
          </Stack>
        </Card>
      </FullPageContainer>
    </AppTheme>
  );
}
