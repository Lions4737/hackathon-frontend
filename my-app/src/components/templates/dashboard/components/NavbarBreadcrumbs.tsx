import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const isOnlyHome = pathnames.length === 1 && pathnames[0] === 'home';

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link
        underline="hover"
        color="inherit"
        component={RouterLink}
        to="/home"
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <HomeRoundedIcon fontSize="small" />
        </Stack>
      </Link>

      {/* /home 以外のときだけパンくずを追加 */}
      {!isOnlyHome &&
      pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const isNonLinked = value === 'posts' || value === 'users';

        return isLast || isNonLinked ? (
          <Typography
            key={to}
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {decodeURIComponent(value)}
          </Typography>
        ) : (
          <Link
            key={to}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={to}
          >
            {decodeURIComponent(value)}
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}
