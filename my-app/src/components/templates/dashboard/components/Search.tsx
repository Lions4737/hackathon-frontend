// components/templates/dashboard/components/Search.tsx
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
};

export default function Search({ searchTerm, setSearchTerm, inputRef }: Props) {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        inputRef={inputRef}
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}
