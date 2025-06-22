import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import Search from './Search';

type HeaderProps = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
};

export default function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        {/* 🔄 ページリロードボタン */}
        <IconButton
          aria-label="Reload page"
          onClick={() => window.location.reload()}
          size="large"
        >
          <RefreshIcon />
        </IconButton>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} inputRef={inputRef} />
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
