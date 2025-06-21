// pages/ProfilePage.tsx
import * as React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from '../components/ui/AppTheme';
import { useAuthContext } from '../components/auth/AuthContext';
import { fetchUserProfile, updateUserProfile } from '../utils/api';

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '100%',
  maxWidth: 600,
  margin: 'auto',
  boxShadow: theme.shadows[3],
  borderRadius: theme.spacing(2),
}));

const FullPageContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to bottom right, #ffffff, #f0f2f5)', // 明るいグラデーション
  ...theme.applyStyles('dark', {
    background: 'linear-gradient(to bottom right, #1e1e1e, #2c2c2c)', // ダークテーマでも柔らかめ
  }),
}));


type Profile = {
  username: string;
  description: string;
  profile_image: string;
};

export default function ProfilePage() {
  const { currentUser } = useAuthContext();

  const [profile, setProfile] = React.useState<Profile>({
    username: '',
    description: '',
    profile_image: '',
  });

  const [draft, setDraft] = React.useState<Profile>({
    username: '',
    description: '',
    profile_image: '',
  });

  const [editMode, setEditMode] = React.useState({
    username: false,
    description: false,
    profile_image: false,
  });

  const fetchAndSetProfile = async () => {
    const data = await fetchUserProfile();
    setProfile(data);
    setDraft({ ...data, description: '' });
  };

  React.useEffect(() => {
    fetchAndSetProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancelField = (field: keyof Profile) => {
    setDraft((prev) => ({
      ...prev,
      [field]: profile[field],
    }));
    setEditMode((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSaveField = async (field: keyof Profile) => {
    const updated = {
      ...profile,
      [field]: draft[field] || profile[field],
    };
    await updateUserProfile(updated);
    await fetchAndSetProfile();
    setEditMode((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const renderField = (
    label: string,
    name: keyof Profile,
    multiline: boolean = false,
    sxOverride: any = {}
  ) => (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <TextField
        name={name}
        value={draft[name]}
        onChange={handleChange}
        placeholder={profile[name] || ''}
        multiline={multiline}
        disabled={!editMode[name]}
        fullWidth
        sx={{
          ...(multiline
            ? {
                height: 120,
                '& .MuiInputBase-root': {
                  height: '100%',
                  alignItems: 'start',
                  padding: 1,
                },
                '& textarea': {
                  height: '100% !important',
                  overflow: 'hidden',
                  resize: 'none',
                  lineHeight: 1.5,
                },
              }
            : {}),
          ...sxOverride,
        }}
      />
      <Stack direction="row" spacing={1} justifyContent="flex-end" mt={1}>
        {!editMode[name] ? (
          <Button
            size="small"
            onClick={() => setEditMode((prev) => ({ ...prev, [name]: true }))}
          >
            ✏️ Edit
          </Button>
        ) : (
          <>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleCancelField(name)}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleSaveField(name)}
            >
              Save
            </Button>
          </>
        )}
      </Stack>
    </FormControl>
    
  );

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <FullPageContainer width="100%">
        <Card>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Edit Profile
          </Typography>

          {renderField('Username', 'username')}
          {renderField('Description', 'description', true)}
          {renderField('Profile Image URL', 'profile_image')}
        </Card>
      </FullPageContainer>
    </AppTheme>
  );
}
