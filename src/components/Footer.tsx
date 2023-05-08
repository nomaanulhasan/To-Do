import { Typography, Box, Link } from '@mui/material';
import { FooterProps } from '../lib';

export default function Footer({ showCopyright = false }: FooterProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--app-footer-bg)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        display: 'flex',
        height: '50px',
        width: '100%',
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant='body2' color='text.secondary' align='center'>
        {showCopyright
          ? `Copyright © ${new Date().getFullYear()} -`
          : 'Powered By:'}
        &nbsp;
        <Link
          href='https://nomaanulhasan.com'
          underline='hover'
          color='inherit'
          target='_blank'
        >
          NomaanulHasan.com
        </Link>
      </Typography>
    </Box>
  );
}
