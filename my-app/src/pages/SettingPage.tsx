// src/pages/SettingsPage.tsx
import { Typography, Stack } from '@mui/material';
import PasswordChangeForm from '../components/forms/PasswordChangeForm'; // ✅ パスワード変更フォームをここに

export default function SettingsPage() {
  return (
    <Stack spacing={4} sx={{ p: 4, width: '100%' }}>
      <Typography variant="h4">Settings</Typography>
      <PasswordChangeForm />
    </Stack>
  );
}
