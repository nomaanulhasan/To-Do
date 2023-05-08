import {
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Button,
  Menu,
  MenuItem,
  Box,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TaskIcon from '@mui/icons-material/Task';
import { HeaderProps } from '../lib';
import { useState } from 'react';

const apps = [
  { id: 1, label: 'Clock', url: 'https://clock.nomaanulhasan.com' },
  { id: 2, label: 'Calculator', url: 'https://calculator.nomaanulhasan.com' },
  { id: 3, label: 'Weather', url: 'https://weather.nomaanulhasan.com' },
  { id: 4, label: 'Quiz', url: 'https://quiz.nomaanulhasan.com' },
  { id: 5, label: 'More', url: 'https://nomaanulhasan.com' }
];

export default function Header({ showMenu = false }: HeaderProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='fixed'>
      <Container maxWidth='sm'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display='flex' alignItems='center' mr={2}>
            <TaskIcon sx={{ mr: 1 }} />
            <Typography variant='h6' component='div'>
              To-Do List
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              onClick={handleOpenNavMenu}
              aria-controls='menu-appbar'
              aria-haspopup='true'
              aria-label='menu'
              color='inherit'
              sx={{ ml: 0 }}
              edge='start'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {apps.map(({ id, label, url }) => (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  target='_blank'
                  href={url}
                  key={id}
                >
                  <Typography textAlign='center'>{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {apps.map(({ id, label, url }) => (
              <Button
                onClick={handleCloseNavMenu}
                target='_blank'
                href={url}
                key={id}
                sx={{
                  textTransform: 'capitalize',
                  display: 'block',
                  color: 'white',
                  my: 2,
                  py: 0
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {showMenu && <Button color='inherit'>Login</Button>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
