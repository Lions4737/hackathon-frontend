import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import CardAlert from './CardAlert';

import { useAuthContext } from '../../../auth/AuthContext'; // ✅ 追加

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
  const { logout } = useAuthContext(); // ✅ AuthContext から logout を取得

  const handleLogout = async () => {
    console.log('Logout button clicked'); // ✅ ログアウトボタンのクリックを確認するためのログ
    try {
      await logout();
      window.location.href = '/'; // ✅ ログアウト後の遷移（任意で useNavigate にも変更可能）
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack sx={{ maxWidth: '70dvw', height: '100%' }}>
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}>
            <Avatar alt="Sitemark web">
            <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
            <Typography component="p" variant="h6">
              UTTter
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout} // ✅ ログアウト処理をバインド
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
