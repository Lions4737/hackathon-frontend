// components/Dashboard.tsx
import React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const DashboardLayout = ({
  children,
  searchTerm,
  setSearchTerm,
}: {
  children: React.ReactNode;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}) => {
  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {children}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};


export default DashboardLayout;