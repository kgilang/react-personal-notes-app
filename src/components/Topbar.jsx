import React from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function Topbar({ isArchived, getNote }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <TextSnippetIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            CATATAN PRIBADI
          </Typography>
          {isArchived ? (
            <Button color='inherit' onClick={() => getNote(false)}>
              Aktif
            </Button>
          ) : (
            <Button color='inherit' onClick={() => getNote(true)}>
              Arsip
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Topbar;
