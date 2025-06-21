import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

type DBUser = {
  id: number;
  firebase_uid: string;
  username: string;
  description?: string;
  profile_image?: string;
};

export default function SideMenu() {
  const [dbUser, setDbUser] = useState<DBUser | null>(null);

  useEffect(() => {
    const fetchDBUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/me`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch DB user');
        const data = await res.json();
        setDbUser(data);
      } catch (err) {
        console.error('❌ SideMenu user fetch failed:', err);
      }
    };

    fetchDBUser();
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      {/* 上部セレクタ */}
      <Box sx={{ display: 'flex', mt: 'calc(var(--template-frame-height, 0px) + 4px)', p: 1.5 }}>
        <SelectContent />
      </Box>

      <Divider />

      {/* メニューコンテンツ */}
      <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <MenuContent />
      </Box>

      {/* ログインユーザー情報（直接APIから取得） */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          alt={dbUser?.username || 'User'}
          src={
            dbUser?.profile_image
              ? dbUser.profile_image.startsWith('http')
                ? dbUser.profile_image
                : `/images/${dbUser.profile_image}`
              : '/default-avatar.png'
          }
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {dbUser?.username || 'Anonymous'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ID: {dbUser?.id || 'no-uid'}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
