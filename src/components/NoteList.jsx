import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import NoteItem from './NoteItem';

function NoteList({ notes, isArchived, onArchived, onDelete }) {
  return (
    <Container fixed>
      <Box
        sx={{
          marginTop: 3,
        }}
      >
        <Grid container spacing={3}>
          {notes.filter((note) => note.archived == isArchived).length > 0 ? (
            notes
              .filter((note) => note.archived == isArchived)
              .map((note) => (
                <Grid item xs={12} sm={6} md={4} key={note.id}>
                  <NoteItem
                    key={note.id}
                    id={note.id}
                    isArchived={isArchived}
                    onArchived={onArchived}
                    onDelete={onDelete}
                    {...note}
                  />
                </Grid>
              ))
          ) : (
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant='h5' align='center' sx={{ color: '#d81b60' }}>
                Tidak ada catatan ({(isArchived) ? 'Arsip' : 'Aktif'})
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default NoteList;
