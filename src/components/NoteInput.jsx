import React from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    this.props.addNote(this.state);
  }

  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1>TAMBAH</h1>
            <Typography variant='caption'>
              Title (maksimal 50 karakter) dan body wajib terisi.
            </Typography>
            <Box
              component='form'
              noValidate
              sx={{ mt: 3 }}
              onSubmit={this.onSubmitEventHandler}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label='Title'
                    value={this.state.title}
                    onChange={this.onTitleChangeEventHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label='Body'
                    value={this.state.body}
                    onChange={this.onBodyChangeEventHandler}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Simpan
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default NoteInput;
